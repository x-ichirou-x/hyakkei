/**
 * SheetコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - Dialogコンポーネントを拡張して、画面のメインコンテンツを補完するコンテンツを表示
 * - サイドからスライドインするオーバーレイ
 * - フォーム、設定、詳細情報の表示に適している
 * 
 * 主な仕様:
 * - 4方向からの表示（top, right, bottom, left）
 * - カスタマイズ可能なサイズ
 * - アクセシビリティ対応
 * - アニメーション付きの表示/非表示
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
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
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCogIcon,
  UserSearchIcon,
  UserCircleIcon,
  SettingsIcon,
  BellIcon,
  LockIcon,
  UnlockIcon,
  ShieldIcon,
  KeyIcon,
  FingerprintIcon,
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
  PowerIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
} from "lucide-react"

/**
 * Sheetコンポーネントのメタデータ
 */
const meta: Meta<typeof Sheet> = {
  title: "Components/UI/Sheet",
  component: Sheet,
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
 * 基本的なSheetストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Sheet</CardTitle>
        <CardDescription>
          shadcn/ui公式例のSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * 右側Sheetストーリー
 */
export const RightSide: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Right Side Sheet</CardTitle>
        <CardDescription>
          右側から表示されるSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Right Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Configure your application settings here.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Notifications</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email notifications</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push notifications</Label>
                  <Switch id="push-notifications" defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Privacy</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-visible">Profile visible</Label>
                  <Switch id="profile-visible" defaultChecked />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * 左側Sheetストーリー
 */
export const LeftSide: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Left Side Sheet</CardTitle>
        <CardDescription>
          左側から表示されるSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Left Sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Quick access to your favorite pages.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <HomeIcon className="h-4 w-4" />
                  <span>Home</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <BarChartIcon className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <UsersIcon className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <DatabaseIcon className="h-4 w-4" />
                  <span>Data</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                  <HelpCircleIcon className="h-4 w-4" />
                  <span>Help</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * 上側Sheetストーリー
 */
export const TopSide: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Top Side Sheet</CardTitle>
        <CardDescription>
          上側から表示されるSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Top Sheet</Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
              <SheetDescription>
                Access frequently used actions and shortcuts.
              </SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <PlusIcon className="h-6 w-6" />
                <span>New Project</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UploadIcon className="h-6 w-6" />
                <span>Upload File</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ShareIcon className="h-6 w-6" />
                <span>Share</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DownloadIcon className="h-6 w-6" />
                <span>Export</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * 下側Sheetストーリー
 */
export const BottomSide: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bottom Side Sheet</CardTitle>
        <CardDescription>
          下側から表示されるSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Comments</SheetTitle>
              <SheetDescription>
                View and add comments to this item.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <UserIcon className="h-6 w-6 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm mt-1">Great work on this project!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <UserIcon className="h-6 w-6 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Jane Smith</span>
                      <span className="text-xs text-muted-foreground">1 hour ago</span>
                    </div>
                    <p className="text-sm mt-1">I agree, this looks amazing!</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="comment">Add a comment</Label>
                <Input id="comment" placeholder="Write your comment..." />
                <Button size="sm">Post Comment</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムサイズSheetストーリー
 */
export const CustomSize: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Custom Size Sheet</CardTitle>
        <CardDescription>
          カスタムサイズのSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Custom Size Sheet</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Advanced Settings</SheetTitle>
              <SheetDescription>
                Configure advanced settings for your application.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cache-enabled">Enable caching</Label>
                      <Switch id="cache-enabled" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compression">Enable compression</Label>
                      <Switch id="compression" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Security</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-factor authentication</Label>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="session-timeout">Session timeout</Label>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Apply Settings</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
}

/**
 * フォームSheetストーリー
 */
export const FormSheet: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Form Sheet</CardTitle>
        <CardDescription>
          フォームを含むSheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Form Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New User</SheetTitle>
              <SheetDescription>
                Add a new user to the system. Fill in all required fields.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter first name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter last name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select id="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="">Select a role</option>
                  <option value="admin">Administrator</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Active account</Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Create User</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  ),
} 