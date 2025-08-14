/**
 * セクション見出しコンポーネント
 *
 * 概要:
 * - 左側の縦ライン＋見出しテキストの一貫したデザインを提供。
 * - 既存ページの見出し表現を統一する目的で使用する。
 *
 * 主な仕様:
 * - `title` に見出し文字列、`as` で見出しレベル（h2〜h4）を選択可能。
 * - 余白は `className` で調整。
 *
 * 制限事項:
 * - インライン要素は非対応。見出しテキストのみを想定。
 */

import React from "react"

export interface SectionHeadingProps {
  title: string
  as?: "h2" | "h3" | "h4"
  className?: string
}

export default function SectionHeading({ title, as = "h2", className }: SectionHeadingProps): React.ReactElement {
  const Tag = as
  // 見出し21風デザイン（下線＋山形ノッチ）
  // Tailwindの擬似要素ユーティリティを用いて before/after を表現
  return (
    <div
      className={`relative inline-block max-w-full align-top bg-transparent text-[#333333] border-b-[3px] border-[#2589d0] pt-2 pr-3 pb-1.5 pl-3 overflow-visible ${
        className ?? ""
      } before:content-[''] before:absolute before:left-[30px] before:bottom-[-15px] before:w-[30px] before:h-[15px] before:[clip-path:polygon(0_0,100%_0,50%_100%)] before:bg-[#2589d0] after:content-[''] after:absolute after:left-[30px] after:bottom-[-11px] after:w-[30px] after:h-[15px] after:[clip-path:polygon(0_0,100%_0,50%_100%)] after:bg-white`}
    >
      <Tag className="text-h2 font-semibold">{title}</Tag>
    </div>
  )
}


