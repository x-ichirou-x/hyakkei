/**
 * SwitchコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ユーザーがオン/オフを切り替えることができるスイッチコンポーネント
 * - フォームでの使用に適している
 * - アクセシビリティに配慮された設計
 * 
 * 主な仕様:
 * - checked: スイッチの状態（boolean）
 * - onCheckedChange: 状態変更時のコールバック
 * - disabled: 無効化状態
 * - aria-readonly: 読み取り専用状態
 * 
 * 制限事項:
 * - フォームライブラリとの組み合わせが必要な場合がある
 */

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

/**
 * Switchコンポーネントのメタデータ
 */
const meta: Meta<typeof Switch> = {
  title: "Components/UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "スイッチの状態",
    },
    disabled: {
      control: "boolean",
      description: "無効化状態",
    },
    "aria-readonly": {
      control: "boolean",
      description: "読み取り専用状態",
    },
  },
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なスイッチストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    )
  },
}

/**
 * 状態管理付きのスイッチストーリー
 */
export const WithState: Story = {
  args: {},
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="notifications"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="notifications">
          {checked ? "通知を有効にする" : "通知を無効にする"}
        </Label>
      </div>
    )
  },
}

/**
 * 無効化されたスイッチストーリー
 */
export const Disabled: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" className="text-muted-foreground">
          無効化されたスイッチ
        </Label>
      </div>
    )
  },
}

/**
 * 読み取り専用のスイッチストーリー
 */
export const ReadOnly: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="readonly-switch" checked aria-readonly />
        <Label htmlFor="readonly-switch">
          読み取り専用スイッチ
        </Label>
      </div>
    )
  },
}

/**
 * 複数のスイッチストーリー
 */
export const MultipleSwitches: Story = {
  args: {},
  render: () => {
    const [settings, setSettings] = useState({
      wifi: true,
      bluetooth: false,
      airplane: false,
      notifications: true,
    })

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">設定</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="wifi">Wi-Fi</Label>
            <Switch
              id="wifi"
              checked={settings.wifi}
              onCheckedChange={(checked) => updateSetting("wifi", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bluetooth">Bluetooth</Label>
            <Switch
              id="bluetooth"
              checked={settings.bluetooth}
              onCheckedChange={(checked) => updateSetting("bluetooth", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="airplane">機内モード</Label>
            <Switch
              id="airplane"
              checked={settings.airplane}
              onCheckedChange={(checked) => updateSetting("airplane", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">通知</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting("notifications", checked)}
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * フォームでの使用例（shadcn/ui公式例）
 */
export const FormExample: Story = {
  args: {},
  render: () => {
    const FormSchema = z.object({
      marketing_emails: z.boolean().default(false).optional(),
      security_emails: z.boolean(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        security_emails: true,
      },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
      console.log("フォームデータ:", data)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">メール通知設定</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>マーケティングメール</FormLabel>
                      <FormDescription>
                        新しい製品、機能などに関するメールを受信します。
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>セキュリティメール</FormLabel>
                      <FormDescription>
                        アカウントのセキュリティに関するメールを受信します。
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">送信</Button>
        </form>
      </Form>
    )
  },
}

/**
 * カスタムスタイルのスイッチストーリー
 */
export const CustomStyle: Story = {
  args: {},
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="custom-switch"
            checked={checked}
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-semantic-success data-[state=unchecked]:bg-semantic-border"
          />
          <Label htmlFor="custom-switch" className="font-semibold">
            カスタムカラーのスイッチ
          </Label>
        </div>
        <div className="text-sm text-muted-foreground">
          状態: {checked ? "オン" : "オフ"}
        </div>
      </div>
    )
  },
} 