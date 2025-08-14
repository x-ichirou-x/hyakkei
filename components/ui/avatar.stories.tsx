/**
 * AvatarコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ユーザーを表す画像要素とフォールバック
 * - 画像が読み込めない場合の代替表示
 * - アクセシビリティに配慮された設計
 * 
 * 主な仕様:
 * - AvatarImage: ユーザーの画像を表示
 * - AvatarFallback: 画像が読み込めない場合の代替テキスト
 * - className: カスタムスタイル用クラス
 * - src: 画像のURL
 * - alt: 画像の代替テキスト
 * 
 * 制限事項:
 * - 画像の読み込みに失敗した場合、AvatarFallbackが表示される
 */

import type { Meta, StoryObj } from "@storybook/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/**
 * Avatarコンポーネントのメタデータ
 */
const meta: Meta<typeof Avatar> = {
  title: "Components/UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なアバターストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-row flex-wrap items-center gap-12">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  },
}

/**
 * フォールバックのみのアバターストーリー
 */
export const FallbackOnly: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
      </div>
    )
  },
}

/**
 * 異なるサイズのアバターストーリー
 */
export const DifferentSizes: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    )
  },
}

/**
 * 異なる形状のアバターストーリー
 */
export const DifferentShapes: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-none">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    )
  },
}

/**
 * グループ化されたアバターストーリー
 */
export const Grouped: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex -space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>+2</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex -space-x-2">
          <Avatar className="ring-2 ring-white">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-white">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-white">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  },
}

/**
 * カスタムスタイルのアバターストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <Avatar className="border-2 border-semantic-accent">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="bg-semantic-bg text-semantic-accent">CN</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-semantic-success">
          <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
          <AvatarFallback className="bg-semantic-bg text-semantic-success">LR</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-purple-500 shadow-lg">
          <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback className="bg-purple-100 text-purple-800">ER</AvatarFallback>
        </Avatar>
      </div>
    )
  },
}

/**
 * オンライン状態のアバターストーリー
 */
export const OnlineStatus: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-semantic-success border-2 border-white"></div>
        </div>
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-semantic-border border-2 border-white"></div>
        </div>
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-yellow-500 border-2 border-white"></div>
        </div>
      </div>
    )
  },
}

/**
 * ユーザー情報付きのアバターストーリー
 */
export const WithUserInfo: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">shadcn</p>
            <p className="text-xs text-muted-foreground">@shadcn</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Lee Robinson</p>
            <p className="text-xs text-muted-foreground">@leerob</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Evil Rabbit</p>
            <p className="text-xs text-muted-foreground">@evilrabbit</p>
          </div>
        </div>
      </div>
    )
  },
} 