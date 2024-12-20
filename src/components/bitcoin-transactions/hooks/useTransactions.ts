import { useMemo } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query"
import { FilterOptions, SimplifiedTransaction } from '@/types'
import { fetchSimplifiedTransactions } from '@/utils/helpers'
import { EXAMPLE_USER } from "@/constants"

//Custom hook for fetching transactions and filtering them.
export const useTransactions = (filter: FilterOptions, weekAgo: Date, monthAgo: Date) => {
    const query = useInfiniteQuery({
        //TODO:Change mockup user address
        queryKey: ['transactions', EXAMPLE_USER.address],
        queryFn: ({ pageParam }) => fetchSimplifiedTransactions(EXAMPLE_USER.address, pageParam),
        getNextPageParam: (lastPage: SimplifiedTransaction[]) =>
            lastPage.length > 0 ? lastPage[lastPage.length - 1].id : undefined,
        initialPageParam: undefined,
    })

    //Filter transactions by date and type.
    const filteredTransactions = useMemo(() => {
        if (!query.data?.pages) return []

        return query.data.pages.flat().filter((transaction) => {
            const dateFilter =
                filter.dateRange === "all" ||
                (filter.dateRange === "week" && transaction.date >= weekAgo) ||
                (filter.dateRange === "month" && transaction.date >= monthAgo)

            const typeFilter =
                filter.type === "all" ||
                transaction.type === filter.type

            return dateFilter && typeFilter
        })
    }, [filter, query.data, weekAgo, monthAgo])

    //When filter is set f.e. on 1 week, transactions older than 1 week won't be fetched.
    const needsMoreData = useMemo(() => {
        if (!query.data?.pages || !query.hasNextPage) return false

        const currentTransactionCount = filteredTransactions.length

        if (filter.dateRange === "week") {
            const oldestTransaction = filteredTransactions[currentTransactionCount - 1]
            return oldestTransaction && oldestTransaction.date >= weekAgo
        }

        if (filter.dateRange === "month") {
            const oldestTransaction = filteredTransactions[currentTransactionCount - 1]
            return oldestTransaction && oldestTransaction.date >= monthAgo
        }

        return true
    }, [filteredTransactions, filter.dateRange, query.hasNextPage, query.data?.pages, weekAgo, monthAgo])

    return {
        ...query,
        filteredTransactions,
        needsMoreData
    }
}
