import express from 'express';
import transactions from './src/actions/Mocks/TransactionsMocks.json' assert { type: 'json' };
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

function sortTransactions(transactions, sortBy) {
    return transactions.sort((a, b) => {
        const fieldA = a[sortBy.field];
        const fieldB = b[sortBy.field];

        if (typeof fieldA === 'string') {
            return sortBy.sort === 'asc'
                ? fieldA.localeCompare(fieldB)
                : fieldB.localeCompare(fieldA);
        } else if (typeof fieldA === 'number' || !isNaN(Date.parse(fieldA))) {
            return sortBy.sort === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
        return 0;
    });
}

app.post('/transactions', (req, res) => {
    const {
        page = 1,
        limit = 30,
        sort = { field: 'Date', sort: 'desc' },
        filter,
    } = req.body;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const sortedTransactions = sortTransactions([...transactions], sort);
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginatedTransactions = sortedTransactions.slice(
        startIndex,
        startIndex + limitNumber
    );

    res.json({
        page: pageNumber,
        limit: limitNumber,
        total: transactions.length,
        totalPages: Math.ceil(transactions.length / limitNumber),
        data: paginatedTransactions,
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
