import { useState, useEffect } from 'react';

import Loader from './Loading';
import { CoinHeader, CoinHeaderItem } from './styles';
import { formatNumber }  from './helpers';

export default function CoinData ({coin, showIndividual}: any) {
    const [error, setError] = useState(null);
    const [coinData, setCoinData] = useState<SingleCoinExtra | undefined>(undefined);

    useEffect(() => {
        let id = coin;
        let API_CALL = ['https://api.coinlore.net/api/ticker/?id=', id];
        fetch("".concat(...API_CALL))
            .then(res => res.json())
            .then(
                (result) => {
                    setCoinData(result[0]);
                },

                (error) => {
                    setError(error);
                    console.log(error);
                }
            )
    }, [coin]);

    if (coinData !== undefined) {
        return(
            <div>
                <CoinHeader>
                    <CoinHeaderItem>
                        <b>{coinData.name}</b>
                        <br/>
                        {coinData.symbol}
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Price USD</b>
                        <br/>
                        ${coinData.price_usd}
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Price BTC</b>
                        <br/>
                        {coinData.price_btc}
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Past Hour</b>
                        <br/>
                        {coinData.percent_change_1h}%
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Past Day</b>
                        <br/>
                        {coinData.percent_change_24h}%
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Past Week</b>
                        <br/>
                        {coinData.percent_change_7d}%
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Market Cap</b>
                        <br/>
                        ${formatNumber( coinData.market_cap_usd )}
                    </CoinHeaderItem>
                    <CoinHeaderItem>
                        <b>Circulating Supply</b>
                        <br/>
                        {formatNumber(parseInt(coinData.csupply).toString())}
                    </CoinHeaderItem>
                </CoinHeader>
                <button onClick={() => showIndividual("")}>Return To Table</button>
            </div>
        )
    }
    else if (error !== null){
        return(
            <div>
                <h1>ERROR: {error}</h1>
            </div>
        )
    }
    else {
        return (
            <Loader />
        )
    }
}