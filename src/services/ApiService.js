import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const header = {headers: {'Content-Type': 'application/json'}}

const apiService = {
    post: (jsonPost) => {
        axios.post(`${BASE_URL}`, jsonPost, header)
        .then(response => alert('Tarefa Salva com Sucesso!'))
        .catch(error => alert('Falha ao enviar dados!'))
        .finally(() => window.location.reload());
    },
    get: () => {
        const result = axios.get(`${BASE_URL}`)
          .then(response => response)
          .catch(error => console.error('Erro ao buscar dados:', error));
          return result;
    },
    put: (id, data) => {
        axios.put(`${BASE_URL}/${id}`, JSON.stringify(data), header)
        .then(response => alert('Tarefa Atualizada com Sucesso!'))
        .catch(error => alert('Falha ao atualizar tarefa!'))
        .finally(() => window.location.reload());
    },
    delete: (id) => {
        axios.delete(`${BASE_URL}/${id}`, header)
        .then(response => alert('Tarefa Deletada com Sucesso!'))
        .catch(error => alert('Falha ao deletar tarefa!'))
        .finally(() => window.location.reload());
    }
   
}

export default apiService;