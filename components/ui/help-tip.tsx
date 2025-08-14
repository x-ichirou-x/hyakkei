/**
 * ヘルプアイコン／ヘルプ付きラベル共通コンポーネント
 *
 * 概要:
 * - デスクトップではツールチップ、モバイルではダイアログでヘルプ文言を表示する。
 * - アイコンサイズとスタイルを統一し、各画面での見た目と挙動を揃える。
 *
 * 主な仕様:
 * - size は 'sm' | 'md' | 'lg'（既定: 'md'）。
 * - アイコンは `/public/help-icon.png`（PNG）を使用し、見た目を統一。
 * - ボタンは素の button 要素（背景/枠線なし）。
 *
 * 制限事項:
 * - 表示文言は呼び出し側から文字列として渡す。複雑なレイアウトはサポート外。
 */

import React from "react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"

export type HelpSize = "sm" | "md" | "lg"

function getIconPx(size: HelpSize): number {
  switch (size) {
    case "sm":
      return 16
    case "lg":
      return 24
    case "md":
    default:
      return 20
  }
}

/**
 * ヘルプアイコン（単体）
 * @property {string} text ヘルプとして表示する本文
 * @property {HelpSize} [size] アイコンサイズ
 * @property {string} [ariaLabel] アクセシビリティラベル
 * @property {string} [className] 追加クラス
 */
export function HelpTipIcon({
  text,
  size = "md",
  ariaLabel = "ヘルプ",
  className,
}: {
  text: string
  size?: HelpSize
  ariaLabel?: string
  className?: string
}): React.ReactElement {
  const isMobile = useIsMobile()
  const px = getIconPx(size)

  if (isMobile) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            aria-label={ariaLabel}
            className={`group inline-flex items-center justify-center h-8 w-8 p-0 bg-transparent border-0 rounded-full outline-none ${className ?? ""}`}
          >
            <Image src="/help-icon.png" alt="ヘルプ" width={px} height={px} className="h-auto w-auto opacity-60 group-hover:opacity-80 focus:opacity-80 transition-opacity" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ヘルプ</DialogTitle>
          </DialogHeader>
          <p className="text-body">{text}</p>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button
          aria-label={ariaLabel}
          className={`group inline-flex items-center justify-center h-8 w-8 p-0 bg-transparent border-0 rounded-full outline-none ${className ?? ""}`}
        >
          <Image src="/help-icon.png" alt="ヘルプ" width={px} height={px} className="h-auto w-auto opacity-60 group-hover:opacity-80 focus:opacity-80 transition-opacity" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs sm:max-w-sm" side="top" sideOffset={5}>
        <p className="text-caption">{text}</p>
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * ヘルプ付きラベル
 * @property {React.ReactNode} label ラベル表示内容
 * @property {string} text ヘルプ本文
 * @property {HelpSize} [size] アイコンサイズ
 * @property {string} [className] 追加クラス
 */
export function HelpTipLabel({
  label,
  text,
  size = "sm",
  className,
}: {
  label: React.ReactNode
  text: string
  size?: HelpSize
  className?: string
}): React.ReactElement {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <span>{label}</span>
      <HelpTipIcon text={text} size={size} />
    </span>
  )
}


