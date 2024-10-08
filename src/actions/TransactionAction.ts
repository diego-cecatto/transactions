
export declare type TransactionItem = {
    TransactionID: string,
    Date: string,
    Description: string,
    Amount: number
}

export declare type FilterModel = {
    sort?: {
        field: string,
        sort: string
    },
    page: number,
    filter?: {
        date: {
            start: string, end: string
        }
    }
}

export class TransactionAction extends BaseActionMocked {

    getAll(filter: FilterModel) {
        return fetch('http://localhost:3000/transactions', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filter),
        })
    }

}