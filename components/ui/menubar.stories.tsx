/**
 * MenubarコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - デスクトップアプリケーションでよく見られる永続的なメニューバー
 * - 一貫したコマンドセットへのクイックアクセスを提供
 * - 水平方向のメニュー構造
 * 
 * 主な仕様:
 * - 永続的なメニューバー表示
 * - サブメニュー対応
 * - チェックボックス、ラジオボタン統合
 * - ショートカットキー表示
 * - グループ化とセパレーター
 * 
 * 制限事項:
 * - Radix UIに依存
 * - デスクトップアプリケーション向け
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileIcon,
  EditIcon,
  EyeIcon,
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  DownloadIcon,
  UploadIcon,
  SaveIcon,
  PrinterIcon,
  ShareIcon,
  TrashIcon,
  CopyIcon,
  ScissorsIcon,
  ClipboardIcon,
  UndoIcon,
  RedoIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  SidebarIcon,
  BookmarkIcon,
  LinkIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  FolderIcon,
  HomeIcon,
  StarIcon,
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  GlobeIcon,
  MapIcon,
  LayersIcon,
  GridIcon,
  ListIcon,
  ColumnsIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  RotateCwIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  CropIcon,
  MoveIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  QuoteIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
  CheckIcon,
  AlertCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  SquareIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  VolumeXIcon,
  Volume1Icon,
  Volume2Icon,
  MicIcon,
  MicOffIcon,
  VideoOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  SmartphoneIcon,
  TabletIcon,
  LaptopIcon,
  ServerIcon,
  DatabaseIcon,
  CloudIcon,
  WifiIcon,
  WifiOffIcon,
  BluetoothIcon,
  BluetoothOffIcon,
  BatteryIcon,
  BatteryChargingIcon,
  BatteryFullIcon,
  BatteryLowIcon,
  PowerIcon,
  PowerOffIcon,
  LockIcon,
  UnlockIcon,
  ShieldIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  KeyIcon,
  KeyRoundIcon,
  FingerprintIcon,
  UserCheckIcon,
  UserXIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCogIcon,
  UserSearchIcon,
} from "lucide-react"

/**
 * Menubarコンポーネントのメタデータ
 */
const meta: Meta<typeof Menubar> = {
  title: "Components/UI/Menubar",
  component: Menubar,
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
 * 基本的なMenubarストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Basic Menubar</CardTitle>
          <CardDescription>
            Desktop application style menubar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルエディタMenubarストーリー
 */
export const FileEditor: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>File Editor Menubar</CardTitle>
          <CardDescription>
            Text editor style menubar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <FileIcon className="mr-2 h-4 w-4" />
                  New File <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <FolderIcon className="mr-2 h-4 w-4" />
                  Open... <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>As PDF</MenubarItem>
                    <MenubarItem>As HTML</MenubarItem>
                    <MenubarItem>As Markdown</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  <PrinterIcon className="mr-2 h-4 w-4" />
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <XIcon className="mr-2 h-4 w-4" />
                  Exit
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <UndoIcon className="mr-2 h-4 w-4" />
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <RedoIcon className="mr-2 h-4 w-4" />
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <ScissorsIcon className="mr-2 h-4 w-4" />
                  Cut <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <ClipboardIcon className="mr-2 h-4 w-4" />
                  Paste <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Find
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Find... <MenubarShortcut>⌘F</MenubarShortcut></MenubarItem>
                    <MenubarItem>Find Next <MenubarShortcut>⌘G</MenubarShortcut></MenubarItem>
                    <MenubarItem>Find Previous <MenubarShortcut>⇧⌘G</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Replace... <MenubarShortcut>⌘H</MenubarShortcut></MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Select All <MenubarShortcut>⌘A</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Format</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <BoldIcon className="mr-2 h-4 w-4" />
                    Font
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Bold <MenubarShortcut>⌘B</MenubarShortcut></MenubarItem>
                    <MenubarItem>Italic <MenubarShortcut>⌘I</MenubarShortcut></MenubarItem>
                    <MenubarItem>Underline <MenubarShortcut>⌘U</MenubarShortcut></MenubarItem>
                    <MenubarItem>Strikethrough</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <AlignLeftIcon className="mr-2 h-4 w-4" />
                    Alignment
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Left</MenubarItem>
                    <MenubarItem>Center</MenubarItem>
                    <MenubarItem>Right</MenubarItem>
                    <MenubarItem>Justify</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  <ListOrderedIcon className="mr-2 h-4 w-4" />
                  Numbered List
                </MenubarItem>
                <MenubarItem>
                  <ListIcon className="mr-2 h-4 w-4" />
                  Bullet List
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked>Show Line Numbers</MenubarCheckboxItem>
                <MenubarCheckboxItem>Show Whitespace</MenubarCheckboxItem>
                <MenubarCheckboxItem>Word Wrap</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <ZoomInIcon className="mr-2 h-4 w-4" />
                    Zoom
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Zoom In <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
                    <MenubarItem>Zoom Out <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
                    <MenubarItem>Reset Zoom <MenubarShortcut>⌘0</MenubarShortcut></MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  <MaximizeIcon className="mr-2 h-4 w-4" />
                  Toggle Fullscreen <MenubarShortcut>⌘⇧F</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  Documentation
                </MenubarItem>
                <MenubarItem>
                  <InfoIcon className="mr-2 h-4 w-4" />
                  About
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </CardContent>
      </Card>
    )
  },
}

/**
 * シンプルなMenubarストーリー
 */
export const Simple: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Simple Menubar</CardTitle>
          <CardDescription>
            Minimal menubar with basic options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New</MenubarItem>
                <MenubarItem>Open</MenubarItem>
                <MenubarItem>Save</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Exit</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Fullscreen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Documentation</MenubarItem>
                <MenubarItem>About</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </CardContent>
      </Card>
    )
  },
} 