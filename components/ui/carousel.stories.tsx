/**
 * CarouselコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - Embla Carouselライブラリを使用したカルーセルコンポーネント
 * - モーションとスワイプ機能を備えたスライドショー
 * - 水平・垂直方向のスライドに対応
 * 
 * 主な仕様:
 * - Carousel: メインのカルーセルコンテナ
 * - CarouselContent: スライドコンテンツのコンテナ
 * - CarouselItem: 個別のスライドアイテム
 * - CarouselPrevious: 前のスライドボタン
 * - CarouselNext: 次のスライドボタン
 * 
 * 制限事項:
 * - Embla Carouselライブラリに依存
 * - プラグインの追加が必要な場合がある
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  StarIcon,
  HeartIcon,
  ShareIcon
} from "lucide-react"
import AutoplayPlugin from "embla-carousel-autoplay"

/**
 * Carouselコンポーネントのメタデータ
 */
const meta: Meta<typeof Carousel> = {
  title: "Components/UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "カルーセルの方向",
    },
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
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
 * 基本的なカルーセルストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * サイズ調整カルーセルストーリー
 */
export const Sizes: Story = {
  render: () => {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * スペーシング付きカルーセルストーリー
 */
export const Spacing: Story = {
  render: () => {
    return (
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * 垂直方向カルーセルストーリー
 */
export const Vertical: Story = {
  render: () => {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * API使用カルーセルストーリー
 */
export const WithApi: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
      <div className="mx-auto max-w-xs">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
      </div>
    )
  },
}

/**
 * 自動再生カルーセルストーリー
 */
export const AutoplayCarousel: Story = {
  render: () => {
    const plugin = React.useRef(
      AutoplayPlugin({ delay: 2000, stopOnInteraction: true })
    )

    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * プロダクトカルーセルストーリー
 */
export const ProductCarousel: Story = {
  render: () => {
    const products = [
      { id: 1, name: "商品A", price: "¥2,980", rating: 4.5, image: "商品画像A" },
      { id: 2, name: "商品B", price: "¥3,480", rating: 4.2, image: "商品画像B" },
      { id: 3, name: "商品C", price: "¥1,980", rating: 4.8, image: "商品画像C" },
      { id: 4, name: "商品D", price: "¥4,280", rating: 4.1, image: "商品画像D" },
      { id: 5, name: "商品E", price: "¥2,180", rating: 4.6, image: "商品画像E" },
    ]

    return (
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">{product.image}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{product.price}</span>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 fill-semantic-warning text-semantic-warning" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        カートに追加
                      </Button>
                      <Button variant="outline" size="sm">
                        <HeartIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * ユーザーカルーセルストーリー
 */
export const UserCarousel: Story = {
  render: () => {
    const users = [
      { id: 1, name: "田中太郎", role: "フロントエンド開発者", avatar: "TT" },
      { id: 2, name: "佐藤花子", role: "UI/UXデザイナー", avatar: "SH" },
      { id: 3, name: "鈴木一郎", role: "バックエンド開発者", avatar: "SI" },
      { id: 4, name: "高橋美咲", role: "プロダクトマネージャー", avatar: "TM" },
      { id: 5, name: "伊藤健太", role: "QAエンジニア", avatar: "IK" },
    ]

    return (
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {users.map((user) => (
            <CarouselItem key={user.id} className="md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarImage src={`https://github.com/${user.avatar.toLowerCase()}.png`} alt={user.name} />
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-sm mb-1">{user.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{user.role}</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm">
                        プロフィール
                      </Button>
                      <Button variant="outline" size="sm">
                        <ShareIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * カスタムナビゲーションカルーセルストーリー
 */
export const CustomNavigation: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    const scrollTo = (index: number) => {
      api?.scrollTo(index)
    }

    return (
      <div className="mx-auto max-w-xs">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => api?.scrollPrev()}
            disabled={current === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex space-x-1">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant={current === index + 1 ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => scrollTo(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => api?.scrollNext()}
            disabled={current === count}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  },
}

/**
 * ループカルーセルストーリー
 */
export const Loop: Story = {
  render: () => {
    return (
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
} 