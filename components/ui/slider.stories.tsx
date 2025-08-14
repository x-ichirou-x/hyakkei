import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Slider } from "./slider"
import { cn } from "@/lib/utils"

const meta: Meta<typeof Slider> = {
  title: "Components/UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "object",
      description: "デフォルト値（配列形式）",
    },
    value: {
      control: "object",
      description: "現在のスライダーの値（配列形式）",
    },
    min: {
      control: "number",
      description: "最小値",
    },
    max: {
      control: "number",
      description: "最大値",
    },
    step: {
      control: "number",
      description: "ステップ値",
    },
    disabled: {
      control: "boolean",
      description: "無効化",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なスライダーストーリー（公式サイトと同じ）
 */
export const Default: Story = {
  render: ({ className, ...props }) => {
    return (
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[60%]", className)}
        {...props}
      />
    )
  },
}

/**
 * 範囲選択スライダーストーリー
 */
export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    max: 100,
    step: 1,
    className: "w-[60%]",
  },
}

/**
 * 制御されたスライダーストーリー
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([50])

    return (
      <div className="space-y-4 w-[60%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Current value: {value[0]}</p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setValue([Math.max(0, value[0] - 10)])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            -10
          </button>
          <button
            onClick={() => setValue([Math.min(100, value[0] + 10)])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            +10
          </button>
        </div>
      </div>
    )
  },
}

/**
 * 制御された範囲スライダーストーリー
 */
export const ControlledRange: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80])

    return (
      <div className="space-y-4 w-[60%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Range: {value[0]} - {value[1]}
          </p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setValue([Math.max(0, value[0] - 5), Math.min(100, value[1] + 5)])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            Expand
          </button>
          <button
            onClick={() => setValue([Math.min(value[1] - 10, value[0] + 5), Math.max(value[0] + 10, value[1] - 5)])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            Contract
          </button>
        </div>
      </div>
    )
  },
}

/**
 * 無効化されたスライダーストーリー
 */
export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
    className: "w-[60%]",
  },
}

/**
 * カスタム範囲スライダーストーリー
 */
export const CustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 200,
    step: 5,
    className: "w-[60%]",
  },
}

/**
 * 大きなステップスライダーストーリー
 */
export const LargeSteps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
    className: "w-[60%]",
  },
}

/**
 * 音量制御スライダーストーリー
 */
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState([70])

    return (
      <div className="space-y-4 w-[60%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Volume: {volume[0]}%</p>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setVolume([0])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            Mute
          </button>
          <button
            onClick={() => setVolume([100])}
            className="px-3 py-1 text-sm border rounded hover:bg-accent"
          >
            Max
          </button>
        </div>
      </div>
    )
  },
}

/**
 * 価格範囲スライダーストーリー
 */
export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([1000, 5000])

    return (
      <div className="space-y-4 w-[60%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Price Range: ¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
          </p>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

/**
 * 年齢範囲スライダーストーリー
 */
export const AgeRange: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState([18, 65])

    return (
      <div className="space-y-4 w-[60%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Age Range: {ageRange[0]} - {ageRange[1]} years
          </p>
          <Slider
            value={ageRange}
            onValueChange={setAgeRange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

/**
 * 複数スライダーストーリー
 */
export const MultipleSliders: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([50])
    const [contrast, setContrast] = useState([75])
    const [saturation, setSaturation] = useState([60])

    return (
      <div className="space-y-6 w-[60%]">
        <div className="space-y-2">
          <p className="text-sm font-medium">Brightness: {brightness[0]}%</p>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Contrast: {contrast[0]}%</p>
          <Slider
            value={contrast}
            onValueChange={setContrast}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Saturation: {saturation[0]}%</p>
          <Slider
            value={saturation}
            onValueChange={setSaturation}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

/**
 * カスタムスタイリングスライダーストーリー
 */
export const CustomStyling: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[60%] [&>div]:bg-semantic-accent/40 [&>div>div]:bg-semantic-accent [&>div>div+div]:bg-semantic-accent/20 [&>div>div+div]:border-semantic-accent",
  },
}

/**
 * 小さいサイズスライダーストーリー
 */
export const SmallSize: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[60%] [&>div]:h-1 [&>div>div+div]:size-3",
  },
}

/**
 * 大きいサイズスライダーストーリー
 */
export const LargeSize: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[60%] [&>div]:h-3 [&>div>div+div]:size-6",
  },
}

/**
 * 垂直スライダーストーリー
 */
export const Vertical: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    orientation: "vertical",
    className: "h-64",
  },
} 