/**
 * DialogコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - プライマリウィンドウまたは他のダイアログウィンドウの上に重ねられるウィンドウ
 * - 下のコンテンツを無効化して表示
 * - モーダルダイアログとして機能
 * 
 * 主な仕様:
 * - フォーカス管理
 * - キーボードナビゲーション
 * - アクセシビリティ対応
 * - カスタマイズ可能なヘッダー、フッター
 * - フォームとの統合
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  DownloadIcon,
  UploadIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  LinkIcon,
  ExternalLinkIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  HelpCircleIcon,
  SearchIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  GridIcon,
  ListIcon,
  ColumnsIcon,
  LayersIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  WifiIcon,
  BluetoothIcon,
  BatteryIcon,
  PowerIcon,
  LockIcon,
  UnlockIcon,
  ShieldIcon,
  KeyIcon,
  FingerprintIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCogIcon,
  UserSearchIcon,
  UserCircleIcon,
  CircleIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleXIcon,
  SquareIcon,
  SquareCheckIcon,
  SquareXIcon,
  TriangleIcon,
  TriangleAlertIcon,
  HexagonIcon,
  OctagonIcon,
  DiamondIcon,
  ZapIcon,
  FlameIcon,
  DropletsIcon,
  SunIcon,
  MoonIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudLightningIcon,
  WindIcon,
  UmbrellaIcon,
  SnowflakeIcon,
  ThermometerIcon,
  GaugeIcon,
  ActivityIcon,
  BarChartIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  CreditCardIcon,
  ReceiptIcon,
  WalletIcon,
  PiggyBankIcon,
  CoinsIcon,
  BanknoteIcon,
  CalculatorIcon,
  PercentIcon,
  HashIcon,
  AtSignIcon,
} from "lucide-react"

/**
 * Dialogコンポーネントのメタデータ
 */
const meta: Meta<typeof Dialog> = {
  title: "Components/UI/Dialog",
  component: Dialog,
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
 * 基本的なDialogストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Dialog</CardTitle>
        <CardDescription>
          shadcn/ui公式例のDialog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  ),
}

/**
 * シンプルなDialogストーリー
 */
export const Simple: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Dialog</CardTitle>
        <CardDescription>
          シンプルな確認ダイアログ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Delete Item</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">Delete Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  ),
}

/**
 * フォーム付きDialogストーリー
 */
export const Form: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Form Dialog</CardTitle>
        <CardDescription>
          フォーム付きのダイアログ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new blog post.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter post title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter post description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Enter category" />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Technology</Badge>
                <Badge variant="secondary">Design</Badge>
                <Badge variant="secondary">Development</Badge>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムクローズボタン付きDialogストーリー
 */
export const CustomCloseButton: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Custom Close Button</CardTitle>
        <CardDescription>
          カスタムクローズボタン付きのダイアログ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
              <Button size="icon" variant="outline">
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  ),
}

/**
 * 情報表示Dialogストーリー
 */
export const Information: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Information Dialog</CardTitle>
        <CardDescription>
          情報表示用のダイアログ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle>
              <DialogDescription>
                Detailed information about the user profile.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-semantic-border rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-semantic-fg-subtle" />
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined January 2023</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button>Edit Profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  ),
}

/**
 * 警告Dialogストーリー
 */
export const Warning: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Warning Dialog</CardTitle>
        <CardDescription>
          警告メッセージ付きのダイアログ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <AlertCircleIcon className="h-5 w-5 text-destructive" />
                <DialogTitle>Delete Project</DialogTitle>
              </div>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                project and remove all associated data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Warning
                </span>
              </div>
              <p className="text-sm text-destructive/80 mt-1">
                All project files, settings, and team access will be permanently removed.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">Delete Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  ),
} 