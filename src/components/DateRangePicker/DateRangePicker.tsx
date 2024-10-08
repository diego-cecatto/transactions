import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    PickersShortcutsItem,
    PickerShortcutChangeImportance,
} from '@mui/x-date-pickers/PickersShortcuts';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRange } from '@mui/x-date-pickers-pro/models';

const getMonthWeekday = (
    monthIndex: number,
    weekdayIndex: number,
    dayRank: number,
) => {
    // Helper to find the nth weekday in a given month.
    // For example, Find the 3rd Monday in January.
    const today = dayjs();
    const firstDayOfMonth = today.month(monthIndex).startOf('month');
    const weekDay = firstDayOfMonth.day(); // 0 (Sunday) to 6 (Saturday)

    const deltaToFirstValidWeekDayInMonth =
        (weekDay > weekdayIndex ? 7 : 0) + weekdayIndex - weekDay;
    return firstDayOfMonth.add(
        (dayRank - 1) * 7 + deltaToFirstValidWeekDayInMonth,
        'day',
    );
};

const shortcutsItems: PickersShortcutsItem<Dayjs | null>[] = [
    {
        label: "New Year's Day",
        getValue: () => {
            // (January 1)
            const today = dayjs();
            return today.month(0).date(1);
        },
    },
    {
        label: 'Birthday of MLK Jr.',
        getValue: () => {
            // (third Monday in January)
            return getMonthWeekday(0, 1, 3);
        },
    },
    {
        label: 'Independence Day',
        getValue: () => {
            // (July 4)
            const today = dayjs();
            return today.month(6).date(4);
        },
    },
    {
        label: 'Labor Day',
        getValue: () => {
            // (first Monday in September)
            return getMonthWeekday(8, 1, 1);
        },
    },
    {
        label: 'Thanksgiving Day',
        getValue: () => {
            // (fourth Thursday in November)
            return getMonthWeekday(10, 4, 4);
        },
    },
    {
        label: 'Christmas Day',
        getValue: () => {
            // (December 25)
            const today = dayjs();
            return today.month(11).date(25);
        },
    },
];

export default function ChangeImportance() {
    const [changeImportance, setChangeImportance] =
        React.useState<PickerShortcutChangeImportance>('accept');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
