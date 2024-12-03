import apiService from "../services/ApiService";

function handleFormSubmit(e){
    e.preventDefault();
    const jsonPost = jsonPostDataMapper(e);

    apiService.post(jsonPost);
}

function jsonPostDataMapper(data) {

    if (data.target.titulo.value === ''){
      return alert('Titulo é Obrigatorio!')
    }
    else {
      let jsonPost = {
        titulo: data.target.titulo.value,
        descricao: data.target.descricao.value,
        status: data.target.status.value
      }
    
      return JSON.stringify(jsonPost);
    }
  }

function Formulario() {
    return (
        <div className="container">
        <form onSubmit={function(e){handleFormSubmit(e)}}>
          <div className="row">
              <div className="col">
                  <label htmlFor="titulo" className="form-label">Titulo</label>
                  <input type="text" className="form-control" name="titulo"/>
              </div>
              <div className="col">
                  <label htmlFor="descricao" className="form-label">Descrição</label>
                  <textarea className="form-control" name="descricao" rows={1}></textarea>
              </div>
              <div className="col">
                  <label htmlFor="timeend" className="form-label">Status</label>
                  <select className="form-select" aria-label="Default select example" name="status">
                    <option value="Pendente">Pendente</option>
                    <option value="EmProgresso">Em Progresso</option>
                  </select>
              </div>
          </div>
          <div className="row">
              <div className="col-3">
                <br></br>
                <button type="submit" className="btn btn-primary btn-sm form-control">Salvar</button>
              </div>
          </div>
        </form>
      </div>
    )
}

export default Formulario;