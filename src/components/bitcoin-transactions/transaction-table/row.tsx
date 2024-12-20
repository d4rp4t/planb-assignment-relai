import { TableRow, TableCell } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon } from 'lucide-react'
import { formatDate, formatBitcoin, formatFiat } from '@/utils/helpers'
import {EXAMPLE_USER, SATS_PER_BTC} from "@/constants"
import {TransactionRowProps} from "@/types";


export const TransactionRow = ({ transaction, btcPrice, satsDenomination }: TransactionRowProps) => (
    <TableRow>
        <TableCell>{formatDate(transaction.date)}</TableCell>

        <TableCell>
            {transaction.type === "Receive" ? (
                <span className="flex items-center text-green-600">
          <ArrowDownIcon className="mr-1" size={16} />
          Receive
        </span>
            ) : (
                <span className="flex items-center text-red-600">
          <ArrowUpIcon className="mr-1" size={16} />
          Send
        </span>
            )}
        </TableCell>
        <TableCell>
            {/*Show Formatted data in user preferenced setting - BTC or SAT*/}
            {formatBitcoin(transaction.amount, satsDenomination)}
        </TableCell>
        <TableCell>
            {/*TODO:Change mockup data on prod*/}
            {/*Calculate transactions value in users fiat currency.*/}
            {btcPrice && formatFiat(transaction.amount * btcPrice / SATS_PER_BTC, EXAMPLE_USER.currency)}
        </TableCell>
        <TableCell>
            <a
                href={`https://blockstream.info/tx/${transaction.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex items-center"
            >
                View
                <ExternalLinkIcon className="ml-1" size={16} />
            </a>
        </TableCell>
    </TableRow>
)