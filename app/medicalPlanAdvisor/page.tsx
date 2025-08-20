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

import { useMemo, useState } from "react"
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
  /** 入院日額 */
  const [dailyAmount, setDailyAmount] = useState<number>(10000)
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
    const byAmount = byAge.filter(p => p.hospitalizationCoverage.hospitalizationDailyAmount === dailyAmount)
    const base = byAmount.length > 0 ? byAmount : byAge
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
        <h1 className="text-h1 font-semibold text-semantic-fg mb-4">医療保険 比較シミュレーション（デモ）</h1>
        <p className="text-body text-semantic-fg-subtle mb-8">年齢・性別・入院日額を選択して、デモ用カタログから商品を比較します。</p>

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
          onToggleAll={(checked) => setSelectedIds(checked ? filteredAndSorted.map((p) => p.productId) : [])}
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
  /** 入院日額 */
  dailyAmount: number
  /** 並び替え */
  sortKey: "popularity" | "premiumAsc"
  /** 年齢変更ハンドラ */
  onChangeAge: (value: number) => void
  /** 性別変更ハンドラ */
  onChangeGender: (value: Gender) => void
  /** 入院日額変更ハンドラ */
  onChangeDailyAmount: (value: number) => void
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
            value={dailyAmount}
            onChange={(e) => onChangeDailyAmount(Number(e.target.value))}
          >
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
  onToggle,
  onToggleAll
}: {
  products: Product[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onToggleAll: (checked: boolean) => void
}): JSX.Element {
  const allChecked = products.length > 0 && products.every((p) => selectedIds.includes(p.productId))
  return (
    <div className="rounded-lg border border-semantic-border overflow-x-auto bg-semantic-bg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-semantic-border">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => onToggleAll(e.target.checked)}
            aria-label="全選択"
          />
          <span className="text-body text-semantic-fg-subtle">チェックした商品を比較（{selectedIds.length}）</span>
        </div>
        <button className="border border-semantic-border rounded-md px-3 py-1 text-caption" disabled={selectedIds.length < 2}>比較する</button>
      </div>
      <table className="min-w-full text-left">
        <thead className="text-caption text-semantic-fg-subtle">
          <tr>
            <th className="px-4 py-3 w-10"></th>
            <th className="px-4 py-3">ランキング</th>
            <th className="px-4 py-3">保険会社名</th>
            <th className="px-4 py-3">商品</th>
            <th className="px-4 py-3">月払い保険料</th>
            <th className="px-4 py-3">手術給付</th>
            <th className="px-4 py-3">入院日額</th>
            <th className="px-4 py-3">1入院限度</th>
            <th className="px-4 py-3">通算限度</th>
            <th className="px-4 py-3">通院</th>
            <th className="px-4 py-3">特約</th>
            <th className="px-4 py-3">見積・申込</th>
            <th className="px-4 py-3">資料請求</th>
            <th className="px-4 py-3">実施状況</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-semantic-border text-body">
          {products.map((p, idx) => {
            const checked = selectedIds.includes(p.productId)
            return (
              <tr key={p.productId} className="align-middle">
                <td className="px-4 py-4">
                  <input type="checkbox" checked={checked} onChange={() => onToggle(p.productId)} aria-label={`${p.productName} を選択`} />
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1"><span className="text-h4 text-semantic-fg">{idx + 1}</span><span className="text-caption text-semantic-fg-subtle">位</span></span>
                </td>
                <td className="px-4 py-4">{p.insurerName}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-semantic-bg border border-semantic-border flex items-center justify-center text-caption text-semantic-fg-subtle">{p.logoText ?? "-"}</div>
                    <div>
                      <div className="text-body text-semantic-fg">{p.productName}</div>
                      <div className="text-caption text-semantic-fg-subtle">{p.policyType === "wholeLife" ? "終身" : "定期"}・{p.renewalType === "renewable" ? "更新型" : "非更新"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-h3 text-semantic-fg">¥{p.premiumInfo.sampleMonthlyPremium.toLocaleString()}</span>
                  <span className="text-caption text-semantic-fg-subtle ml-1">/月払</span>
                </td>
                <td className="px-4 py-4">{p.surgeryCoverage.surgeryPaymentMethod === "multiplier" ? "倍率" : "定額"}</td>
                <td className="px-4 py-4">{p.hospitalizationCoverage.hospitalizationDailyAmount.toLocaleString()}円</td>
                <td className="px-4 py-4">{p.hospitalizationCoverage.hospitalizationLimitPerHospitalization}</td>
                <td className="px-4 py-4">{p.hospitalizationCoverage.hospitalizationLimitTotal}</td>
                <td className="px-4 py-4">{p.outpatientCoverage?.outpatientDailyAmount ? `${p.outpatientCoverage.outpatientDailyAmount.toLocaleString()}円` : "-"}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags ?? []).slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded border border-semantic-border text-caption text-semantic-fg-subtle">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <a href={p.applyUrl ?? "#"} className="inline-block border border-semantic-border rounded-md px-4 py-2">見積・申込</a>
                </td>
                <td className="px-4 py-4">
                  <a href={p.brochureUrl ?? "#"} className="inline-flex items-center gap-2 border border-semantic-border rounded-md px-4 py-2">資料請求</a>
                </td>
                <td className="px-4 py-4">
                  <span className="text-caption text-semantic-fg-subtle">{p.campaign ?? "-"}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
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


