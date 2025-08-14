/**
 * Toggle GroupコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのToggle GroupコンポーネントのStorybookストーリーです。
 * オンまたはオフに切り替え可能な2状態のボタンのセットを提供します。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { useState } from "react"

/**
 * Toggle Groupコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "トグルグループのタイプ（単一選択または複数選択）",
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "トグルグループのバリアント",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "トグルグループのサイズ",
    },
    disabled: {
      control: "boolean",
      description: "トグルグループが無効化されているかどうか",
    },
    value: {
      control: "text",
      description: "現在選択されている値（単一選択の場合）",
    },
    onValueChange: {
      description: "値が変更された時のコールバック",
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta

/**
 * Storyの型定義
 */
type Story = StoryObj<typeof meta>

/**
 * 基本的なトグルグループストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <ToggleGroup variant="outline" type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * アウトラインバリアントのトグルグループストーリー（shadcn/ui公式例）
 */
export const Outline: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <ToggleGroup type="multiple" variant="outline" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * 単一選択のトグルグループストーリー（shadcn/ui公式例）
 */
export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * 小さいサイズのトグルグループストーリー（shadcn/ui公式例）
 */
export const Small: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <ToggleGroup type="single" size="sm" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * 大きいサイズのトグルグループストーリー（shadcn/ui公式例）
 */
export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <ToggleGroup type="multiple" size="lg" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * 無効化されたトグルグループストーリー（shadcn/ui公式例）
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <ToggleGroup type="multiple" disabled value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * テキストアライメントのトグルグループストーリー
 */
export const TextAlignment: Story = {
  render: () => {
    const [value, setValue] = useState("left")
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * テキスト付きのトグルグループストーリー
 */
export const WithText: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <ToggleGroup type="multiple" variant="outline" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

/**
 * 複雑なトグルグループストーリー（フォーマットツールバー例）
 */
export const FormatToolbar: Story = {
  render: () => {
    const [textFormat, setTextFormat] = useState<string[]>([])
    const [alignment, setAlignment] = useState("left")
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Text Format</h3>
          <ToggleGroup type="multiple" variant="outline" value={textFormat} onValueChange={setTextFormat}>
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Alignment</h3>
          <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Align justify">
              <AlignJustify className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-sm text-muted-foreground">
          <div>Text Format: {textFormat.join(", ") || "なし"}</div>
          <div>Alignment: {alignment}</div>
        </div>
      </div>
    )
  },
} 