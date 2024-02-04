import { Dispatch } from "redux"
import { DataItem, TableDataAction, TableDataTypes } from "../../types/table"

const responseFromServer = [
    {
        id: "1",
        col1: "Mr",
        col2: "Daniel",
        col3: "380974952344",
    }
]

export const fetchTableData = () => {
    return (dispatch: Dispatch<TableDataAction>) => {
        try {
            dispatch({ type: TableDataTypes.FETCH_DATA })
            setTimeout(() => {
                dispatch({ type: TableDataTypes.FETCH_DATA_SUCCESS, payload: responseFromServer })
            }, 5000)
        } catch (error) {
            //handling errors here
            //I didn't implement this part as we don't use real API and we just emulate delay
        }
    }
}

export const deleteRow = (index: number): TableDataAction => {
    return {
        type: TableDataTypes.DELETE_ROW,
        payload: index
    }
}

export const updateCell = (row: number, column: string, value: string): TableDataAction => {
    return {
        type: TableDataTypes.UPDATE_CELL,
        payload: {
            row,
            column,
            value
        }
    }
}

export const addRow = (formValues: DataItem): TableDataAction => {
    return {
        type: TableDataTypes.ADD_ROW,
        payload: formValues
    }
}