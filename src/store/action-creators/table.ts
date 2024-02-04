import { Dispatch } from "redux"
import { DataItem, TableDataAction, TableDataTypes } from "../../types/table"

const responseFromServer = [
    {
        id: "1",
        col1: "Mr",
        col2: "Dmytro",
        col3: "380974952344",
    },
    {
        id: "2",
        col1: "Mr",
        col2: "John",
        col3: "380974955666",
    },
    {
        id: "3",
        col1: "Ms",
        col2: "Amila",
        col3: "380974955033",
    },
    {
        id: "4",
        col1: "Ms",
        col2: "Emili",
        col3: "380974957333",
    },
    {
        id: "5",
        col2: "Danil",
        col3: "380977245033"
    },
    {
        id: "6",
        col1: "Mr",
        col2: "Dmytro",
        col3: "380972555033",
    }
]

export const fetchTableData = () => {
    return (dispatch: Dispatch<TableDataAction>) => {
        try {
            dispatch({ type: TableDataTypes.FETCH_DATA })
            setTimeout(() => {
                dispatch({ type: TableDataTypes.FETCH_DATA_SUCCESS, payload: responseFromServer })
            }, 500)
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