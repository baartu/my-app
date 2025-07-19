"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { useLanguage } from "../contexts/LanguageContext";

interface DateRangeFilterProps {
  onDateChange?: (dateRange: DateRange | undefined) => void;
}

type CustomNavProps = {
  nextMonth?: Date;
  previousMonth?: Date;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  dir?: string;
};

function CustomNav({ nextMonth, previousMonth, onNextClick, onPreviousClick }: CustomNavProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 mb-2">
      <button
        type="button"
        onClick={onPreviousClick}
        disabled={!previousMonth}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shadow hover:bg-orange-100 transition-colors disabled:opacity-30"
      >
        <ChevronLeft className="w-6 h-6 text-orange-500" />
      </button>
      <button
        type="button"
        onClick={onNextClick}
        disabled={!nextMonth}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shadow hover:bg-orange-100 transition-colors disabled:opacity-30"
      >
        <ChevronRight className="w-6 h-6 text-orange-500" />
      </button>
    </div>
  );
}

export default function DateRangeFilter({ onDateChange }: DateRangeFilterProps) {
  const { t } = useLanguage();
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const clearDate = () => {
    setDate(undefined);
    onDateChange?.(undefined);
  };

  // Responsive ay sayısı
  const getMonthCount = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2);

  return (
    <div className="relative">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex items-center gap-3 border-2 border-gray-200 px-4 py-3 rounded-xl bg-white text-sm shadow-md hover:border-orange-400 hover:text-orange-600 transition-all duration-200 focus:border-orange-500 focus:outline-none">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
            {date?.from ? (
              <span className="text-gray-700 font-medium">
                {format(date.from, "dd/MM/yyyy")}
                {date?.to ? ` - ${format(date.to, "dd/MM/yyyy")}` : ""}
              </span>
            ) : (
              <span className="text-gray-500">{t("portfolio.selectDateRange")}</span>
            )}
            {date && (
              <button
                onClick={e => { e.stopPropagation(); clearDate(); }}
                className="ml-2 p-1 rounded-full hover:bg-orange-100 transition-colors"
                tabIndex={-1}
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 z-50 w-[98vw] max-w-3xl relative"
          >
            {/* Kapatma butonu */}
            <button
              onClick={clearDate}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-orange-100 transition-colors"
              title={t("portfolio.clear")}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{t("portfolio.selectDateRangeTitle")}</h3>
            </div>
            <DayPicker
              mode="range"
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={getMonthCount()}
              className="date-picker-custom"
              components={{ Nav: CustomNav }}
              classNames={{
                months: "flex flex-col sm:flex-row gap-6 justify-center",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-lg font-bold text-gray-800",
                caption_label: "text-lg font-bold",
                nav: "space-x-2 flex items-center",
                nav_button: "h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-orange-100 rounded-full transition-colors text-orange-500 flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-500 rounded-md w-9 font-semibold text-base",
                row: "flex w-full mt-2",
                cell: "h-10 w-10 text-center text-base p-0 relative focus-within:z-20",
                day: "h-10 w-10 p-0 font-medium aria-selected:opacity-100 hover:bg-orange-100 rounded-full transition-colors",
                day_range_end: "day-range-end",
                day_selected: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-500 focus:text-white",
                day_today: "bg-orange-100 text-orange-700 font-bold",
                day_outside: "day-outside text-gray-400 opacity-50 aria-selected:bg-gray-50 aria-selected:text-gray-400 aria-selected:opacity-30",
                day_disabled: "text-gray-400 opacity-50",
                day_range_middle: "aria-selected:bg-orange-100 aria-selected:text-orange-700",
                day_hidden: "invisible",
              }}
            />
            {date && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-base text-gray-600">
                  {t("portfolio.selected")}: <span className="font-semibold">{format(date.from!, "dd/MM/yyyy")}</span>
                  {date.to && ` - ${format(date.to, "dd/MM/yyyy")}`}
                </span>
                <button
                  onClick={clearDate}
                  className="text-base text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  {t("portfolio.clear")}
                </button>
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
