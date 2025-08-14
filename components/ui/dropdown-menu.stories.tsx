/**
 * Dropdown MenuコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ボタンによってトリガーされるメニュー表示
 * - アクションや機能のセットを提供
 * - ユーザーインターフェースの整理
 * 
 * 主な仕様:
 * - トリガーボタンによる開閉
 * - サブメニュー対応
 * - チェックボックス、ラジオボタン統合
 * - ショートカットキー表示
 * - グループ化とセパレーター
 * 
 * 制限事項:
 * - Radix UIに依存
 * - ポータルレンダリング
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  UserIcon, 
  SettingsIcon, 
  CreditCardIcon,
  KeyboardIcon,
  UsersIcon,
  PlusIcon,
  GithubIcon,
  LifeBuoyIcon,
  LogOutIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  EditIcon,
  CopyIcon,
  ArchiveIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  GridIcon,
  ListIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
} from "lucide-react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

/**
 * Dropdown Menuコンポーネントのメタデータ
 */
const meta: Meta<typeof DropdownMenu> = {
  title: "Components/UI/DropdownMenu",
  component: DropdownMenu,
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
 * 基本的なDropdown Menuストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Basic Dropdown Menu</CardTitle>
          <CardDescription>
            Simple dropdown with menu items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * チェックボックス付きDropdown Menuストーリー
 */
export const Checkboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = React.useState<DropdownMenuCheckboxItemProps["checked"]>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<DropdownMenuCheckboxItemProps["checked"]>(false)
    const [showPanel, setShowPanel] = React.useState<DropdownMenuCheckboxItemProps["checked"]>(false)

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Checkbox Dropdown</CardTitle>
          <CardDescription>
            Dropdown with checkbox items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ラジオグループ付きDropdown Menuストーリー
 */
export const RadioGroup: Story = {
  render: () => {
    const [position, setPosition] = React.useState("bottom")

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Radio Group Dropdown</CardTitle>
          <CardDescription>
            Dropdown with radio group items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイル操作Dropdown Menuストーリー
 */
export const FileOperations: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>File Operations</CardTitle>
          <CardDescription>
            File management actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>File Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ArchiveIcon className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 表示設定Dropdown Menuストーリー
 */
export const ViewSettings: Story = {
  render: () => {
    const [view, setView] = React.useState("grid")
    const [sortBy, setSortBy] = React.useState("name")

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>View Settings</CardTitle>
          <CardDescription>
            Display and sorting options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                View Options
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>View Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                <DropdownMenuRadioItem value="grid">
                  <GridIcon className="mr-2 h-4 w-4" />
                  Grid View
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">
                  <ListIcon className="mr-2 h-4 w-4" />
                  List View
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="name">
                  <SortAscIcon className="mr-2 h-4 w-4" />
                  Name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">
                  <SortDescIcon className="mr-2 h-4 w-4" />
                  Date
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="size">
                  <SortAscIcon className="mr-2 h-4 w-4" />
                  Size
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * テーマ設定Dropdown Menuストーリー
 */
export const ThemeSettings: Story = {
  render: () => {
    const [theme, setTheme] = React.useState("system")

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>
            Appearance and theme options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <SunIcon className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <MoonIcon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <MonitorIcon className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeIcon className="mr-2 h-4 w-4" />
                Show hidden files
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StarIcon className="mr-2 h-4 w-4" />
                Show favorites
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ユーザーメニューDropdown Menuストーリー
 */
export const UserMenu: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>User Menu</CardTitle>
          <CardDescription>
            User account actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                John Doe
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UsersIcon className="mr-2 h-4 w-4" />
                Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoyIcon className="mr-2 h-4 w-4" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    )
  },
} 