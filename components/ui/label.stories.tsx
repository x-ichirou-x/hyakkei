/**
 * LabelコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのLabelコンポーネントのStorybookストーリーです。
 * 様々な状態、サイズ、使用方法を確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"
import { Checkbox } from "./checkbox"
import { useState } from "react"
import type { CheckedState } from "@radix-ui/react-checkbox"

/**
 * Labelコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "ラベルのテキスト内容",
    },
    htmlFor: {
      control: "text",
      description: "関連付けるフォーム要素のID",
    },
    className: {
      control: "text",
      description: "ラベルに適用するカスタムTailwind CSSクラス",
    },
  },
} satisfies Meta<typeof Label>

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
 * 基本的なラベルストーリー
 */
export const Default: Story = {
  args: {
    children: "Email",
  },
  render: (args) => (
    <Label {...args} />
  ),
}

/**
 * フォーム要素と関連付けられたラベルストーリー
 */
export const WithFormElement: Story = {
  args: {
    children: "Email",
    htmlFor: "email",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  ),
}

/**
 * Checkboxと組み合わせたラベルストーリー（shadcn/ui公式例）
 */
export const WithCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(value: CheckedState) => setChecked(value === true)}
        />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    )
  },
}

/**
 * 長いテキストのラベルストーリー
 */
export const LongText: Story = {
  args: {
    children: "This is a very long label text that might wrap to multiple lines",
  },
  render: (args) => (
    <Label {...args} />
  ),
}

/**
 * 必須項目のラベルストーリー
 */
export const Required: Story = {
  args: {
    children: "Email *",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  ),
}

/**
 * カスタムスタイルのラベルストーリー
 */
export const CustomStyle: Story = {
  args: {
    children: "Custom Styled Label",
    className: "text-h2 font-semibold text-semantic-accent",
  },
  render: (args) => (
    <Label {...args} />
  ),
}

/**
 * 無効化されたラベルストーリー
 */
export const Disabled: Story = {
  args: {
    children: "Disabled Label",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        type="text"
        disabled
        placeholder="This input is disabled"
        className="w-full px-3 py-2 border rounded-md bg-gray-100"
      />
    </div>
  ),
}

/**
 * 複数のラベルストーリー
 */
export const MultipleLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          placeholder="Enter your message"
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>
    </div>
  ),
} 