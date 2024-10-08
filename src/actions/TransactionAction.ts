export declare type TransactionItem = {
    TransactionID: string;
    Date: string;
    Description: string;
    Amount: number;
};

export declare type FilterModel = {
    sort?: {
        field: string;
        sort: string;
    };
    page: number;
    filters?: {
        rangeStart: string;
        rangeEnd: string;
    };
};

export class TransactionAction {
    getAll(filter: FilterModel) {
        return fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filter),
        });
    }
}
