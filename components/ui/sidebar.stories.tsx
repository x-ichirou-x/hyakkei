/**
 * SidebarコンポーネントのStorybookストーリー
 * 
 * @description
 * shadcn/uiのSidebarコンポーネントのStorybookストーリーです。
 * 様々なバリアント、折りたたみモード、使用方法を確認できます。
 * 
 * @author Storybook
 * @version 1.0.0
 */

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  FileText,
  BarChart3,
  Mail,
  Bell,
  User,
  LogOut,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInput,
} from "./sidebar"
import { Button } from "./button"
import { Badge } from "./badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

/**
 * Sidebarコンポーネントのメタデータ定義
 */
const meta: Meta<typeof Sidebar> = {
  title: "Components/UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    side: {
      control: "select",
      description: "サイドバーの位置",
      options: ["left", "right"],
    },
    variant: {
      control: "select",
      description: "サイドバーのバリアント",
      options: ["sidebar", "floating", "inset"],
    },
    collapsible: {
      control: "select",
      description: "折りたたみモード",
      options: ["offcanvas", "icon", "none"],
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex h-screen">
          <Story />
          <SidebarInset>
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
                <p className="text-muted-foreground mb-4">
                  This is the main content area. The sidebar can be toggled using the trigger button.
                </p>
                <SidebarTrigger />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    ),
  ],
}
export default meta

/**
 * Storyの型定義
 */
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

// メニューアイテムの定義
const menuItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    badge: "12",
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const projectItems = [
  {
    title: "Project Alpha",
    url: "#",
    icon: FileText,
  },
  {
    title: "Project Beta",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Project Gamma",
    url: "#",
    icon: Users,
  },
]

/**
 * 基本的なサイドバーストーリー
 */
export const Basic: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <User className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">User</span>
            <span className="truncate text-xs">user@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  ),
}

/**
 * アイコンモードのサイドバーストーリー
 */
export const IconMode: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <User className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">User</span>
            <span className="truncate text-xs">user@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  ),
}

/**
 * フローティングバリアントのサイドバーストーリー
 */
export const Floating: Story = {
  args: {
    side: "left",
    variant: "floating",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * インセットバリアントのサイドバーストーリー
 */
export const Inset: Story = {
  args: {
    side: "left",
    variant: "inset",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * アクション付きのサイドバーストーリー
 */
export const WithActions: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuAction>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * サブメニュー付きのサイドバーストーリー
 */
export const WithSubMenu: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

    const toggleItem = (title: string) => {
      setOpenItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }

    return (
      <Sidebar {...args}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">S</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Sidebar</span>
              <span className="truncate text-xs">Application</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.title === "Settings" && (
                      <SidebarMenuAction onClick={() => toggleItem(item.title)}>
                        {openItems[item.title] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </SidebarMenuAction>
                    )}
                    {item.badge && (
                      <SidebarMenuBadge>
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Collapsible open={openItems["Settings"]}>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="#profile">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="#notifications">
                          <Bell className="h-4 w-4" />
                          <span>Notifications</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="#email">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projectItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <User className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">User</span>
              <span className="truncate text-xs">user@example.com</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    )
  },
}

/**
 * スケルトンローディング付きのサイドバーストーリー
 */
export const WithSkeleton: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Loading...</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * 検索機能付きのサイドバーストーリー
 */
export const WithSearch: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sidebar</span>
            <span className="truncate text-xs">Application</span>
          </div>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * 右側のサイドバーストーリー
 */
export const RightSide: Story = {
  args: {
    side: "right",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">R</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Right Sidebar</span>
            <span className="truncate text-xs">Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#new">
                    <Plus />
                    <span>New Item</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#recent">
                    <FileText />
                    <span>Recent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/**
 * レール付きのサイドバーストーリー
 */
export const WithRail: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => (
    <>
      <Sidebar {...args}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">S</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Sidebar</span>
              <span className="truncate text-xs">Application</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarRail />
    </>
  ),
}

/**
 * 制御されたサイドバーストーリー
 */
export const Controlled: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  render: (args) => {
    const [open, setOpen] = useState(true)

    return (
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <div className="flex h-screen">
          <Sidebar {...args}>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">S</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Controlled Sidebar</span>
                  <span className="truncate text-xs">State: {open ? "Open" : "Closed"}</span>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        {item.badge && (
                          <SidebarMenuBadge>
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Controlled Sidebar</h1>
                <p className="text-muted-foreground mb-4">
                  Current state: {open ? "Open" : "Closed"}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setOpen(true)}>Open</Button>
                  <Button onClick={() => setOpen(false)}>Close</Button>
                  <SidebarTrigger />
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  },
} 