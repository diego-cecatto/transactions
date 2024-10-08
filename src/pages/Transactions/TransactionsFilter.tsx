import Grid from '@mui/material/Grid2';
import DateRangePicker from 'mui-popover-date-range-picker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

declare type TransactionsFilterProps = {
    onFilterChange: (filter: any) => void
}

export function TransactionsFilter({ onFilterChange }: TransactionsFilterProps) {
    const [value, setValue] = useState(null);
    const onChange = (nValue: any) => {
        setValue(nValue);
        onFilterChange(nValue)
    }
    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        value={value}
                        onChange={onChange}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    )
}