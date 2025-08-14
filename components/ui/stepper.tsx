/**
 * ステッパー（進捗バー）共通コンポーネント
 *
 * 申込フロー全体のステップ数と現在位置を視覚的に示すための軽量UI。
 * 画面上部に表示される円形ナンバリングと接続ライン、補助キャプションを提供する。
 *
 * 主な仕様:
 * - 現在ステップ以下は強調色で表示し、それ以外はボーダー色で表示
 * - ステップラベルは任意（指定がない場合は既定ラベルを使用）
 * - レスポンシブ対応（数が多い場合は折返しや縮小を許容）
 *
 * 制限事項:
 * - ステップ数は最大6〜8程度を想定（過度な数では視認性低下）
 * - キーボード操作対象のフォーカス要素は含まない（表示専用）
 */

import React from "react"

/**
 * ステッパーのプロパティ
 * @property {number} currentStep 現在のステップ番号（1起点）
 * @property {number} totalSteps 総ステップ数
 * @property {string[]} stepLabels 各ステップのラベル（任意）。未指定時はデフォルト表記を使用。
 * @property {string} leftCaption 左側補助キャプション（例: "STEP 2-2"）
 * @property {string} rightCaption 右側補助キャプション（例: "重要事項のご確認"）
 */
export interface StepperProps {
  /** 現在のステップ番号（1起点） */
  currentStep: number
  /** 総ステップ数（既定: 6） */
  totalSteps?: number
  /** 各ステップのラベル（任意）。未指定時はデフォルト表記を使用。 */
  stepLabels?: string[]
  /** 左側補助キャプション（例: "STEP 2-2"） */
  leftCaption?: string
  /** 右側補助キャプション（例: "重要事項のご確認"） */
  rightCaption?: string
  /**
   * ステッパーサイズ指定。
   * - auto: 画面幅に応じて自動スケール（既定）
   * - sm | md | lg: 固定スケール
   */
  size?: "auto" | "sm" | "md" | "lg"
}

/**
 * ステッパー本体
 * @param props ステッパーのプロパティ
 * @returns JSX.Element
 */
export function Stepper({
  currentStep,
  totalSteps = 6,
  stepLabels,
  leftCaption,
  rightCaption,
  size = "auto",
}: StepperProps) {
  const labels = stepLabels ?? [
    "STEP 1: 情報入力",
    "STEP 2: お客様情報確認・登録",
    "STEP 3: 申込内容確認",
    "STEP 4: 決済",
    "STEP 5: 完了",
    "STEP 6: 書類送付",
  ]

  const safeCurrent = Math.max(1, Math.min(currentStep, totalSteps))
  // ラベルを2行表示できるように、改行(\n)や区切り記号(|)で分割する
  const labelLinesList: string[][] = (stepLabels ?? labels)
    .slice(0, totalSteps)
    .map((label) => {
      const parts = String(label)
        .split(/\n|\|/)
        .map((s) => s.trim())
        .filter(Boolean)
      return parts.slice(0, 2)
    })
  const showLabelsUnderSteps = labelLinesList.some((parts) => parts.length > 1)

  return (
    <div className="bg-semantic-bg">
      <div
        className="container-responsive py-4 stepper-root"
        data-size={size === "auto" ? undefined : size}
      >
        {(leftCaption || rightCaption) && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption font-medium text-semantic-accent">{leftCaption}</span>
            <span className="text-caption text-semantic-fg-subtle">{rightCaption}</span>
          </div>
        )}

        <div className="flex items-start w-full">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < safeCurrent
            const isCurrent = stepNumber === safeCurrent
            const bubbleColorClass = isCurrent
              ? "bg-semantic-brand text-semantic-bg" // 現在（濃い青）
              : isCompleted
              ? "bg-semantic-bg border border-semantic-accent text-semantic-accent" // 完了（アウトライン＋青文字）
              : "bg-semantic-border text-semantic-fg-subtle" // これから（薄いグレー）

            return (
              <div key={stepNumber} className={`${stepNumber === totalSteps ? '' : 'flex-1'} min-w-0 px-0`}>
                {/* 上段: バッジとコネクタ（固定高さで中央揃え） */}
                <div className="flex items-center step-row">
                  {/* 番号バッジ */}
                  <div className="step-badge-cell shrink-0 flex items-center justify-center">
                    <div
                      className={`step-bubble rounded-full flex items-center justify-center leading-none font-semibold ${bubbleColorClass}`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {stepNumber}
                    </div>
                  </div>

                  {/* コネクタ（＞記号） */}
                  {stepNumber < totalSteps && (
                    <div className="flex-1 relative mx-2 sm:mx-3 step-row" aria-hidden>
                      <svg
                        role="presentation"
                        viewBox="0 0 86.6 100"
                        className={`${
                          stepNumber < safeCurrent ? "text-semantic-accent" : "text-semantic-border"
                        } pointer-events-none step-arrow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                      >
                        <polygon points="0,0 0,100 86.6,50" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 下段: 二行ラベル（必要時のみ、バッジ直下で左右中央を厳密合わせ） */}
                {showLabelsUnderSteps && (
                  <div className="mt-2 flex">
                    {/* バッジの幅と同じセル */}
                    <div className="step-badge-cell flex justify-center">
                      <div className="step-label-block text-center text-semantic-fg-subtle leading-tight">
                        {labelLinesList[index]?.map((line, lineIdx) => (
                          <div key={lineIdx} className="truncate">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* 三角側の空きスペース（上段と同じ比率で確保） */}
                    {stepNumber < totalSteps && <div className="flex-1" />}
                  </div>
                )}
              </div>
            )
          })}
          
        </div>

        {!showLabelsUnderSteps && labels.length > 0 && (
          <div className="hidden sm:grid grid-cols-6 gap-x-2 text-[12px] text-semantic-fg-subtle mt-2">
            {labels.slice(0, totalSteps).map((label, idx) => (
              <span key={idx} className="truncate min-w-0">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stepper


