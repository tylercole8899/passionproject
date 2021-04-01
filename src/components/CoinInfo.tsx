import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from './Loading';

const CoinTable = styled.table`
    width: 100%;
    height: 2em;
`;

const Row = styled.tr`
    height: 30px;
    background: white;
    &:nth-child(even) {
        background: #dedede
    }
    font-size: 15px;
    &:first-child {
        font-size: 20px;
        height: 40px;
    }
    &:last-child {
        height: 40px;
    }
`;

const Filter = styled.a`
    font-weight: bold;
    font-size: 18px;
    text-decoration: underline;
    &:hover {
        color: blue;
    }
`;

interface Response {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    price_usd: string,
    percent_change_1h: string,
    percent_change_24h: string,
    percent_change_7d: string
}

interface RenderProps {
    data: Response
}

function RenderCoinRow(props: RenderProps){
    let data = props.data;
    return(
        <Row>
            <td>{data.name}</td>
            <td>{data.symbol}</td>
            <td>{data.rank}</td>
            <td>{data.price_usd}</td>
            <td>{data.percent_change_1h}</td>
            <td>{data.percent_change_24h}</td>
            <td>{data.percent_change_7d}</td>
        </Row>
    )
}



export default function CoinInfo(){
    const [error, setError] = useState(null);
    const [startPoint, setStartPoint] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState<{data: Response[], info: {}}>({ 
        data: [], 
        info: {} 
    });
    const [sortOrder, setSortOrder] = useState({
        name: 0, 
        symbol: 0, 
        rank: 1, 
        price_usd: 0, 
        percent_change_1h: 0, 
        percent_change_24h: 0, 
        percent_change_7d: 0
    });
  
    useEffect(() => {
        let start = startPoint;
        let API_CALL = ['https://api.coinlore.net/api/tickers/?start=', start.toString(), '&limit=100'];
        fetch("".concat(...API_CALL))
            .then(res => res.json())
            .then(
            (result) => {
                if (start === 0) {
                    setCoinData(result);
                    setIsLoaded(true);
                    setIsLoading(false);
                }
                else {
                    setCoinData((priorCoinData) => {
                        const newCoinData = priorCoinData.data.concat(result.data);
                        return ({
                            data: newCoinData,
                            info: priorCoinData.info
                        })
                    })
                    setIsLoaded(true);
                    setIsLoading(false);
                }
            },
            // Check for errors
            (error) => {
                setIsLoaded(true);
                setIsLoading(false);
                setError(error);
                console.log(error);
            }
        )
    },[startPoint])

    function sortBy(field: string){
        let orderBy: number;
        switch(field) {
            case "name":
            case "symbol":
            case "rank":
                orderBy = (sortOrder[field] % 2 === 0) ? 1 : -1;
                setCoinData((priorCoinData) => {
                    const newData = priorCoinData.data.sort((a, b) => a[field] > b[field] ? orderBy : -orderBy);
                    return ({
                        data: newData,
                        info: priorCoinData.info
                    })
                })
                setSortOrder({...sortOrder, [field]: (sortOrder[field] + 1)});
                break;

            case "price_usd":
            case "percent_change_1h":
            case "percent_change_24h":
            case "percent_change_7d":
                orderBy = (sortOrder[field] % 2 === 0) ? 1 : -1;
                setCoinData((priorCoinData) => {
                    const newData = priorCoinData.data.sort((a, b) => parseInt(a[field]) > parseInt(b[field]) ? orderBy : -orderBy);
                    return ({
                        data: newData,
                        info: priorCoinData.info
                    })
                })
                setSortOrder({...sortOrder, [field]: (sortOrder[field] + 1)});
                break;

            default:
                break;
        }
    }

    
    if(error !== null){
        return(
            <div>
                <h1>ERROR: {error}</h1>
            </div>
        )
    }
    else if (isLoaded && error === null) {
        return(
            <CoinTable>
                <tbody>
                    <Row>
                        <td><Filter onClick={() => sortBy("name")}>Coin</Filter></td>
                        <td><Filter onClick={() => sortBy("symbol")}>Symbol</Filter></td>
                        <td><Filter onClick={() => sortBy("rank")}>Rank</Filter></td>
                        <td><Filter onClick={() => sortBy("price_usd")}>Price</Filter></td>
                        <td><Filter onClick={() => sortBy("percent_change_1h")}>% Change - 1hr</Filter></td>
                        <td><Filter onClick={() => sortBy("percent_change_24h")}>% Change - 24hr</Filter></td>
                        <td><Filter onClick={() => sortBy("percent_change_7d")}>% Change - 7day</Filter></td>
                    </Row>
                    {coinData.data.map(coin => {
                        return(
                            <RenderCoinRow data={coin} key={coin.id}/>
                        )
                    })}
                    <Row>
                        <th colSpan={7}>
                            <button onClick={() => { setStartPoint(startPoint + 100);
                                                     setIsLoading(true); }}>
                            Show Next 100 Coins
                            </button>
                        </th>
                    </Row>
                    {isLoading ? <Loader /> : null}
                </tbody>
            </CoinTable>
        )
    }
    else {
        return( <Loader /> )
    }
}