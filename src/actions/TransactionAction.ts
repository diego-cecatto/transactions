import { BaseActionMocked } from "./BaseActionMocked";
import transactions from './Mocks/TransactionsMocks.json';

declare type FilterRequest = {
    page: number
}

export declare type TransactionItem = {
    TransactionID: string,
    Date: string,
    Description: string,
    Amount: number
}

export class TransactionAction extends BaseActionMocked {

    getAll(
        filter?: FilterRequest | undefined

    ) {

        //todo create pagination
        //todo order according request
        //todo default values

        transactions.slice(filter.page - 1, filter.page * 30)

        return this.request<TransactionItem[]>(
            transactions
        );
    }
}