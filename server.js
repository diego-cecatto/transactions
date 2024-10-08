import express from 'express';
import transactions from './src/actions/Mocks/TransactionsMocks.json' assert { type: 'json' };
const app = express();
const port = 3000;

function sortTransactions(transactions, sortBy, order = 'asc') {
    return transactions.sort((a, b) => {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];

        if (typeof fieldA === 'string') {
            return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        } else if (typeof fieldA === 'number' || !isNaN(Date.parse(fieldA))) {
            return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
        return 0;
    });
}

app.post('/transactions', (req, res) => {
    const { page = 1, limit = 30, sortBy = 'Date', order = 'asc' } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const sortedTransactions = sortTransactions([...transactions], sortBy, order);
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + limitNumber);

    res.json({
        page: pageNumber,
        limit: limitNumber,
        total: transactions.length,
        totalPages: Math.ceil(transactions.length / limitNumber),
        data: paginatedTransactions
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
