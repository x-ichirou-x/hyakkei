/**
 * DrawerコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - React用のドロワーコンポーネント
 * - モバイル向けのサイドパネル表示
 * - Vaulライブラリをベースに構築
 * 
 * 主な仕様:
 * - スワイプジェスチャー対応
 * - レスポンシブデザイン
 * - アニメーション効果
 * - ヘッダー、フッター、コンテンツの構造化
 * 
 * 制限事項:
 * - Vaulライブラリに依存
 * - モバイルファーストの設計
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Minus, Plus } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
  MenuIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * Drawerコンポーネントのメタデータ
 */
const meta: Meta<typeof Drawer> = {
  title: "Components/UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なDrawerストーリー
 */
export const Default: Story = {
  args: {},
  render: () => {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
      setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Basic Drawer</CardTitle>
          <CardDescription>
            Activity goal setting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-10)}
                      disabled={goal <= 200}
                    >
                      <Minus />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goal}
                      </div>
                      <div className="text-muted-foreground text-[0.70rem] uppercase">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                      disabled={goal >= 400}
                    >
                      <Plus />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    )
  },
}

/**
 * プロフィール編集Drawerストーリー
 */
export const ProfileEdit: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Profile Edit Drawer</CardTitle>
          <CardDescription>
            Edit profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Edit Profile
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <form className="grid items-start gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="shadcn@example.com" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@shadcn" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Software engineer and designer." />
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
              </div>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 設定Drawerストーリー
 */
export const Settings: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Settings Drawer</CardTitle>
          <CardDescription>
            Application settings panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerDescription>
                  Manage your application preferences
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about updates
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Auto</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language
                      </p>
                    </div>
                    <Button variant="outline" size="sm">English</Button>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button>Save Settings</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 通知Drawerストーリー
 */
export const Notifications: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Notifications Drawer</CardTitle>
          <CardDescription>
            Notification center
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>
                  You have 3 new notifications
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
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
              </div>
              <DrawerFooter>
                <Button size="sm" variant="outline" className="w-full">
                  View all notifications
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ナビゲーションメニューDrawerストーリー
 */
export const NavigationMenu: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            Mobile navigation drawer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
                <DrawerDescription>
                  Navigate through the application
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <UserIcon className="h-4 w-4" />
                    <span>Home</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <SettingsIcon className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <BellIcon className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    )
  },
} 