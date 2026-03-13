import { Button, Table } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { ClienteService } from "@/service/ClienteService"

export function ClientePage() {

    const { data: clientes, loading, cargarDatos, crear, actualizar, eliminar } = useCrud(ClienteService);

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h1>Clientes</h1>
            <Button>Nuevo</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Button variant="primary" onClick={() => actualizar(cliente)}>Editar</Button>
                                <Button variant="danger" onClick={() => eliminar(cliente.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}   