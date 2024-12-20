import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {TableHeaderProps} from "@/types";


//Return transactions header.
export const TransactionTableHeader = ({ satsDenomination, onToggleDenomination }: TableHeaderProps) => (
    <TableHeader>
        <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead
                onClick={onToggleDenomination}
                className="cursor-pointer hover:bg-gray-100"
            >
                {/*Clickable. Satoshi<=>Btc denomination setting*/}
                {satsDenomination ? "Amount (SAT)" : "Amount (BTC)"}
            </TableHead>
            <TableHead>Fiat Value</TableHead>
            <TableHead>Block Explorer</TableHead>
        </TableRow>
    </TableHeader>
)