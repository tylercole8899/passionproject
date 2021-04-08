import * as actionTypes from "./actionTypes"

export function addTableData(tableData: CoinTableData){
    const action: TableAction = {
        type: actionTypes.ADD_TABLE_DATA,
        tableData
    }
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}

export function orderTableData(tableData: CoinTableData) {
    const action: TableAction = {
        type: actionTypes.ORDER_TABLE_DATA,
        tableData
    }
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}

export function viewCoin(tableData: CoinTableData) {
    const action: TableAction = {
        type: actionTypes.DISPLAY_COIN,
        tableData
    }
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}