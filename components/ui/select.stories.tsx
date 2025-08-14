/**
 * SelectコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのSelectコンポーネントのStorybookストーリーです。
 * ユーザーが選択できるオプションのリストを表示するドロップダウンセレクトボックスを提供します。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"
import { useState } from "react"

/**
 * Selectコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/Select",
  component: Select,
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
      description: "セレクトが無効化されているかどうか",
    },
  },
} satisfies Meta<typeof Select>

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
 * 基本的なセレクトストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * テーマ選択のセレクトストーリー
 */
export const ThemeSelect: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * スクロール可能なセレクトストーリー（shadcn/ui公式例）
 */
export const Scrollable: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">Indonesia Central Standard Time (WITA)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
            <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
            <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
            <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * 無効化されたセレクトストーリー
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue} disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * デフォルト値が設定されたセレクトストーリー
 */
export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState("banana")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * 複数のグループを持つセレクトストーリー
 */
export const MultipleGroups: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="spinach">Spinach</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Grains</SelectLabel>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="oats">Oats</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

/**
 * フォーム例のセレクトストーリー（shadcn/ui公式例を参考）
 */
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            You can manage email addresses in your email settings.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          選択された値: {value || "なし"}
        </div>
      </div>
    )
  },
}

/**
 * カスタムスタイルのセレクトストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px] border-2 border-semantic-accent bg-semantic-bg">
          <SelectValue placeholder="Custom styled select" />
        </SelectTrigger>
        <SelectContent className="bg-semantic-bg border-semantic-accent">
          <SelectGroup>
            <SelectLabel className="text-semantic-fg font-bold">Colors</SelectLabel>
            <SelectItem value="red" className="text-semantic-danger">Red</SelectItem>
            <SelectItem value="blue" className="text-semantic-accent">Blue</SelectItem>
            <SelectItem value="green" className="text-semantic-success">Green</SelectItem>
            <SelectItem value="yellow" className="text-semantic-warning">Yellow</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
} 