/**
 * ButtonコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのButtonコンポーネントのStorybookストーリーです。
 * 様々なバリアント、サイズ、状態を確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"



/**
 * Buttonコンポーネントのメタデータ定義
 */
const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      description: "ボタンのバリアント",
      options: ["default", "outline", "destructive", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      description: "ボタンのサイズ",
      options: ["sm", "default", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
      description: "ボタンが無効化されているかどうか",
    },
    children: {
      control: "text",
      description: "ボタンの内容",
    },
    className: {
      control: "text",
      description: "ボタンに適用するカスタムTailwind CSSクラス",
    },
  },
}
export default meta

/**
 * Storyの型定義
 */
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * デフォルトのボタンストーリー
 */
export const Default: Story = {
  render: () => (
    <Button variant="default" size="default">
      Default Button
    </Button>
  ),
}

/**
 * アウトラインのボタンストーリー
 */
export const Outline: Story = {
  render: () => (
    <Button variant="outline" size="default">
      Outline Button
    </Button>
  ),
}

/**
 * 破壊的なボタンストーリー
 */
export const Destructive: Story = {
  render: () => (
    <Button variant="destructive" size="default">
      Destructive Button
    </Button>
  ),
}

/**
 * セカンダリのボタンストーリー
 */
export const Secondary: Story = {
  render: () => (
    <Button variant="secondary" size="default">
      Secondary Button
    </Button>
  ),
}

/**
 * ゴーストのボタンストーリー
 */
export const Ghost: Story = {
  render: () => (
    <Button variant="ghost" size="default">
      Ghost Button
    </Button>
  ),
}

/**
 * リンクのボタンストーリー
 */
export const Link: Story = {
  render: () => (
    <Button variant="link" size="default">
      Link Button
    </Button>
  ),
}

/**
 * 小さいサイズのボタンストーリー
 */
export const Small: Story = {
  render: () => (
    <Button variant="default" size="sm">
      Small Button
    </Button>
  ),
}

/**
 * 大きいサイズのボタンストーリー
 */
export const Large: Story = {
  render: () => (
    <Button variant="default" size="lg">
      Large Button
    </Button>
  ),
}

/**
 * 無効化されたボタンストーリー
 */
export const Disabled: Story = {
  render: () => (
    <Button variant="default" size="default" disabled>
      Disabled Button
    </Button>
  ),
} 