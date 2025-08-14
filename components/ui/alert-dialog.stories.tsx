/**
 * Alert DialogコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 重要なコンテンツを表示し、ユーザーの応答を期待するモーダルダイアログ
 * - 削除確認、重要な操作の確認などに使用
 * - ユーザーの操作を中断して注意を引く
 * 
 * 主な仕様:
 * - モーダルダイアログ表示
 * - アクセシビリティ対応
 * - キーボードナビゲーション
 * - フォーカス管理
 * - キャンセル/確認ボタン
 * 
 * 制限事項:
 * - Radix UIに依存
 * - ユーザーの応答が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trash2Icon, 
  LogOutIcon, 
  AlertTriangleIcon,
  ShieldIcon,
  UserIcon,
  SettingsIcon,
  DatabaseIcon,
  GlobeIcon,
  LockIcon,
  UnlockIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  UploadIcon,
  RefreshCwIcon,
  PowerIcon,
  XIcon,
  CheckIcon,
  AlertCircleIcon,
  InfoIcon,
} from "lucide-react"

/**
 * Alert Dialogコンポーネントのメタデータ
 */
const meta: Meta<typeof AlertDialog> = {
  title: "Components/UI/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なAlert Dialogストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Basic Alert Dialog</CardTitle>
          <CardDescription>
            Simple confirmation dialog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 削除確認Alert Dialogストーリー
 */
export const DeleteConfirmation: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete Confirmation</CardTitle>
          <CardDescription>
            Confirm file deletion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2Icon className="h-4 w-4" />
                Delete File
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-destructive" />
                  Delete File
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "document.pdf"? This action cannot be undone and the file will be permanently removed from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ログアウト確認Alert Dialogストーリー
 */
export const LogoutConfirmation: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Logout Confirmation</CardTitle>
          <CardDescription>
            Confirm user logout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <LogOutIcon className="h-4 w-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <LogOutIcon className="h-5 w-5" />
                  Logout
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout? Any unsaved changes will be lost and you'll need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
                <AlertDialogAction>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * アカウント削除Alert Dialogストーリー
 */
export const AccountDeletion: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Account Deletion</CardTitle>
          <CardDescription>
            Permanent account removal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-destructive" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers. Please make sure you have backed up any important information.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 設定リセットAlert Dialogストーリー
 */
export const SettingsReset: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Settings Reset</CardTitle>
          <CardDescription>
            Reset to default settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCwIcon className="h-4 w-4" />
                Reset Settings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Reset Settings
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all your application settings to their default values. Your personal data will not be affected, but all customizations will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Settings</AlertDialogCancel>
                <AlertDialogAction>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * データエクスポートAlert Dialogストーリー
 */
export const DataExport: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Export user data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <DownloadIcon className="h-4 w-4" />
                Export Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5" />
                  Export Data
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will export all your data including profile information, settings, and activity history. The export may take a few minutes to complete and will be sent to your email address.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Export</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * システム更新Alert Dialogストーリー
 */
export const SystemUpdate: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>System Update</CardTitle>
          <CardDescription>
            Confirm system restart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <PowerIcon className="h-4 w-4" />
                Restart System
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                  System Restart Required
                </AlertDialogTitle>
                <AlertDialogDescription>
                  A system update has been installed and requires a restart to take effect. All unsaved work will be lost. Do you want to restart now or later?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Later</AlertDialogCancel>
                <AlertDialogAction>Restart Now</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  },
} 