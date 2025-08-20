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
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Crown } from "lucide-react"
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

  return (
    <div className="min-h-screen bg-semantic-bg">
      <div className="container mx-auto px-4 py-16">
        {/* 条件フォーム */}
        <FilterForm
          age={age}
          gender={gender}
          dailyAmount={dailyAmount}
          sortKey={sortKey}
          onChangeAge={setAge}
          onChangeGender={setGender}
          onChangeDailyAmount={setDailyAmount}
          onChangeSortKey={setSortKey}
        />

        {/* 結果一覧 */}
        <ComparisonTable
          products={filteredAndSorted}
          selectedIds={selectedIds}
          onToggle={(id) =>
            setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
        />

        {/* 免責/注意 */}
        <Disclaimer />
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
    <div className="mb-8 rounded-lg border border-semantic-border p-6 bg-semantic-bg">
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
  onToggle
}: {
  products: Product[]
  selectedIds: string[]
  onToggle: (id: string) => void
}): JSX.Element {
  

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
    { key: "policy", label: "保険期間", align: "center", render: (p) => (p.policyType === "wholeLife" ? "終身" : "定期") },
    { key: "premium_section", label: "保険料", align: "center", render: () => "" },
    { key: "payingPeriod", group: "保険料", label: "払込期間", align: "center", render: (p) => formatPayingPeriod(p.payingPeriod) },
    { key: "paymentRoute", group: "保険料", label: "払込方法（経路）", align: "center", render: () => "-" },
    { key: "paymentFrequency", group: "保険料", label: "払込方法（回数）", align: "center", render: (p) => (p.paymentMode === "monthly" ? "月払" : p.paymentMode === "yearly" ? "年払" : "-") },
    { key: "premium", label: "月払い保険料", mergeLabelCols: true, align: "center", render: (p) => (<span className="inline-flex items-end"><span className="text-3xl font-bold leading-none text-rose-600">¥{p.premiumInfo.sampleMonthlyPremium.toLocaleString()}</span><span className="text-xs text-slate-500 ml-1 mb-0.5">/月払</span></span>) },
    { key: "section_hospitalization", label: "入院", render: () => "" },
    { key: "surgery", label: "手術", align: "center", render: (p) => (p.surgeryCoverage.surgeryPaymentMethod === "multiplier" ? "倍率" : "定額") },
    { key: "hAmount", group: "入院", label: "入院日額", align: "center", render: (p) => `${p.hospitalizationCoverage.hospitalizationDailyAmount.toLocaleString()}円` },
    { key: "hLimitPer", group: "入院", label: "１入院の限度日数", align: "center", render: (p) => p.hospitalizationCoverage.hospitalizationLimitPerHospitalization },
    { key: "hLimitTotal", group: "入院", label: "通算支払い限度日数", align: "center", render: (p) => p.hospitalizationCoverage.hospitalizationLimitTotal },
    { key: "outpatient", label: "通院", align: "center", render: (p) => (p.outpatientCoverage?.outpatientDailyAmount ? `${p.outpatientCoverage.outpatientDailyAmount.toLocaleString()}円` : "-") },
    { key: "discharge", label: "退院", align: "center", render: () => "-" },
    {
      key: "advancedMedical",
      label: "先進医療",
      align: "center",
      render: (p) => (p.riders?.advancedMedicalRider ? "あり" : "-")
    },
    {
      key: "otherBenefits",
      label: "その他の保障",
      align: "center",
      render: () => "-"
    },
    {
      key: "deathDisability",
      label: "死亡・高度障害",
      align: "center",
      render: () => "-"
    },
    {
      key: "bonus",
      label: "ボーナス",
      align: "center",
      render: () => ""
    },
    { key: "savingBonus", group: "ボーナス", label: "（無事故）健康ボーナス", align: "center", render: () => "-" },
    { key: "bonusSaving", group: "ボーナス", label: "積立ボーナス", align: "center", render: () => "-" },
    {
      key: "riders",
      label: "特約",
      align: "center",
      render: (p) => {
        const items = summarizeRiders(p.riders)
        if (items.length === 0) return "-"
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {items.slice(0, 8).map((t, i) => (
              <span key={t + i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-caption text-slate-600">{t}</span>
            ))}
          </div>
        )
      }
    },
    {
      key: "includedRiders",
      label: "プランに含まれている特約・特則",
      align: "center",
      render: () => "-"
    },
    {
      key: "optionalRiders",
      label: "その他付帯できる特約・特則",
      align: "center",
      render: () => "-"
    },
    {
      key: "otherInfo",
      label: "その他の情報",
      align: "center",
      render: () => ""
    },
    {
      key: "ageRange",
      label: "加入年齢",
      align: "center",
      render: (p) => `${p.entryAgeRange.min}歳〜${p.entryAgeRange.max}歳`
    },
    {
      key: "applicationMethod",
      label: "申込方法",
      align: "center",
      render: () => "-"
    },
    {
      key: "notes",
      label: "備考",
      align: "center",
      render: () => "-"
    },
    {
      key: "planNameOrCoverage",
      label: "プラン名または保障内容",
      align: "center",
      render: () => "-"
    },
    {
      key: "docNumber",
      label: "募集文書番号",
      align: "center",
      render: () => "-"
    },
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
    "プラン名または保障内容",
    "募集文書番号"
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
  const columns: ColumnsType<any> = [
    {
      title: "項目",
      dataIndex: "item",
      key: "item",
      width: 224,
      fixed: "left",
      onCell: (record: any) => {
        if (record._group) {
          return record._isHead ? { rowSpan: record._span, colSpan: 1 } : { rowSpan: 0, colSpan: 1 }
        }
        return { colSpan: 2, rowSpan: 1 }
      },
      render: (value: string) => (
        <span className="text-slate-600">{value}</span>
      )
    },
    {
      title: "項目詳細",
      dataIndex: "detail",
      key: "detail",
      width: 224,
      fixed: "left",
      onCell: (record: any) => {
        if (record._group) return { colSpan: 1 }
        return { colSpan: 0 }
      },
      render: (value: string) => (
        <span className="text-slate-700">{value}</span>
      )
    },
    ...products.map((p) => ({
      title: (
        <input
          type="checkbox"
          checked={selectedIds.includes(p.productId)}
          onChange={() => onToggle(p.productId)}
          aria-label={`${p.productName} を選択`}
        />
      ),
      dataIndex: p.productId,
      key: p.productId,
      align: "center" as const,
      width: 260
    }))
  ]

  // 上部固定領域（期間限定キャンペーンまで）とスクロール領域に分割
  const cutIndex = Math.max(0, dataSource.findIndex((r: any) => r._label === "期間限定キャンペーン"))
  const stickyTopRows = cutIndex >= 0 ? dataSource.slice(0, cutIndex + 1) : []
  const scrollingRows = cutIndex >= 0 ? dataSource.slice(cutIndex + 1) : dataSource

  // 横スクロール同期用
  const topRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
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
    // 上部はスクロールバーを出さない
    topBody.style.overflowX = 'hidden'
    let syncing = false
    const onBottom = () => {
      if (syncing) return
      syncing = true
      topBody.scrollLeft = bottomBody.scrollLeft
      syncing = false
    }
    bottomBody.addEventListener('scroll', onBottom)
    return () => {
      bottomBody.removeEventListener('scroll', onBottom)
    }
  }, [products.length])

  const bodyHeight = 520

  return (
    <div className="rounded-xl border border-semantic-border bg-white shadow-sm">
      <div ref={topRef} className="border-b border-semantic-border fixed-top-table">
        <Table
          bordered
          size="small"
          rowKey="key"
          columns={columns}
          dataSource={stickyTopRows}
          pagination={false}
          scroll={{ x: "max-content" }}
          className="text-body"
        />
      </div>
      <div ref={bottomRef}>
        <Table
          bordered
          size="small"
          rowKey="key"
          columns={columns}
          dataSource={scrollingRows}
          pagination={false}
          showHeader={false}
          scroll={{ x: "max-content", y: bodyHeight }}
          className="text-body"
        />
      </div>
    </div>
  )
}

// カード表示は不要のため削除

/**
 * 免責/注意文言
 * @returns {JSX.Element} 画面要素
 */
function Disclaimer(): JSX.Element {
  return (
    <div className="mt-10 text-caption text-semantic-fg-subtle space-y-1">
      <p>掲載している保険料および保障内容などはデモ用の一例です。条件により異なります。</p>
      <p>商品詳細は各保険会社の資料・約款等をご確認ください。本表示は募集資料ではありません。</p>
    </div>
  )
}


