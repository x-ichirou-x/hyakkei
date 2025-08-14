/**
 * ComboboxコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 自動補完入力とコマンドパレット機能を持つコンポーネント
 * - 検索可能なドロップダウン選択機能
 * - 様々なユースケースに対応
 * 
 * 主な仕様:
 * - 基本的なCombobox
 * - フォーム統合
 * - カスタマイズ可能なオプション
 * - 無効化状態
 * - カスタムスタイル
 * 
 * 制限事項:
 * - PopoverとCommandコンポーネントに依存
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import { ResponsiveCombobox, type ResponsiveComboboxOption } from "@/components/ui/combobox-responsive"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

/**
 * Comboboxコンポーネントのメタデータ
 */
const meta: Meta<typeof Combobox> = {
  title: "Components/UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "選択可能なオプションの配列",
    },
    value: {
      control: "text",
      description: "現在選択されている値",
    },
    placeholder: {
      control: "text",
      description: "トリガーボタンのプレースホルダー",
    },
    searchPlaceholder: {
      control: "text",
      description: "検索入力のプレースホルダー",
    },
    disabled: {
      control: "boolean",
      description: "無効化フラグ",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なComboboxストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {
    options: [
      { value: "next.js", label: "Next.js" },
      { value: "sveltekit", label: "SvelteKit" },
      { value: "nuxt.js", label: "Nuxt.js" },
      { value: "remix", label: "Remix" },
      { value: "astro", label: "Astro" },
    ],
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Framework Selection</CardTitle>
          <CardDescription>
            Choose your preferred framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
          />
          {value && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {value}
            </p>
          )}
        </CardContent>
      </Card>
    )
  },
}

/**
 * プログラミング言語選択ストーリー
 */
export const ProgrammingLanguages: Story = {
  args: {
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "csharp", label: "C#" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "swift", label: "Swift" },
      { value: "kotlin", label: "Kotlin" },
      { value: "php", label: "PHP" },
    ],
    placeholder: "Select programming language...",
    searchPlaceholder: "Search languages...",
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Programming Language</CardTitle>
          <CardDescription>
          Select your primary programming language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * 国選択ストーリー
 */
export const Countries: Story = {
  args: {
    options: [
      { value: "us", label: "United States" },
      { value: "jp", label: "Japan" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "it", label: "Italy" },
      { value: "es", label: "Spain" },
      { value: "br", label: "Brazil" },
    ],
    placeholder: "Select country...",
    searchPlaceholder: "Search countries...",
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Country Selection</CardTitle>
          <CardDescription>
            Choose your country of residence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * 無効化状態のComboboxストーリー
 */
export const Disabled: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    placeholder: "Select option...",
    disabled: true,
  },
  render: (args) => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Disabled Combobox</CardTitle>
          <CardDescription>
            This combobox is disabled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox {...args} />
        </CardContent>
      </Card>
    )
  },
}

/**
 * フォーム統合ストーリー
 */
export const FormIntegration: Story = {
  render: () => {
    const formSchema = z.object({
      language: z.string().min(1, "Please select a language."),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    const languages: ComboboxOption[] = [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
    ]

    function onSubmit(data: z.infer<typeof formSchema>) {
      console.log("Form data:", data)
    }

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Language Selection Form</CardTitle>
          <CardDescription>
            Select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Combobox
                        options={languages}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select language"
                        searchPlaceholder="Search languages..."
                      />
                    </FormControl>
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムスタイルのComboboxストーリー
 */
export const CustomStyle: Story = {
  args: {
    options: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "purple", label: "Purple" },
    ],
    placeholder: "Choose a color...",
    searchPlaceholder: "Search colors...",
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Color Selection</CardTitle>
          <CardDescription>
            Select your favorite color
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
            triggerClassName="w-full justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
            contentClassName="w-full"
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * 複数選択可能なオプション付きストーリー
 */
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "basic", label: "Basic Plan" },
      { value: "pro", label: "Pro Plan" },
      { value: "enterprise", label: "Enterprise Plan", disabled: true },
      { value: "custom", label: "Custom Plan", disabled: true },
    ],
    placeholder: "Select plan...",
    searchPlaceholder: "Search plans...",
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Plan Selection</CardTitle>
          <CardDescription>
            Choose your subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            * Enterprise and Custom plans are currently unavailable
          </p>
        </CardContent>
      </Card>
    )
  },
}

/**
 * レスポンシブComboboxストーリー（shadcn/ui公式例）
 */
export const Responsive: Story = {
  render: () => {
    const statuses: ResponsiveComboboxOption[] = [
      { value: "backlog", label: "Backlog" },
      { value: "todo", label: "Todo" },
      { value: "in progress", label: "In Progress" },
      { value: "done", label: "Done" },
      { value: "canceled", label: "Canceled" },
    ]

    const [selectedStatus, setSelectedStatus] = React.useState("")

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Responsive Combobox</CardTitle>
          <CardDescription>
            Desktop: Popover, Mobile: Drawer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveCombobox
            options={statuses}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            placeholder="+ Set status"
            searchPlaceholder="Filter status..."
            emptyMessage="No results found."
          />
          {selectedStatus && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {selectedStatus}
            </p>
          )}
        </CardContent>
      </Card>
    )
  },
} 