import { useEffect, useState } from "react";
import apiService from "../services/ApiService";

function deleteItem(id) {
     apiService.delete(id);        
}
  
function updateItem(item) {
  item.preventDefault();
  let id = item.target.key.value;
  let data = {
    titulo: item.target.titulo.value,
    descricao: item.target.descricao.value,
    status: item.target.status.value
  };

  apiService.put(id, data);
}

function Tabela() {
    const [data, setData] = useState([]);
    const [item, setItem] = useState('');
    const [statusFiltro, setStatusFiltro] = useState(''); 
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    useEffect(() => {
        apiService.get().then(response => setData(response.data.data))
    }, []);

    function modalItem(item) {
        return setItem(item);      
    }

    useEffect(() => {
        if (statusFiltro !== '') {
        setDadosFiltrados(data.filter((item) => item.status === statusFiltro));
        } else {
        setDadosFiltrados(data);
        }
    }, [statusFiltro, data]);

    const handleFiltroChange = (e) => {
        setStatusFiltro(e.target.value);
    };

    return ( 
        <div>
            <div className="container">
                <div className="col-2">
                    <label htmlFor="filtroStatus" className="form-label">Filtro por Status</label>
                    <select className="form-select" aria-label="Default select example" name="status" id="filtroStatus" value={statusFiltro} onChange={handleFiltroChange}>
                        <option value="">Todos</option>
                        <option value="Pendente">Pendente</option>
                        <option value="EmProgresso">Em Progresso</option>
                        <option value="Concluido">Concluido</option>
                    </select>
                </div>
                <br></br>
                <table className="table table-sm table-striped bg-light">
                    <thead>
                    <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data Criação</th>
                        <th scope="col">Data Conclusão</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dadosFiltrados.map( a => (
                        <tr key={a.id}>
                        <td>{a.titulo}</td>
                        <td>{a.descricao}</td>
                        <td>{a.datacriacao}</td>
                        <td>{a.dataconclusao}</td>
                        <td>{a.status}</td>
                        <td>
                            <button 
                            onClick={() => modalItem(a)}
                            type="button" 
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal" data-bs-target="#Modal"
                            >Editar</button>
                        </td>
                        <td>
                            <button 
                            onClick={() => deleteItem(a.id)}
                            type="button" 
                            className="btn btn-danger btn-sm">Excluir</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Tarefa</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={function(e){updateItem(e)}} onChange={setItem}>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="titulo" className="form-label">Titulo</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="key" 
                                value={item.id} 
                                style={{ display: false ? 'block' : 'none' }}/>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="titulo" 
                                value={item.titulo}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <textarea className="form-control" name="descricao" rows={1} value={item.descricao}></textarea>
                            </div>
                            <div className="col">
                                <label htmlFor="timeend" className="form-label">Status</label>
                                <select className="form-select" aria-label="Default select example" name="status">
                                <option value="Pendente">Pendente</option>
                                <option value="EmProgresso">Em Progresso</option>
                                <option value="Concluido">Concluido</option>
                                </select>
                            </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Tabela;