/**
 * TextareaコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - フォームのテキストエリアまたはテキストエリアのように見えるコンポーネント
 * - 複数行のテキスト入力に適している
 * - アクセシビリティに配慮された設計
 * 
 * 主な仕様:
 * - placeholder: プレースホルダーテキスト
 * - disabled: 無効化状態
 * - id: ラベルとの関連付け用ID
 * - className: カスタムスタイル用クラス
 * - resize: リサイズ可能かどうか
 * 
 * 制限事項:
 * - フォームライブラリとの組み合わせが必要な場合がある
 */

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

/**
 * Textareaコンポーネントのメタデータ
 */
const meta: Meta<typeof Textarea> = {
  title: "Components/UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    disabled: {
      control: "boolean",
      description: "無効化状態",
    },
    id: {
      control: "text",
      description: "ラベルとの関連付け用ID",
    },
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なテキストエリアストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {},
  render: () => {
    return <Textarea placeholder="Type your message here." />
  },
}

/**
 * 無効化されたテキストエリアストーリー（shadcn/ui公式例）
 */
export const Disabled: Story = {
  args: {},
  render: () => {
    return <Textarea placeholder="Type your message here." disabled />
  },
}

/**
 * ラベル付きのテキストエリアストーリー（shadcn/ui公式例）
 */
export const WithLabel: Story = {
  args: {},
  render: () => {
    return (
      <div className="grid w-full gap-3">
        <Label htmlFor="message">Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    )
  },
}

/**
 * 説明文付きのテキストエリアストーリー（shadcn/ui公式例）
 */
export const WithText: Story = {
  args: {},
  render: () => {
    return (
      <div className="grid w-full gap-3">
        <Label htmlFor="message-2">Your Message</Label>
        <Textarea placeholder="Type your message here." id="message-2" />
        <p className="text-muted-foreground text-sm">
          Your message will be copied to the support team.
        </p>
      </div>
    )
  },
}

/**
 * ボタン付きのテキストエリアストーリー（shadcn/ui公式例）
 */
export const WithButton: Story = {
  args: {},
  render: () => {
    return (
      <div className="grid w-full gap-2">
        <Textarea placeholder="Type your message here." />
        <Button>Send message</Button>
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
      bio: z
        .string()
        .min(10, {
          message: "Bio must be at least 10 characters.",
        })
        .max(160, {
          message: "Bio must not be longer than 30 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
      console.log("フォームデータ:", data)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}

/**
 * 状態管理付きのテキストエリアストーリー
 */
export const WithState: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="space-y-4">
        <div className="grid w-full gap-3">
          <Label htmlFor="state-textarea">状態管理付きテキストエリア</Label>
          <Textarea
            id="state-textarea"
            placeholder="テキストを入力してください..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          文字数: {value.length} / 500
        </div>
      </div>
    )
  },
}

/**
 * 複数のテキストエリアストーリー
 */
export const MultipleTextareas: Story = {
  args: {},
  render: () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      notes: "",
    })

    const handleChange = (field: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-medium">フォーム例</h3>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="title">タイトル</Label>
            <Textarea
              id="title"
              placeholder="タイトルを入力してください"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              placeholder="説明を入力してください"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="notes">メモ</Label>
            <Textarea
              id="notes"
              placeholder="メモを入力してください（任意）"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * カスタムスタイルのテキストエリアストーリー
 */
export const CustomStyle: Story = {
  args: {},
  render: () => {
    return (
      <div className="space-y-4">
        <div className="grid w-full gap-3">
          <Label htmlFor="custom-textarea">カスタムスタイル</Label>
          <Textarea
            id="custom-textarea"
            placeholder="カスタムスタイルが適用されたテキストエリア"
            className="border-2 border-semantic-accent focus:border-semantic-accent bg-semantic-bg focus:bg-semantic-bg resize-none"
            rows={4}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          青いボーダーと背景色が適用されています
        </p>
      </div>
    )
  },
}

/**
 * リサイズ不可のテキストエリアストーリー
 */
export const NoResize: Story = {
  args: {},
  render: () => {
    return (
      <div className="grid w-full gap-3">
        <Label htmlFor="no-resize">リサイズ不可</Label>
        <Textarea
          id="no-resize"
          placeholder="このテキストエリアはリサイズできません"
          className="resize-none"
          rows={4}
        />
      </div>
    )
  },
} 