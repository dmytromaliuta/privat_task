import { SyncOutlined } from "@ant-design/icons";
import Table from "./components/Table";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { Column, DataItem } from "./types/table";
import { useTypedDispatch } from "./hooks/useTypedDispath";
import { addRow, fetchTableData } from "./store/action-creators/table";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {

    const dispatch = useTypedDispatch();
    const { data, loading } = useTypedSelector(state => state.tableData);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [columns] = useState<Column[]>([
        {
            key: "col1",
            title: "Title"
        },
        {
            key: "col2",
            title: "Name"
        },
        {
            key: "col3",
            title: "Job"
        },
        {
            key: "btns"
        }
    ])
    const [formValues, setFormValues] = useState<DataItem>({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(fetchTableData())
    }, [dispatch])

    function submitForm(e: any) {
        e.preventDefault()

        const isError = Object.values(formValues).some(item => {
            return item?.trim().length === 0
        })
        
        if(isError || !(columns.length - 1 === Object.values(formValues).length)) {
            setErrorMessage("Необхідно заповнити всі поля")
        } else {
            setErrorMessage("")
            dispatch(addRow(formValues))
            setIsModalOpen(false)
            setFormValues({})
        }
    }

    return (
        <>
            <Header>
                <Loader $isLoading={loading}>
                    <SyncOutlined spin />
                    <LoaderText>
                        завантаження...
                    </LoaderText>
                </Loader>
                <Button onClick={() => setIsModalOpen(true)}>Додати рядок</Button>
            </Header>
            <Table columns={columns} data={data} isLoading={loading} />
            <Modal open={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)}>
                <form>
                    {
                        columns.map((item) => {
                            if (item.key === "btns") return null
                            return (
                                <WrappedInput key={item.key}>
                                    <span>{item.title}</span>
                                    <input 
                                        type="text" 
                                        onChange={(e) => {
                                            setFormValues(prev => {
                                                return {
                                                    ...prev,
                                                    [item.key]: e.target.value
                                                }
                                            })
                                        }}
                                        value={formValues[item.key] || ""}
                                    />
                                </WrappedInput>
                            )
                        })
                    }
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <Input type="submit" onClick={(e) => submitForm(e)} />
                </form>
            </Modal>
        </>
    )
}

export default App;

const Header = styled.div`
    background: #F3EEEA;
    height: 60px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`
const Loader = styled.div<{ $isLoading?: boolean }>`
  visibility: ${(props) => props.$isLoading ? '' : 'hidden'}
`

const LoaderText = styled.span`
    margin-left: 5px;
`

const Button = styled.button`
    background: #776B5D;
    border: none;
    border-radius: 5px;
    padding: 7px 14px;
    cursor: pointer;
    color: white;
    &:hover {
        background: #B0A695;
    }
`

const WrappedInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    span {
        margin-bottom: 5px;
    }
    input {
        padding: 7px;
    }
`

const Input = styled.input`
    margin-top: 20px;
    padding: 7px;
    cursor: pointer;
`

const ErrorMessage = styled.p`
    color: #ff0033;
    margin-bottom: 0px;
`