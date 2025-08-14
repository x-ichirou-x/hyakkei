/**
 * Input OTPコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのInput OTPコンポーネントのStorybookストーリーです。
 * 様々なOTP入力パターン、長さ、状態を確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp"
import { useState } from "react"
import * as React from "react"

/**
 * Input OTPコンポーネントのメタデータ定義
 */
const meta = {
  title: "Components/UI/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    maxLength: {
      control: "number",
      description: "OTPの最大文字数",
    },
    disabled: {
      control: "boolean",
      description: "OTP入力が無効化されているかどうか",
    },
    pattern: {
      control: "text",
      description: "入力パターン（例: [0-9]）",
    },
    value: {
      control: "text",
      description: "OTPの値",
    },
    onChange: {
      description: "値が変更された時のコールバック",
    },
  },
} satisfies Meta<typeof InputOTP>

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
 * 基本的な4桁のOTP入力ストーリー
 */
export const Default: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          4桁のOTPを入力してください
        </div>
        <InputOTP
          maxLength={4}
          value={value}
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
}

/**
 * 6桁のOTP入力ストーリー
 */
export const SixDigits: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          6桁のOTPを入力してください
        </div>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
}

/**
 * セパレーター付きのOTP入力ストーリー
 */
export const WithSeparator: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          セパレーター付きの6桁OTP
        </div>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
}

/**
 * 数値のみのOTP入力ストーリー
 */
export const NumericOnly: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          数値のみの4桁OTPを入力してください
        </div>
        <InputOTP
          maxLength={4}
          pattern="[0-9]"
          value={value}
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
}

/**
 * 無効化されたOTP入力ストーリー
 */
export const Disabled: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("1234")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          無効化されたOTP入力
        </div>
        <InputOTP
          maxLength={4}
          value={value}
          disabled
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
}

/**
 * 複数セパレーター付きのOTP入力ストーリー
 */
export const MultipleSeparators: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          複数セパレーター付きの6桁OTP
        </div>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(val) => setValue(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          入力値: {value}
        </div>
      </div>
    )
  },
} 