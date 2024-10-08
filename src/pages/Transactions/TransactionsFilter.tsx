import Grid from '@mui/material/Grid2';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';

export function TransactionsFilter() {
    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <DateRangePicker />
            </Grid>
        </Grid>
    )
}