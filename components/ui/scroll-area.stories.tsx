/**
 * Scroll-areaコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ネイティブスクロール機能を拡張してカスタムスタイリングを提供
 * - クロスブラウザ対応のスクロールエリア
 * - カスタマイズ可能なスクロールバー
 * 
 * 主な仕様:
 * - 垂直・水平スクロール対応
 * - カスタムスクロールバースタイル
 * - アクセシビリティ対応
 * - レスポンシブ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの動作
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  CodeIcon,
  DatabaseIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  MailIcon,
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
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCogIcon,
  UserSearchIcon,
  UserCircleIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon as StarIcon2,
  HeartIcon as HeartIcon2,
  BookmarkIcon as BookmarkIcon2,
  ShareIcon as ShareIcon2,
  DownloadIcon as DownloadIcon2,
  UploadIcon as UploadIcon2,
  EditIcon as EditIcon2,
  TrashIcon as TrashIcon2,
  CopyIcon as CopyIcon2,
  LinkIcon as LinkIcon2,
  ExternalLinkIcon as ExternalLinkIcon2,
  InfoIcon as InfoIcon2,
  AlertCircleIcon as AlertCircleIcon2,
  CheckCircleIcon as CheckCircleIcon2,
  XCircleIcon as XCircleIcon2,
  HelpCircleIcon as HelpCircleIcon2,
  SearchIcon as SearchIcon2,
  FilterIcon as FilterIcon2,
  SortAscIcon as SortAscIcon2,
  SortDescIcon as SortDescIcon2,
  GridIcon as GridIcon2,
  ListIcon as ListIcon2,
  ColumnsIcon as ColumnsIcon2,
  LayersIcon as LayersIcon2,
  ServerIcon as ServerIcon2,
  CloudIcon as CloudIcon2,
  WifiIcon as WifiIcon2,
  BluetoothIcon as BluetoothIcon2,
  BatteryIcon as BatteryIcon2,
  ActivityIcon as ActivityIcon2,
  BarChartIcon as BarChartIcon2,
  BarChart3Icon as BarChart3Icon2,
  LineChartIcon as LineChartIcon2,
  PieChartIcon as PieChartIcon2,
  TrendingUpIcon as TrendingUpIcon2,
  TrendingDownIcon as TrendingDownIcon2,
  DollarSignIcon as DollarSignIcon2,
  CreditCardIcon as CreditCardIcon2,
  ReceiptIcon as ReceiptIcon2,
  WalletIcon as WalletIcon2,
  PiggyBankIcon as PiggyBankIcon2,
  CoinsIcon as CoinsIcon2,
  BanknoteIcon as BanknoteIcon2,
  CalculatorIcon as CalculatorIcon2,
  PercentIcon as PercentIcon2,
  HashIcon as HashIcon2,
  AtSignIcon as AtSignIcon2,
  UserPlusIcon as UserPlusIcon2,
  UserMinusIcon as UserMinusIcon2,
  UserCheckIcon as UserCheckIcon2,
  UserXIcon as UserXIcon2,
  UserCogIcon as UserCogIcon2,
  UserSearchIcon as UserSearchIcon2,
  UserCircleIcon as UserCircleIcon2,
  PhoneIcon as PhoneIcon2,
  MapPinIcon as MapPinIcon2,
} from "lucide-react"

/**
 * Scroll-areaコンポーネントのメタデータ
 */
const meta: Meta<typeof ScrollArea> = {
  title: "Components/UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なScroll-areaストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const tags = Array.from({ length: 50 }).map(
      (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Scroll Area</CardTitle>
          <CardDescription>
            shadcn/ui公式例のScroll Area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 水平スクロールScroll-areaストーリー
 */
export const Horizontal: Story = {
  render: () => {
    const works = [
      {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
      },
      {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
      },
      {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
      },
      {
        artist: "John Doe",
        art: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      },
      {
        artist: "Jane Smith",
        art: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80",
      },
    ]

    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Horizontal Scroll Area</CardTitle>
          <CardDescription>
            水平スクロールのScroll Area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
              {works.map((artwork) => (
                <figure key={artwork.artist} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={artwork.art}
                      alt={`Photo by ${artwork.artist}`}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={300}
                      height={400}
                    />
                  </div>
                  <figcaption className="text-muted-foreground pt-2 text-xs">
                    Photo by{" "}
                    <span className="text-foreground font-semibold">
                      {artwork.artist}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルリストScroll-areaストーリー
 */
export const FileList: Story = {
  render: () => {
    const files = [
      { name: "document.pdf", type: "PDF", size: "2.4 MB", icon: FileTextIcon },
      { name: "image.jpg", type: "Image", size: "1.2 MB", icon: ImageIcon },
      { name: "video.mp4", type: "Video", size: "45.6 MB", icon: VideoIcon },
      { name: "music.mp3", type: "Audio", size: "8.9 MB", icon: MusicIcon },
      { name: "archive.zip", type: "Archive", size: "12.3 MB", icon: ArchiveIcon },
      { name: "script.js", type: "JavaScript", size: "156 KB", icon: CodeIcon },
      { name: "database.db", type: "Database", size: "2.1 GB", icon: DatabaseIcon },
      { name: "config.json", type: "JSON", size: "23 KB", icon: SettingsIcon },
      { name: "profile.jpg", type: "Image", size: "890 KB", icon: UserIcon },
      { name: "backup.tar", type: "Archive", size: "156 MB", icon: ArchiveIcon },
      { name: "styles.css", type: "CSS", size: "45 KB", icon: CodeIcon },
      { name: "data.csv", type: "CSV", size: "1.8 MB", icon: DatabaseIcon },
    ]

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File List</CardTitle>
          <CardDescription>
            ファイルリストのScroll Area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Files</h4>
              {files.map((file, index) => {
                const IconComponent = file.icon
                return (
                  <React.Fragment key={file.name}>
                    <div className="flex items-center gap-3 py-2">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.type}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                    {index < files.length - 1 && <Separator className="my-2" />}
                  </React.Fragment>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ユーザーリストScroll-areaストーリー
 */
export const UserList: Story = {
  render: () => {
    const users = [
      { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Online" },
      { name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Offline" },
      { name: "Mike Johnson", email: "mike.johnson@example.com", role: "Moderator", status: "Online" },
      { name: "Sarah Wilson", email: "sarah.wilson@example.com", role: "User", status: "Away" },
      { name: "David Brown", email: "david.brown@example.com", role: "Admin", status: "Online" },
      { name: "Emily Davis", email: "emily.davis@example.com", role: "User", status: "Offline" },
      { name: "Chris Miller", email: "chris.miller@example.com", role: "Moderator", status: "Online" },
      { name: "Lisa Garcia", email: "lisa.garcia@example.com", role: "User", status: "Away" },
      { name: "Tom Anderson", email: "tom.anderson@example.com", role: "Admin", status: "Online" },
      { name: "Amy Taylor", email: "amy.taylor@example.com", role: "User", status: "Offline" },
      { name: "Kevin Lee", email: "kevin.lee@example.com", role: "Moderator", status: "Online" },
      { name: "Rachel White", email: "rachel.white@example.com", role: "User", status: "Away" },
    ]

    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            ユーザーリストのScroll Area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Users</h4>
              {users.map((user, index) => (
                <React.Fragment key={user.email}>
                  <div className="flex items-center gap-3 py-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{user.role}</Badge>
                      <Badge 
                        variant={user.status === "Online" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  {index < users.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ログ表示Scroll-areaストーリー
 */
export const LogViewer: Story = {
  render: () => {
    const logs = [
      { timestamp: "2024-01-15 10:30:15", level: "INFO", message: "Application started successfully" },
      { timestamp: "2024-01-15 10:30:16", level: "INFO", message: "Database connection established" },
      { timestamp: "2024-01-15 10:30:17", level: "WARN", message: "Cache miss for key: user:123" },
      { timestamp: "2024-01-15 10:30:18", level: "INFO", message: "User authentication successful" },
      { timestamp: "2024-01-15 10:30:19", level: "ERROR", message: "Failed to send email notification" },
      { timestamp: "2024-01-15 10:30:20", level: "INFO", message: "API request processed in 45ms" },
      { timestamp: "2024-01-15 10:30:21", level: "DEBUG", message: "Query executed: SELECT * FROM users" },
      { timestamp: "2024-01-15 10:30:22", level: "INFO", message: "File uploaded successfully" },
      { timestamp: "2024-01-15 10:30:23", level: "WARN", message: "High memory usage detected" },
      { timestamp: "2024-01-15 10:30:24", level: "INFO", message: "Backup completed" },
      { timestamp: "2024-01-15 10:30:25", level: "ERROR", message: "Network timeout occurred" },
      { timestamp: "2024-01-15 10:30:26", level: "INFO", message: "Session expired, user logged out" },
      { timestamp: "2024-01-15 10:30:27", level: "DEBUG", message: "Cache hit for key: config:app" },
      { timestamp: "2024-01-15 10:30:28", level: "INFO", message: "Scheduled task completed" },
      { timestamp: "2024-01-15 10:30:29", level: "WARN", message: "Disk space running low" },
    ]

    const getLevelColor = (level: string) => {
      switch (level) {
        case "ERROR": return "text-semantic-danger"
        case "WARN": return "text-semantic-warning"
        case "INFO": return "text-semantic-accent"
        case "DEBUG": return "text-semantic-fg-subtle"
        default: return "text-semantic-fg-subtle"
      }
    }

    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Log Viewer</CardTitle>
          <CardDescription>
            ログ表示のScroll Area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full rounded-md border bg-black">
            <div className="p-4 font-mono text-sm">
              <h4 className="mb-4 text-sm leading-none font-medium text-white">Application Logs</h4>
              {logs.map((log, index) => (
                <div key={index} className="py-1">
                  <span className="text-semantic-fg-subtle">[{log.timestamp}]</span>{" "}
                  <span className={getLevelColor(log.level)}>[{log.level}]</span>{" "}
                  <span className="text-white">{log.message}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムスタイルScroll-areaストーリー
 */
export const CustomStyles: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Custom Styles</CardTitle>
        <CardDescription>
            カスタムスタイルのScroll Area
          </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Thin Scroll Area</h4>
          <ScrollArea className="h-32 w-full rounded-md border">
            <div className="p-4">
              <p className="text-sm">
                This is a thin scroll area with minimal height. It demonstrates how the scroll area
                adapts to different content sizes and provides smooth scrolling functionality.
              </p>
            </div>
          </ScrollArea>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Wide Scroll Area</h4>
          <ScrollArea className="h-48 w-full rounded-md border">
            <div className="p-4">
              <div className="space-y-2">
                <p className="text-sm">
                  This is a wider scroll area that can accommodate more content. The scroll area
                  automatically shows scrollbars when content exceeds the container size.
                </p>
                <p className="text-sm">
                  You can customize the appearance of scrollbars using CSS and the ScrollBar component
                  for more advanced styling options.
                </p>
                <p className="text-sm">
                  The scroll area is fully accessible and supports keyboard navigation for users
                  who prefer or require keyboard-based interaction.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Horizontal Scroll Area</h4>
          <ScrollArea className="h-24 w-full rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 1</div>
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 2</div>
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 3</div>
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 4</div>
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 5</div>
              <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">Item 6</div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  ),
} 