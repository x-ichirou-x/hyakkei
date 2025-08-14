/**
 * SeparatorコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - コンテンツを視覚的または意味的に分離するコンポーネント
 * - 水平・垂直方向のセパレーター
 * - レイアウトの整理と視覚的な区切りを提供
 * 
 * 主な仕様:
 * - 水平・垂直方向の配置
 * - カスタマイズ可能なスタイル
 * - アクセシビリティ対応
 * - レスポンシブ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - 単純な区切り線として機能
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  LockIcon,
  UnlockIcon,
  ShieldIcon,
  KeyIcon,
  FingerprintIcon,
  SettingsIcon,
  HomeIcon,
} from "lucide-react"

/**
 * Separatorコンポーネントのメタデータ
 */
const meta: Meta<typeof Separator> = {
  title: "Components/UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なSeparatorストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Separator</CardTitle>
        <CardDescription>
          shadcn/ui公式例のSeparator
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-1">
            <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
            <p className="text-muted-foreground text-sm">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * 水平Separatorストーリー
 */
export const Horizontal: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Horizontal Separators</CardTitle>
        <CardDescription>
          水平方向のセパレーター
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Section 1</h4>
          <p className="text-sm text-muted-foreground mt-1">
            This is the first section of content.
          </p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Section 2</h4>
          <p className="text-sm text-muted-foreground mt-1">
            This is the second section of content.
          </p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Section 3</h4>
          <p className="text-sm text-muted-foreground mt-1">
            This is the third section of content.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * 垂直Separatorストーリー
 */
export const Vertical: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Vertical Separators</CardTitle>
        <CardDescription>
          垂直方向のセパレーター
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <MailIcon className="h-4 w-4" />
            <span>Messages</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * ナビゲーションSeparatorストーリー
 */
export const Navigation: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Navigation Separators</CardTitle>
        <CardDescription>
          ナビゲーションでのセパレーター使用例
        </CardDescription>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <HomeIcon className="h-4 w-4" />
            <span className="text-sm">Home</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <BarChartIcon className="h-4 w-4" />
            <span className="text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <UsersIcon className="h-4 w-4" />
            <span className="text-sm">Users</span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <DatabaseIcon className="h-4 w-4" />
            <span className="text-sm">Data</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <ActivityIcon className="h-4 w-4" />
            <span className="text-sm">Analytics</span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <SettingsIcon className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <HelpCircleIcon className="h-4 w-4" />
            <span className="text-sm">Help</span>
          </div>
        </nav>
      </CardContent>
    </Card>
  ),
}

/**
 * フォームSeparatorストーリー
 */
export const Form: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Form Separators</CardTitle>
        <CardDescription>
          フォームでのセパレーター使用例
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Personal Information</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">First Name</label>
              <div className="h-8 bg-muted rounded px-3 py-1 text-sm">John</div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Last Name</label>
              <div className="h-8 bg-muted rounded px-3 py-1 text-sm">Doe</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Information</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <div className="h-8 bg-muted rounded px-3 py-1 text-sm">john.doe@example.com</div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Phone</label>
              <div className="h-8 bg-muted rounded px-3 py-1 text-sm">+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <div>
            <label className="text-xs text-muted-foreground">Street Address</label>
            <div className="h-8 bg-muted rounded px-3 py-1 text-sm">123 Main St</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * カードSeparatorストーリー
 */
export const CardSeparators: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Separators</CardTitle>
        <CardDescription>
          カード内でのセパレーター使用例
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="text-sm font-medium">User Profile</span>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Name</div>
              <div>John Doe</div>
            </div>
            <div>
              <div className="text-muted-foreground">Role</div>
              <div>Administrator</div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <Button size="sm" variant="outline">
              <EditIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムスタイルSeparatorストーリー
 */
export const CustomStyles: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Custom Styles</CardTitle>
        <CardDescription>
          カスタムスタイルのセパレーター
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Default Separator</h4>
          <div className="space-y-2">
            <div>Content above</div>
            <Separator />
            <div>Content below</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Thick Separator</h4>
          <div className="space-y-2">
            <div>Content above</div>
            <Separator className="h-px bg-foreground" />
            <div>Content below</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Colored Separator</h4>
          <div className="space-y-2">
            <div>Content above</div>
            <Separator className="bg-semantic-accent" />
            <div>Content below</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Dashed Separator</h4>
          <div className="space-y-2">
            <div>Content above</div>
            <Separator className="border-dashed" />
            <div>Content below</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Vertical Separators</h4>
          <div className="flex items-center space-x-4 text-sm">
            <div>Left</div>
            <Separator orientation="vertical" />
            <div>Center</div>
            <Separator orientation="vertical" className="h-6" />
            <div>Right</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
} 