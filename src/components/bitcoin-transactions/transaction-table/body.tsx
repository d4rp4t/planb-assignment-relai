import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { TransactionRow } from "./row"
import type { TableBodyProps} from '@/types'



export const TransactionTableBody = ({
                                         status,
                                         error,
                                         transactions,
                                         btcPrice,
                                         satsDenomination
                                     }: TableBodyProps) => {
    //Show skeleton placeholder when fetching
    if (status === 'pending') {
        return Array(5).fill(null).map((_, idx) => (
            <TableRow key={idx}>
                <TableCell colSpan={5}>
                    <Skeleton className="w-full h-8" />
                </TableCell>
            </TableRow>
        ))
    }
    //Show error fetching alert.
    if (status === 'error' && error) {
        return (
            <TableRow>
                <TableCell colSpan={5}>
                    <Alert variant="destructive">
                        <AlertDescription>
                            Failed to load transactions: {error.message}
                        </AlertDescription>
                    </Alert>
                </TableCell>
            </TableRow>
        )
    }
    //If no transactions found, return info about it.
    if (transactions.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                    No transactions found
                </TableCell>
            </TableRow>
        )
    }

    return (
        <TableBody>
            {transactions.map((transaction) => (
                <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    btcPrice={btcPrice}
                    satsDenomination={satsDenomination}
                />
            ))}
        </TableBody>
    )
}

