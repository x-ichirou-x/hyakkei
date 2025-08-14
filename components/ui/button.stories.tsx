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
type Story = StoryObj<typeof meta>

/**
 * デフォルトのボタンストーリー
 */
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    onClick: () => console.log("default click"),
    children: "Default Button",
  },
}

/**
 * アウトラインのボタンストーリー
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    disabled: false,
    onClick: () => console.log("outline click"),
    children: "Outline Button",
  },
}

/**
 * 破壊的なボタンストーリー
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    disabled: false,
    onClick: () => console.log("destructive click"),
    children: "Destructive Button",
  },
}

/**
 * セカンダリのボタンストーリー
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    disabled: false,
    onClick: () => console.log("secondary click"),
    children: "Secondary Button",
  },
}

/**
 * ゴーストのボタンストーリー
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    disabled: false,
    onClick: () => console.log("ghost click"),
    children: "Ghost Button",
  },
}

/**
 * リンクのボタンストーリー
 */
export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    disabled: false,
    onClick: () => console.log("link click"),
    children: "Link Button",
  },
}

/**
 * 小さいサイズのボタンストーリー
 */
export const Small: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: false,
    onClick: () => console.log("small click"),
    children: "Small Button",
  },
}

/**
 * 大きいサイズのボタンストーリー
 */
export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    disabled: false,
    onClick: () => console.log("large click"),
    children: "Large Button",
  },
}

/**
 * 無効化されたボタンストーリー
 */
export const Disabled: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: true,
    onClick: () => console.log("disabled click"),
    children: "Disabled Button",
  },
} 