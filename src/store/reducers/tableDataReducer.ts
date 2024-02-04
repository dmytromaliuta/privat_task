import { TableDataAction, TableDataState, TableDataTypes } from "../../types/table";

const initialState: TableDataState = {
    data: [],
    loading: false
}

export const tableDataReducer = (state = initialState, action: TableDataAction): TableDataState => {
    switch(action.type) {
        case TableDataTypes.FETCH_DATA:
            return {loading: true, data: []}
        case TableDataTypes.FETCH_DATA_SUCCESS:
            return {loading: false, data: action.payload}
        case TableDataTypes.ADD_ROW:
            return {loading: false, data: [...state.data, action.payload]}
        case TableDataTypes.DELETE_ROW:
            return {loading: false, data: state.data.filter((_, index) => index !== action.payload)}
        case TableDataTypes.UPDATE_CELL:
            return {loading: false, data: state.data.map((item, index) => {
                if(index === action.payload.row) {
                    return {
                        ...item,
                        [action.payload.column]: action.payload.value
                    }
                }
                return item
            })}
        default:
            return state
    }
}