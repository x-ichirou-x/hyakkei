/**
 * CheckboxコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのCheckboxコンポーネントのStorybookストーリーです。
 * 様々な状態、サイズ、使用方法を確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"
import { useState } from "react"
import type { CheckedState } from "@radix-ui/react-checkbox"

/**
 * Checkboxコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "チェックボックスの選択状態",
    },
    disabled: {
      control: "boolean",
      description: "チェックボックスが無効化されているかどうか",
    },
    onCheckedChange: {
      description: "チェック状態が変更された時のコールバック",
    },
    id: {
      control: "text",
      description: "チェックボックスのID",
    },
    className: {
      control: "text",
      description: "チェックボックスに適用するカスタムTailwind CSSクラス",
    },
  },
} satisfies Meta<typeof Checkbox>

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
 * 基本的なチェックボックスストーリー
 */
export const Default: Story = {
  args: {
    id: "default-checkbox",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value === true)}
      />
    )
  },
}

/**
 * チェック済みのチェックボックスストーリー
 */
export const Checked: Story = {
  args: {
    id: "checked-checkbox",
  },
  render: (args) => {
    const [checked, setChecked] = useState(true)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value === true)}
      />
    )
  },
}

/**
 * 無効化されたチェックボックスストーリー
 */
export const Disabled: Story = {
  args: {
    id: "disabled-checkbox",
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value === true)}
      />
    )
  },
}

/**
 * 無効化されたチェック済みチェックボックスストーリー
 */
export const DisabledChecked: Story = {
  args: {
    id: "disabled-checked-checkbox",
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(true)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value === true)}
      />
    )
  },
}

/**
 * 複数のチェックボックスストーリー
 */
export const MultipleCheckboxes: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "item1", label: "項目1", checked: false },
      { id: "item2", label: "項目2", checked: true },
      { id: "item3", label: "項目3", checked: false },
    ])

    const handleToggle = (id: string) => {
      setItems(items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ))
    }

    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={() => handleToggle(item.id)}
            />
            <label
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * カスタムスタイルのチェックボックスストーリー
 */
export const CustomStyle: Story = {
  args: {
    id: "custom-checkbox",
    className: "border-2 border-semantic-accent data-[state=checked]:bg-semantic-accent",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value === true)}
      />
    )
  },
} 