/**
 * 医療申込フロー用の共通ヘッダーコンポーネント
 *
 * 概要:
 * - 申込フローの各画面上部に表示されるブランドロゴ（左）とコンタクトロゴ（右）を表示。
 * - これまで各ページに複製されていたブロックを共通化し、二重表示や更新漏れを防止。
 *
 * 主な仕様:
 * - 左側: ブランドロゴ。
 * - 右側: コンタクトロゴ。
 * - ルートレイアウトのヘッダー直下に配置する想定で、下線は本体に持たせない。
 *
 * 制限事項:
 * - 文言・電話番号は固定。将来的にCMSや設定化する場合はprops拡張で対応。
 */

import Image from "next/image"
import React from "react"

/**
 * 医療フロー共通ヘッダー
 * @returns {React.ReactElement} ヘッダー要素
 */
export default function MedicalHeader(): React.ReactElement {
  return (
    <div className="bg-semantic-bg">
      <div className="container-responsive py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/brand-logo.png"
              alt="ブランドロゴ"
              width={240}
              height={54}
              priority
              className="h-12 sm:h-12 w-auto"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src="/contact_logo.png"
              alt="コンタクト"
              width={240}
              height={54}
              priority
              className="h-12 sm:h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


