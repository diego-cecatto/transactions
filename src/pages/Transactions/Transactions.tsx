import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
    GridSortModel,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {
    FilterModel,
    TransactionAction,
    TransactionItem,
} from '../../actions/TransactionAction';
import { TransactionsFilter } from './TransactionsFilter';
import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { CustomNoResultsOverlay } from '../../components/CustomOverlay/CustomOverlay';

const columns: GridColDef[] = [
    {
        field: 'TransactionID',
        headerName: 'ID',
        flex: 0.1,
    },
    {
        field: 'Date',
        headerName: 'Date',
        flex: 0.2,
    },
    {
        field: 'Description',
        headerName: 'Description',
        sortable: false,
        flex: 0.4,
    },
    {
        field: 'Amount',
        headerName: 'Amount',
        type: 'number',
        description: 'This column has a value getter and is not sortable.',
    },
];

export function TransactionsPage() {
    const [transactions, setTransactions] = useState<
        TransactionItem[] | null | false
    >(null);
    const { enqueueSnackbar } = useSnackbar();

    const [filters, setFilter] = useState<FilterModel>({
        page: 1,
    });

    useEffect(() => {
        fetchData(filters);
    }, []);

    const fetchData = (filters: FilterModel) => {
        var transactionActions = new TransactionAction();
        return transactionActions
            .getAll(filters)
            .then(async (res) => {
                var transactions = await res.json();
                setTransactions(transactions);
                enqueueSnackbar('Error on fetch data');
            })
            .catch(() => {
                setTransactions(false);
                enqueueSnackbar('Error on fetch data');
            });
    };

    const reFetchData = (filters: FilterModel) => {
        fetchData(filters);
        setFilter(filters);
    };

    const onPaginationChange = (model: GridPaginationModel) => {
        reFetchData({ ...filters, page: model.page });
    };

    const onSort = (model: GridSortModel) => {
        reFetchData({
            ...filters,
            sort: {
                field: model[0].field,
                sort: model[0].sort ?? 'desc',
            },
        });
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <TransactionsFilter
                onFilterChange={(filter: {
                    rangeStart: 'string';
                    rangeEnd: 'string';
                }) => {
                    if (filter && !filter.rangeStart && !filter.rangeEnd) {
                        return;
                    }
                    console.log(filter);
                    reFetchData({
                        ...filters,
                        filters: filter,
                    });
                }}
            />
            <DataGrid
                rows={transactions ? transactions.data : []}
                getRowId={(row) => row.TransactionID}
                columns={columns}
                paginationMode="server"
                sortingMode="server"
                onPaginationModelChange={onPaginationChange}
                onSortModelChange={onSort}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 30,
                        },
                    },
                }}
                rowCount={transactions ? transactions.total : 0}
                pageSizeOptions={[30]}
                checkboxSelection
                loading={transactions === null}
                disableRowSelectionOnClick
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                }}
                slots={{
                    noRowsOverlay: () => (
                        <Typography
                            color={transactions === false ? 'error' : ''}
                            sx={{
                                textAlign: 'center',
                                marginTop: '12px',
                            }}
                        >
                            {transactions === false ? (
                                'Error on fetch data'
                            ) : (
                                <CustomNoResultsOverlay />
                            )}
                        </Typography>
                    ),
                }}
            />
        </Box>
    );
}
