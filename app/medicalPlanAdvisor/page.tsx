/**
 * 医療保険 比較シミュレーション（デモ）
 *
 * 概要:
 * - 年齢・性別・入院日額などの簡易条件に基づき、デモ用カタログから商品を抽出し、
 *   人気順/保険料順で比較表示する。
 *
 * 主な仕様:
 * - ルーティング: /medicalPlanAdvisor
 * - クライアントサイドでの簡易フィルタリングとソート（人気順/保険料安い順）
 * - 比較表で主要項目（タイプ、入院日額、限度、手術方式、通院、月額例）を表示
 *
 * 制限事項:
 * - カタログはダミー値のため、正式な募集資料/約款とは一致しない。
 * - 引受・免責等の詳細は割愛。デモ用途。
 */

"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Table, Modal, Button, Checkbox, Radio } from "antd"
import Image from "next/image"
import type { ColumnsType } from "antd/es/table"
import { Crown, Check, MessageCircle } from "lucide-react"
import { productCatalog, type Product, type Gender } from "./productData"

/**
 * ページコンポーネント
 * @returns {JSX.Element} 画面要素
 */
export default function medicalPlanAdvisorPage(): JSX.Element {
  /** 年齢（0-85） */
  const [age, setAge] = useState<number>(35)
  /** 性別 */
  const [gender, setGender] = useState<Gender>("male")
  /** 入院日額（指定なしはnull） */
  const [dailyAmount, setDailyAmount] = useState<number | null>(null)
  /** 並び替えキー */
  const [sortKey, setSortKey] = useState<"popularity" | "premiumAsc">("popularity")
  /** 比較選択中の商品ID */
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 比較表示用に可視列を制御（null = 全件表示）
  const [visibleProductIds, setVisibleProductIds] = useState<string[] | null>(null)
  /** プラン提案ダイアログの開閉状態 */
  const [isProposalOpen, setIsProposalOpen] = useState<boolean>(false)
  /** プラン提案ダイアログの現在ステップ */
  const [proposalStep, setProposalStep] = useState<number>(0)
  /** プラン提案での一時的な選択状態（質問ID→選択ID集合） */
  const [proposalSelections, setProposalSelections] = useState<Record<string, Set<string>>>({})
  /** サーバ診断の結果商品（存在時はこれを優先採用） */
  const [diagnosedProductIds, setDiagnosedProductIds] = useState<string[] | null>(null)
  /** 診断中フラグ */
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false)
  /** 診断理由（適用前のプレビュー） */
  const [diagRationale, setDiagRationale] = useState<string | null>(null)
  /** 診断で推定されたAI条件（適用まで一時保持） */
  const [diagAiCriteria, setDiagAiCriteria] = useState<AiCriteria | null>(null)
  /** 質問トランジション（フェード）状態 */
  const [isQTransitioning, setIsQTransitioning] = useState<boolean>(false)
  /** トランジション方向 */
  const [transitionDir, setTransitionDir] = useState<"next" | "prev" | null>(null)
  /** 入場キック（一瞬オフセットから0へ） */
  const [enterKick, setEnterKick] = useState<boolean>(false)
  const [enterDir, setEnterDir] = useState<"next" | "prev" | "none">("none")

  // 診断理由のユーザー向け整形（内部ID→商品名、やわらかい前置き）
  const humanizeRationale = (raw: string | null): string => {
    if (!raw) return ""
    let text = String(raw)
    // ID→商品名
    const idToName: Record<string, string> = {}
    productCatalog.forEach(p => { idToName[p.productId] = p.productName })
    Object.entries(idToName).forEach(([id, name]) => {
      const re = new RegExp(`\\b${id}\\b`, 'g')
      text = text.replace(re, name)
    })
    // 含まれている商品名を抽出
    const mentionedNames: string[] = []
    productCatalog.forEach(p => {
      if (text.includes(p.productName) && !mentionedNames.includes(p.productName)) mentionedNames.push(p.productName)
    })
    const head = mentionedNames.length > 0
      ? `ご回答の傾向から、${mentionedNames.slice(0, 3).join("、")} などが特におすすめです。`
      : `ご回答の傾向から、いくつかの候補が特におすすめです。`

    // です・ます調への簡易整形
    const politeMap: Array<[RegExp, string]> = [
      [/希望$/, 'ご希望です'],
      [/合致$/, '合致しています'],
      [/選定$/, '選定しました'],
      [/考慮$/, '考慮しました'],
      [/優先$/, '優先します'],
      [/対応$/, '対応しています'],
      [/推奨$/, '推奨いたします'],
    ]
    const toPolite = (body: string): string => {
      const lines = body.split(/\n+/)
      const fixedLines = lines.map(line => {
        const parts = line.split('。')
        const fixedParts = parts.map((seg, idx) => {
          const s = seg.trim()
          if (!s) return ''
          let t = s
          for (const [re, rep] of politeMap) {
            t = t.replace(re, rep)
          }
          // 語尾が丁寧形で終わらない場合は「です」を付加
          if (!/(です|ます|でした|でしたら|しています|しました|いたします|ございます|ください)$/.test(t)) {
            t = `${t}です`
          }
          return t
        }).filter(Boolean)
        return fixedParts.join('。')
      })
      return fixedLines.join('\n')
    }

    const bodyPolite = toPolite(text)
    return `${head}\n\n理由:\n${bodyPolite}`
  }

  /**
   * 診断結果から商品名を抽出（ID→商品名の置換も考慮）
   * @param {string | null} raw 診断テキスト
   * @param {string[] | null} ids サーバ診断で返った商品ID一覧
   * @returns {string[]} 抽出された商品名（重複除去、順序は出現順/ids優先）
   */
  function extractRecommendedNames(raw: string | null, ids: string[] | null): string[] {
    const names: string[] = []
    // まずIDがあればそれを優先
    if (Array.isArray(ids) && ids.length > 0) {
      ids.forEach(id => {
        const p = productCatalog.find(pp => pp.productId === id)
        if (p && !names.includes(p.productName)) names.push(p.productName)
      })
    }
    if (!raw) return names
    let text = String(raw)
    // ID→商品名へ置換
    productCatalog.forEach(p => {
      const re = new RegExp(`\\b${p.productId}\\b`, 'g')
      text = text.replace(re, p.productName)
    })
    // テキストに含まれる商品名を抽出
    productCatalog.forEach(p => {
      if (text.includes(p.productName) && !names.includes(p.productName)) names.push(p.productName)
    })
    return names
  }

  /**
   * 理由本文を丁寧語に整形（ヘッダは付けない）
   * @param {string} raw 診断テキスト
   * @returns {string} 丁寧語に整形した本文
   */
  function toPoliteRationale(raw: string): string {
    let text = String(raw)
    const politeMap: Array<[RegExp, string]> = [
      [/希望$/, 'ご希望です'],
      [/合致$/, '合致しています'],
      [/選定$/, '選定しました'],
      [/考慮$/, '考慮しました'],
      [/優先$/, '優先します'],
      [/対応$/, '対応しています'],
      [/推奨$/, '推奨いたします'],
    ]
    const lines = text.split(/\n+/)
    const fixedLines = lines.map(line => {
      const parts = line.split('。')
      const fixedParts = parts.map(segRaw => {
        const s = segRaw.trim()
        if (!s) return ''
        let t = s
        for (const [re, rep] of politeMap) t = t.replace(re, rep)
        if (!/(です|ます|でした|でしたら|しています|しました|いたします|ございます|ください)$/.test(t)) {
          t = `${t}です`
        }
        return t
      }).filter(Boolean)
      return fixedParts.join('。')
    })
    return fixedLines.join('\n')
  }

  /**
   * おすすめ商品（箇条書き）テキストを生成
   */
  function buildRecommendationBullet(raw: string | null, ids: string[] | null): string {
    const names = extractRecommendedNames(raw, ids)
    const list = names.slice(0, Math.max(3, Math.min(6, names.length)))
    const bullets = list.map(n => `・${n}`).join('\n')
    return `ご回答の傾向から、\n${bullets}\nが特におすすめです。`
  }

  /**
   * おすすめ理由の要約（約200文字、丁寧語）
   * @param {string | null} raw 診断テキスト
   * @returns {string} 丁寧語で約200文字の要約
   */
  function buildPoliteReasonSummary(raw: string | null): string {
    if (!raw) return ""
    let text = String(raw)
    // ID→商品名
    productCatalog.forEach(p => {
      const re = new RegExp(`\\b${p.productId}\\b`, 'g')
      text = text.replace(re, p.productName)
    })
    // 丁寧語化
    const polite = toPoliteRationale(text).replace(/\n+/g, '\n').trim()
    const maxLen = 200
    if (polite.length <= maxLen) return polite
    // 200文字以内で直近の句点まで切る（最低100文字は確保）
    const boundary = polite.lastIndexOf('。', maxLen)
    if (boundary >= 100) return polite.slice(0, boundary + 1)
    // 句点が見つからない場合は切って丁寧に終わらせる
    let cut = polite.slice(0, maxLen)
    if (!/(です。|ます。|しました。|しています。)$/.test(cut)) {
      cut = `${cut}です。`
    }
    return cut
  }

  // 質問ヘルプ（補足説明）
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null)
  const helpTextByQId: Record<string, string> = {
    q1: '医療費・収入減・先進医療など、何に比重を置くかで設計が大きく変わります。迷ったら複数選択でも構いません。',
    q2: '入院が長引くほど自己負担や生活費への影響が増します。長期志向だと支払日数の長い商品が向きます。',
    q3: '毎月の支払いの軽さか、早めに払い終える安心かの選好です。クレカ・口座や月払・年払も商品選びに影響します。',
    q4: '入院1日あたりの受取額です。治療方針や生活費の考え方に合わせてお選びください。',
    q5: '1入院で給付される日数の上限です。長期志向なら延長や無制限に対応する商品が適します。',
    q6: '退院後の通院・在宅治療の費用補填に関する保障です。通院重視の方は付加を検討ください。',
    q7: '保険期間は「終身」か「定期（一定期間）」の選好です。長く持ちたい方は終身を選びます。',
    q8: '必要に応じて先進医療、通院、払込免除などの特約を選べます。追加すると保険料は上がります。',
    q9: '無事故時の還付や割引の有無です。将来の戻りを重視するか、現在の保険料を重視するかの指向です。',
    q10: '月払／年払の選択は利便性や総支払額に影響します。ライフスタイルに合うものを選びましょう。'
  }

  // リッチな選択ボタン（medical/page.tsxのトーンを参考）
  function RichOptionButton({ label, selected, onToggle, isMulti }: { label: string; selected: boolean; onToggle: () => void; isMulti: boolean }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left justify-start h-12 px-4 rounded-md border transition-colors ${
          selected
            ? 'bg-green-100 border-green-400'
            : 'bg-white border-green-200 hover:border-green-300 hover:bg-green-50'
        }`}
      >
        <span
          className={`inline-block align-middle mr-3 w-5 h-5 border-2 ${isMulti ? 'rounded' : 'rounded-full'} ${
            selected ? 'bg-green-600 border-green-600' : 'border-green-300'
          }`}
        />
        <span className="align-middle text-slate-700">{label}</span>
      </button>
    )
  }

  /** 質問定義（簡易版） */
  interface ProposalOption { id: string; label: string; }
  interface ProposalQuestion { id: string; title: string; multi: boolean; options: ProposalOption[]; illustration?: string }
  const proposalQuestions: ProposalQuestion[] = [
    {
      id: "q1",
      title: "どんな安心を優先したいですか？（複数選択可・生活シーンでお選びください）",
      multi: true,
      illustration: "🏥💊",
      options: [
        { id: "advanced_med", label: "最新の治療（先進医療）へのアクセスを確保したい" },
        { id: "cancer_long", label: "長引く治療や手術にしっかり備えたい" },
        { id: "income_drop", label: "退院後の通院や生活費の不安を軽くしたい" }
      ]
    },
    {
      id: "q2",
      title: "入院が長引いた場合、どの程度まで備えたいですか？（単一選択）",
      multi: false,
      illustration: "📅🏥",
      options: [
        { id: "short", label: "短期が主。長期はあまり想定しない" },
        { id: "mid", label: "中期まで備えたい" },
        { id: "long", label: "長期にも備えたい（入院無制限・高倍率などを重視）" }
      ]
    },
    {
      id: "q3",
      title: "支払い方針はどちらが近いですか？（単一選択）",
      multi: false,
      illustration: "💳📊",
      options: [
        { id: "light_monthly", label: "毎月の負担を軽くして続けやすくしたい（クレカ/月払）" },
        { id: "finish_early", label: "働けるうちに早めに払い終えたい（口座/年払）" }
      ]
    },
    {
      id: "q4",
      title: "入院中の1日あたりの備えはどの水準が安心ですか？（単一選択）",
      multi: false,
      illustration: "💊💵",
      options: [
        { id: "h5000", label: "5,000円/日" },
        { id: "h10000", label: "10,000円/日" }
      ]
    },
    {
      id: "q5",
      title: "入院の支払日数（限度）についての志向は？（単一選択）",
      multi: false,
      illustration: "📈🛌",
      options: [
        { id: "limit60", label: "60日型で十分" },
        { id: "limitLong", label: "長期にも備えたい（延長や無制限に関心）" }
      ]
    },
    {
      id: "q6",
      title: "退院後・外来の備え（通院保障）は必要ですか？（単一選択）",
      multi: false,
      illustration: "🏠🚶",
      options: [
        { id: "needOut", label: "必要（在宅・通院もカバーしたい）" },
        { id: "noOut", label: "不要（入院中心でよい）" }
      ]
    },
    {
      id: "q7",
      title: "保険期間のイメージは？（単一選択）",
      multi: false,
      illustration: "📜⏳",
      options: [
        { id: "whole", label: "終身（ずっと持ちたい）" },
        { id: "term10", label: "定期（10年）でもよい" }
      ]
    },
    {
      id: "q8",
      title: "必要そうな追加保障（特約）があればお選びください（複数選択可）",
      multi: true,
      illustration: "🧩",
      options: [
        { id: "rider_advanced", label: "先進医療特約" },
        { id: "rider_outpatient", label: "通院特約" },
        { id: "rider_waiver", label: "保険料払込免除特約" }
      ]
    },
    {
      id: "q9",
      title: "健康還付（ボーナス）や割引のあるタイプは？（単一選択）",
      multi: false,
      illustration: "🎁",
      options: [
        { id: "bonus_yes", label: "あるほうが良い（将来の戻りも意識）" },
        { id: "bonus_no", label: "こだわらない（保険料を優先）" }
      ]
    },
    {
      id: "q10",
      title: "支払回数はどちらが合いそうですか？（単一選択）",
      multi: false,
      illustration: "🗓️",
      options: [
        { id: "freq_month", label: "月払" },
        { id: "freq_annual", label: "年払" }
      ]
    }
  ]

  /** 選択トグル */
  const toggleProposalOption = (qid: string, oid: string, multi: boolean) => {
    setProposalSelections(prev => {
      const cur = new Set(prev[qid] ?? [])
      if (multi) {
        if (cur.has(oid)) cur.delete(oid)
        else cur.add(oid)
        return { ...prev, [qid]: cur }
      }
      return { ...prev, [qid]: new Set([oid]) }
    })
  }

  /** 単一選択時に選択→次の質問へフェード遷移 */
  const animateStep = (dir: "next" | "prev", nextStep: number) => {
    setTransitionDir(dir)
    setIsQTransitioning(true)
    window.setTimeout(() => {
      setProposalStep(nextStep)
      setEnterDir(dir)
      setEnterKick(true)
      setIsQTransitioning(false)
      window.setTimeout(() => setEnterKick(false), 20)
    }, 180)
  }

  const handleSingleSelect = (qid: string, oid: string) => {
    toggleProposalOption(qid, oid, false)
    if (proposalStep < proposalQuestions.length - 1) {
      animateStep("next", Math.min(proposalQuestions.length - 1, proposalStep + 1))
    }
  }

  const goNextAnimated = () => animateStep("next", Math.min(proposalQuestions.length - 1, proposalStep + 1))
  const goPrevAnimated = () => animateStep("prev", Math.max(0, proposalStep - 1))

  /** 回答→AI条件へ変換 */
  const buildCriteriaFromSelections = (): AiCriteria => {
    const s = proposalSelections
    const get = (qid: string) => Array.from(s[qid] ?? [])
    const c: AiCriteria = {}
    const q1 = get("q1")
    if (q1.includes("advanced_med")) c.needsAdvancedMedical = true
    if (q1.includes("cancer_long")) c.preferHighMultiplier = true
    if (q1.includes("income_drop")) c.wantsOutpatient = true
    const q2 = get("q2")
    if (q2.includes("long")) c.preferHighMultiplier = true
    const q3 = get("q3")
    if (q3.includes("light_monthly")) {
      c.preferredPaymentFrequencies = ["monthly"]
      c.preferredPaymentRoutes = ["creditCard"]
    }
    if (q3.includes("finish_early")) {
      c.preferredPaymentFrequencies = ["annual"]
      c.preferredPaymentRoutes = ["account"]
    }
    const q4 = get("q4")
    if (q4.includes("h5000")) c.hospitalizationDailyAmount = 5000
    if (q4.includes("h10000")) c.hospitalizationDailyAmount = 10000
    const q5 = get("q5")
    if (q5.includes("limitLong")) c.preferLongHospitalizationLimit = true
    const q6 = get("q6")
    if (q6.includes("needOut")) c.wantsOutpatient = true
    const q7 = get("q7")
    if (q7.includes("whole")) c.policyPeriodPreference = "whole"
    if (q7.includes("term10")) c.policyPeriodPreference = "term"
    const q8 = get("q8")
    if (q8.includes("rider_advanced")) (c.requiredIncludedRiderKeywords ??= []).push("先進医療")
    if (q8.includes("rider_outpatient")) (c.requiredIncludedRiderKeywords ??= []).push("通院")
    if (q8.includes("rider_waiver")) (c.requiredIncludedRiderKeywords ??= []).push("払込免除")
    const q9 = get("q9")
    if (q9.includes("bonus_yes")) c.preferHealthBonus = true
    const q10 = get("q10")
    if (q10.includes("freq_month")) c.preferredPaymentFrequencies = ["monthly"]
    if (q10.includes("freq_annual")) c.preferredPaymentFrequencies = ["annual"]
    return c
  }

  /**
   * AI診断の条件（比較表正規化フィールドに対応）
   * - 必要最低限の条件のみを定義。未指定は評価対象外。
   */
  type AiCriteria = {
    /** 先進医療を重視するか */
    needsAdvancedMedical?: boolean
    /** 通院保障を重視するか */
    wantsOutpatient?: boolean
    /** 手術倍率の高い型を重視するか */
    preferHighMultiplier?: boolean
    /** 死亡保障の有無を重視するか */
    requireDeathBenefit?: boolean
    /** 健康還付（健康ボーナス）を重視するか */
    preferHealthBonus?: boolean
    /** 払込経路の希望 */
    preferredPaymentRoutes?: Array<"account" | "creditCard">
    /** 支払回数の希望 */
    preferredPaymentFrequencies?: Array<"monthly" | "semiannual" | "annual">
    /** 必須の含まれている特約キーワード（一部一致） */
    requiredIncludedRiderKeywords?: string[]
    /** 入院日額の志向（例: 5000/10000） */
    hospitalizationDailyAmount?: number
    /** 1入院の限度日数は長期志向か */
    preferLongHospitalizationLimit?: boolean
    /** 保険期間の志向（終身/定期） */
    policyPeriodPreference?: "whole" | "term"
    /** 払込期間の志向（早期に払い終えたい） */
    preferEarlyPayoff?: boolean
  }

  /** AI診断からの条件（未適用なら null） */
  const [aiCriteria, setAiCriteria] = useState<AiCriteria | null>(null)

  

  /**
   * フィルタとソート済みの商品一覧
   * - 加入年齢レンジ一致
   * - 入院日額一致（一致0件の場合は全件フォールバック）
   * - 並び替え（人気降順 or 保険料昇順）
   */
  const filteredAndSorted: Product[] = useMemo(() => {
    const byAge = productCatalog.filter(p => age >= p.entryAgeRange.min && age <= p.entryAgeRange.max)
    const base = dailyAmount == null
      ? byAge
      : byAge.filter(p => p.hospitalizationCoverage.hospitalizationDailyAmount === dailyAmount)
    const sorted = [...base].sort((a, b) => {
      if (sortKey === "popularity") return b.popularity - a.popularity
      const ap = a.premiumInfo.sampleMonthlyPremium ?? Number.MAX_SAFE_INTEGER
      const bp = b.premiumInfo.sampleMonthlyPremium ?? Number.MAX_SAFE_INTEGER
      return ap - bp
    })
    return sorted
  }, [age, dailyAmount, sortKey])


  /**
   * 商品のスコアリング（AI条件ベース）
   * - 条件一致で加点し、総合点でランク付け
   */
  function inferHasAdvancedMedical(p: Product): boolean {
    return Boolean(p.riders?.advancedMedicalRider)
  }
  function inferHasOutpatient(p: Product): boolean {
    return (p.outpatientCoverage?.outpatientDailyAmount ?? 0) > 0
  }
  function inferHasHighMultiplier(p: Product): boolean {
    if (p.surgeryCoverage.surgeryPaymentMethod !== "multiplier") return false
    const mults = p.surgeryCoverage.surgeryMultipliers ? Object.values(p.surgeryCoverage.surgeryMultipliers) : []
    return mults.some(v => (v ?? 0) >= 10)
  }
  function inferHasDeathBenefit(p: Product): boolean {
    return /死亡/.test(p.productName)
  }
  function inferHasHealthBonus(p: Product): boolean {
    const tags = p.tags ?? []
    if (tags.some(t => t.includes("お金戻ってくる") || t.includes("健康還付"))) return true
    return /リターン/.test(p.productName)
  }
  function inferPaymentRoutes(p: Product): Array<"account" | "creditCard"> {
    // 簡易モデル: 多くの商品が両対応と仮定
    if (p.productName.includes("入院一時金保険")) return ["creditCard"]
    return ["account", "creditCard"]
  }
  function inferPaymentFrequencies(p: Product): Array<"monthly" | "semiannual" | "annual"> {
    if (p.paymentMode === "monthly") return ["monthly"]
    if (p.paymentMode === "yearly") return ["annual"]
    return ["monthly"]
  }
  function inferIncludedRiders(p: Product): string[] {
    const riders: string[] = []
    if (p.riders?.advancedMedicalRider) riders.push("先進医療特約")
    if (p.outpatientCoverage && (p.outpatientCoverage.outpatientDailyAmount ?? 0) > 0) riders.push("通院特約")
    if (p.riders?.waiverRider) riders.push("保険料払込免除特約")
    if (p.riders?.hospitalizationLumpSumRider) riders.push("入院一時給付特約")
    if (p.riders?.injuryFractureRider) riders.push("特定損傷特約")
    if (p.riders?.disabilityIncomeOrWorkIncapacityRider) riders.push("就業不能特約")
    if (p.riders?.womenSpecificRider) riders.push("女性疾病特約")
    if ((p.riders?.criticalIllnessRiders ?? []).length > 0) riders.push("三大疾病関連特約")
    return riders
  }
  const scoreProductByCriteria = (p: Product, criteria: AiCriteria): { score: number; hardMatches: number } => {
    let score = 0
    let hardMatches = 0
    if (criteria.needsAdvancedMedical) {
      const ok = inferHasAdvancedMedical(p)
      if (ok) { score += 2; hardMatches += 1 }
    }
    if (criteria.wantsOutpatient) {
      const ok = inferHasOutpatient(p)
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (criteria.preferHighMultiplier) {
      const ok = inferHasHighMultiplier(p)
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (criteria.requireDeathBenefit) {
      const ok = inferHasDeathBenefit(p)
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (criteria.preferHealthBonus) {
      const ok = inferHasHealthBonus(p)
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (Array.isArray(criteria.preferredPaymentRoutes) && criteria.preferredPaymentRoutes.length > 0) {
      const have = inferPaymentRoutes(p)
      const ok = criteria.preferredPaymentRoutes.some(r => have.includes(r))
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (Array.isArray(criteria.preferredPaymentFrequencies) && criteria.preferredPaymentFrequencies.length > 0) {
      const have = inferPaymentFrequencies(p)
      const ok = criteria.preferredPaymentFrequencies.some(f => have.includes(f))
      if (ok) { score += 1; hardMatches += 1 }
    }
    if (Array.isArray(criteria.requiredIncludedRiderKeywords) && criteria.requiredIncludedRiderKeywords.length > 0) {
      const hay = inferIncludedRiders(p).join(" ")
      const ok = criteria.requiredIncludedRiderKeywords.every(kw => hay.includes(kw))
      if (ok) { score += 1; hardMatches += 1 }
    }
    // 人気は並びの安定化用（抽出条件には含めない）
    score += Math.min(1, Math.max(0, p.popularity / 100))
    return { score, hardMatches }
  }

  /**
   * AI条件を適用して可視列を更新
   * - スコア > 0 の商品を抽出し、スコア降順で表示
   */
  useEffect(() => {
    if (!aiCriteria) return
    // サーバ診断があればそれを優先
    if (Array.isArray(diagnosedProductIds) && diagnosedProductIds.length > 0) {
      setVisibleProductIds(diagnosedProductIds)
      setSelectedIds(diagnosedProductIds)
      return
    }
    // ローカルフォールバック
    const evaluated = filteredAndSorted
      .map(p => ({ p, ...scoreProductByCriteria(p, aiCriteria) }))
    const matched = evaluated
      .filter(x => x.hardMatches > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.p.productId)
    setVisibleProductIds(matched.length > 0 ? matched : null)
    setSelectedIds(matched)
  }, [aiCriteria, filteredAndSorted, diagnosedProductIds])

  return (
    <div className="min-h-screen bg-semantic-bg">
      <div className="w-full mx-auto py-8">
        

        {/* アイコンバナー（分析ボタン） */}
        <div className="mb-4 flex items-center gap-3 justify-start">
          <button
            type="button"
            aria-label="AI条件をトグル"
            className="transition-opacity hover:opacity-90"
            onClick={() => {
              // 第1段階: ボタン押下でプラン提案ダイアログを開く（診断プレビューを初期化）
              setDiagRationale(null)
              setDiagAiCriteria(null)
              setDiagnosedProductIds(null)
              setIsProposalOpen(true)
            }}
          >
            <Image src="/analisys_button.png" alt="AI条件を適用" width={240} height={69} priority style={{ height: 'auto' }} />
          </button>
          {aiCriteria && (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200">AI条件適用中</span>
              {aiCriteria.needsAdvancedMedical && <span className="px-2 py-1 bg-slate-100 rounded">先進医療</span>}
              {aiCriteria.preferHighMultiplier && <span className="px-2 py-1 bg-slate-100 rounded">手術高倍率</span>}
              <button
                type="button"
                className="ml-1 text-blue-700 underline"
                onClick={() => { setAiCriteria(null); setVisibleProductIds(null) }}
              >条件をクリア</button>
            </div>
          )}
        </div>

        {/* プラン提案ダイアログ（段階的実装） */}
        <Modal
          title={(
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>AI保険相談</span>
            </div>
          )}
          open={isProposalOpen}
          onCancel={() => { setIsProposalOpen(false); setProposalStep(0); setDiagRationale(null); setDiagAiCriteria(null) }}
          footer={null}
          destroyOnHidden
          width={720}
          styles={{ body: { paddingTop: 20, paddingBottom: 24 } }}
        >
          <div className="space-y-6">
            {isDiagnosing ? (
              <div className="bg-white shadow-sm border border-slate-200 rounded-lg">
                <div className="p-6 text-center">
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="text-lg font-semibold text-blue-700 mb-2">AI診断実行中</div>
                  <div className="py-5">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">AIがあなたの回答を分析中です</p>
                    <p className="text-xs text-slate-500">しばらくお待ちください…</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mx-auto max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-700">回答の分析完了</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-700">AIによる診断実行中</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span className="text-xs text-slate-500">結果生成中</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : diagRationale ? (
              <div className="bg-white shadow-sm border border-slate-200 rounded-lg">
                <div className="p-6 text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-lg font-semibold text-green-700">AI診断結果</div>
                </div>
                <div className="px-6 pb-6 space-y-5">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <div className="font-medium text-blue-800 mb-1">おすすめ商品</div>
                    <div className="text-sm text-slate-700 whitespace-pre-line">{buildRecommendationBullet(diagRationale, diagnosedProductIds)}</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <div className="font-medium text-green-800 mb-1">おすすめ理由</div>
                    <div className="text-sm text-slate-700 whitespace-pre-line">{buildPoliteReasonSummary(diagRationale)}</div>
                  </div>
                  <div className="flex gap-3 justify-end pt-1">
                    <Button
                      onClick={() => {
                        const crit = diagAiCriteria ?? buildCriteriaFromSelections()
                        setAiCriteria(crit)
                        setIsProposalOpen(false)
                        setProposalStep(0)
                      }}
                      type="primary"
                    >
                      適用する
                    </Button>
                    <Button onClick={() => { setDiagRationale(null); setDiagAiCriteria(null); setDiagnosedProductIds(null) }}>もう一度診断する</Button>
                    <Button onClick={() => { setIsProposalOpen(false); setProposalStep(0) }}>終了する</Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-700 text-white rounded-full">
                      <span className="text-lg font-bold">Q{proposalStep + 1}</span>
                    </div>
                  </div>
                  {(() => {
                  const q = proposalQuestions[proposalStep]
                  if (!q) return null
                  return (
                    <div className="space-y-6 text-center">
                      <div className="text-base font-medium text-slate-800 leading-relaxed">{q.title}</div>
                      {q.illustration && (
                        <div className="text-4xl my-2">{q.illustration}</div>
                      )}
                      <div
                        className={`space-y-3 max-w-xl mx-auto transition-all duration-200 ${
                          isQTransitioning
                            ? (transitionDir === 'next' ? 'opacity-0 -translate-x-6' : 'opacity-0 translate-x-6')
                            : (enterKick
                                ? (enterDir === 'next' ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0')
                                : (enterDir === 'next' ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'))
                        }`}
                        style={{ transform: !isQTransitioning && enterKick ? (enterDir === 'next' ? 'translateX(12px)' : 'translateX(-12px)') : undefined }}
                      >
                        {q.options.map(opt => {
                          const selected = proposalSelections[q.id]?.has(opt.id) ?? false
                          if (q.multi) {
                            return (
                              <div key={opt.id}>
                                <RichOptionButton
                                  label={opt.label}
                                  selected={selected}
                                  onToggle={() => toggleProposalOption(q.id, opt.id, true)}
                                  isMulti
                                />
                              </div>
                            )
                          }
                          return (
                            <div key={opt.id}>
                              <RichOptionButton
                                label={opt.label}
                                selected={selected}
                                onToggle={() => handleSingleSelect(q.id, opt.id)}
                                isMulti={false}
                              />
                            </div>
                          )
                        })}
                      </div>
                      {/* 補足説明（アコーディオン） */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-w-xl mx-auto">
                        <button
                          className="w-full p-2 flex items-center justify-between hover:bg-gray-100 transition-colors"
                          onClick={() => setExpandedHelp(prev => prev === q.id ? null : q.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">i</span>
                            </div>
                            <span className="text-sm text-blue-600">{q.title.replace(/（.*?）/g, '')} について</span>
                          </div>
                          <span className={`text-gray-400 transition-transform ${expandedHelp === q.id ? 'rotate-180' : ''}`}>⌄</span>
                        </button>
                        {expandedHelp === q.id && (
                          <div className="px-3 pb-3 border-t border-gray-200 text-left">
                            <div className="pt-2 text-sm text-gray-700 leading-relaxed">{helpTextByQId[q.id] ?? ''}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                  })()}
                  <div className="flex items-center justify-center pt-5">
                    <div className="flex gap-6">
                      <Button size="large" className="h-11 px-8 min-w-[140px]" onClick={() => {
                        if (proposalStep === 0) { setIsProposalOpen(false); return }
                        goPrevAnimated()
                      }}>戻る</Button>
                      {proposalStep < proposalQuestions.length - 1 ? (
                        <Button size="large" type="primary" className="h-11 px-9 min-w-[160px]" onClick={goNextAnimated}>次へ</Button>
                      ) : (
                        <Button size="large" type="primary" className="h-11 px-9 min-w-[160px]" loading={isDiagnosing} onClick={async () => {
                          try {
                            setIsDiagnosing(true)
                            const payload = {
                              proposalSelections: Object.fromEntries(Object.entries(proposalSelections).map(([k, v]) => [k, Array.from(v ?? [])])),
                              age,
                              gender,
                              dailyAmount
                            }
                            const res = await fetch('/api/medical/diagnose', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(payload)
                            })
                            if (res.ok) {
                              const json = await res.json()
                              if (json?.success) {
                                if (Array.isArray(json.productIds) && json.productIds.length > 0) setDiagnosedProductIds(json.productIds)
                                if (json.aiCriteria && typeof json.aiCriteria === 'object') setDiagAiCriteria(json.aiCriteria)
                                setDiagRationale(typeof json.rationale === 'string' ? json.rationale : '診断結果を取得しました。')
                              }
                            }
                          } catch (_) {
                            setDiagRationale('診断の取得に失敗しました。もう一度お試しください。')
                            setDiagnosedProductIds(null)
                            setDiagAiCriteria(null)
                          } finally {
                            setIsDiagnosing(false)
                          }
                        }}>診断する</Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>

        {/* 結果一覧 */}
        <ComparisonTable
          products={filteredAndSorted}
          selectedIds={selectedIds}
          visibleProductIds={visibleProductIds}
          aiCriteria={aiCriteria}
          onToggle={(id) =>
            setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
          onCompareSelected={() => setVisibleProductIds(selectedIds.length > 0 ? [...selectedIds] : null)}
          onResetVisible={() => setVisibleProductIds(null)}
        />

        
      </div>
    </div>
  )
}

/**
 * 条件フォームコンポーネント
 * @returns {JSX.Element} 画面要素
 */
interface FilterFormProps {
  /** 年齢（0-85） */
  age: number
  /** 性別 */
  gender: Gender
  /** 入院日額（指定なしはnull） */
  dailyAmount: number | null
  /** 並び替え */
  sortKey: "popularity" | "premiumAsc"
  /** 年齢変更ハンドラ */
  onChangeAge: (value: number) => void
  /** 性別変更ハンドラ */
  onChangeGender: (value: Gender) => void
  /** 入院日額変更ハンドラ */
  onChangeDailyAmount: (value: number | null) => void
  /** 並び替え変更ハンドラ */
  onChangeSortKey: (value: "popularity" | "premiumAsc") => void
}

/**
 * 条件フォームコンポーネント
 * @param {FilterFormProps} props 入力条件と変更ハンドラ
 * @returns {JSX.Element} 画面要素
 */
function FilterForm(props: FilterFormProps): JSX.Element {
  const { age, gender, dailyAmount, sortKey, onChangeAge, onChangeGender, onChangeDailyAmount, onChangeSortKey } = props
  return (
    <div className="mb-8 rounded-lg p-6 bg-semantic-bg">
      <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-caption text-semantic-fg-subtle mb-1">年齢</label>
          <select
            className="w-full border border-semantic-border rounded-md px-3 py-2 bg-transparent"
            value={age}
            onChange={(e) => onChangeAge(Number(e.target.value))}
          >
            {Array.from({ length: 86 }, (_, i) => i).map((v) => (
              <option key={v} value={v}>{v}歳</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-caption text-semantic-fg-subtle mb-1">性別</label>
          <select
            className="w-full border border-semantic-border rounded-md px-3 py-2 bg-transparent"
            value={gender}
            onChange={(e) => onChangeGender(e.target.value as Gender)}
          >
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        <div>
          <label className="block text-caption text-semantic-fg-subtle mb-1">入院日額</label>
          <select
            className="w-full border border-semantic-border rounded-md px-3 py-2 bg-transparent"
            value={dailyAmount ?? ""}
            onChange={(e) => {
              const v = e.target.value
              onChangeDailyAmount(v === "" ? null : Number(v))
            }}
          >
            <option value="">指定なし</option>
            <option value={5000}>5,000円</option>
            <option value={10000}>10,000円</option>
            <option value={20000}>20,000円</option>
          </select>
        </div>
        <div>
          <label className="block text-caption text-semantic-fg-subtle mb-1">並び替え</label>
          <select
            className="w-full border border-semantic-border rounded-md px-3 py-2 bg-transparent"
            value={sortKey}
            onChange={(e) => onChangeSortKey(e.target.value as "popularity" | "premiumAsc")}
          >
            <option value="popularity">人気順</option>
            <option value="premiumAsc">保険料が安い順</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="button" className="w-full border border-semantic-border rounded-md px-4 py-2">条件を適用</button>
        </div>
      </form>
    </div>
  )
}

/**
 * 比較表コンポーネント
 * @param params.products 表示商品
 * @param params.selectedIds 選択中ID
 * @param params.onToggle 単一トグル
 * @param params.onToggleAll 一括トグル
 */
function ComparisonTable({
  products,
  selectedIds,
  visibleProductIds,
  aiCriteria,
  onToggle,
  onCompareSelected,
  onResetVisible
}: {
  products: Product[]
  selectedIds: string[]
  visibleProductIds: string[] | null
  aiCriteria: any | null
  onToggle: (id: string) => void
  onCompareSelected: () => void
  onResetVisible: () => void
}): JSX.Element {
  

  // CSV(18行目)基準の「保険期間」マッピング（商品名→表示文字列）
  const policyPeriodByProductName: Record<string, string> = {
    "はなさく医療": "終身",
    "医療保険CURE Next[キュア・ネクスト]": "終身",
    "CURE Next": "終身",
    "終身医療保険プレミアムZ": "終身",
    "なないろメディカル礎": "終身",
    "新メディフィットＡ(エース)ライトプラン(25)": "終身",
    "楽天生命スーパー医療保険": "終身（先進医療特約2018は10年）",
    "SBI生命の終身医療保険Neo": "終身",
    "じぶんへの保険3": "終身",
    "FWD医療Ⅱ": "終身※申込方法等によって異なります。",
    "死亡保障付医療保険Relief W [リリーフ・ダブル]": "終身",
    "じぶんへの保険Z": "10年",
    "入院一時金保険": "10年",
    "楽天生命スーパー医療保険 戻るんです": "終身（先進医療特約2018は10年）",
    "&LIFE 医療保険A（エース）セレクト": "終身",
    "&LIFE 医療保険A セレクト": "終身",
    "ネオdeいりょう": "終身(先進医療・患者申出療養特約は10年更新)",
    "メディカルKit NEO": "終身",
    "メディカルKit R": "終身",
    "健康をサポートする医療保険　健康のお守り": "終身",
    "新しい形の医療保険 REASON": "終身(総合先進医療特約は10年更新）",
    "新メディフィット リターン": "終身"
  }

  // CSV(19行目)基準の「払込期間」マッピング（商品名→表示文字列）
  const payingPeriodByProductName: Record<string, string> = {
    "はなさく医療": "終身",
    "医療保険CURE Next[キュア・ネクスト]": "終身",
    "CURE Next": "終身",
    "終身医療保険プレミアムZ": "終身 （55 歳払済/60 歳払済/65 歳払済/70 歳払済/75 歳払済/10 年払などもございます（一部特約は異なります",
    "なないろメディカル礎": "終身",
    "新メディフィットＡ(エース)ライトプラン(25)": "終身",
    "楽天生命スーパー医療保険": "終身（先進医療特約2018は10年）",
    "SBI生命の終身医療保険Neo": "終身",
    "じぶんへの保険3": "終身",
    "FWD医療Ⅱ": "終身※申込方法等によって異なります。",
    "死亡保障付医療保険Relief W [リリーフ・ダブル]": "終身",
    "じぶんへの保険Z": "10年",
    "入院一時金保険": "10年",
    "楽天生命スーパー医療保険 戻るんです": "終身（先進医療特約2018は10年）",
    "&LIFE 医療保険A（エース）セレクト": "終身",
    "&LIFE 医療保険A セレクト": "終身",
    "ネオdeいりょう": "終身(先進医療・患者申出療養特約は10年更新)",
    "メディカルKit NEO": "終身",
    "メディカルKit R": "終身",
    "健康をサポートする医療保険　健康のお守り": "終身",
    "新しい形の医療保険 REASON": "終身(総合先進医療特約は10年更新）",
    "新メディフィット リターン": "終身"
  }

  // CSV(20行目)基準の「払込方法（経路）」マッピング（商品名→表示文字列）
  const paymentRouteByProductName: Record<string, string> = {
    "はなさく医療": "口座振替/クレジットカード",
    "医療保険CURE Next[キュア・ネクスト]": "口座振替/クレジットカード",
    "CURE Next": "口座振替/クレジットカード",
    "終身医療保険プレミアムZ": "口座振替/クレジットカード",
    "なないろメディカル礎": "口座振替/クレジットカード",
    "新メディフィットＡ(エース)ライトプラン(25)": "口座振替/クレジットカード",
    "楽天生命スーパー医療保険": "口座振替/クレジットカード",
    "SBI生命の終身医療保険Neo": "口座振替/クレジットカード",
    "じぶんへの保険3": "口座振替/クレジットカード",
    "FWD医療Ⅱ": "クレジットカード払扱\n※申込方法によって異なります。",
    "死亡保障付医療保険Relief W [リリーフ・ダブル]": "口座振替/クレジットカード",
    "じぶんへの保険Z": "口座振替/クレジットカード",
    "入院一時金保険": "クレジットカード",
    "楽天生命スーパー医療保険 戻るんです": "口座振替扱/クレジットカード扱",
    "&LIFE 医療保険A（エース）セレクト": "口座振替/クレジットカード",
    "&LIFE 医療保険A セレクト": "口座振替/クレジットカード",
    "ネオdeいりょう": "口座振替/クレジットカード",
    "メディカルKit NEO": "口座振替/クレジットカード",
    "メディカルKit R": "口座振替/クレジットカード",
    "健康をサポートする医療保険　健康のお守り": "口座振替/クレジットカード払い",
    "新しい形の医療保険 REASON": "口座振替/クレジットカード"
  }

  // CSV(21行目)基準の「払込方法（回数）」マッピング（商品名→表示文字列）
  const paymentFrequencyByProductName: Record<string, string> = {
    "はなさく医療": "月払/年払",
    "医療保険CURE Next[キュア・ネクスト]": "月払/半年払/年払",
    "CURE Next": "月払/半年払/年払",
    "終身医療保険プレミアムZ": "月払/年払",
    "なないろメディカル礎": "月払/年払",
    "新メディフィットＡ(エース)ライトプラン(25)": "月払/半年払/年払 *ネット申込の場合は、月払のみのお取り扱いとなります。",
    "楽天生命スーパー医療保険": "月払",
    "SBI生命の終身医療保険Neo": "月払/年払",
    "じぶんへの保険3": "月払",
    "FWD医療Ⅱ": "月払\n※申込方法によって異なります。",
    "死亡保障付医療保険Relief W [リリーフ・ダブル]": "月払/半年払/年払",
    "じぶんへの保険Z": "月払",
    "入院一時金保険": "月払",
    "楽天生命スーパー医療保険 戻るんです": "月払",
    "&LIFE 医療保険A（エース）セレクト": "月払/半年払/年払",
    "&LIFE 医療保険A セレクト": "月払/年払",
    "ネオdeいりょう": "月払",
    "メディカルKit NEO": "月払/年払",
    "メディカルKit R": "月払/半年払/年払",
    "健康をサポートする医療保険　健康のお守り": "月払/半年払/年払",
    "新しい形の医療保険 REASON": "月払/半年払/年払",
    "新メディフィット リターン": "月払/半年払/年払"
  }

  // CSV行のクォート対応分割
  const splitCsvLine = (line: string): string[] => {
    const result: string[] = []
    let cur = ""
    let inQ = false
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i]
      if (ch === '"') { inQ = !inQ; continue }
      if (ch === ',' && !inQ) { result.push(cur); cur = ""; continue }
      cur += ch
    }
    result.push(cur)
    return result
  }

  // CSVの商品名順（L17）
  const csvProductOrder: string[] = [
    "はなさく医療",
    "医療保険CURE Next[キュア・ネクスト]",
    "終身医療保険プレミアムZ",
    "なないろメディカル礎",
    "新メディフィットＡ(エース)ライトプラン(25)",
    "楽天生命スーパー医療保険",
    "SBI生命の終身医療保険Neo",
    "じぶんへの保険3",
    "FWD医療Ⅱ",
    "死亡保障付医療保険Relief W [リリーフ・ダブル]",
    "じぶんへの保険Z",
    "入院一時金保険",
    "楽天生命スーパー医療保険 戻るんです",
    "&LIFE 医療保険A（エース）セレクト",
    "ネオdeいりょう",
    "メディカルKit NEO",
    "メディカルKit R",
    "健康をサポートする医療保険　健康のお守り",
    "新しい形の医療保険 REASON",
    "新メディフィット リターン",
  ]

  // 補正（実データ名 → CSV上の正式名称）
  const canonicalName = (name: string): string => {
    const map: Record<string, string> = {
      "CURE Next": "医療保険CURE Next[キュア・ネクスト]",
      "&LIFE 医療保険A セレクト": "&LIFE 医療保険A（エース）セレクト",
    }
    return map[name] ?? name
  }

  // 先進医療（CSV 37〜42行相当）を縦結合して1セルへ
  const advancedMedicalCsvRows: string[] = [
    '先進医療,,"先進医療にかかる技術料と同額。通算2,000万円限度。","先進医療にかかる技術料と同額（通算2,000万円限度）/先進医療給付金の10%相当額（1回の療養につき50万円限度）","所定の先進医療・患者申出療養にかかる技術料と同額（通算2,000万円限度）先進医療・患者申出療養支援給付金1回につき15万円限度",【先進医療・患者申出療養給付金】,"先進医療にかかる技術料の自己負担額と同額。（通算2,000万円まで保障）","先進医療にかかる技術料（被保険者負担額）＋一時金（15万円）/合わせて通算2,000万円限度",ー,"【先進医療給付金】先進医療にかかる技術料と同額（通算2,000万円限度）","先進医療にかかる技術料と同額（通算2,000万円限度）/先進医療給付金の10%相当額（1回の療養につき50万円限度）",ー,ー,"先進医療にかかる技術料の自己負担額と同額。（通算2,000万円まで保障）","先進医療にかかわる技術料と約款所定の交通費・宿泊費 (保険期間通算2,000万円まで)","技術料と同額(先進医療給付金および患者申出療養給付金を合算して、通算2,000万円限度)","先進医療にかかわる技術料と同額(通算2,000万円限度)","先進医療にかかわる技術料と同額(通算2,000万円限度)","先進医療の技術料（通算2,000 万円まで保障）",総合先進医療特約,ー',
    '先進医療,,,,,【先進医療・患者申出療養見舞金】先進医療・患者申出療養給付金の10%相当額（通算200万円限度）,技術料相当額(自己負担額),,,,【先進医療一時金】先進医療給付金の10%相当額,,,,,,,10年自動更新・90歳まで,10年自動更新・90歳まで,,"1回につき先進医療にかかる技術料のうち自己負担額と同額。通算2,000万円まで",',
    '先進医療,,,,,,【先進医療・患者申出療養一時給付金】,,,,,,,,,,,,,,,',
    '先進医療,,,,,,15万円,,,,,,,,,,,,,,,',
    '先進医療,,,,,,"＊先進医療・患者申出療養給付金と先進医療・患者申出療養一時給付金を通算して2,000万円限度となります。",,,,,,,,,,,,,,,',
    '先進医療,,,,,,＊療養を受けられた日現在において、先進医療または患者申出療養に 該当しないときはお支払いできません。,,,,,,,,,,,,,,,',
  ]

  const getAdvancedMedicalCell = (productName: string): string => {
    const csvName = canonicalName(productName)
    const colIndex = csvProductOrder.indexOf(csvName)
    if (colIndex < 0) return "-"
    const parts: string[] = []
    for (const line of advancedMedicalCsvRows) {
      const cols = splitCsvLine(line)
      const raw = (cols[2 + colIndex] ?? '').trim()
      if (!raw) continue
      const val = raw.replace(/^\"|\"$/g, '').trim()
      if (val && val !== 'ー') parts.push(val)
    }
    return parts.length > 0 ? parts.join('\n') : 'ー'
  }

  // （無事故）健康ボーナス（CSV 49〜52行相当）
  const savingBonusCsvRows: string[] = [
    'ボーナス,（無事故）健康ボーナス,ー,ー,ー,ー,ー,ー,ー,ー,ー,ー,ー,ー,健康還付給付金支払年齢までにお払込みいただいた主契約の保険料から、それまでにお受け取りいただいた主契約の入院給付金等の合計額を差し引いた金額,ー,ー,ー,健康還付給付金：70歳までにお払込いただいた保険料(主契約の保険料が対象)からそれまでにお支払事由が生じた入院給付金等を差し引いた金額をお受け取りいただけます。,ー,ー,健康還付給付金あり',
    'ボーナス,（無事故）健康ボーナス,,,,,,,,,,,,,,,,,,,,・健康還付給付割合：100%',
    'ボーナス,（無事故）健康ボーナス,,,,,,,,,,,,,,,,,,,,・健康還付給付金支払年齢：65歳',
    'ボーナス,（無事故）健康ボーナス,,,,,,,,,,,,,,,,,,,,＊健康還付給付金(健康還付給付特則)について、詳しくは商品詳細ページをご参照ください。'
  ]

  const getSavingBonusCell = (productName: string): string => {
    const csvName = canonicalName(productName)
    const colIndex = csvProductOrder.indexOf(csvName)
    if (colIndex < 0) return "-"
    const parts: string[] = []
    for (const line of savingBonusCsvRows) {
      const cols = splitCsvLine(line)
      const raw = (cols[2 + colIndex] ?? '').trim()
      const val = raw.replace(/^\"|\"$/g, '').trim()
      if (val && val !== 'ー') parts.push(val)
    }
    return parts.length > 0 ? parts.join('\n') : 'ー'
  }

  // 加入年齢（CSV 64〜65行相当）
  const entryAgeCsvRows: string[] = [
    '加入年齢,,0歳〜満85歳（インターネット申込は満20歳〜満85歳）,0歳～80歳,0歳～満80歳,0～85歳,【ネット申込・郵送申込】満18歳〜満85歳,20歳～84歳,20～75歳,18歳～70歳,満20歳～満85歳,15歳～80歳（保険料払込期間により異なります）,18歳～70歳,18歳～75歳,20歳～50歳,満0歳～満85歳,満0歳～満85歳,0歳～85歳,0歳～60歳,0歳～80歳,0歳～満85歳（ご契約内容によって加入年齢が異なります）,0歳～満40歳',
    '加入年齢,,,,※インターネット経由でのお申し込みの場合は、満18歳から可能です。,,【対面申込】0歳〜満85歳,,,,※申込方法等によって異なります。,,,,,,,,,,,＊ご契約内容によって加入年齢が異なります。'
  ]

  const getEntryAgeCell = (productName: string): string => {
    const csvName = canonicalName(productName)
    const colIndex = csvProductOrder.indexOf(csvName)
    if (colIndex < 0) return "-"
    const parts: string[] = []
    for (const line of entryAgeCsvRows) {
      const cols = splitCsvLine(line)
      const raw = (cols[2 + colIndex] ?? '').trim()
      const val = raw.replace(/^\"|\"$/g, '').trim()
      if (val && val !== 'ー') parts.push(val)
    }
    return parts.length > 0 ? parts.join('\n') : 'ー'
  }

  // 申込方法（CSV 66〜67行相当）
  const applicationMethodCsvRows: string[] = [
    '申込方法,,ネット/郵送/対面,ネット/郵送/対面,ネット/郵送/対面,ネット/郵送/対面,ネット/郵送/対面,ネット,ネット：20歳～69歳 通信販売：20歳～75歳 ※保険期間/払込期間により異なります,ネット,ネット,ネット/通販/対面,ネット,ネット,ネット,ネット・対面,ネット/郵送/対面,対面/ネット,対面,対面/通販,通販/対面,対面',
    '申込方法,,,,,,,,,,※郵送/対面も取扱可,,,,,,,,,,,'
  ]

  const getApplicationMethodCell = (productName: string): string => {
    const csvName = canonicalName(productName)
    const colIndex = csvProductOrder.indexOf(csvName)
    if (colIndex < 0) return "-"
    const parts: string[] = []
    for (const line of applicationMethodCsvRows) {
      const cols = splitCsvLine(line)
      const raw = (cols[2 + colIndex] ?? '').trim()
      const val = raw.replace(/^\"|\"$/g, '').trim()
      if (val && val !== 'ー') parts.push(val)
    }
    return parts.length > 0 ? parts.join('\n') : 'ー'
  }

  // プラン名または保障内容（CSV 71行）
  const planNameCoverageCsvLine: string = `プラン名または保障内容,,"入院給付日額：5,000円 ｜60日型｜手術Ⅱ型｜３大疾病入院支払日数無制限特則適用｜先進医療特約付加","基本プラン | 入院給付金日額:5,000円コース | 先進医療保障:あり | 口座振替扱 | 手術給付金:あり","基本プラン｜入院給付日額：5,000円・60日型｜手術給付金等の型：Ⅰ型・10倍 ｜手術給付金：5万円(外来2.5万円)｜放射線治療給付金：5万円｜骨髄ドナー給付金：5万円｜先進医療・患者申出療養特約：付加｜※この商品のお申込みに必要な最低保険料は月払1,000円以上、年払の場合10,000円以上と設定されています。上記プランの保険料が1,000円を下回る場合は、保障内容を修正のうえお申込みください。","入院日額5,000円｜入院60日型｜手術２型｜先進医療・患者申出療養特約付加｜３大疾病入院延長特則適用｜特定疾病保険料払込免除特則非適用","【ライトプラン(25)】主契約(初期入院10日給付特則適用なし、疾病入院給付金の特則適用なし、60日型、I型(外来手術増額特則適用なし))：1日につき 5,000円 | 先進医療・患者申出療養特約(21) ：付加","カスタムプラン　入院給付金日額：5,000円｜手術給付金Ⅰ型｜先進医療特約2018付加","入院給付金日額：5,000円(60日)｜先進医療特約(2022) | 口座振替月払 | 優良体料率適用","エコノミーコース(がん治療給付金、先進医療保障なし) | 入院給付金日額：5,000円 | 手術給付金：【入院中】入院給付金日額×10【外来】入院給付金日額×5","FWD医療Ⅱ＜Web専用＞ ｜ 入院給付金日額 5,000円（60日型・2型）｜ 先進医療特約 ｜ 優良体保険料率｜保険料払込方法：月払（クレジットカード払扱）｜※2025年3月2日現在｜※このページでご案内している内容はインターネットによるお申込みを前提としたものです。申込方法により付加できる特約・特則や選択できる給付金額等が異なる場合があります。","日額5,000円（死亡保険金250万円）｜先進医療保障：あり｜手術給付金：あり｜口座振替扱","エコノミーコース(がん治療給付金、先進医療保障なし) | 入院給付金日額：5,000円 | 手術給付金：【入院中】入院給付金日額×10【外来】入院給付金日額×5",入院一時金保険：10万円｜クレジットカード月払,"入院給付金日額：5,000円｜手術給付金Ⅰ型｜健康還付給付金支払年齢：70歳｜先進医療特約2018付加","主契約:入院給付金日額5,000円 | 支払限度の型：60日型 | 手術給付金の型：手術I型 | 初期入院10日給付特則付 | 八大疾病入院無制限給付特則付 | 口座振替扱 | 先進医療特約（無解約返戻金型）","正式名称：無解約返戻金型終身医療保険｜ライトプラン｜入院給付金(60日型)日額：5,000円｜手術保障特則：Ⅰ型(入院2倍)【入院中】5万円【外来】2.5万円｜先進医療・患者申出療養特約：付加｜保険料率：健康保険料率　※ライトプランは募集代理店におけるプラン名称です。","医療総合保険（基本保障・無解約返戻金型）[無配当] | 入院給付金日額5,000円 | 1入院60日型 | 手術給付金および放射線治療給付金の給付倍率の型：I型 | 死亡保険金の給付倍率0倍 | 先進医療特約 | 通院特約 | 特定疾病保険料払込免除特則あり | 月払 | 口座振替・クレジットカード払","医療総合保険(基本保障・無解約返戻金型)健康還付特則 付加 [無配当] | 健康還付給付金のお受取り対象年齢:70歳 | 入院給付金日額5,000円 | 1入院60日型 | 手術給付金・放射線治療給付金の給付倍率：Ⅰ型 | | 死亡保険金の給付倍率0倍 | 口座振替・クレジットカード払","60日型 | 入院給付金日額5,000円 | 医療用新先進医療特約","REASON｜基本プラン｜（１か月型）｜治療給付金額10万円、入院給付金日額5,000円、通院給付金日額5,000円、総合先進医療特約付き、三大疾病保険料払込免除特約なし｜定額タイプ（個別取扱）","【日額5,000円プラン】主契約(特定３疾病入院無制限給付特則、60日型、II型、健康還付給付割合：100%、健康還付給付金支払年齢：65歳)：1日につき 5,000円`;

  const getPlanNameOrCoverageCell = (productName: string): string => {
    const csvName = canonicalName(productName)
    const idx = csvProductOrder.indexOf(csvName)
    if (idx < 0) return "-"
    const cols = splitCsvLine(planNameCoverageCsvLine)
    const raw = (cols[2 + idx] ?? '').trim()
    const val = raw.replace(/^\"|\"$/g, '').trim()
    return val || 'ー'
  }

  // 募集文書番号は非表示（利用しない）

  const formatPayingPeriod = (value: string): string => {
    if (!value) return "-"
    if (value === "lifetime") return "終身払"
    if (value.startsWith("years_")) {
      const y = value.split("_")[1]
      return `${y}年払`
    }
    if (value.startsWith("to_age_")) {
      const a = value.split("_")[2]
      return `${a}歳払済`
    }
    return value
  }

  const summarizeRiders = (riders?: Product["riders"]): string[] => {
    if (!riders) return []
    const list: string[] = []
    if (riders.advancedMedicalRider) list.push("先進医療")
    if (riders.womenSpecificRider) list.push("女性疾病")
    if (riders.waiverRider) list.push("払込免除")
    if (riders.hospitalizationLumpSumRider) list.push("入退院一時金")
    if (riders.injuryFractureRider) list.push("骨折・外傷")
    if (riders.disabilityIncomeOrWorkIncapacityRider) list.push("就業不能")
    if (riders.criticalIllnessRiders && riders.criticalIllnessRiders.length > 0) {
      const map: Record<string, string> = { cancer: "がん", heart: "心疾患", stroke: "脳血管" }
      list.push(...riders.criticalIllnessRiders.map(k => map[k] ?? k))
    }
    if (riders.otherRiders && riders.otherRiders.length > 0) list.push(...riders.otherRiders)
    return list
  }

  const rows: Array<{
    key: string
    label: string
    render: (p: Product, idx: number) => JSX.Element | string
    align?: "left" | "center" | "right"
    group?: string
    mergeLabelCols?: boolean
  }> = [
    {
      key: "rank",
      label: "ランキング",
      align: "center",
      render: (_p, idx) => (
        <span className="inline-flex items-center gap-2 justify-center">
          {idx === 0 ? <Crown className="w-5 h-5 text-amber-500" /> : null}
          <span className="text-2xl font-semibold text-slate-800">{idx + 1}</span>
          <span className="text-caption text-slate-500">位</span>
        </span>
      )
    },
    {
      key: "insurer",
      label: "保険会社名",
      align: "center",
      render: (p) => p.insurerName
    },
    // 旧: 商品ごとのAI一致ラベル行は列へ移行済み
    // 商品行は削除
    {
      key: "feature_tags",
      label: "特徴タグ",
      render: (p) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {(p.tags ?? []).slice(0, 6).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-caption text-slate-600">{t}</span>
          ))}
        </div>
      )
    },
    { key: "section_hoken", label: "保障内容", render: () => "" },
    { key: "productNameRow", label: "商品名", mergeLabelCols: true, align: "center", render: (p) => p.productName },
    { key: "policy", label: "保険期間", align: "center", render: (p) => policyPeriodByProductName[p.productName] ?? "-" },
    { key: "premium_section", label: "保険料", align: "center", render: () => "" },
    { key: "payingPeriod", group: "保険料", label: "払込期間", align: "center", render: (p) => payingPeriodByProductName[p.productName] ?? "-" },
    { key: "paymentRoute", group: "保険料", label: "払込方法（経路）", align: "center", render: (p) => (paymentRouteByProductName[p.productName] ?? "-") },
    { key: "paymentFrequency", group: "保険料", label: "払込方法（回数）", align: "center", render: (p) => (paymentFrequencyByProductName[p.productName] ?? "-") },
    { key: "premium", label: "月払い保険料", mergeLabelCols: true, align: "center", render: (p) => {
      const prem = p.premiumInfo?.sampleMonthlyPremium ?? 0
      const na = p.premiumInfo?.premiumChangeRisk === "not_available_for_age" || prem <= 0
      if (na) {
        return (
          <span className="whitespace-pre-line text-slate-500 text-sm">{`年齢対象外につき\n試算できません`}</span>
        )
      }
      return (
        <span className="inline-flex items-end"><span className="text-3xl font-bold leading-none text-rose-600">¥{prem.toLocaleString()}</span><span className="text-xs text-slate-500 ml-1 mb-0.5">/月払</span></span>
      )
    } },
    { key: "section_hospitalization", label: "入院", render: () => "" },
    // CSV(25〜34行目)の手術関連表記を統合して表示
    { key: "surgery", label: "手術", align: "center", render: (p) => {
      const map: Record<string, string> = {
        "はなさく医療": "【手術給付金】\n（入院中）1回につき5・10・30万円、\n（外来）1回につき2.5万円\n【放射線治療給付金】",
        "医療保険CURE Next[キュア・ネクスト]": "（入院中）1回につき\n10万円、\n（外来）1回につき\n", // CSVでは段組み。詳細は上段/下段で表現
        "CURE Next": "（入院中）1回につき\n10万円、\n（外来）1回につき\n",
        "終身医療保険プレミアムZ": "１回につき5万円\n（外来）1回につき",
        "なないろメディカル礎": "手術の種類に応じて入院給付金日額 × 5倍・10倍\n(外来)1回につき2.5万円\n【移植術給付金】1回につき5万円（回数無制限）\n【骨髄ドナー給付金】5万円（1回のみ）",
        "新メディフィットＡ(エース)ライトプラン(25)": "【手術給付金】\n(入院中)1回につき5万円\n(外来)1回につき2.5万円\n【放射線治療給付金】1回につき5万円（30日に1回を限度、回数無制限）",
        "楽天生命スーパー医療保険": "（入院中）\n5万円\n（外来）\n",
        "SBI生命の終身医療保険Neo": "1回につき10万円\n（外来）2.5万円",
        "じぶんへの保険3": "・入院中：5万円(入院給付金日額×10)\n・外来：2.5万円(入院給付金日額×5)",
        "FWD医療Ⅱ": "【手術給付金】入院中：1回につき5万円、入院中以外：1回につき2.5万円（回数無制限）　\n【放射線治療給付金】1回につき5万円（30日に1回を限度、回数無制限）\n【骨髄ドナー給付金】5万円（1回のみ）",
        "死亡保障付医療保険Relief W [リリーフ・ダブル]": "（入院中の手術）1回につき5万円\n前述以外(外来)の手術：2.5万円",
        "じぶんへの保険Z": "・入院中：5万円(入院給付金日額×10)\n・外来：2.5万円(入院給付金日額×5)",
        "入院一時金保険": "ー",
        "楽天生命スーパー医療保険 戻るんです": "（入院中）\n1回につき5万円\n（外来）\n",
        "&LIFE 医療保険A（エース）セレクト": "（入院中）1回につき\n5万円\n（外来）1回につき\n2.5万円",
        "&LIFE 医療保険A セレクト": "（入院中）1回につき\n5万円\n（外来）1回につき\n2.5万円",
        "ネオdeいりょう": "入院中の手術または骨髄等の採取術、放射線治療：5万円\n【放射線治療給付金】",
        "メディカルKit NEO": "入院中の手術または骨髄等の採取術、放射線治療：5万円\n【骨髄移植給付金】\n1回につき10万円",
        "メディカルKit R": "内容により1回につき20・10・5・2.5万円\n【骨髄移植給付金】",
        "健康をサポートする医療保険　健康のお守り": "ー",
        "新しい形の医療保険 REASON": "【手術給付金】",
        "新メディフィット リターン": "(入院中)1回につき5万円\n前述以外(外来)の手術：2.5万円\n(外来)1回につき2.5万円\n(入院中)1回につき5・10・25万円"
      }
      const text = map[p.productName] ?? "-"
      return <span className="whitespace-pre-line">{text}</span>
    } },
    // CSV(22行目)の入院日額
    { key: "hAmount", group: "入院", label: "入院日額", align: "center", render: (p) => {
      const map: Record<string, string> = {
        "はなさく医療": "1日につき5,000円",
        "医療保険CURE Next[キュア・ネクスト]": "1日につき5,000円",
        "CURE Next": "1日につき5,000円",
        "終身医療保険プレミアムZ": "1日につき5,000円",
        "なないろメディカル礎": "1日につき5,000円",
        "新メディフィットＡ(エース)ライトプラン(25)": "1日につき5,000円",
        "楽天生命スーパー医療保険": "１日につき5,000円",
        "SBI生命の終身医療保険Neo": "1日につき5,000円",
        "じぶんへの保険3": "5,000円(5日以内の入院の場合、一律25,000円)",
        "FWD医療Ⅱ": "1日につき5,000円",
        "死亡保障付医療保険Relief W [リリーフ・ダブル]": "1日につき5,000円",
        "じぶんへの保険Z": "5,000円(5日以内の入院の場合、一律25,000円)",
        "入院一時金保険": "ー",
        "楽天生命スーパー医療保険 戻るんです": "１日につき5,000円",
        "&LIFE 医療保険A（エース）セレクト": "(日帰り入院から入院10日目まで)一律50,000円\n(入院11日目以降)1日につき5,000円",
        "&LIFE 医療保険A セレクト": "(日帰り入院から入院10日目まで)一律50,000円\n(入院11日目以降)1日につき5,000円",
        "ネオdeいりょう": "1日につき5,000円",
        "メディカルKit NEO": "1日につき5,000円",
        "メディカルKit R": "1日につき5,000円",
        "健康をサポートする医療保険　健康のお守り": "1日につき5,000円",
        "新しい形の医療保険 REASON": "1日につき5,000円",
        "新メディフィット リターン": "1日につき5,000円"
      }
      const text = map[p.productName] ?? "-"
      return <span className="whitespace-pre-line">{text}</span>
    } },
    // CSV(23行目)の１入院の限度日数
    { key: "hLimitPer", group: "入院", label: "１入院の限度日数", align: "center", render: (p) => {
      const map: Record<string, string> = {
        "FWD医療Ⅱ": "60日",
        "終身医療保険プレミアムZ": "60日",
        "SBI生命の終身医療保険Neo": "60日",
        "じぶんへの保険Z": "60日",
        "新メディフィットＡ(エース)ライトプラン(25)": "60日",
        "ネオdeいりょう": "60日",
        "なないろメディカル礎": "60日（所定の３大疾病の場合、日数無制限）",
        "楽天生命スーパー医療保険": "60日",
        "はなさく医療": "60日。８大疾病で入院した場合は1入院120日まで保障します。３大疾病で入院した場合は支払日数無制限で保障します。",
        "医療保険CURE Next[キュア・ネクスト]": "60日（七大生活習慣病は1入院120日、三大疾病は無制限）",
        "CURE Next": "60日（七大生活習慣病は1入院120日、三大疾病は無制限）",
        "じぶんへの保険3": "60日",
        "&LIFE 医療保険A（エース）セレクト": "60日(約款所定の八大疾病(注)を直接の原因とする場合は日数無制限)",
        "&LIFE 医療保険A セレクト": "60日(約款所定の八大疾病(注)を直接の原因とする場合は日数無制限)",
        "入院一時金保険": "ー",
        "メディカルKit NEO": "60日",
        "新しい形の医療保険 REASON": "60日",
        "新メディフィット リターン": "60日",
        "メディカルKit R": "60日",
        "楽天生命スーパー医療保険 戻るんです": "60日",
        "死亡保障付医療保険Relief W [リリーフ・ダブル]": "60日(七大生活習慣病は120日)",
        "健康をサポートする医療保険　健康のお守り": "60日"
      }
      const text = map[p.productName] ?? "-"
      return <span className="whitespace-pre-line">{text}</span>
    } },
    // CSV(24/28行目相当)の通算支払い限度日数
    { key: "hLimitTotal", group: "入院", label: "通算支払い限度日数", align: "center", render: (p) => {
      const map: Record<string, string> = {
        "はなさく医療": "1,095日。３大疾病で入院した場合は支払日数無制限で保障します。",
        "医療保険CURE Next[キュア・ネクスト]": "1,000日（三大疾病は無制限）",
        "CURE Next": "1,000日（三大疾病は無制限）",
        "終身医療保険プレミアムZ": "1,095日",
        "なないろメディカル礎": "1,000日（所定の３大疾病の場合、日数無制限）",
        "新メディフィットＡ(エース)ライトプラン(25)": "1095日",
        "楽天生命スーパー医療保険": "1,095日",
        "SBI生命の終身医療保険Neo": "1,095日",
        "じぶんへの保険3": "1,095日",
        "FWD医療Ⅱ": "病気・ケガそれぞれ1,095日",
        "死亡保障付医療保険Relief W [リリーフ・ダブル]": "通算1,000日（七大生活習慣病入院給付金、疾病入院給付金、災害入院給付金）",
        "じぶんへの保険Z": "1,095日（更新後の保険期間も含む）",
        "入院一時金保険": "ー",
        "楽天生命スーパー医療保険 戻るんです": "1,095日",
        "&LIFE 医療保険A（エース）セレクト": "1,095日(約款所定の八大疾病(注)を直接の原因とする場合は日数無制限)",
        "&LIFE 医療保険A セレクト": "1,095日(約款所定の八大疾病(注)を直接の原因とする場合は日数無制限)",
        "ネオdeいりょう": "ケガ・病気それぞれ1,095日",
        "メディカルKit NEO": "1,095日",
        "メディカルKit R": "1,095日",
        "健康をサポートする医療保険　健康のお守り": "病気･ケガでそれぞれ通算1,000日(がん(上皮内がん含む)･心疾患･脳血管疾患による入院の場合は通算日数無制限)",
        "新しい形の医療保険 REASON": "1,095日",
        "新メディフィット リターン": "1095日"
      }
      return map[p.productName] ?? "-"
    } },
    // CSV(35行目)の通院
    { key: "outpatient", label: "通院", align: "center", render: (p) => {
      const map: Record<string, string> = {
        "新しい形の医療保険 REASON": "1日につき5,000円"
      }
      return map[p.productName] ?? "ー"
    } },
    // CSV(36行目)の退院
    { key: "discharge", label: "退院", align: "center", render: () => "ー" },
    {
      key: "advancedMedical",
      label: "先進医療",
      align: "center",
      render: (p) => <span className="whitespace-pre-line">{getAdvancedMedicalCell(p.productName)}</span>
    },
    {
      key: "otherBenefits",
      label: "その他の保障",
      align: "center",
      render: (p) => {
        // CSV 48〜51行を統合
        const rows: string[] = [
          'その他の保障,,ー,ー,【放射線治療給付金】,ー,ー,【放射線治療給付金】,【放射線治療給付金】,ー,ー,ー,ー,入院一時金　1回につき　10万円（日帰り入院から保障）※入院一時金保険において、入院一時金の支払事由に該当する入院を2回以上した場合、入院一時金が支払われることとなった「最終の入院の退院日」の翌日からその日を含めて180日以内に開始した入院は継続する1回の入院とみなします。それぞれの入院の原因は問いません。,【放射線治療給付金】,ー,"患者申出療養：技術料と同額(先進医療給付金および患者申出療養給付金を合算して、通算2,000万円限度)",ー,ー,ー,治療給付金　1か月型※,主契約については、健康還付給付金支払日前に限り解約返戻金があります。',
          'その他の保障,,,,1回につき5万円（60日間に1回を限度),,,1回につき10万円（60日に1回を限度）,1回につき5万円,,,,,,1回につき10万円（60日に1回を限度）,,,,,,入院・入院中の手術・放射線治療・外来手術いずれかに該当した月ごとに1回10万円,＊解約返戻金(健康還付給付特則)について、詳しくは商品詳細ページをご参照ください。',
          'その他の保障,,,,【骨髄ドナー給付金】,,,【骨髄ドナー給付金】,,,,,,,【骨髄ドナー給付金】,,,,,,外来手術のみに該当した月の場合2.5万円,',
          'その他の保障,,,,5万円（回数無制限）,,,1回につき5万円,,,,,,,1回につき5万円,,,,,,※支払事由のうち、入院のみに該当した月は、1回の入院についての治療給付金をお支払いする月数に限度（1か月）があります。,',
        ]

        const colsFor = (line: string) => {
          // splitCsvLine は前段で定義済み
          const arr = splitCsvLine(line).map(s => s.replace(/^\"|\"$/g, '').trim())
          return arr
        }
        const all = rows.map(colsFor)

        const csvName = canonicalName(p.productName)
        const col = csvProductOrder.indexOf(csvName)
        if (col < 0) return "-"
        const vals: string[] = []
        for (const r of all) {
          const v = (r[2 + col] ?? '').trim()
          if (v && v !== 'ー') vals.push(v)
        }
        return <span className="whitespace-pre-line">{vals.length ? vals.join('\n') : 'ー'}</span>
      }
    },
    {
      key: "deathDisability",
      label: "死亡・高度障害",
      align: "center",
      render: (p) => {
        const rows: string[] = [
          '死亡・高度障害,,ー,ー,ー,ー,ー,ー,ー,ー,ー,250万円,ー,ー,ー,ー,ー,ー,ー,ー,ー,主契約については、健康還付給付金支払日前に限り死亡保険金があります。',
          '死亡・高度障害,,,,,,,,,,,※高度障害保険金はありません。,,,,,,,,,,＊死亡保険金(健康還付給付特則)について、詳しくは商品詳細ページをご参照ください。'
        ]
        const csvName = canonicalName(p.productName)
        const col = csvProductOrder.indexOf(csvName)
        if (col < 0) return "-"
        const vals: string[] = []
        for (const line of rows) {
          const cols = splitCsvLine(line)
          const raw = (cols[2 + col] ?? '').trim()
          const val = raw.replace(/^\"|\"$/g, '').trim()
          if (val && val !== 'ー') vals.push(val)
        }
        return <span className="whitespace-pre-line">{vals.length ? vals.join('\n') : 'ー'}</span>
      }
    },
    {
      key: "bonus",
      label: "ボーナス",
      align: "center",
      render: () => ""
    },
    { key: "savingBonus", group: "ボーナス", label: "（無事故）健康ボーナス", align: "center", render: (p) => (<span className="whitespace-pre-line">{getSavingBonusCell(p.productName)}</span>) },
    { key: "bonusSaving", group: "ボーナス", label: "積立ボーナス", align: "center", render: () => "ー" },
    {
      key: "riders",
      label: "特約",
      align: "center",
      render: () => ""
    },
    {
      key: "includedRiders",
      label: "プランに含まれている特約・特則",
      align: "center",
      render: (p) => {
        const line = 'プランに含まれている特約・特則,,先進医療特約、3大疾病入院支払日数無制限特則,先進医療特約(2018)、七大生活習慣病入院給付特則（三大疾病無制限型）,先進医療・患者申出療養特約,先進医療・患者申出療養特約、３大疾病入院延長特則,先進医療・患者申出療養特約(21),先進医療特約2018,先進医療特約(2022),ー,先進医療特約,先進医療特約(2018),ー,ー,健康還付特則/先進医療特約2018,先進医療特約（無解約返戻金型）、八大疾病入院無制限給付特則、初期入院10日給付特則,先進医療・患者申出療養特約、手術保障特則,先進医療特約、通院特約、特定疾病保険料払込免除特則,健康還付特則,医療用新先進医療特約,総合先進医療特約,特定３疾病入院無制限給付特則、健康還付給付特則'
        const cols = splitCsvLine(line).map(s => s.replace(/^\"|\"$/g, '').trim())
        const csvName = canonicalName(p.productName)
        const idx = csvProductOrder.indexOf(csvName)
        if (idx < 0) return "-"
        const val = (cols[2 + idx] ?? '').trim()
        return val && val !== 'ー' ? <span className="whitespace-pre-line">{val}</span> : "ー"
      }
    },
    {
      key: "optionalRiders",
      label: "その他付帯できる特約・特則",
      align: "center",
      render: (p) => {
        const rows: string[] = [
          'その他付帯できる特約・特則,,8大疾病入院支払日数無制限特則、終身死亡保障特則、入院一時給付特約(23)、女性疾病入院一時給付特約(23)、女性医療特約(23)、退院後通院特約、特定疾病一時給付特約(22)、がん一時給付特約(22)、抗がん剤 ・ホルモン剤治療特約(22)、特定損傷特約、保険料払込免除特約、女性がん早期発見サポート特約、障害・介護一時給付特約,通院治療支援特約(退院時一時金給付型) 、がん一時金特約 、がん通院特約 、特定三疾病一時金特約 、入院一時金特約 、終身保険特約(無解約払戻金型)(医療保険(2022)用) 、特定三疾病保険料払込免除特則,入院一時金特約(Z02)、特定疾病延長入院特約、8大疾病延長入院特約、ストレス性疾病延長入院特約(Z03)、退院後通院特約(Z03)、終身保険特約（Z03)、特定疾病保険料払込免除特約(Z02)、特定疾病一時金特約（Z02）、女性総合疾病特約（Z02）、健康還付給付金特約等,通院一時金特約(2022)、がん診断一時金特約(2024)、がん治療特約(2022)、特定疾病保険料払込免除特則、3大疾病一時金特約(2024)、８大疾病入院延長特則、終身死亡特約、女性医療特約、女性特定疾病一時金特約(入院)、女性特定疾病一時金特約(通院)、骨折特約,初期入院10 日給付特則、特定３疾病入院無制限給付特則、８大生活習慣病入院無制限給付特則、外来手術増額特則、 入院一時給付特約(20)、通院治療特約(23)、８大生活習慣病入院特約(20)、女性医療特約(20)、特定女性疾病通院治療特約、特定３疾病一時給付特約(25)、がん診断特約(25)、薬剤治療特約(21)、がん自由診療特約、特定３疾病保険料払込免除特約(25)、がん・介護保険料払込免除特約、損傷特約、継続入院・在宅療養収入サポート特約、終身保険特約(低解約返戻金型)、介護保障付終身保険特約(低解約返戻金型),8疾病入院支払限度拡大特則/入院一時金特約（払戻金なし）/通院特約/がん特約/急性心筋梗塞・脳卒中特約,３大疾病保険料払込免除特約、終身入院一時給付金特約、終身３大疾病一時給付金特約、終身女性疾病特約、終身通院特約、終身在宅医療特約、８大疾病支払日数限度無制限特則,ー,特定３大疾病・骨折入院延長特則、特定８大疾病・骨折入院延長特則 、入院一時金特約Ⅱ、通院特約Ⅱ、女性総合医療特約Ⅱ、特定３大疾病保険料払込免除特約Ⅲ、特定３大疾病給付金特約Ⅲ、がん診断給付金特約Ⅱ、抗がん剤治療給付金特約Ⅱ、自由診療抗がん剤治療特約（医療）Ⅱ、特定損傷特約Ⅱ、終身死亡保障特約（低解約返戻金型）、健康給付金特則,ー,ー,女性入院一時金保険 、生活習慣病入院一時金保険 、災害入院一時金保険 、手術保障保険 、先進医療保険 、他,8疾病入院支払限度拡大特則/通院特約/がん特約/急性心筋梗塞・脳卒中特約,女性疾病給付特約(無解約返戻金型)(18)、抗ガン剤治療給付特約(無解約返戻金型)(18)、三大疾病入院一時給付特約(無解約返戻金型)(18)、女性サポート給付金付ガン診断給付特約、通院給付特約(無解約返戻金型)(18) 、ガン診断給付特約(無解約返戻金型)(18) 、ガン治療通院給付特約(無解約返戻金型) 、保険料払込免除特約(22)、入院一時給付特約 (無解約返戻金型)(22),短期入院10日給付特則、三大疾病支払日数限度無制限特則、八大疾病支払日数限度無制限特則、死亡保障特則、入院一時給付特約、がん診断特約(2023)、抗がん剤治療特約、自費診療保障上乗せ型がん治療特約、生活習慣病重症化予防特約(71歳～85歳の方は付加できません)、三大疾病一時給付特約(2023)、保険料払込免除特約(2021)、女性疾病保障特約、女性特定手術・乳房再建保障特則、通院特約、特定損傷特約(０歳～19歳、71歳～85歳の方は付加できません) 、治療保障特約　,重度５疾病・障害・重度介護保障特約、女性疾病保障特約、３大疾病入院支払日数無制限特約,先進医療特約、通院特約、女性疾病保障特約、がん診断特約、悪性新生物初回診断特約、抗がん剤治療特約、特定治療支援特約、3大疾病入院支払日数無制限特約、特定疾病保険料払込免除特則、手術給付金の追加払に関する特約、特定損傷一時金特約、重度5疾病・障害・重度介護保障特約、特定損傷一時金特約(超保険専用)等,ー,三大疾病保険料払込免除特約、三大疾病一時金特約、三大疾病無制限治療特約、三大疾病無制限入院特約、ケガの特約、終身特約、健康祝金特則、女性疾病入院特約、女性特定手術特約,先進医療・患者申出療養特約(21)、入院一時給付特約(20)、通院治療特約(23)、８大生活習慣病入院特約(20)、女性医療特約(20)、特定女性疾病通院治療特約、特定３疾病一時給付特約(25)、がん診断特約(25)、薬剤治療特約(21)、がん自由診療特約、損傷特約、継続入院・在宅療養収入サポート特約'
          , 'その他付帯できる特約・特則,,,,,※申込方法によって異なります。,,,,,※申込方法によって異なります。,,,,,,※特約・特則を付加・適用することで、保険料は変動します。,,,,,'
        ]
        const csvName = canonicalName(p.productName)
        const idx = csvProductOrder.indexOf(csvName)
        if (idx < 0) return "-"
        const vals: string[] = []
        for (const line of rows) {
          const cols = splitCsvLine(line)
          const raw = (cols[2 + idx] ?? '').trim()
          const val = raw.replace(/^\"|\"$/g, '').trim()
          if (val && val !== 'ー') vals.push(val)
        }
        return <span className="whitespace-pre-line">{vals.length ? vals.join('\n') : 'ー'}</span>
      }
    },
    {
      key: "otherInfo",
      label: "その他の情報",
      align: "center",
      render: () => "ー"
    },
    {
      key: "ageRange",
      label: "加入年齢",
      align: "center",
      render: (p) => (<span className="whitespace-pre-line">{getEntryAgeCell(p.productName)}</span>)
    },
    {
      key: "applicationMethod",
      label: "申込方法",
      align: "center",
      render: (p) => (<span className="whitespace-pre-line">{getApplicationMethodCell(p.productName)}</span>)
    },
    {
      key: "notes",
      label: "備考",
      align: "center",
      render: (p) => {
        const rows: string[] = [
          '備考,,ー,※ネット申込は20歳以上となります。,－,ー,＊８大生活習慣病：がん、心疾患、脳血管疾患、糖尿病、高血圧性疾患、肝疾患、膵疾患、腎疾患,楽天生命では、月々の保険料払込みで楽天ポイントを受取ることが可能です（ご契約時の楽天ID連携で1％、楽天カードで保険料お支払いで1％）。また、楽天ポイントで保険料の払込みができます。,ー,ー,※このページでご案内している内容はインターネットによるお申込みを前提としています。申込方法により付加できる特約・特則や選択できる給付金額等が異なる場合があります。,※ネット申込は20歳以上となります。,ー,・各入院一時金の支払限度は、保険期間を通算してそれぞれ20回とします。ただし、3大疾病（がん・急性心筋梗塞・脳卒中）を直接の原因として入院一時金が支払われる場合の支払回数については、支払限度には含めません。,楽天生命では、月々の保険料払込みで楽天ポイントを受取ることが可能です（ご契約時の楽天ID連携で1％、楽天カードで保険料お支払いで1％）。また、楽天ポイントで保険料の払込みができます。,(注)八大疾病とは、約款所定の以下の病気をいいます。〈ガン(上皮内ガンを含む)、心疾患、脳血管疾患、高血圧性疾患・大動脈瘤等、糖尿病、肝疾患、腎疾患、膵疾患〉,インターネットでのお申し込みの場合、払込方法はクレジットカードに限ります。,ー,ー,・責任開始日前および責任開始日からその日を含めて14日目までの期間中に発病した､所定の感染症を直接の原因として入院した場合には､疾病入院給付金をお支払いできません｡対象となる感染症は､引受保険会社公式ウェブサイトをご覧ください｡,ご希望により、記載以外の金額を設定することができます,＊８大生活習慣病：がん、心疾患、脳血管疾患、糖尿病、高血圧性疾患、肝疾患、膵疾患、腎疾患',
          '備考,,,,,,＊特定３疾病：がん、心疾患、脳血管疾患,※ポイント進呈およびポイント利用には一定の条件があります。,,,,,,・災害入院一時金保険はお支払回数が通算限度に達した場合、消滅します。,※ポイント進呈およびポイント利用には一定の条件があります。,,被保険者の年齢が20歳未満の場合、健康保険料率の適用はありません。,,,・対面と通販では､取扱可能なプランが異なります｡,,【主契約】',
          '備考,,,,,,【主契約】,※楽天カード利用ポイントについては、楽天カード株式会社へご確認ください。この取扱いは、楽天カード株式会社が行うプログラムです。,,,,,,・入院一時金保険は、責任開始日から起算して14日を経過する前に発病した約款に定める感染症（責任開始日時点の感染症予防法に定める新型インフルエンザ 等感染症・指定感染症・新感染症）については保障しません。,※楽天カード利用ポイントについては、楽天カード株式会社へご確認ください。この取扱いは、楽天カード株式会社が行うプログラムです。,,,,,,,・所定の高度障害状態になられたとき、または不慮の事故による傷害により、その事故の日からその日を含めて180日以内に所定の障害状態になられたとき、以後の保険料のお払込みを免除します。',
          '備考,,,,,,・所定の高度障害状態になられたとき、または不慮の事故による傷害により、その事故の日からその日を含めて180日以内に所定の障害状態になられたとき、以後の保険料のお払込みを免除します。,,,,,,,・睡眠時無呼吸の診断・検査等のための入院は、入院日数が2日以内、かつ、睡眠時無呼吸と医師により診断されなかった場合はお支払いの対象とはなりません。,,,,,,,'
        ]
        const csvName = canonicalName(p.productName)
        const col = csvProductOrder.indexOf(csvName)
        if (col < 0) return "-"
        const vals: string[] = []
        for (const line of rows) {
          const cols = splitCsvLine(line)
          const raw = (cols[2 + col] ?? '').trim()
          const val = raw.replace(/^\"|\"$/g, '').trim()
          if (val && val !== 'ー') vals.push(val)
        }
        return <span className="whitespace-pre-line">{vals.length ? vals.join('\n') : 'ー'}</span>
      }
    },
    {
      key: "planNameOrCoverage",
      label: "プラン名または保障内容",
      align: "center",
      render: (p) => (<span className="whitespace-pre-line">{getPlanNameOrCoverageCell(p.productName)}</span>)
    },
    // 募集文書番号 行は非表示化
    {
      key: "apply",
      label: "見積り・申込み",
      align: "center",
      render: (p) => (
        <a href={p.applyUrl ?? "#"} className="inline-block rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">見積・申込</a>
      )
    },
    {
      key: "brochure",
      label: "資料請求",
      align: "center",
      render: (p) => (
        <a href={p.brochureUrl ?? "#"} className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50">資料請求</a>
      )
    },
    {
      key: "campaign",
      label: "期間限定キャンペーン",
      align: "center",
      render: (p) => <span className="text-caption text-blue-600 underline cursor-pointer">{p.campaign ?? "-"}</span>
    }
  ]

  // 表示順をサイトの項目順にハードコード
  const labelOrder: string[] = [
    "ランキング",
    "保険会社名",
    "AI診断",
    "商品名",
    "月払い保険料",
    "見積り・申込み",
    "資料請求",
    "期間限定キャンペーン",
    "特徴タグ",
    "保障内容",
    "保険期間",
    "保険料",
    "払込期間",
    "払込方法（経路）",
    "払込方法（回数）",
    "入院",
    "入院日額",
    "１入院の限度日数",
    "通算支払い限度日数",
    "手術",
    "通院",
    "退院",
    "先進医療",
    "その他の保障",
    "死亡・高度障害",
    "ボーナス",
    "（無事故）健康ボーナス",
    "積立ボーナス",
    "特約",
    "プランに含まれている特約・特則",
    "その他付帯できる特約・特則",
    "その他の情報",
    "加入年齢",
    "申込方法",
    "備考",
    "プラン名または保障内容"
  ]

  const rowByLabel = new Map(rows.map(r => [r.label, r]))
  const orderedRows = labelOrder.map(l => rowByLabel.get(l)).filter(Boolean) as typeof rows

  // セクション単体行を除外
  const filteredRows = orderedRows.filter(r => !(!r.group && (r.label === "保険料" || r.label === "入院" || r.label === "ボーナス")))
  // グループの縦結合情報
  const withSpan = filteredRows.map((r, i, arr) => {
    if (!r.group) return { r, isHead: false, span: 1 }
    const prev = i > 0 ? arr[i - 1] : undefined
    const isHead = !prev || prev.group !== r.group
    if (!isHead) return { r, isHead: false, span: 0 }
    let span = 1
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].group === r.group) span++
      else break
    }
    return { r, isHead: true, span }
  })

  // データソース生成
  const dataSource = withSpan.map((info, rowIdx) => {
    const rec: any = {
      key: info.r.key,
      item: info.r.group ? info.r.group : info.r.label,
      detail: info.r.group ? info.r.label : "",
      _group: info.r.group,
      _isHead: info.isHead,
      _span: info.span,
      _rowIndex: rowIdx,
      _label: info.r.label
    }
    products.forEach((p, idx) => {
      rec[p.productId] = info.r.render(p, idx)
    })
    return rec
  })

  // カラム定義
  const filteredProducts = Array.isArray(visibleProductIds) && visibleProductIds.length > 0
    ? products.filter(p => visibleProductIds.includes(p.productId))
    : products

  const columns: ColumnsType<any> = [
    {
      title: (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(Array.isArray(visibleProductIds) && visibleProductIds.length > 0) ? onResetVisible : onCompareSelected}
            className="inline-flex items-center gap-2 border border-blue-300 rounded-xl px-3 py-1 bg-white hover:bg-blue-50 shadow-sm"
          >
            <span className="w-5 h-5 rounded-sm bg-blue-600 text-white inline-flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <span className="text-blue-600 font-semibold text-sm">
              {(Array.isArray(visibleProductIds) && visibleProductIds.length > 0) ? 'すべての商品を表示する' : 'チェックした商品を比較'}
            </span>
          </button>
        </div>
      ),
      dataIndex: "item",
      key: "item",
      width: 36,
      fixed: "left",
      onHeaderCell: () => ({ colSpan: 2 }) as any,
      onCell: (record: any) => {
        if (record._group) {
          return record._isHead
            ? { rowSpan: record._span, colSpan: 1, className: "first-col-cell vertical-group-cell", style: { textAlign: "center", verticalAlign: "middle" } }
            : { rowSpan: 0, colSpan: 1, className: "first-col-cell" }
        }
        return { colSpan: 2, rowSpan: 1, className: "first-col-cell" }
      },
      render: (value: string, record: any) => (
        <span className={record._group ? "" : "text-slate-600"}>{value}</span>
      )
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      width: 200,
      fixed: "left",
      onHeaderCell: () => ({ colSpan: 0 }) as any,
      onCell: (record: any) => {
        if (record._group) return { colSpan: 1 }
        return { colSpan: 0 }
      },
      render: (value: string) => (
        <span className="text-slate-700">{value}</span>
      )
    },
    {
      title: (
        <div className="w-full flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-base font-semibold text-slate-700">AI診断</span>
          {aiCriteria && (
            <span className="ml-1 px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px]">
              適用中
            </span>
          )}
        </div>
      ),
      dataIndex: "_ai",
      key: "_ai",
      width: 180,
      fixed: "left",
      render: (_: any, record: any) => {
        const label: string = record._label
        if (!aiCriteria) return <span className="text-caption text-slate-400">-</span>
        const chips: string[] = []
        const push = (text: string) => { if (!chips.includes(text)) chips.push(text) }
        switch (label) {
          case "先進医療":
            if (aiCriteria.needsAdvancedMedical) push("推奨")
            break
          case "通院":
            if (aiCriteria.wantsOutpatient) push("推奨")
            break
          case "手術":
            if (aiCriteria.preferHighMultiplier) push("高倍率推奨")
            break
          case "死亡・高度障害":
            if (aiCriteria.requireDeathBenefit) push("必要")
            break
          case "（無事故）健康ボーナス":
            if (aiCriteria.preferHealthBonus) push("推奨")
            break
          case "払込方法（経路）":
            if (Array.isArray(aiCriteria.preferredPaymentRoutes) && aiCriteria.preferredPaymentRoutes.length > 0) {
              const map: Record<string, string> = { account: "口座振替", creditCard: "クレジットカード" }
              aiCriteria.preferredPaymentRoutes.forEach((r: string) => push(map[r] ?? r))
            }
            break
          case "払込方法（回数）":
            if (Array.isArray(aiCriteria.preferredPaymentFrequencies) && aiCriteria.preferredPaymentFrequencies.length > 0) {
              const map: Record<string, string> = { monthly: "月払", semiannual: "半年払", annual: "年払" }
              aiCriteria.preferredPaymentFrequencies.forEach((f: string) => push(map[f] ?? f))
            }
            break
          case "入院日額":
            if (typeof aiCriteria.hospitalizationDailyAmount === 'number') {
              push(`${aiCriteria.hospitalizationDailyAmount.toLocaleString()}円/日`)
            }
            break
          case "１入院の限度日数":
            if (aiCriteria.preferLongHospitalizationLimit) push("長期志向")
            break
          case "保険期間":
            if (aiCriteria.policyPeriodPreference === 'whole') push("終身")
            if (aiCriteria.policyPeriodPreference === 'term') push("定期")
            break
          case "プランに含まれている特約・特則":
            if (Array.isArray(aiCriteria.requiredIncludedRiderKeywords) && aiCriteria.requiredIncludedRiderKeywords.length > 0) {
              aiCriteria.requiredIncludedRiderKeywords.forEach((k: string) => push(k))
            }
            break
          default:
            break
        }
        if (chips.length === 0) return <span className="text-caption text-slate-400">-</span>
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {chips.map((t: string) => (
              <span key={t} className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-caption text-emerald-700">{t}</span>
            ))}
          </div>
        )
      }
    },
    ...filteredProducts.map((p) => ({
      title: (
        <input
          type="checkbox"
          className="accent-blue-600 scale-150"
          style={{ transformOrigin: "center" }}
          checked={selectedIds.includes(p.productId)}
          onChange={() => onToggle(p.productId)}
          aria-label={`${p.productName} を選択`}
        />
      ),
      dataIndex: p.productId,
      key: p.productId,
      align: "center" as const,
      width: 208
    }))
  ]

  // 上部固定領域（期間限定キャンペーンまで）とスクロール領域に分割
  const cutIndex = Math.max(0, dataSource.findIndex((r: any) => r._label === "期間限定キャンペーン"))
  const stickyTopRows = cutIndex >= 0 ? dataSource.slice(0, cutIndex + 1) : []
  const scrollingRows = cutIndex >= 0 ? dataSource.slice(cutIndex + 1) : dataSource

  // 横スクロール同期用（上部カスタムスクロールバー ⇄ 下段テーブル）
  const topRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const topScrollRef = useRef<HTMLDivElement | null>(null)
  const topScrollInnerRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [spacerHeight, setSpacerHeight] = useState<number>(0)
  const stickyWrapRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const getScrollEl = (wrap: HTMLDivElement | null): HTMLDivElement | null => {
      if (!wrap) return null
      return (
        wrap.querySelector('.ant-table-body') as HTMLDivElement | null ??
        wrap.querySelector('.ant-table-content') as HTMLDivElement | null
      )
    }
    const topBody = getScrollEl(topRef.current)
    const bottomBody = getScrollEl(bottomRef.current)
    if (!topBody || !bottomBody) return
    // 上部/下部のネイティブ横スクロールは隠し、カスタム上部バーを使用
    topBody.style.overflowX = 'hidden'
    bottomBody.style.overflowX = 'hidden'

    const topScroll = topScrollRef.current
    const topInner = topScrollInnerRef.current
    if (!topScroll || !topInner) return

    const syncWidth = () => {
      const width = Math.max(bottomBody.scrollWidth, bottomBody.clientWidth)
      topInner.style.width = `${width}px`
    }
    syncWidth()
    let syncing = false
    const onBottom = () => {
      if (syncing) return
      syncing = true
      topScroll.scrollLeft = bottomBody.scrollLeft
      topBody.scrollLeft = bottomBody.scrollLeft
      syncing = false
    }
    const onTopScroll = () => {
      if (syncing) return
      syncing = true
      bottomBody.scrollLeft = topScroll.scrollLeft
      topBody.scrollLeft = topScroll.scrollLeft
      syncing = false
    }
    bottomBody.addEventListener('scroll', onBottom)
    topScroll.addEventListener('scroll', onTopScroll)
    return () => {
      bottomBody.removeEventListener('scroll', onBottom)
      topScroll.removeEventListener('scroll', onTopScroll)
    }
  }, [products.length])

  // 表ボディの高さ分だけページ末尾に余白を作る（スクロール連結用）
  useEffect(() => {
    const getBodyEl = (wrap: HTMLDivElement | null): HTMLDivElement | null => {
      if (!wrap) return null
      return (
        (wrap.querySelector('.ant-table-body') as HTMLDivElement | null) ??
        (wrap.querySelector('.ant-table-content') as HTMLDivElement | null)
      )
    }

    const measure = () => {
      const bodyEl = getBodyEl(bottomRef.current)
      if (!bodyEl) return
      // 縦スクロールバー非表示
      bodyEl.classList.add('hide-y-scrollbar')
      const h = Math.max(0, bodyEl.scrollHeight - bodyEl.clientHeight)
      setSpacerHeight(h)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [products.length, spacerHeight])

  const bodyHeight = 520

  // ホイール操作の委譲
  useEffect(() => {
    const getBody = (wrap: HTMLDivElement | null): HTMLDivElement | null => {
      if (!wrap) return null
      return (
        (wrap.querySelector('.ant-table-body') as HTMLDivElement | null) ??
        (wrap.querySelector('.ant-table-content') as HTMLDivElement | null)
      )
    }
    const container = sectionRef.current
    const bodyEl = getBody(bottomRef.current)
    if (!container || !bodyEl) return
    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect()
      const viewportH = window.innerHeight || document.documentElement.clientHeight
      const delta = e.deltaY
      const atTop = bodyEl.scrollTop <= 0
      const atBottom = Math.ceil(bodyEl.scrollTop + bodyEl.clientHeight) >= bodyEl.scrollHeight
      const topDocked = rect.top <= 0 + 1   // 表上部がビューポート上端に到達
      const bottomDocked = rect.bottom <= viewportH + 1 // 表下部がビューポート下端に到達

      if (delta > 0) {
        // 下方向: 表上部がTOPに到達していて、まだテーブル内部に余白があるときだけ委譲
        if (topDocked && !atBottom) {
          e.preventDefault()
          bodyEl.scrollTop += delta
        }
      } else if (delta < 0) {
        // 上方向: 表上部がTOPに到達しており、テーブル内部に上方向の余白がある場合のみ委譲
        if (topDocked && !atTop) {
          e.preventDefault()
          bodyEl.scrollTop += delta
        }
      }
    }
    window.addEventListener('wheel', onWheel as any, { passive: false })
    return () => window.removeEventListener('wheel', onWheel as any)
  }, [products.length])

  return (
    <>
    {/* スティッキーな上部（横スクロールバー + 固定行） */}
    <div ref={stickyWrapRef} className="sticky top-0 z-40 bg-white border-b border-semantic-border">
      <div className="w-full">
        <div ref={topScrollRef} className="top-scrollbar overflow-x-auto border-b border-semantic-border" style={{ height: 14 }}>
          <div ref={topScrollInnerRef} style={{ height: 1 }} />
        </div>
        <div ref={topRef} className="w-full fixed-top-table">
          <Table
            bordered
            size="small"
            rowKey="key"
            columns={columns}
            dataSource={stickyTopRows}
            pagination={false}
            scroll={{ x: "max-content" }}
            tableLayout="fixed"
            style={{ width: "max-content" }}
            className="text-body"
          />
        </div>
      </div>
    </div>

    {/* 可変行コンテナ */}
    <div ref={sectionRef} className="w-full rounded-xl border border-semantic-border bg-white shadow-sm">
      <div ref={bottomRef} className="w-full">
        <Table
          bordered
          size="small"
          rowKey="key"
          columns={columns}
          dataSource={scrollingRows}
          pagination={false}
          showHeader={false}
          scroll={{ x: "max-content" }}
          tableLayout="fixed"
          style={{ width: "max-content" }}
          className="text-body"
        />
      </div>
    </div>
    {/* スクロール用の不可視スペーサ（コンテナ外に配置） */}
    <div aria-hidden style={{ height: `${spacerHeight}px` }} />
    </>
  )
}

// カード表示は不要のため削除
