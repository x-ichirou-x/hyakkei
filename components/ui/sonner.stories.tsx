import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Button } from "./button"
import { Toaster } from "./sonner"

const meta: Meta<typeof Toaster> = {
  title: "Components/UI/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Position of the toast notifications",
    },
    richColors: {
      control: "boolean",
      description: "Whether to use rich colors for the toast",
    },
    closeButton: {
      control: "boolean",
      description: "Whether to show close button",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なトースト（公式サイトと同じ）
 */
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * シンプルなトースト
 */
export const Simple: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast("シンプルなメッセージ")}
      >
        シンプルトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 成功トースト
 */
export const Success: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast.success("保存が完了しました")}
      >
        成功トースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * エラートースト
 */
export const Error: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast.error("エラーが発生しました")}
      >
        エラートースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 警告トースト
 */
export const Warning: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast.warning("注意が必要です")}
      >
        警告トースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 情報トースト
 */
export const Info: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast.info("新しい情報があります")}
      >
        情報トースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * アクション付きトースト
 */
export const WithAction: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("ファイルが削除されました", {
            description: "削除されたファイルは復元できません",
            action: {
              label: "元に戻す",
              onClick: () => console.log("元に戻す"),
            },
          })
        }
      >
        アクション付きトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 説明付きトースト
 */
export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("アップロード完了", {
            description: "3つのファイルが正常にアップロードされました",
          })
        }
      >
        説明付きトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 複数のトースト
 */
export const Multiple: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => toast.success("成功メッセージ")}
        >
          成功
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("エラーメッセージ")}
        >
          エラー
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("警告メッセージ")}
        >
          警告
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("情報メッセージ")}
        >
          情報
        </Button>
      </div>
      <Toaster />
    </div>
  ),
}

/**
 * カスタム位置のトースト
 */
export const CustomPosition: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast("カスタム位置のトースト")}
      >
        カスタム位置
      </Button>
      <Toaster position="bottom-left" />
    </div>
  ),
}

/**
 * リッチカラーのトースト
 */
export const RichColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast.success("リッチカラーのトースト")}
      >
        リッチカラー
      </Button>
      <Toaster richColors />
    </div>
  ),
}

/**
 * 長時間表示トースト
 */
export const LongDuration: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast("長時間表示されるトースト", { duration: 10000 })}
      >
        長時間表示
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 手動で閉じるトースト
 */
export const ManualClose: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => toast("手動で閉じるトースト", { duration: Infinity })}
      >
        手動で閉じる
      </Button>
      <Toaster />
    </div>
  ),
} 