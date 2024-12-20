'use client'

import { useState, useMemo } from 'react'
import { InView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/spinner"

import type { FilterOptions } from '@/types'
import {TransactionTableBody} from "@/components/bitcoin-transactions/transaction-table/body.tsx";
import {TransactionTableHeader} from "@/components/bitcoin-transactions/transaction-table/header.tsx";
import {FilterBar} from "@/components/bitcoin-transactions/filterBar.tsx";
import {useBtcPrice} from "@/components/bitcoin-transactions/hooks/useBtcPrice.ts";
import {useTransactions} from "@/components/bitcoin-transactions/hooks/useTransactions.ts";


export default function BitcoinTransactionSummary() {
    const [filter, setFilter] = useState<FilterOptions>({
        dateRange: "all",
        type: "all",
    })
    const [satsDenomination, setSatsDenomination] = useState(false)

    const { weekAgo, monthAgo } = useMemo(() => {
        const nowTimestamp = Date.now();
        return {
            weekAgo: new Date(nowTimestamp - 7 * 24 * 60 * 60 * 1000),
            monthAgo: new Date(nowTimestamp - 30 * 24 * 60 * 60 * 1000),
        };
    }, []);

    const {
        filteredTransactions,
        needsMoreData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error: transactionsError,
        status: transactionsStatus
    } = useTransactions(filter, weekAgo, monthAgo)

    const {
        data: btcPrice,
        error: priceError,
    } = useBtcPrice()

    return (
        <Card className="w-full md:max-w-4xl mx-auto max-w-11/12">
            <CardHeader>
                <CardTitle>Bitcoin Transaction Summary</CardTitle>
    </CardHeader>
    <CardContent>
    <FilterBar filter={filter} onFilterChange={setFilter} />

    {priceError && (
        <Alert variant="destructive" className="mb-4">
        <AlertDescription>
            Failed to load BTC price: {priceError.message}
        </AlertDescription>
        </Alert>
    )}

    <Table>
        <TransactionTableHeader
            satsDenomination={satsDenomination}
    onToggleDenomination={() => setSatsDenomination(!satsDenomination)}
    />
    <TransactionTableBody
    status={transactionsStatus}
    error={transactionsError}
    transactions={filteredTransactions}
    btcPrice={btcPrice}
    satsDenomination={satsDenomination}
    />
    </Table>

    {isFetchingNextPage && (
        <div className="w-full flex justify-center py-4">
            <LoadingSpinner />
            </div>
    )}

    {needsMoreData && (
        <InView
            onChange={(inView) => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }}
        className="w-full h-4"
            />
    )}
    </CardContent>
    </Card>
)
}