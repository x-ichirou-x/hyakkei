/**
 * PopoverコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ボタンによってトリガーされるポータル内のリッチコンテンツ表示
 * - フォーム、設定、情報表示などに使用
 * - 様々な配置とサイズに対応
 * 
 * 主な仕様:
 * - トリガーボタンによる開閉
 * - カスタマイズ可能なコンテンツ
 * - 配置オプション（align、side）
 * - アニメーション効果
 * 
 * 制限事項:
 * - Radix UIに依存
 * - ポータルレンダリング
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  SettingsIcon, 
  UserIcon, 
  BellIcon, 
  InfoIcon, 
  CalendarIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon
} from "lucide-react"

/**
 * Popoverコンポーネントのメタデータ
 */
const meta: Meta<typeof Popover> = {
  title: "Components/UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "ポップオーバーの開閉状態",
    },
    onOpenChange: {
      description: "開閉状態が変更された時のコールバック",
    },
  },
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なPopoverストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Basic Popover</CardTitle>
          <CardDescription>
            Simple popover with form content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Dimensions</h4>
                  <p className="text-muted-foreground text-sm">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ユーザープロフィールPopoverストーリー
 */
export const UserProfile: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>User Profile Popover</CardTitle>
          <CardDescription>
            User information in a popover
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                View Profile
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">John Doe</h4>
                  <p className="text-muted-foreground text-sm">
                    Software Engineer at Tech Corp
                  </p>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 設定Popoverストーリー
 */
export const Settings: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Settings Popover</CardTitle>
          <CardDescription>
            Quick settings access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Quick Settings</h4>
                  <p className="text-muted-foreground text-sm">
                    Adjust your preferences
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notifications</Label>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Button variant="outline" size="sm">Auto</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="language">Language</Label>
                    <Button variant="outline" size="sm">English</Button>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Save</Button>
                  <Button size="sm" variant="outline" className="flex-1">Reset</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 通知Popoverストーリー
 */
export const Notifications: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Notifications Popover</CardTitle>
          <CardDescription>
            Notification center
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Notifications</h4>
                  <p className="text-muted-foreground text-sm">
                    You have 3 new notifications
                  </p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-semantic-accent mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New message from Sarah</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-semantic-success mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Task completed</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-semantic-warning mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">System update available</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <Button size="sm" variant="outline" className="w-full">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 情報Popoverストーリー
 */
export const Information: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Information Popover</CardTitle>
          <CardDescription>
            Helpful information display
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-sm">Feature Status</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <InfoIcon className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-medium">Beta Feature</h4>
                    <p className="text-muted-foreground text-sm">
                      This feature is currently in beta testing. Some functionality may be limited or subject to change.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Beta</Badge>
                      <span className="text-xs text-muted-foreground">Limited availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Expected release: Q2 2024</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタム配置Popoverストーリー
 */
export const CustomPlacement: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Custom Placement</CardTitle>
          <CardDescription>
            Different alignment options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Start</Button>
              </PopoverTrigger>
              <PopoverContent className="w-60" align="start">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Start Aligned</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover is aligned to the start
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Center</Button>
              </PopoverTrigger>
              <PopoverContent className="w-60" align="center">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Center Aligned</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover is center aligned
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">End</Button>
              </PopoverTrigger>
              <PopoverContent className="w-60" align="end">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">End Aligned</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover is aligned to the end
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    )
  },
} 