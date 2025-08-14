/**
 * 医療保険選択サマリーコンポーネント
 * 
 * 選択された主契約と特約のサマリーを表示
 * 合計保険料の計算と表示を提供
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calculator } from "lucide-react"

/**
 * 主契約プランの型定義
 */
interface MainPlan {
  id: string
  name: string
  monthlyPremium: number
}

/**
 * 特約プランの型定義
 */
interface RiderPlan {
  id: string
  name: string
  monthlyPremium: number
}

/**
 * 選択サマリーのプロパティ型定義
 */
interface SelectionSummaryProps {
  /** 選択された主契約 */
  selectedMainPlan: MainPlan | null
  /** 選択された特約リスト */
  selectedRiders: RiderPlan[]
  /** 合計保険料 */
  totalPremium: number
}

/**
 * 医療保険選択サマリーコンポーネント
 * 
 * @param props 選択サマリーのプロパティ
 * @returns 選択サマリーのJSX要素
 */
export function SelectionSummary({
  selectedMainPlan,
  selectedRiders,
  totalPremium
}: SelectionSummaryProps) {
  return (
    <Card className="card-standard">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-h2 text-semantic-fg">
          <Calculator className="h-5 w-5 text-semantic-brand" />
          <span>選択内容</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 主契約 */}
        <div>
          <h4 className="font-medium text-caption text-semantic-fg-subtle mb-2">主契約</h4>
          {selectedMainPlan ? (
            <div className="p-3 rounded-lg border border-semantic-border bg-semantic-bg">
              <p className="font-semibold text-semantic-fg">
                {selectedMainPlan.name}
              </p>
              <p className="text-caption text-semantic-accent">
                ¥{selectedMainPlan.monthlyPremium.toLocaleString()}/月
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-semantic-border bg-semantic-bg">
              <p className="text-caption text-semantic-fg-subtle">未選択</p>
            </div>
          )}
        </div>

        {/* 特約 */}
        <div>
          <h4 className="font-medium text-caption text-semantic-fg-subtle mb-2">特約</h4>
          {selectedRiders.length > 0 ? (
            <div className="space-y-2">
              {selectedRiders.map((rider) => (
                <div key={rider.id} className="p-3 rounded-lg border border-semantic-border bg-semantic-bg">
                  <p className="font-semibold text-semantic-fg">{rider.name}</p>
                  <p className="text-caption text-semantic-success">
                    +¥{rider.monthlyPremium.toLocaleString()}/月
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-semantic-border bg-semantic-bg">
              <p className="text-caption text-semantic-fg-subtle">未選択</p>
            </div>
          )}
        </div>

        <Separator />

        {/* 合計保険料 */}
        <div className="text-center">
          <p className="text-caption text-semantic-fg-subtle">月額保険料</p>
          <p className="text-display font-semibold text-semantic-accent">
            ¥{totalPremium.toLocaleString()}
          </p>
          <p className="text-caption text-semantic-fg-subtle">税込</p>
        </div>
      </CardContent>
    </Card>
  )
} 