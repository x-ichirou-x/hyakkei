/**
 * 医療保険プランカードコンポーネント
 * 
 * 主契約プランの表示に使用するカードコンポーネント
 * プラン名、説明、保険料、保障内容を表示
 * 選択状態の管理とスタイリングを提供
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Star } from "lucide-react"

/**
 * プランカバレッジ情報の型定義
 */
interface PlanCoverage {
  hospitalization: string
  surgery: string
  outpatient: string
  examination: string
}

/**
 * プランカードのプロパティ型定義
 */
interface PlanCardProps {
  /** プランID */
  id: string
  /** プラン名 */
  name: string
  /** プラン説明 */
  description: string
  /** 月額保険料 */
  monthlyPremium: number
  /** プラン特徴 */
  features: string[]
  /** 保障内容 */
  coverage: PlanCoverage
  /** おすすめプランかどうか */
  recommended: boolean
  /** 選択状態 */
  isSelected: boolean
  /** 選択変更時のコールバック */
  onSelect: (planId: string) => void
}

/**
 * 医療保険プランカードコンポーネント
 * 
 * @param props プランカードのプロパティ
 * @returns プランカードのJSX要素
 */
export function PlanCard({
  id,
  name,
  description,
  monthlyPremium,
  features,
  coverage,
  recommended,
  isSelected,
  onSelect
}: PlanCardProps) {
  /**
   * カードクリック時の処理
   */
  const handleCardClick = () => {
    onSelect(id)
  }

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md card-standard ${
        isSelected 
          ? 'ring-2 ring-semantic-accent bg-semantic-bg' 
          : ''
      }`}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value={id} id={id} />
            <div>
              <CardTitle className="flex items-center space-x-2 text-h2 text-semantic-fg">
                {name}
                {recommended && (
                  <Badge variant="default" className="text-caption bg-semantic-accent text-semantic-bg">
                    <Star className="h-3 w-3 mr-1" />
                    おすすめ
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <p className="text-display font-semibold text-semantic-accent">
              ¥{monthlyPremium.toLocaleString()}
            </p>
            <p className="text-caption text-semantic-fg-subtle">月額</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* プラン特徴 */}
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-caption">
                {feature}
              </Badge>
            ))}
          </div>
          
          <Separator />
          
          {/* 保障内容詳細 */}
          <div className="grid grid-cols-2 gap-4 text-caption">
            <div>
              <p className="font-medium text-semantic-fg">入院保障</p>
              <p className="text-semantic-fg-subtle">{coverage.hospitalization}</p>
            </div>
            <div>
              <p className="font-medium text-semantic-fg">手術保障</p>
              <p className="text-semantic-fg-subtle">{coverage.surgery}</p>
            </div>
            <div>
              <p className="font-medium text-semantic-fg">通院保障</p>
              <p className="text-semantic-fg-subtle">{coverage.outpatient}</p>
            </div>
            <div>
              <p className="font-medium text-semantic-fg">健康診断</p>
              <p className="text-semantic-fg-subtle">{coverage.examination}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 