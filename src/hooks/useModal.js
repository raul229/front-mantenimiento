import { useState } from "react";

export function useModal(){
    const [show, setShow] = useState(false);
    const ocultarModal = () => setShow(false);
    const mostrarModal = () => setShow(true);
    return { show, ocultarModal, mostrarModal };
}