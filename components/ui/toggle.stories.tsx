/**
 * ToggleコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのToggleコンポーネントのStorybookストーリーです。
 * オンまたはオフに切り替え可能な2状態のボタンを提供します。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Bold, Italic, Underline, Moon, Sun, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

/**
 * Toggleコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    pressed: {
      control: "boolean",
      description: "トグルが押されているかどうか",
    },
    disabled: {
      control: "boolean",
      description: "トグルが無効化されているかどうか",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "トグルのサイズ",
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "トグルのバリアント",
    },
    onPressedChange: {
      description: "押下状態が変更された時のコールバック",
    },
    "aria-label": {
      control: "text",
      description: "アクセシビリティ用のラベル",
    },
  },
} satisfies Meta<typeof Toggle>

export default meta

/**
 * Storyの型定義
 */
type Story = StoryObj<typeof meta>

/**
 * 基本的なトグルストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Toggle aria-label="Toggle italic">
        <Bold className="h-4 w-4" />
      </Toggle>
    )
  },
}

/**
 * アウトラインバリアントのトグルストーリー（shadcn/ui公式例）
 */
export const Outline: Story = {
  args: {},
  render: () => {
    return (
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
    )
  },
}

/**
 * 小さいサイズのトグルストーリー（shadcn/ui公式例）
 */
export const Small: Story = {
  args: {},
  render: () => {
    return (
      <Toggle size="sm" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
    )
  },
}

/**
 * 大きいサイズのトグルストーリー（shadcn/ui公式例）
 */
export const Large: Story = {
  args: {},
  render: () => {
    return (
      <Toggle size="lg" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
    )
  },
}

/**
 * 無効化されたトグルストーリー（shadcn/ui公式例）
 */
export const Disabled: Story = {
  args: {},
  render: () => {
    return (
      <Toggle aria-label="Toggle italic" disabled>
        <Underline className="h-4 w-4" />
      </Toggle>
    )
  },
}

/**
 * ダークモードトグルストーリー
 */
export const DarkMode: Story = {
  args: {},
  render: () => {
    const [isDark, setIsDark] = useState(false)
    return (
      <Toggle pressed={isDark} onPressedChange={setIsDark} aria-label="Toggle dark mode">
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Toggle>
    )
  },
}

/**
 * 音量トグルストーリー
 */
export const Volume: Story = {
  args: {},
  render: () => {
    const [isMuted, setIsMuted] = useState(false)
    return (
      <Toggle pressed={isMuted} onPressedChange={setIsMuted} aria-label="Toggle mute">
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Toggle>
    )
  },
}

/**
 * テキスト付きのトグルストーリー（shadcn/ui公式例）
 */
export const WithText: Story = {
  args: {},
  render: () => {
    return (
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
        Italic
      </Toggle>
    )
  },
}

/**
 * 複数のトグルストーリー
 */
export const MultipleToggles: Story = {
  args: {},
  render: () => {
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    
    return (
      <div className="flex items-center space-x-2">
        <Toggle pressed={bold} onPressedChange={setBold} aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle pressed={underline} onPressedChange={setUnderline} aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </div>
    )
  },
}

/**
 * カスタムスタイルのトグルストーリー
 */
export const CustomStyle: Story = {
  args: {},
  render: () => {
    const [pressed, setPressed] = useState(false)
    return (
      <Toggle 
        pressed={pressed} 
        onPressedChange={setPressed}
        className="bg-blue-500 hover:bg-blue-600 data-[state=on]:bg-blue-700"
      >
        <Bold className="h-4 w-4 text-white" />
      </Toggle>
    )
  },
} 