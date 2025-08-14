/**
 * CalendarコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 日付を選択・編集できるカレンダーコンポーネント
 * - React DayPickerをベースに構築
 * - 単一選択、範囲選択、複数選択をサポート
 * 
 * 主な仕様:
 * - mode: 選択モード（single, multiple, range）
 * - selected: 選択された日付
 * - onSelect: 日付選択時のコールバック
 * - disabled: 無効化された日付
 * - modifiers: カスタム修飾子
 * 
 * 制限事項:
 * - React DayPickerの機能に依存
 * - 日付フォーマットはロケールに依存
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UsersIcon,
  StarIcon
} from "lucide-react"
import type { DateRange } from "react-day-picker"

/**
 * Calendarコンポーネントのメタデータ
 */
const meta: Meta<typeof Calendar> = {
  title: "Components/UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "日付選択モード",
    },
    selected: {
      control: "date",
      description: "選択された日付",
    },
    disabled: {
      control: "object",
      description: "無効化された日付",
    },
    className: {
      control: "text",
      description: "カスタムスタイル用クラス",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なカレンダーストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
    )
  },
}

/**
 * シンプルなカレンダーストーリー
 */
export const Simple: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}

/**
 * 範囲選択カレンダーストーリー
 */
export const Range: Story = {
  render: () => {
    const [date, setDate] = React.useState<{
      from: Date
      to: Date | undefined
    } | undefined>({
      from: new Date(2024, 1, 20),
      to: new Date(2024, 1, 25),
    })

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">期間を選択</h3>
          <p className="text-sm text-muted-foreground">
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                </>
              ) : (
                date.from.toLocaleDateString()
              )
            ) : (
              "日付を選択してください"
            )}
          </p>
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-lg border"
        />
      </div>
    )
  },
}

/**
 * 複数選択カレンダーストーリー
 */
export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      new Date(2024, 1, 15),
      new Date(2024, 1, 20),
      new Date(2024, 1, 25),
    ])

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">複数日付を選択</h3>
          <p className="text-sm text-muted-foreground">
            選択された日付: {dates?.length || 0}日
          </p>
        </div>
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-lg border"
        />
      </div>
    )
  },
}

/**
 * 無効化された日付付きカレンダーストーリー
 */
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // 過去の日付と週末を無効化
    const disabled = {
      before: new Date(),
      after: new Date(2024, 11, 31),
      daysOfWeek: [0, 6], // 日曜日と土曜日
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">無効化された日付</h3>
          <p className="text-sm text-muted-foreground">
            過去の日付と週末は選択できません
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabled}
          className="rounded-lg border"
        />
      </div>
    )
  },
}

/**
 * イベントカレンダーストーリー
 */
export const EventCalendar: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // イベントがある日付
    const events = [
      new Date(2024, 1, 15),
      new Date(2024, 1, 20),
      new Date(2024, 1, 25),
    ]

    const modifiers = {
      event: events,
    }

    const modifiersStyles = {
      event: "bg-semantic-accent/10 text-semantic-accent font-semibold",
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">イベントカレンダー</h3>
          <p className="text-sm text-muted-foreground">
            青い日付にイベントがあります
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-lg border"
        />
      </div>
    )
  },
}

/**
 * 予約システムカレンダーストーリー
 */
export const BookingCalendar: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // 予約済みの日付
    const booked = [
      new Date(2024, 1, 10),
      new Date(2024, 1, 12),
      new Date(2024, 1, 18),
    ]

    // 利用可能な日付
    const available = [
      new Date(2024, 1, 15),
      new Date(2024, 1, 16),
      new Date(2024, 1, 17),
      new Date(2024, 1, 19),
      new Date(2024, 1, 20),
    ]

    const modifiers = {
      booked,
      available,
    }

    const modifiersStyles = {
      booked: "bg-semantic-danger/10 text-semantic-danger font-semibold",
      available: "bg-semantic-success/10 text-semantic-success font-semibold",
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            予約カレンダー
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-semantic-success/10 rounded"></div>
              <span>利用可能</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-semantic-danger/10 rounded"></div>
              <span>予約済み</span>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-lg border"
          />
          {date && (
            <div className="text-center">
              <p className="text-sm font-medium">
                選択された日付: {date.toLocaleDateString()}
              </p>
              {booked.some(d => d.toDateString() === date.toDateString()) ? (
                <Badge variant="destructive" className="mt-2">
                  予約済み
                </Badge>
              ) : available.some(d => d.toDateString() === date.toDateString()) ? (
                <Badge variant="default" className="mt-2">
                  利用可能
                </Badge>
              ) : (
                <Badge variant="secondary" className="mt-2">
                  選択不可
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムスタイルのカレンダーストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">カスタムスタイル</h3>
          <p className="text-sm text-muted-foreground">
            カスタムテーマが適用されたカレンダー
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border-2 border-semantic-accent/30 bg-semantic-bg"
          classNames={{
            day: "hover:bg-semantic-accent/20 focus:bg-semantic-accent/30",
            day_selected: "bg-semantic-accent text-semantic-bg hover:brightness-95",
            day_today: "bg-semantic-accent/10 text-semantic-accent font-bold",
          }}
        />
      </div>
    )
  },
}

/**
 * 複数月表示カレンダーストーリー
 */
export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">複数月表示</h3>
          <p className="text-sm text-muted-foreground">
            一度に複数の月を表示
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={3}
          className="rounded-lg border"
        />
      </div>
    )
  },
}

/**
 * ドロップダウン付きカレンダーストーリー
 */
export const WithDropdown: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">ドロップダウン付き</h3>
          <p className="text-sm text-muted-foreground">
            月と年の選択にドロップダウンを使用
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
          className="rounded-lg border"
        />
      </div>
    )
  },
} 