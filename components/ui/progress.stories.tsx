/**
 * ProgressコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - タスクの完了進捗を示すインジケーター
 * - プログレスバーとして表示
 * - アニメーション付きの進捗表示
 * 
 * 主な仕様:
 * - 進捗値の表示（0-100%）
 * - カスタマイズ可能なスタイル
 * - アニメーション制御
 * - アクセシビリティ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  DownloadIcon,
  UploadIcon,
  DatabaseIcon,
  HardDriveIcon,
  WifiIcon,
  BatteryIcon,
  ActivityIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  SquareIcon as StopIcon,
  RefreshCwIcon,
  LoaderIcon,
  ZapIcon,
  FlameIcon,
  DropletsIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudLightningIcon,
  WindIcon,
  UmbrellaIcon,
  SnowflakeIcon,
  ThermometerIcon,
  GaugeIcon,
  BarChartIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
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
  UserIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCogIcon,
  UserSearchIcon,
  UserCircleIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon as ClockIcon2,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  LinkIcon,
  ExternalLinkIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon as CheckCircleIcon2,
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
  ServerIcon,
  CloudIcon as CloudIcon2,
  WifiIcon as WifiIcon2,
  BluetoothIcon,
  BatteryIcon as BatteryIcon2,
  PowerIcon,
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
} from "lucide-react"

/**
 * Progressコンポーネントのメタデータ
 */
const meta: Meta<typeof Progress> = {
  title: "Components/UI/Progress",
  component: Progress,
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
 * 基本的なProgressストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Progress</CardTitle>
          <CardDescription>
            shadcn/ui公式例のProgress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          <div className="text-xs text-muted-foreground">
            Progress value: {progress}%
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 固定値Progressストーリー
 */
export const FixedValues: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Fixed Progress Values</CardTitle>
        <CardDescription>
          固定値のProgressバー
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>25% Complete</span>
            <span>25%</span>
          </div>
          <Progress value={25} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>50% Complete</span>
            <span>50%</span>
          </div>
          <Progress value={50} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>75% Complete</span>
            <span>75%</span>
          </div>
          <Progress value={75} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>100% Complete</span>
            <span>100%</span>
          </div>
          <Progress value={100} />
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * アニメーションProgressストーリー
 */
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(false)

    React.useEffect(() => {
      if (!isRunning) return

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false)
            return 100
          }
          return prev + 1
        })
      }, 50)

      return () => clearInterval(timer)
    }, [isRunning])

    const startProgress = () => {
      setProgress(0)
      setIsRunning(true)
    }

    const resetProgress = () => {
      setProgress(0)
      setIsRunning(false)
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Animated Progress</CardTitle>
          <CardDescription>
            アニメーション付きのProgressバー
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="flex gap-2">
            <Button onClick={startProgress} disabled={isRunning}>
              <PlayIcon className="h-4 w-4 mr-1" />
              Start
            </Button>
            <Button onClick={resetProgress} variant="outline">
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルアップロードProgressストーリー
 */
export const FileUpload: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [isUploading, setIsUploading] = React.useState(false)

    const simulateUpload = () => {
      setIsUploading(true)
      setUploadProgress(0)
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 200)
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File Upload Progress</CardTitle>
          <CardDescription>
            ファイルアップロードの進捗表示
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4" />
            <span className="text-sm font-medium">document.pdf</span>
            <Badge variant="secondary">2.4 MB</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
          <Button onClick={simulateUpload} disabled={isUploading}>
            <UploadIcon className="h-4 w-4 mr-1" />
            {isUploading ? "Uploading..." : "Start Upload"}
          </Button>
        </CardContent>
      </Card>
    )
  },
}

/**
 * システムリソースProgressストーリー
 */
export const SystemResources: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>System Resources</CardTitle>
        <CardDescription>
          システムリソースの使用状況
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HardDriveIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Disk Usage</span>
            <Badge variant="outline">750GB / 1TB</Badge>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-4 w-4" />
            <span className="text-sm font-medium">CPU Usage</span>
            <Badge variant="outline">45%</Badge>
          </div>
          <Progress value={45} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DatabaseIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Memory Usage</span>
            <Badge variant="outline">8GB / 16GB</Badge>
          </div>
          <Progress value={50} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <WifiIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Network</span>
            <Badge variant="outline">85%</Badge>
          </div>
          <Progress value={85} className="h-2" />
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * タスク管理Progressストーリー
 */
export const TaskManagement: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>
          タスク管理の進捗表示
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-semantic-success" />
              <span className="text-sm font-medium">Design Phase</span>
            </div>
            <Badge variant="secondary">Complete</Badge>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-semantic-accent" />
              <span className="text-sm font-medium">Development</span>
            </div>
            <Badge variant="outline">In Progress</Badge>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircleIcon className="h-4 w-4 text-semantic-warning" />
              <span className="text-sm font-medium">Testing</span>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircleIcon className="h-4 w-4 text-semantic-fg-subtle" />
              <span className="text-sm font-medium">Deployment</span>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        <Separator />
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>41%</span>
        </div>
        <Progress value={41} />
      </CardContent>
    </Card>
  ),
}

/**
 * カスタムスタイルProgressストーリー
 */
export const CustomStyles: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Custom Styles</CardTitle>
        <CardDescription>
          カスタムスタイルのProgressバー
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Default Style</span>
            <span>50%</span>
          </div>
          <Progress value={50} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Thin Style</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="h-1" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Thick Style</span>
            <span>25%</span>
          </div>
          <Progress value={25} className="h-4" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Rounded Style</span>
            <span>90%</span>
          </div>
          <Progress value={90} className="h-3 rounded-full" />
        </div>
      </CardContent>
    </Card>
  ),
} 