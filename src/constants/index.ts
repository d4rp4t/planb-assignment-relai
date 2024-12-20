const SATS_PER_BTC = 100000000;

const COINGECKO_API_KEY:string = import.meta.env.COINGECKO_API_KEY||"c";


//Mockup data - this should be provided from db on prod and deleted
const EXAMPLE_USER = {
    username: "d4rp4t",
    avatar:"https://avatars.githubusercontent.com/u/50369025?v=4",
    address: "bc1qmazta6wt8u7hm3w7tes4jfmqlwfhcqeftwxlyq",
    currency: "USD",
    locale:"en-US"
}


if (!COINGECKO_API_KEY) {
    throw new Error("No API key found. Panicking");
}

export {
    EXAMPLE_USER,
    COINGECKO_API_KEY,
    SATS_PER_BTC,
}