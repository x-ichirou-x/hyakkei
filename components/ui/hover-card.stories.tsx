/**
 * Hover CardコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 視覚的なユーザーがリンクの背後にあるコンテンツをプレビューするためのコンポーネント
 * - ホバー時に追加情報を表示
 * - ツールチップよりも詳細な情報を表示
 * 
 * 主な仕様:
 * - ホバー時の表示制御
 * - カスタマイズ可能なコンテンツ
 * - アクセシビリティ対応
 * - アニメーション付きの表示
 * - 様々なコンテンツタイプのサポート
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  FileIcon,
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
 * Hover Cardコンポーネントのメタデータ
 */
const meta: Meta<typeof HoverCard> = {
  title: "Components/UI/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なHover Cardストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Hover Card</CardTitle>
        <CardDescription>
          shadcn/ui公式例のHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
}

/**
 * ユーザープロフィールHover Cardストーリー
 */
export const UserProfile: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Profile Hover Card</CardTitle>
        <CardDescription>
          ユーザープロフィール情報を表示するHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              John Doe
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/johndoe.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">John Doe</h4>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MailIcon className="h-3 w-3" />
                  john.doe@example.com
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPinIcon className="h-3 w-3" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  Joined January 2023
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
}

/**
 * プロジェクト情報Hover Cardストーリー
 */
export const ProjectInfo: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project Info Hover Card</CardTitle>
        <CardDescription>
          プロジェクト情報を表示するHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4" />
              My Project
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DatabaseIcon className="h-4 w-4" />
                <h4 className="text-sm font-semibold">My Project</h4>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A modern web application built with Next.js and TypeScript.
              </p>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <div>March 15, 2024</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <div>2 hours ago</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Language:</span>
                  <div>TypeScript</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Framework:</span>
                  <div>Next.js</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Tailwind</Badge>
                <Badge variant="outline">shadcn/ui</Badge>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
}

/**
 * 統計情報Hover Cardストーリー
 */
export const Statistics: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Statistics Hover Card</CardTitle>
        <CardDescription>
          統計情報を表示するHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Sales Analytics
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-semantic-success" />
                <h4 className="text-sm font-semibold">Sales Analytics</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$45,231</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>This Month</span>
                  <span className="font-medium">$12,345</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Last Month</span>
                  <span className="font-medium">$10,987</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Target</span>
                  <span className="font-medium">$50,000</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
}

/**
 * アクション付きHover Cardストーリー
 */
export const WithActions: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hover Card with Actions</CardTitle>
        <CardDescription>
          アクションボタン付きのHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              Document.pdf
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileIcon className="h-4 w-4" />
                <h4 className="text-sm font-semibold">Document.pdf</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Project proposal and requirements document.
              </p>
              <div className="text-xs text-muted-foreground">
                <div>Size: 2.4 MB</div>
                <div>Modified: 2 hours ago</div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <DownloadIcon className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <ShareIcon className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="outline">
                  <EditIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  ),
}

/**
 * 複数アイテムHover Cardストーリー
 */
export const MultipleItems: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Multiple Items Hover Card</CardTitle>
        <CardDescription>
          複数のアイテムを表示するHover Card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Team Members (5)
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Team Members</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/user1.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">John Doe</span>
                    <Badge variant="secondary" className="text-xs">Lead</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/user2.png" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Jane Smith</span>
                    <Badge variant="outline" className="text-xs">Dev</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/user3.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Mike Johnson</span>
                    <Badge variant="outline" className="text-xs">Dev</Badge>
                  </div>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  +2 more members
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
    </Card>
  ),
} 