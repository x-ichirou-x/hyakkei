/**
 * 医療申込フロー用の共通フッターコンポーネント
 *
 * 概要:
 * - 画面下部に表示されるコピーライトやリンク群を提供。
 * - `/medical` 配下専用のフッターとして利用し、グローバルなフッターは持たない構成に対応。
 *
 * 主な仕様:
 * - レスポンシブ対応。モバイルでは縦積み、デスクトップでは左右配置。
 * - トークンに準拠した配色（背景/境界/前景）を使用。
 *
 * 制限事項:
 * - 文言やリンク先の最終決定はプロダクトポリシーに従う。
 */

import Link from "next/link"
import React from "react"

/**
 * 医療フロー共通フッター
 * @returns {React.ReactElement} フッター要素
 */
export default function MedicalFooter(): React.ReactElement {
  return (
    <footer className="bg-semantic-bg">
      <div className="container-responsive py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-caption text-semantic-fg-subtle">© {new Date().getFullYear()} yumemiru Life Insurance Co., Ltd.</div>
      </div>
    </footer>
  )
}


