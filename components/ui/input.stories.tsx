/**
 * InputコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのInputコンポーネントのStorybookストーリーです。
 * 様々なタイプ、状態、プレースホルダーを確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"



/**
 * Inputコンポーネントのメタデータ定義
 */
const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onChange: { action: "changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    type: {
      control: "select",
      description: "入力フィールドのタイプ",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    disabled: {
      control: "boolean",
      description: "入力フィールドが無効化されているかどうか",
    },
    value: {
      control: "text",
      description: "入力フィールドの値",
    },
    className: {
      control: "text",
      description: "入力フィールドに適用するカスタムTailwind CSSクラス",
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
 * デフォルトの入力フィールドストーリー
 */
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "テキストを入力してください",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("text changed:", e.target.value),
    onFocus: () => console.log("text focused"),
    onBlur: () => console.log("text blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * メール入力フィールドストーリー
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "example@email.com",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("email changed:", e.target.value),
    onFocus: () => console.log("email focused"),
    onBlur: () => console.log("email blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * パスワード入力フィールドストーリー
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "パスワードを入力してください",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("password changed:", e.target.value),
    onFocus: () => console.log("password focused"),
    onBlur: () => console.log("password blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * 数値入力フィールドストーリー
 */
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "数値を入力してください",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("number changed:", e.target.value),
    onFocus: () => console.log("number focused"),
    onBlur: () => console.log("number blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * 電話番号入力フィールドストーリー
 */
export const Tel: Story = {
  args: {
    type: "tel",
    placeholder: "電話番号を入力してください",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("tel changed:", e.target.value),
    onFocus: () => console.log("tel focused"),
    onBlur: () => console.log("tel blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * URL入力フィールドストーリー
 */
export const Url: Story = {
  args: {
    type: "url",
    placeholder: "https://example.com",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("url changed:", e.target.value),
    onFocus: () => console.log("url focused"),
    onBlur: () => console.log("url blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * 検索入力フィールドストーリー
 */
export const Search: Story = {
  args: {
    type: "search",
    placeholder: "検索キーワードを入力してください",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("search changed:", e.target.value),
    onFocus: () => console.log("search focused"),
    onBlur: () => console.log("search blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * 無効化された入力フィールドストーリー
 */
export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "無効化された入力フィールド",
    disabled: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("disabled changed:", e.target.value),
    onFocus: () => console.log("disabled focused"),
    onBlur: () => console.log("disabled blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
}

/**
 * 値が設定された入力フィールドストーリー
 */
export const WithValue: Story = {
  args: {
    type: "text",
    value: "設定済みの値",
    disabled: false,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log("value changed:", e.target.value),
    onFocus: () => console.log("value focused"),
    onBlur: () => console.log("value blurred"),
  },
  render: (args) => (
    <Input {...args} />
  ),
} 