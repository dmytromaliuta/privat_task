import { ReactNode } from "react";
import styled from "styled-components";

interface ModalType {
    children: ReactNode;
    open: boolean;
    setIsModalOpen: () => void
}

function Modal({ children, open, setIsModalOpen }: ModalType) {

    if(!open) return null
    
    return (
        <Opacity>
            <ModalWrapper>
                <ModalBtn onClick={setIsModalOpen}>закрити</ModalBtn>
                {children}
            </ModalWrapper>
        </Opacity>
    )
}

export default Modal;

const ModalWrapper = styled.div`
    display: block;
    width: 300px;
    min-height: 50px;
    background: #EBE3D5;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    padding: 15px;
    padding-top: 40px;
    max-height: 400px;
    overflow-y: auto;
`

const Opacity = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: rgb(0 0 0 / 70%);
    top: 0px;
    left: 0px;
`

const ModalBtn = styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    text-decoration: underline;
    cursor: pointer;
`