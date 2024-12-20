export interface TableBodyProps {
    status: string
    error?: Error|null
    transactions: SimplifiedTransaction[]
    btcPrice: number | undefined
    satsDenomination: boolean
}

export interface TableHeaderProps {
    satsDenomination: boolean
    onToggleDenomination: () => void
}

export interface TransactionRowProps {
    transaction: SimplifiedTransaction
    btcPrice: number | undefined
    satsDenomination: boolean
}


export type SimplifiedTransaction = {
    id: string;
    date: Date;
    amount: number;
    type: 'Send' | 'Receive';
}

export type FilterOptions = {
    dateRange: 'all' | 'week' | 'month';
    type: 'all' | 'Send' | 'Receive';
}

type Transaction = {
    txid: string;
    version: number;
    locktime: number;
    vin: {
        txid: string;
        vout: number;
        prevout: {
            scriptpubkey: string;
            scriptpubkey_asm: string;
            scriptpubkey_type: string;
            scriptpubkey_address: string;
            value: number;
        },
        scriptsig: string;
        scriptsig_asm: string;
        witness: string[];
        is_coinbase: boolean;
        sequence: number;
    }[]
    vout: {
        scriptpubkey: string;
        scriptpubkey_asm: string;
        scriptpubkey_type: string;
        scriptpubkey_address: string;
        value: number;
    }[]
    size: number;
    weight: number;
    fee: number;
    status:{
        confirmed: boolean;
        block_height: number;
        block_hash: number;
        block_time: number;
    }
}
type AddressInfo = {
    address: string;
    chain_stats: {
        funded_txo_count: number;
        funded_txo_sum: number;
        spent_txo_count: number;
        spent_txo_sum: number;
        tx_count: number;
    }
    mempool_stats: {
        funded_txo_count: number;
        funded_txo_sum: number;
        spent_txo_count: number;
        spent_txo_sum: number;
        tx_count: number;
    }
}

