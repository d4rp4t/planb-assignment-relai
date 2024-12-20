# Bitcoin Transaction Summary Component

This React app was created for Relai Assignment in PlanB tech school. It provides a comprehensive interface for displaying and filtering Bitcoin transactions. It supports infinite scrolling, multiple filter options, and displays both Bitcoin and fiat values for transactions.

## Key Features
- 📊 **Transaction Display**: Tabulated view of all transactions with sorting capabilities
- 🔍 **Filters**: Date range and transaction type filtering with real-time updates
- 💱 **BTC to Fiat Conversion**: Real-time price updates using CoinGecko API
- ♾️ **Infinite Scrolling**: Load data seamlessly with optimized performance
- 🖥️ **Responsive Design**: Optimized for all devices
- 🚀 **Error Handling**: User-friendly error messages and loading states

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm, yarn, or pnpm package manager
- CoinGecko API key

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory:
```env
VITE_COINGECKO_API_KEY=your_api_key_here
```

4. Update the `EXAMPLE_USER` mockup data in `constants/index.ts` to match your requirements.

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Project Structure

```
├── components/            # Reusable React components
│   ├── bitcoin-transactions/  # Bitcoin transaction management
│   │   ├── index.tsx           # Main transaction component
│   │   ├── filterBar.tsx       # Transaction filter bar
│   │   ├── hooks/              # Custom hooks for transactions
│   │   │   ├── useBtcPrice.ts  # Fetch and manage BTC price
│   │   │   └── useTransactions.ts # Fetch and manage transaction data
│   │   └── transaction-table/  # Transaction table components
│   │       ├── body.tsx        # Table body layout
│   │       ├── header.tsx      # Table header layout
│   │       └── row.tsx         # Individual row layout
│   └── ui/                     # Pre-styled UI components from shadcn    
```

## Core API

### BitcoinTransactions
Main component that renders the full transaction interface.

```typescript
interface BitcoinTransactionsProps {
  defaultFilter?: TransactionFilter;
  onTransactionClick?: (transaction: Transaction) => void;
  className?: string;
}
```

### Custom Hooks

#### useBtcPrice
Manages BTC price fetching and updates.

```typescript
const { 
  data: btcPrice, 
  error, 
  status 
} = useBtcPrice()
```

#### useTransactions
Handles transaction fetching, filtering, and infinite scroll logic.

```typescript
const {
  filteredTransactions,
  needsMoreData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  error,
  status
} = useTransactions(filter, weekAgo, monthAgo)
```

## Data Flow

1. User interactions trigger filter updates
2. `useTransactions` hook manages data fetching based on filters
3. React Query handles caching and background updates
4. Infinite scroll triggers new data fetching when needed
5. BTC price updates happen independently via `useBtcPrice` hook


## External Dependencies
- react-query: For data fetching and caching
- react-intersection-observer: For infinite scroll detection
- lucide-react: For icons
- shadcn/ui: For UI components
- axios: For data fetching

## Browser Support

Tested and supported in:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Future Improvements

1. Add transaction amount aggregation with customizable time periods
2. Implement date range picker for custom ranges
3. Add CSV/PDF export functionality
4. Add full-text transaction search with advanced filters
5. Implement detailed transaction view modal
6. Add unit and integration tests
7. Implement transaction grouping by day/week/month
8. Add more customization options for the table display

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details