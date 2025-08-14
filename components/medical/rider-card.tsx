/**
 * 医療保険特約カードコンポーネント
 * 
 * 特約プランの表示に使用するカードコンポーネント
 * 特約名、説明、追加保険料、特徴を表示
 * チェックボックスによる選択機能を提供
 * 
 * @author Medical Insurance System
 * @version 2.0.0
 */

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

/**
 * 特約カードのプロパティ型定義
 */
interface RiderCardProps {
  /** 特約ID */
  id: string
  /** 特約名 */
  name: string
  /** 特約説明 */
  description: string
  /** 月額追加保険料 */
  monthlyPremium: number
  /** 特約特徴 */
  features: string[]
  /** 選択状態 */
  isSelected: boolean
  /** 選択変更時のコールバック */
  onSelect: (riderId: string, checked: boolean) => void
}

/**
 * 医療保険特約カードコンポーネント
 * 
 * @param props 特約カードのプロパティ
 * @returns 特約カードのJSX要素
 */
export function RiderCard({
  id,
  name,
  description,
  monthlyPremium,
  features,
  isSelected,
  onSelect
}: RiderCardProps) {
  /**
   * チェックボックス変更時の処理
   * @param checked チェック状態
   */
  const handleCheckboxChange = (checked: boolean) => {
    onSelect(id, checked)
  }

  return (
    <Card className="p-4 card-standard">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id={id}
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
          />
          <div>
            <h3 className="font-semibold text-h2 text-semantic-fg">{name}</h3>
            <p className="text-caption text-semantic-fg-subtle mt-1">{description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-caption">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-h2 font-semibold text-semantic-success">
            +¥{monthlyPremium.toLocaleString()}
          </p>
          <p className="text-caption text-semantic-fg-subtle">月額追加</p>
        </div>
      </div>
    </Card>
  )
} 