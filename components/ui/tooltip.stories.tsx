import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Info, HelpCircle, Settings, Download, Trash2, Edit, Eye } from "lucide-react"

const meta: Meta<typeof Tooltip> = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip (in milliseconds)",
    },
    disableHoverableContent: {
      control: "boolean",
      description: "Whether to disable hoverable content",
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なTooltip（公式サイトと同じ）
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
         <Button variant="outline" className="button-standard">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 情報アイコン付きTooltip
 */
export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
         <Button variant="ghost" size="icon" className="button-standard">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>この機能についての詳細情報</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * ヘルプアイコン付きTooltip
 */
export const HelpTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
         <Button variant="ghost" size="icon" className="button-standard">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>ヘルプとサポート</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 設定アイコン付きTooltip
 */
export const SettingsTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
           <Button variant="ghost" size="icon" className="button-standard">
          <Settings className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>設定を開く</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * アクションボタン付きTooltip
 */
export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
           <Button variant="ghost" size="icon" className="button-standard">
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ダウンロード</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
           <Button variant="ghost" size="icon" className="button-standard">
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>編集</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>プレビュー</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>削除</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

/**
 * 長いテキストのTooltip
 */
export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
         <Button variant="outline" className="button-standard">詳細情報</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>これは非常に長い説明文です。Tooltipは自動的に幅を調整し、適切に表示されます。</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 複数行のTooltip
 */
export const MultiLine: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
         <Button variant="outline" className="button-standard">複数行</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-medium">タイトル</p>
          <p className="text-sm text-muted-foreground">説明文がここに表示されます</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * カスタム遅延時間のTooltip
 */
export const CustomDelay: Story = {
  render: () => (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="outline" className="button-standard">遅延あり</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>1秒後に表示されます</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 無効化されたTooltip
 */
export const Disabled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" disabled className="button-standard">
          無効化されたボタン
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>このボタンは無効化されています</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * テキストリンクのTooltip
 */
export const TextLink: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-semantic-accent underline cursor-help">
          ホバーしてください
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>テキストリンクのTooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 画像のTooltip
 */
export const ImageTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-16 h-16 bg-semantic-border rounded cursor-help flex items-center justify-center">
          <span className="text-xs text-semantic-fg-subtle">画像</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>画像の説明</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * フォーム要素のTooltip
 */
export const FormElement: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <label htmlFor="email" className="text-sm font-medium">
        メールアドレス
      </label>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Info className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>有効なメールアドレスを入力してください</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
} 