import { useQuery } from "@tanstack/react-query"
import { getBtcPrice } from '@/utils/helpers'
import { EXAMPLE_USER } from "@/constants"

//Custom hook for fetching and caching btc price. Improving readability.
export const useBtcPrice = () => {
    //TODO:Change mockup data on prod
    return useQuery({
        queryKey: ['price'],
        queryFn: () => getBtcPrice(EXAMPLE_USER.currency)
    })
}