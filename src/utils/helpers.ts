import {SimplifiedTransaction, Transaction} from "@/types";
import axios from "axios";
import {SATS_PER_BTC} from "@/constants";

//Format date in users locale
export const formatDate = (date: Date, locale?:string): string => {
  return date.toLocaleDateString(locale||'en-US');
};

//Depending on user-chose denomination - when bitcoin 8 decimals, when satoshi 0.
export const formatBitcoin = (amount: number, satsDenomination:boolean): string => {
  if(!satsDenomination) {
    amount = amount/SATS_PER_BTC;
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  }
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatFiat = (amount: number, currency: string, locale?:string): string => {
  return amount.toLocaleString(locale||"en-US", {
    style: 'currency',
    currency: currency,
  });
};

//Fetch simplified transactions
export async function fetchSimplifiedTransactions(address:string, lastSignature?:string):Promise<SimplifiedTransaction[]> {
  const transactions = await fetchTransactions(address, lastSignature);
  return transactions.map((tx) => {
    return SimplifyTransaction(tx, address);
  });

}

// Fetch transactions from the API
async function fetchTransactions(address: string, lastSignature?: string) {
  const url = lastSignature
      ? `https://blockstream.info/api/address/${address}/txs/chain/${lastSignature}`
      : `https://blockstream.info/api/address/${address}/txs`;

  const { data } = await axios.get<Transaction[]>(url);
  return data;
}

// //Get User info from api
// export async function getUserInfo(address:string):Promise<AddressInfo> {
//   const {data} = await axios.get(`https://blockstream.info/api/address/${address}`);
//   return data;
// }

//Get bitcoin price from CoinGecko api - provided currency should be in ISO-4217 format
export async function getBtcPrice(currency:string):Promise<number> {
  const {data} = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}`,
      {
        headers:{
          'accept': 'application/json',
          'x-cg-demo-api-key': 'CG-br99sAXVVnnWRhxAurTXN2Ze'
        }
      });
  return data.bitcoin[currency.toLowerCase()];
}


//Display transaction object in more readable way
export function SimplifyTransaction(transaction: Transaction, currentAddress: string): SimplifiedTransaction {
  // Determine transaction type and calculate amount based on current address
  let type: 'Send' | 'Receive';
  let amount: number;

  // Find outputs addressed to the current address
  const receivedOutputs = transaction.vout.filter(
      output => output.scriptpubkey_address === currentAddress
  );

  // Find inputs from the current address
  const sentInputs = transaction.vin.filter(
      input => input.prevout?.scriptpubkey_address === currentAddress
  );

  // Calculate total received amount
  const totalReceived = receivedOutputs.reduce((sum, output) => sum + output.value, 0);

  // Calculate total sent amount
  const totalSent = sentInputs.reduce((sum, input) => sum + (input.prevout?.value || 0), 0);

  // Determine transaction type and amount
  if (totalSent > totalReceived) {
    type = 'Send';
    amount = totalSent - totalReceived;
  } else {
    type = 'Receive';
    amount = totalReceived - totalSent;
  }

  // Use block time or fallback to current time if not confirmed
  const transactionDate = transaction.status.confirmed
      ? new Date(transaction.status.block_time * 1000)
      : new Date();

  return {
    id: transaction.txid,
    date: transactionDate,
    amount: amount,
    type: type,
  };
}