import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterOptions } from '@/types'

interface FilterBarProps {
    filter: FilterOptions
    onFilterChange: (newFilter: FilterOptions) => void
}

export const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => (
    <div className="flex justify-between mb-4">
        <Select
            value={filter.dateRange}
            onValueChange={(value) => onFilterChange({
                ...filter,
                dateRange: value as FilterOptions['dateRange']
            })}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="week">Last week</SelectItem>
                <SelectItem value="month">Last month</SelectItem>
            </SelectContent>
        </Select>

        <Select
            value={filter.type}
            onValueChange={(value) => onFilterChange({
                ...filter,
                type: value as FilterOptions['type']
            })}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="Send">Send</SelectItem>
                <SelectItem value="Receive">Receive</SelectItem>
            </SelectContent>
        </Select>
    </div>
)