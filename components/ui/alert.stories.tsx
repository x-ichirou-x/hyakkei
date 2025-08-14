/**
 * AlertコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ユーザーの注意を引くためのコールアウト表示
 * - アイコン、タイトル、説明文を含む
 * - 様々なバリアント（default、destructive）をサポート
 * 
 * 主な仕様:
 * - Alert: メインのアラートコンテナ
 * - AlertTitle: アラートのタイトル
 * - AlertDescription: アラートの説明文
 * - variant: "default" | "destructive" - アラートのスタイル
 * - アイコン: Lucide Reactアイコンをサポート
 * 
 * 制限事項:
 * - アイコンは子要素として配置する必要がある
 */

import type { Meta, StoryObj } from "@storybook/react"
import { 
  AlertCircleIcon, 
  CheckCircle2Icon, 
  PopcornIcon,
  InfoIcon,
  AlertTriangleIcon,
  XCircleIcon
} from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

/**
 * Alertコンポーネントのメタデータ
 */
const meta: Meta<typeof Alert> = {
  title: "Components/UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      description: "アラートのバリアント",
      options: ["default", "destructive"],
    },
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
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
 * 基本的なアラートストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>
            This is an alert with icon, title and description.
          </AlertDescription>
        </Alert>
        <Alert>
          <PopcornIcon />
          <AlertTitle>
            This Alert has a title and an icon. No description.
          </AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * 成功アラートストーリー
 */
export const Success: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle>操作が完了しました</AlertTitle>
          <AlertDescription>
            データの保存が正常に完了しました。変更内容は即座に反映されています。
          </AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle>アカウントが作成されました</AlertTitle>
          <AlertDescription>
            新しいアカウントが正常に作成されました。メールアドレスに確認メールを送信しました。
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * 情報アラートストーリー
 */
export const Info: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>システムメンテナンスのお知らせ</AlertTitle>
          <AlertDescription>
            2024年1月15日（月）の午前2時から4時まで、システムメンテナンスを実施いたします。
            この間はサービスが利用できませんので、ご了承ください。
          </AlertDescription>
        </Alert>
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>新しい機能が追加されました</AlertTitle>
          <AlertDescription>
            ダッシュボードに新しい分析機能が追加されました。より詳細なデータ分析が可能になります。
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * 警告アラートストーリー
 */
export const Warning: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>ストレージ容量の警告</AlertTitle>
          <AlertDescription>
            ストレージの使用量が80%に達しています。不要なファイルを削除するか、容量を増やすことをお勧めします。
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>セキュリティの警告</AlertTitle>
          <AlertDescription>
            最後のパスワード変更から90日が経過しています。セキュリティのため、パスワードの変更をお勧めします。
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * エラーアラートストーリー
 */
export const Error: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert variant="destructive">
          <XCircleIcon className="h-4 w-4" />
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>
            データの保存中にエラーが発生しました。しばらく時間をおいてから再度お試しください。
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>認証に失敗しました</AlertTitle>
          <AlertDescription>
            <p>ログインに失敗しました。以下の点をご確認ください：</p>
            <ul className="list-inside list-disc text-sm mt-2">
              <li>メールアドレスとパスワードが正しいか</li>
              <li>アカウントがロックされていないか</li>
              <li>インターネット接続が安定しているか</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * タイトルのみのアラートストーリー
 */
export const TitleOnly: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>重要な通知</AlertTitle>
        </Alert>
        <Alert>
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle>更新が完了しました</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <XCircleIcon className="h-4 w-4" />
          <AlertTitle>接続が切断されました</AlertTitle>
        </Alert>
      </div>
    )
  },
}

/**
 * 説明文のみのアラートストーリー
 */
export const DescriptionOnly: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            このページでは、アカウントの設定を変更できます。変更内容は自動的に保存されます。
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertDescription>
            この操作は取り消すことができません。実行前に内容をよくご確認ください。
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>
            セッションが期限切れになりました。再度ログインしてください。
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * カスタムスタイルのアラートストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert className="border-semantic-accent/30 bg-semantic-bg">
          <InfoIcon className="h-4 w-4 text-semantic-accent" />
          <AlertTitle className="text-semantic-accent">カスタムスタイル</AlertTitle>
          <AlertDescription className="text-semantic-fg">
            このアラートはカスタムスタイルが適用されています。
          </AlertDescription>
        </Alert>
        <Alert className="border-semantic-success/30 bg-semantic-bg">
          <CheckCircle2Icon className="h-4 w-4 text-semantic-success" />
          <AlertTitle className="text-semantic-success">成功メッセージ</AlertTitle>
          <AlertDescription className="text-semantic-fg">
            緑色のカスタムスタイルが適用されたアラートです。
          </AlertDescription>
        </Alert>
        <Alert className="border-purple-200 bg-purple-50">
          <PopcornIcon className="h-4 w-4 text-purple-600" />
          <AlertTitle className="text-purple-800">特別なお知らせ</AlertTitle>
          <AlertDescription className="text-purple-700">
            紫色のカスタムスタイルが適用されたアラートです。
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

/**
 * 複雑なコンテンツのアラートストーリー
 */
export const ComplexContent: Story = {
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>システムアップデートの詳細</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>新しいバージョンが利用可能です。以下の改善が含まれています：</p>
              <ul className="list-inside list-disc text-sm space-y-1">
                <li>パフォーマンスの向上</li>
                <li>セキュリティの強化</li>
                <li>新しい機能の追加</li>
                <li>バグの修正</li>
              </ul>
              <p className="text-sm font-medium mt-3">
                更新には約5分かかります。作業中のデータは自動的に保存されます。
              </p>
            </div>
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>セキュリティ警告</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>アカウントに異常なアクティビティが検出されました：</p>
              <div className="bg-red-50 p-2 rounded text-sm">
                <p><strong>日時:</strong> 2024年1月10日 15:30</p>
                <p><strong>場所:</strong> 東京, 日本</p>
                <p><strong>デバイス:</strong> 不明なデバイス</p>
              </div>
              <p className="text-sm">
                心当たりがない場合は、すぐにパスワードを変更してください。
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  },
} 