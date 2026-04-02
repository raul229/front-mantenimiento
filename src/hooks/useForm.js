import { useState } from "react";

export function useForm({formularioInicial}){
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(false);

    const limpiarFormulario = () => {
        setFormulario(formularioInicial);
    }


    return {
        formulario,
        setFormulario,
        limpiarFormulario,
        editando,
        setEditando
    }

}