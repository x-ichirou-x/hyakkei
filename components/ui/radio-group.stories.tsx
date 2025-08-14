/**
 * Radio GroupコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのRadio GroupコンポーネントのStorybookストーリーです。
 * 複数の選択肢から1つだけを選択できるラジオボタングループを提供します。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"
import { useState } from "react"

/**
 * Radio Groupコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "デフォルトで選択される値",
    },
    value: {
      control: "text",
      description: "現在選択されている値",
    },
    onValueChange: {
      description: "値が変更された時のコールバック",
    },
    disabled: {
      control: "boolean",
      description: "ラジオグループ全体が無効化されているかどうか",
    },
    className: {
      control: "text",
      description: "ラジオグループに適用するカスタムTailwind CSSクラス",
    },
  },
} satisfies Meta<typeof RadioGroup>

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
 * 基本的なラジオグループストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("comfortable")
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * デフォルト値が設定されたラジオグループストーリー
 */
export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState("option-two")
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three">Option Three</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * 無効化されたラジオグループストーリー
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("option-one")
    return (
      <RadioGroup value={value} onValueChange={setValue} disabled>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="disabled-option-one" />
          <Label htmlFor="disabled-option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="disabled-option-two" />
          <Label htmlFor="disabled-option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="disabled-option-three" />
          <Label htmlFor="disabled-option-three">Option Three</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * 縦並びのラジオグループストーリー
 */
export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState("all")
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="notify-all" />
          <Label htmlFor="notify-all">All new messages</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mentions" id="notify-mentions" />
          <Label htmlFor="notify-mentions">Direct messages and mentions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="notify-none" />
          <Label htmlFor="notify-none">Nothing</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * 横並びのラジオグループストーリー
 */
export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("small")
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="small" id="size-small" />
          <Label htmlFor="size-small">Small</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="size-medium" />
          <Label htmlFor="size-medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="large" id="size-large" />
          <Label htmlFor="size-large">Large</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * カスタムスタイルのラジオグループストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    const [value, setValue] = useState("red")
    return (
      <RadioGroup value={value} onValueChange={setValue} className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="red" 
            id="color-red" 
            className="border-semantic-danger data-[state=checked]:bg-semantic-danger data-[state=checked]:border-semantic-danger"
          />
          <Label htmlFor="color-red" className="text-semantic-danger font-medium">Red</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="blue" 
            id="color-blue" 
            className="border-semantic-accent data-[state=checked]:bg-semantic-accent data-[state=checked]:border-semantic-accent"
          />
          <Label htmlFor="color-blue" className="text-semantic-accent font-medium">Blue</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="green" 
            id="color-green" 
            className="border-semantic-success data-[state=checked]:bg-semantic-success data-[state=checked]:border-semantic-success"
          />
          <Label htmlFor="color-green" className="text-semantic-success font-medium">Green</Label>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * 複雑なラジオグループストーリー（フォーム例）
 */
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Notify me about...</h3>
          <RadioGroup value={value} onValueChange={setValue} className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="form-all" />
              <Label htmlFor="form-all" className="font-normal">All new messages</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentions" id="form-mentions" />
              <Label htmlFor="form-mentions" className="font-normal">Direct messages and mentions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="form-none" />
              <Label htmlFor="form-none" className="font-normal">Nothing</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="text-sm text-muted-foreground">
          選択された値: {value || "なし"}
        </div>
      </div>
    )
  },
} 