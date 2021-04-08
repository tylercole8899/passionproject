interface SingleCoin {
    id: string,
    name: string,
    symbol: string,
    rank: string,
    price_usd: string,
    percent_change_1h: string,
    percent_change_24h: string,
    percent_change_7d: string
}

interface SingleCoinState {
    data: SingleCoin
}

interface CoinTableData {
    data: SingleCoin[],
    info: {
        coins_num: number,
        time: number
    }
    viewIndividual: boolean,
    individual: string
}

interface SingleCoinExtra {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    price_usd: string,
    percent_change_1h: string,
    percent_change_24h: string,
    percent_change_7d: string,
    market_cap_usd: string,
    volume24: string,
    volume24_native: string,
    csupply: string,
    price_btc: string,
    tsupply: string,
    msupply: string
}
interface TableAction { 
    type: string,
    tableData: CoinTableData
}

type DispatchType = (args: TableAction) => TableAction