/**
 * ResizableコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - アクセシブルなリサイズ可能なパネルグループとレイアウト
 * - キーボードサポート付き
 * - react-resizable-panels by bvaughnをベースに構築
 * 
 * 主な仕様:
 * - 水平・垂直方向のリサイズ
 * - ハンドルの表示/非表示制御
 * - デフォルトサイズの設定
 * - アクセシビリティ対応
 * 
 * 制限事項:
 * - react-resizable-panelsに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutIcon,
  SidebarIcon,
  FileTextIcon,
  CodeIcon,
  SettingsIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
  SearchIcon,
  FilterIcon,
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
  PhoneIcon,
  MapPinIcon,
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
  SortAscIcon,
  SortDescIcon,
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
} from "lucide-react"

/**
 * Resizableコンポーネントのメタデータ
 */
const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/UI/Resizable",
  component: ResizablePanelGroup,
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
 * 基本的なResizableストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Basic Resizable</CardTitle>
        <CardDescription>
          shadcn/ui公式例のResizable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-md rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  ),
}

/**
 * 垂直方向Resizableストーリー
 */
export const Vertical: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Vertical Resizable</CardTitle>
        <CardDescription>
          垂直方向のリサイズ可能パネル
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/50">
              <div className="text-center">
                <LayoutIcon className="h-8 w-8 mx-auto mb-2" />
                <span className="font-semibold">Header</span>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <FileTextIcon className="h-8 w-8 mx-auto mb-2" />
                <span className="font-semibold">Content</span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  ),
}

/**
 * ハンドル付きResizableストーリー
 */
export const WithHandle: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Resizable with Handle</CardTitle>
        <CardDescription>
          ハンドル付きのリサイズ可能パネル
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/50">
              <div className="text-center">
                <SidebarIcon className="h-8 w-8 mx-auto mb-2" />
                <span className="font-semibold">Sidebar</span>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <CodeIcon className="h-8 w-8 mx-auto mb-2" />
                <span className="font-semibold">Content</span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  ),
}

/**
 * エディター風Resizableストーリー
 */
export const EditorLayout: Story = {
  render: () => (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Editor Layout</CardTitle>
        <CardDescription>
          エディター風のレイアウト
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[400px] rounded-lg border"
        >
          <ResizablePanel defaultSize={20}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 p-4 border-b">
                <FileTextIcon className="h-4 w-4" />
                <span className="font-semibold">Files</span>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileTextIcon className="h-4 w-4" />
                  <span>index.tsx</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileTextIcon className="h-4 w-4" />
                  <span>styles.css</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileTextIcon className="h-4 w-4" />
                  <span>package.json</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <CodeIcon className="h-4 w-4" />
                    <span className="font-semibold">Editor</span>
                  </div>
                  <div className="flex-1 p-4 bg-muted/20">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <ActivityIcon className="h-4 w-4" />
                    <span className="font-semibold">Terminal</span>
                  </div>
                  <div className="flex-1 p-4 bg-black text-green-400 font-mono text-sm">
                    <div>$ npm run dev</div>
                    <div>✓ Ready in 1.2s</div>
                    <div>✓ Local: http://localhost:3000</div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 p-4 border-b">
                <SettingsIcon className="h-4 w-4" />
                <span className="font-semibold">Properties</span>
              </div>
              <div className="flex-1 p-4 space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Component</div>
                  <div className="text-sm text-muted-foreground">Button</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Variant</div>
                  <Badge variant="outline">default</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Size</div>
                  <Badge variant="outline">md</Badge>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  ),
}

/**
 * ダッシュボード風Resizableストーリー
 */
export const DashboardLayout: Story = {
  render: () => (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Dashboard Layout</CardTitle>
        <CardDescription>
          ダッシュボード風のレイアウト
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px] rounded-lg border"
        >
          <ResizablePanel defaultSize={15}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 p-4 border-b">
                <LayoutIcon className="h-4 w-4" />
                <span className="font-semibold">Navigation</span>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted">
                  <BarChartIcon className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted">
                  <UsersIcon className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted">
                  <DatabaseIcon className="h-4 w-4" />
                  <span>Data</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <BarChartIcon className="h-4 w-4" />
                    <span className="font-semibold">Analytics</span>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUpIcon className="h-8 w-8 mx-auto mb-2" />
                          <div className="text-2xl font-bold">1,234</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-center">
                        <div className="text-center">
                          <DollarSignIcon className="h-8 w-8 mx-auto mb-2" />
                          <div className="text-2xl font-bold">$12,345</div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <ActivityIcon className="h-4 w-4" />
                    <span className="font-semibold">Recent Activity</span>
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">New user registered</div>
                        <div className="text-xs text-muted-foreground">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MailIcon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Email sent</div>
                        <div className="text-xs text-muted-foreground">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Meeting scheduled</div>
                        <div className="text-xs text-muted-foreground">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムサイズResizableストーリー
 */
export const CustomSizes: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Custom Sizes</CardTitle>
        <CardDescription>
          カスタムサイズのリサイズ可能パネル
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Small Sidebar (15%)</h4>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[150px] rounded-lg border"
          >
            <ResizablePanel defaultSize={15}>
              <div className="flex h-full items-center justify-center p-4 bg-muted/50">
                <span className="font-semibold text-sm">15%</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-semibold">85%</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Equal Split (50/50)</h4>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[150px] rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4 bg-muted/50">
                <span className="font-semibold">50%</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-semibold">50%</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Large Sidebar (75%)</h4>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[150px] rounded-lg border"
          >
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-4 bg-muted/50">
                <span className="font-semibold">75%</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-semibold">25%</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </CardContent>
    </Card>
  ),
} 