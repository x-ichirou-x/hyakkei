import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { DatePicker } from "./date-picker"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

const meta: Meta<typeof DatePicker> = {
  title: "Components/UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    date: {
      control: "date",
      description: "Selected date",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なDate Picker（公式サイトと同じ）
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
      />
    )
  },
}

/**
 * ラベル付きDate Picker
 */
export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          生年月日
        </Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="日付を選択してください"
        />
      </div>
    )
  },
}

/**
 * 無効化されたDate Picker
 */
export const Disabled: Story = {
  render: () => {
    return (
      <DatePicker
        date={new Date()}
        onDateChange={() => {}}
        disabled={true}
        placeholder="無効化されています"
      />
    )
  },
}

/**
 * カスタムプレースホルダー
 */
export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="予約日を選択してください"
      />
    )
  },
}

/**
 * ドロップダウン付きDate Picker（公式サイトの例）
 */
export const WithDropdown: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date of birth
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
}

/**
 * 入力フィールド付きDate Picker（公式サイトの例）
 */
export const WithInput: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(
      new Date("2025-06-01")
    )
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(format(date || new Date(), "PPP"))

    const formatDate = (date: Date | undefined) => {
      if (!date) {
        return ""
      }
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }

    const isValidDate = (date: Date | undefined) => {
      if (!date) {
        return false
      }
      return !isNaN(date.getTime())
    }

    return (
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Subscription Date
        </Label>
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={value}
            placeholder="June 01, 2025"
            className="bg-background pr-10"
            onChange={(e) => {
              const date = new Date(e.target.value)
              setValue(e.target.value)
              if (isValidDate(date)) {
                setDate(date)
                setMonth(date)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date)
                  setValue(formatDate(date))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  },
}

/**
 * 日付と時刻のPicker（公式サイトの例）
 */
export const DateAndTime: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="10:30:00"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    )
  },
}

/**
 * 複数のDate Picker
 */
export const Multiple: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="start-date" className="px-1">
            開始日
          </Label>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            placeholder="開始日を選択"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="end-date" className="px-1">
            終了日
          </Label>
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            placeholder="終了日を選択"
          />
        </div>
      </div>
    )
  },
} 