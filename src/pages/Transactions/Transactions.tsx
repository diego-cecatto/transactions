import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { TransactionAction, TransactionItem } from '../../actions/TransactionAction';
import { Filter } from '../../components/Filter/Filter';
import { TransactionsFilter } from './TransactionsFilter';

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'TransactionID',
        headerName: 'ID',
        flex: 0.1
    },
    {
        field: 'Date',
        headerName: 'Date',
        flex: 0.2
    },
    {
        field: 'Description',
        headerName: 'Description',
        sortable: false,
        flex: 0.4
    },
    {
        field: 'Amount',
        headerName: 'Amount',
        type: 'number',
        description: 'This column has a value getter and is not sortable.'
    },
];


export function TransactionsPage() {
    const [transactions, setTransactions] = useState<TransactionItem[]>([]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = (model?: any) => {
        var transactionActions = new TransactionAction();
        transactionActions.getAll({
            page: 1
        }).then((data) => {
            setTransactions(data)
        })
    }

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Filter>
                <TransactionsFilter />
            </Filter>
            <DataGrid
                rows={transactions}
                getRowId={(row) => row.TransactionID}
                columns={columns}
                onPaginationModelChange={(model) => fetchData(model)}
                onFilterModelChange={(model) => fetchData(model)}
                onSortModelChange={(model) => fetchData(model)}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 30,
                        },
                    },
                }}
                pageSizeOptions={[30]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}