import { CalendarDays } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/shadcn/calendar";
import { useState } from "react";

type ReparationFilterDatesProps = {
  fromDate?: string;
  toDate?: string;
  setFromDate: (date: string | undefined) => void;
  setToDate: (date: string | undefined) => void;
};

const ReparationFilterDates: React.FC<ReparationFilterDatesProps> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const stringToDate = (dateString: string | undefined): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};


  const dateToString = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  // Always output YYYY-MM-DD in local timezone
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};


  const handleFromDateSelect = (date: Date | undefined) => {
    setFromDate(dateToString(date));
    setShowFromCalendar(false);
  };

  const handleToDateSelect = (date: Date | undefined) => {
    setToDate(dateToString(date));
    setShowToCalendar(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Date de début */}
      <div className="relative flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date de début
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all flex items-center justify-between"
            onClick={() => setShowFromCalendar(!showFromCalendar)}
          >
            <span className={fromDate ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
              {fromDate ? formatDate(fromDate) : "Sélectionner une date"}
            </span>
            <CalendarDays className="w-4 h-4 text-gray-400" />
          </button>
          
          {showFromCalendar && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
              <CalendarComponent
                mode="single"
                selected={stringToDate(fromDate)}
                onSelect={handleFromDateSelect}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Date de fin */}
      <div className="relative flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date de fin
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all flex items-center justify-between"
            onClick={() => setShowToCalendar(!showToCalendar)}
          >
            <span className={toDate ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
              {toDate ? formatDate(toDate) : "Sélectionner une date"}
            </span>
            <CalendarDays className="w-4 h-4 text-gray-400" />
          </button>
          
          {showToCalendar && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
              <CalendarComponent
                mode="single"
                selected={stringToDate(toDate)}
                onSelect={handleToDateSelect}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReparationFilterDates;