import { ADD_TABLE_DATA, DISPLAY_COIN, ORDER_TABLE_DATA } from './actionTypes';

const initialState: CoinTableData = {
    data: [],
    info: {
        coins_num: 0,
        time: 0
    },
    viewIndividual: false,
    individual: "-1"
}

const reducer = (
    state: CoinTableData = initialState,
    action: TableAction
): CoinTableData => {
    switch (action.type) {
        case ADD_TABLE_DATA:
            const updatedTable: SingleCoin[] = state.data.concat(action.tableData.data); 
            return {
                ...state,
                data: updatedTable
            }
        case ORDER_TABLE_DATA:
            const orderedTable: SingleCoin[] = action.tableData.data;
            return{
                ...state,
                data: orderedTable
            }
        case DISPLAY_COIN:
            const coinID: string = action.tableData.individual;
            console.log(coinID)
            return (coinID === "-1") ? {
                ...state,
                viewIndividual: false,
                individual: "-1"
            }
            :
            {
                ...state,
                viewIndividual: true,
                individual: coinID
            }
        default:
            return state;
    }
}

export default reducer;