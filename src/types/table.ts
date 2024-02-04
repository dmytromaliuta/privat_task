export enum TableDataTypes {
    FETCH_DATA = "FETCH_DATA",
    FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
    DELETE_ROW = "DELETE_ROW",
    UPDATE_CELL = "UPDATE_CELL"
}

export interface DataItem {
    [key: string]: string | undefined;
}

export interface TableDataState {
    data: DataItem[];
    loading: boolean;
}

export interface Column {
    key: string,
    title?: string
}

interface CellPayload {
    value: string;
    row: number;
    column: string;
}

interface FetchTableDataAction {
    type: TableDataTypes.FETCH_DATA;
}

interface FetchTableDataSuccessAction {
    type: TableDataTypes.FETCH_DATA_SUCCESS;
    payload: DataItem[];
}

interface DeleteRowAction {
    type: TableDataTypes.DELETE_ROW;
    payload: number;
}

interface UpdateCellAction {
    type: TableDataTypes.UPDATE_CELL;
    payload: CellPayload;
}

export type TableDataAction = FetchTableDataAction | FetchTableDataSuccessAction | DeleteRowAction | UpdateCellAction;