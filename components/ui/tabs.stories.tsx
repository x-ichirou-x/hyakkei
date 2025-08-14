/**
 * TabsコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - レイヤー化されたコンテンツセクション（タブパネル）のセット
 * - 一度に1つのパネルのみ表示
 * - コンテンツの整理とナビゲーション
 * 
 * 主な仕様:
 * - タブの切り替え機能
 * - アクセシビリティ対応
 * - キーボードナビゲーション
 * - カスタマイズ可能なスタイル
 * - フォームとの統合
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
  SettingsIcon,
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
 * Tabsコンポーネントのメタデータ
 */
const meta: Meta<typeof Tabs> = {
  title: "Components/UI/Tabs",
  component: Tabs,
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
 * 基本的なTabsストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Basic Tabs</CardTitle>
        <CardDescription>
          shadcn/ui公式例のTabs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
}

/**
 * シンプルなTabsストーリー
 */
export const Simple: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Simple Tabs</CardTitle>
        <CardDescription>
          シンプルなタブコンポーネント
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Overview</h3>
              <p className="text-sm text-muted-foreground">
                This is the overview tab content. Here you can see a summary of your data.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Total Users</span>
                  </div>
                  <p className="text-2xl font-bold">1,234</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <ActivityIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <p className="text-2xl font-bold">892</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Growth</span>
                  </div>
                  <p className="text-2xl font-bold">+12%</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Detailed analytics and insights about your data.
              </p>
            </div>
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Analytics Chart Placeholder</p>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Reports</h3>
              <p className="text-sm text-muted-foreground">
                Generate and view detailed reports.
              </p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Manage your notification preferences.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
}

/**
 * アイコン付きTabsストーリー
 */
export const WithIcons: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Tabs with Icons</CardTitle>
        <CardDescription>
          アイコン付きのタブコンポーネント
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldIcon className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCardIcon className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Manage your profile information and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your application settings.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark mode</span>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <Button variant="outline" size="sm">English</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">
                Manage your security settings and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="billing" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Billing</h3>
              <p className="text-sm text-muted-foreground">
                Manage your billing information and subscription.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Plan</span>
                <Badge variant="secondary">Pro</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Billing</span>
                <span className="text-sm text-muted-foreground">March 15, 2024</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
}

/**
 * 垂直Tabsストーリー
 */
export const Vertical: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Vertical Tabs</CardTitle>
        <CardDescription>
          垂直配置のタブコンポーネント
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              <TabsList className="grid w-full grid-cols-1 h-fit">
                <TabsTrigger value="general" className="justify-start">
                  General
                </TabsTrigger>
                <TabsTrigger value="appearance" className="justify-start">
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="justify-start">
                  Privacy
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="col-span-3">
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">General Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your general application settings.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="My App" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-description">Description</Label>
                    <Textarea id="app-description" placeholder="Describe your application" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the appearance of your application.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <Button variant="outline" size="sm">Light</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Font Size</span>
                    <Button variant="outline" size="sm">Medium</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your notification preferences.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="privacy" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Control your privacy settings and data sharing.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Collection</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analytics</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムスタイルTabsストーリー
 */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Custom Style Tabs</CardTitle>
        <CardDescription>
          カスタムスタイルのタブコンポーネント
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Overview</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is the overview content with custom styling.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Analytics content with custom styling.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="mt-6 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Reports</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Reports content with custom styling.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
} 