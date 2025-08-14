/**
 * Context MenuコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 右クリックでトリガーされるコンテキストメニュー
 * - 要素に関連するアクションや機能を提供
 * - ユーザーの現在のコンテキストに応じた操作
 * 
 * 主な仕様:
 * - 右クリックトリガー
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
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  LoaderIcon,
  DownloadIcon,
  LinkIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  MoreHorizontalIcon,
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  LogOutIcon,
  GithubIcon,
  LifeBuoyIcon,
  FileIcon,
  FolderIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  SearchIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react"

/**
 * Context Menuコンポーネントのメタデータ
 */
const meta: Meta<typeof ContextMenu> = {
  title: "Components/UI/ContextMenu",
  component: ContextMenu,
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
 * 基本的なContext Menuストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Context Menu</CardTitle>
          <CardDescription>
            Right click to open context menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem inset>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem>Save Page...</ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Bookmarks
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="pedro">
                <ContextMenuLabel inset>People</ContextMenuLabel>
                <ContextMenuRadioItem value="pedro">
                  Pedro Duarte
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイル操作Context Menuストーリー
 */
export const FileOperations: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File Context Menu</CardTitle>
          <CardDescription>
            Right click on file for operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              <div className="flex items-center gap-2">
                <FileIcon className="h-8 w-8" />
                <span>document.pdf</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </ContextMenuItem>
              <ContextMenuItem>
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <EyeIcon className="mr-2 h-4 w-4" />
                Preview
              </ContextMenuItem>
              <ContextMenuItem>
                <StarIcon className="mr-2 h-4 w-4" />
                Add to Favorites
              </ContextMenuItem>
              <ContextMenuItem>
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Bookmark
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <ArchiveIcon className="mr-2 h-4 w-4" />
                Archive
              </ContextMenuItem>
              <ContextMenuItem variant="destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 画像操作Context Menuストーリー
 */
export const ImageOperations: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Image Context Menu</CardTitle>
          <CardDescription>
            Right click on image for operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-8 w-8" />
                <span>photo.jpg</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <EyeIcon className="mr-2 h-4 w-4" />
                View
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy Image
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Save As...
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <ShareIcon className="mr-2 h-4 w-4" />
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem>Email</ContextMenuItem>
                  <ContextMenuItem>Message</ContextMenuItem>
                  <ContextMenuItem>Social Media</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Copy Link</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show in Gallery
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>
                Auto-resize
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="medium">
                <ContextMenuLabel inset>Quality</ContextMenuLabel>
                <ContextMenuRadioItem value="low">Low</ContextMenuRadioItem>
                <ContextMenuRadioItem value="medium">Medium</ContextMenuRadioItem>
                <ContextMenuRadioItem value="high">High</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * テキスト選択Context Menuストーリー
 */
export const TextSelection: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Text Selection Context Menu</CardTitle>
          <CardDescription>
            Right click on selected text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              <div className="text-center">
                <p>Select this text and right click</p>
                <p className="text-muted-foreground text-xs mt-2">
                  This is some sample text that you can select
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Paste
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search for "{`"selected text"`}"
              </ContextMenuItem>
              <ContextMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                Look up "{`"selected text"`}"
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <ShareIcon className="mr-2 h-4 w-4" />
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem>Email</ContextMenuItem>
                  <ContextMenuItem>Message</ContextMenuItem>
                  <ContextMenuItem>Note</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Add to Bookmarks
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * フォルダ操作Context Menuストーリー
 */
export const FolderOperations: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Folder Context Menu</CardTitle>
          <CardDescription>
            Right click on folder for operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-8 w-8" />
                <span>Documents</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <EyeIcon className="mr-2 h-4 w-4" />
                Open
                <ContextMenuShortcut>⌘O</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <EditIcon className="mr-2 h-4 w-4" />
                Rename
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Compress
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <SortAscIcon className="mr-2 h-4 w-4" />
                  Sort By
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuRadioGroup value="name">
                    <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="type">Type</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Hidden Files
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>
                Group by Type
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <ShareIcon className="mr-2 h-4 w-4" />
                Share Folder
              </ContextMenuItem>
              <ContextMenuItem variant="destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ユーザーインターフェースContext Menuストーリー
 */
export const UserInterface: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>UI Context Menu</CardTitle>
          <CardDescription>
            Right click on UI elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              <div className="text-center">
                <UserIcon className="h-8 w-8 mx-auto mb-2" />
                <span>User Profile Area</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                View Profile
                <ContextMenuShortcut>⌘P</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
                <ContextMenuShortcut>⌘,</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Billing
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </ContextMenuItem>
              <ContextMenuItem>
                <LifeBuoyIcon className="mr-2 h-4 w-4" />
                Support
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Notifications
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>
                Auto-save
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="light">
                <ContextMenuLabel inset>Theme</ContextMenuLabel>
                <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
                <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
                <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log Out
                <ContextMenuShortcut>⇧⌘Q</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>
    )
  },
} 