import styled from "styled-components";
import { Column, DataItem } from "../types/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useTypedDispatch } from "../hooks/useTypedDispath";
import { deleteRow, updateCell as updateCellAction } from "../store/action-creators/table";

interface TableProps {
    columns: Column[];
    data: DataItem[];
    isLoading: boolean;
}

function Table({ columns, data, isLoading }: TableProps) {

    const dispatch = useTypedDispatch();

    function handleDeleteRow(rowIndex: number) {
        dispatch(deleteRow(rowIndex))
    }

    function updateCell(row: number, column: string, value: string) {
        dispatch(updateCellAction(row, column, value))
    }

    if (isLoading) return null;

    return (
        <TableOverflowed>
            <TableWrapper>
                <thead>
                    <tr>
                        {columns.map((item) => {
                            return (
                                <TableHead key={item.key}>
                                    {item.title}
                                </TableHead>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, rowIndex) => {
                            return <tr key={row.id}>{
                                columns.map((item) => {
                                    let key = `${row.id}_${item.key}`
                                    if (item.key === 'btns') {
                                        return (
                                            <TableData key={key}>
                                                <DeleteIconWrapper onClick={() => handleDeleteRow(rowIndex)}>
                                                    <DeleteOutlined />
                                                </DeleteIconWrapper>
                                            </TableData>
                                        )
                                    } else {
                                        return (
                                            <TableData key={key}>
                                                <TDInput type="text" onBlur={(e) => updateCell(rowIndex, item.key, e.target.value)} defaultValue={row[item.key]} />
                                            </TableData>
                                        )
                                    }
                                })
                            }</tr>
                        })
                    }
                </tbody>
            </TableWrapper>
        </TableOverflowed>
    )
}

export default Table;

const TableWrapper = styled.table`
    margin: 0 auto;
    padding: 0 15px;
    padding-bottom: 25px;
    border-spacing: 0 0;
`

const TableOverflowed = styled.div`
    overflow-x: auto;
    position: relative;
`

const TDInput = styled.input`
    margin: 0;
    padding: 5px;
    border: none;
    outline: none;
    line-height: 22px;
`

const TableData = styled.td`
    border: 1px solid black;
    border-top: none;
    border-left: none;
    padding: 0;
    &:first-child {
        border-left: 1px solid black;
    }
`

const TableHead = styled.th`
    border: 1px solid black;
    border-left: none;
    padding: 5px 0;
    width: 150px;
    &:first-child {
        border-left: 1px solid black;
    }
    &:last-child {
        width: 27px;
    }
`

const DeleteIconWrapper = styled.div`
    color: #776B5D;
    cursor: pointer;
    padding: 0px 5px;
`