/**
 * StepperコンポーネントのStorybookストーリー
 *
 * @description
 * 申込フロー全体のステップ数と現在位置を視覚的に示すための軽量UIである `Stepper` のストーリー群。
 * 円形ナンバリングと接続ライン、補助キャプションを組み合わせて進捗状況を表示します。
 *
 * 主な仕様:
 * - 現在ステップ以下は強調色で表示し、それ以外はボーダー色で表示
 * - ステップラベルは任意（指定がない場合は既定ラベルを使用）
 * - レスポンシブ対応（数が多い場合は折返しや縮小を許容）
 *
 * 制限事項:
 * - ステップ数は最大6〜8程度を想定
 * - 表示専用であり、フォーカス移動等は行わない
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Stepper } from "@/components/ui/stepper"

/**
 * Stepperコンポーネントのメタデータ
 */
const meta: Meta<typeof Stepper> = {
  title: "Components/UI/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    currentStep: {
      control: { type: "number" },
      description: "現在のステップ番号（1起点）",
    },
    totalSteps: {
      control: { type: "number" },
      description: "総ステップ数（既定: 6）",
    },
    stepLabels: {
      control: { type: "object" },
      description: "各ステップのラベル（省略時は既定ラベルを使用）",
    },
    leftCaption: {
      control: { type: "text" },
      description: "左側補助キャプション（例: STEP 2-2）",
    },
    rightCaption: {
      control: { type: "text" },
      description: "右側補助キャプション（例: 重要事項のご確認）",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本
 */
export const Basic: Story = {
  args: {
    currentStep: 3,
    totalSteps: 6,
    size: "auto",
    stepLabels: [
      "お客様\n情報登録",
      "重要事項\n確認",
      "告知",
      "受取人\n登録",
      "支払方法\n登録",
      "本人確認",
    ],
  },
}

/**
 * キャプション付き
 */
export const WithCaptions: Story = {
  args: {
    currentStep: 3,
    totalSteps: 6,
    size: "md",
  },
}

/**
 * カスタムラベル
 */
export const CustomLabels: Story = {
  args: {
    currentStep: 2,
    totalSteps: 6,
    size: "sm",
    stepLabels: [
      "入力",
      "本人確認",
      "確認",
      "決済",
      "完了",
      "送付",
    ],
  },
}

/**
 * 進捗の例（複数表示）
 */
export const Progression: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">currentStep: 1</div>
        <Stepper currentStep={1} totalSteps={6} size="auto" />
      </div>
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">currentStep: 3</div>
        <Stepper currentStep={3} totalSteps={6} size="md" />
      </div>
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">currentStep: 6</div>
        <Stepper currentStep={6} totalSteps={6} size="lg" />
      </div>
    </div>
  ),
}

/**
 * 少ないステップ数
 */
export const ShortSteps: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
    size: "auto",
    stepLabels: ["入力", "確認", "完了"],
  },
}

/**
 * 多いステップ数（折返し想定）
 */
export const ManySteps: Story = {
  args: {
    currentStep: 5,
    totalSteps: 8,
    size: "auto",
    stepLabels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
    ],
  },
}

/**
 * 範囲外の現在ステップ（防御的実装の確認）
 */
export const OutOfRangeCurrentStep: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">currentStep: 0（下限クリップ）</div>
        <Stepper currentStep={0} totalSteps={6} />
      </div>
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">currentStep: 10（上限クリップ）</div>
        <Stepper currentStep={10} totalSteps={6} />
      </div>
    </div>
  ),
}

/**
 * 日本語フロー（二行ラベル＋状態色確認）
 */
// JapaneseFlow は Basic に統合しました
