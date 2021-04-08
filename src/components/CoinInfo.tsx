import { useState, useEffect, useCallback } from 'react';
import { Dispatch } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { Table, Row, Filter, CoinName, ChangeArrow} from './styles';
import Loader from './Loading';
import { addTableData, orderTableData, viewCoin } from '../store/actions';


export default function CoinInfo(){
    const [error, setError] = useState(null);
    const [startPoint, setStartPoint] = useState(0);  // Start point for API Call
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Keep track of the number of times the data has been sorted by a given field
    const [sortOrder, setSortOrder] = useState({
        name: 0, 
        symbol: 0, 
        rank: 1, 
        price_usd: 0, 
        percent_change_1h: 0, 
        percent_change_24h: 0, 
        percent_change_7d: 0
    });

    const coinData = useSelector(
        (state: CoinTableData) => state, shallowEqual
    );

    const dispatch: Dispatch<any> = useDispatch();

    const appendData = useCallback(
        (response: CoinTableData) => dispatch(addTableData(response)),
        [dispatch]
    )
  
    const filterData = useCallback(
        (response: CoinTableData) => dispatch(orderTableData(response)),
        [dispatch] 
    )

    const showIndividual = useCallback(
        (response: CoinTableData) => dispatch(viewCoin(response)),
        [dispatch]
    )

    // Fetches 100 coins from the given start point.
    // If data already exists the new data is appended.
    useEffect(() => {
        let start = startPoint;
        let API_CALL = ['https://api.coinlore.net/api/tickers/?start=', start.toString(), '&limit=100'];
        fetch("".concat(...API_CALL))
            .then(res => res.json())
            .then(
            (result) => {
                appendData(result);
                setIsLoaded(true);
                setIsLoading(false);
            },
            // Check for errors
            (error) => {
                setIsLoaded(true);
                setIsLoading(false);
                setError(error);
                console.log(error);
            }
        )
    },[startPoint, appendData])

    // Sorts table data by given field in ASC and DESC
    function sortBy(field: string){
        let orderBy: number;
        let newData: CoinTableData;
        switch(field) {
            case "name":
            case "symbol":
            case "rank":
                // Determine correct sort order
                orderBy = (sortOrder[field] % 2 === 0) ? 1 : -1;
                newData = {
                    ...coinData,
                    data: coinData.data.sort((a, b) => a[field] > b[field] ? orderBy : -orderBy),
                };

                // Increment sortOrder for the given field so that
                // the next call to sort this field sorts in reverse order
                setSortOrder({...sortOrder, [field]: (sortOrder[field] + 1)});
                break;

            case "price_usd":
            case "percent_change_1h":
            case "percent_change_24h":
            case "percent_change_7d":
                orderBy = (sortOrder[field] % 2 === 0) ? 1 : -1;
                newData = {
                    ...coinData,
                    data: coinData.data.sort((a, b) => parseInt(a[field]) > parseInt(b[field]) ? orderBy : -orderBy),
                };
                setSortOrder({...sortOrder, [field]: (sortOrder[field] + 1)});
                break;

            default:
                newData = coinData;
                break;
        }
        filterData(newData);
    }

    // Format coin data into a row
    function RenderCoinRow(props: SingleCoinState){
        let data = props.data;
        let updatedTableData = {
            ...coinData,
            individual: data.id
        }

        return(
            <Row>
                <td><CoinName onClick={() => showIndividual(updatedTableData)}>{data.name}</CoinName></td>
                <td>{data.symbol}</td>
                <td>{data.rank}</td>
                <td>{data.price_usd}</td>
                <td>{ parseFloat(data.percent_change_1h) > 0.0 ? <ChangeArrow color="#08DC00">&#9650;</ChangeArrow> : <ChangeArrow>&#9660;</ChangeArrow>} {data.percent_change_1h}</td>
                <td>{ parseFloat(data.percent_change_24h) > 0.0 ? <ChangeArrow color="#08DC00">&#9650;</ChangeArrow> : <ChangeArrow>&#9660;</ChangeArrow>} {data.percent_change_24h}</td>
                <td>{ parseFloat(data.percent_change_7d) > 0.0 ? <ChangeArrow color="#08DC00">&#9650;</ChangeArrow> : <ChangeArrow>&#9660;</ChangeArrow>}{data.percent_change_7d}</td>
            </Row>
        )
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
            <div>
                <Table>
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
                    </tbody>
                </Table>
                {isLoading ? <Loader /> : null}
            </div>
        )
    }
    else {
        return( <Loader /> )
    }
}