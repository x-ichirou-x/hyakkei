/**
 * CommandコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - React用の高速で構成可能なコマンドメニュー
 * - コマンドパレット、検索、ナビゲーションに使用
 * - cmdkライブラリをベースに構築
 * 
 * 主な仕様:
 * - キーボードナビゲーション
 * - 検索機能
 * - グループ化されたアイテム
 * - ショートカットキー表示
 * - ダイアログモード
 * 
 * 制限事項:
 * - cmdkライブラリに依存
 * - キーボードイベントの管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  FileText,
  Folder,
  Mail,
  MessageSquare,
  Bell,
  Heart,
  Star,
  Home,
  Users,
  Shield,
  Globe,
  Database,
  Code,
  Palette,
  Music,
  Video,
  Camera,
  Phone,
  MapPin,
  Clock,
  Bookmark,
  Download,
  Upload,
  Trash2,
  Edit,
  Copy,
  Share,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

/**
 * Commandコンポーネントのメタデータ
 */
const meta: Meta<typeof Command> = {
  title: "Components/UI/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "追加のCSSクラス",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なCommandストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Command</CardTitle>
          <CardDescription>
            Simple command menu with suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    )
  },
}

/**
 * コマンドパレットダイアログストーリー
 */
export const CommandDialogExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Command Dialog</CardTitle>
          <CardDescription>
            Press ⌘J to open command palette
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Press{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>J
            </kbd>{" "}
            to open the command palette
          </p>
          <Button onClick={() => setOpen(true)}>
            Open Command Palette
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルエクスプローラー風Commandストーリー
 */
export const FileExplorer: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File Explorer</CardTitle>
          <CardDescription>
            File and folder navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search files and folders..." />
            <CommandList>
              <CommandEmpty>No files found.</CommandEmpty>
              <CommandGroup heading="Recent Files">
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>document.pdf</span>
                  <CommandShortcut>⌘1</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>presentation.pptx</span>
                  <CommandShortcut>⌘2</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>spreadsheet.xlsx</span>
                  <CommandShortcut>⌘3</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Folders">
                <CommandItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Documents</span>
                </CommandItem>
                <CommandItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Pictures</span>
                </CommandItem>
                <CommandItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Downloads</span>
                </CommandItem>
                <CommandItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Music</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload File</span>
                  <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    )
  },
}

/**
 * アプリケーション検索Commandストーリー
 */
export const AppSearch: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>App Search</CardTitle>
          <CardDescription>
            Search through applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search applications..." />
            <CommandList>
              <CommandEmpty>No applications found.</CommandEmpty>
              <CommandGroup heading="Communication">
                <CommandItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Phone</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Productivity">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Notes</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Media">
                <CommandItem>
                  <Music className="mr-2 h-4 w-4" />
                  <span>Music</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <Video className="mr-2 h-4 w-4" />
                  <span>Videos</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
                <CommandItem>
                  <Camera className="mr-2 h-4 w-4" />
                  <span>Camera</span>
                  <Badge variant="secondary" className="ml-auto">App</Badge>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 設定検索Commandストーリー
 */
export const SettingsSearch: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings Search</CardTitle>
          <CardDescription>
            Search through system settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search settings..." />
            <CommandList>
              <CommandEmpty>No settings found.</CommandEmpty>
              <CommandGroup heading="System">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>General</span>
                  <CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security & Privacy</span>
                </CommandItem>
                <CommandItem>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Network</span>
                </CommandItem>
                <CommandItem>
                  <Database className="mr-2 h-4 w-4" />
                  <span>Storage</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Appearance">
                <CommandItem>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Display</span>
                </CommandItem>
                <CommandItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Accessibility</span>
                </CommandItem>
                <CommandItem>
                  <Code className="mr-2 h-4 w-4" />
                  <span>Developer</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="User">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Users & Groups</span>
                </CommandItem>
                <CommandItem>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Login Items</span>
                </CommandItem>
                <CommandItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ナビゲーションCommandストーリー
 */
export const Navigation: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            Site navigation with keyboard shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Navigate to..." />
            <CommandList>
              <CommandEmpty>No pages found.</CommandEmpty>
              <CommandGroup heading="Main Pages">
                <CommandItem>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Users</span>
                  <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick Actions">
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search</span>
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create New</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Bookmarks</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Recent</span>
                  <CommandShortcut>⌘R</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Maps</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    )
  },
} 