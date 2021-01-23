import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}
const baseUrl = 'http://localhost:3001/users';
const initialState = {
  user: {nome:'', email:'' }, 
  list: []
}

export default class UserCrud extends Component {
   
  state = { ...initialState}

  componentWillMount(){
    axios(baseUrl).then(resp =>{
      this.setState({
        list: resp.data
      })
    })
  }

    clear(){ // limpa o estado com estado inicial
      this.setState({
        user: initialState.user
      })
    }
    save(){
      const user = this.state.user;
      const method = user.id ? 'put' : 'post';
      const url= user.id ? `${baseUrl}/${user.id}` : baseUrl;

      axios[method](url,user).then(resp =>{
        const list = this.getUpdateList(resp.data)
        this.setState({
          user: initialState.user,
          list: list
        })
      })
    }
    getUpdateList(user){
      const list = this.state.list.filter( u => u.id !== user.id) // remove o user atual da lista
      list.unshift(user) // coloca o user atual no início do array...
      return list;
    }

    updateFild(event){
      const user = { ...this.state.user}
      user[event.target.name] = event.target.value;
      this.setState({user})
    }

    load(user){
      this.setState({user})
    }

    remove(user){
      axios.delete(`${baseUrl}/${user.id}`).then( resp =>{
        const list = this.state.list.filter( u => u.id !== user.id)
        this.setState({ list: list})
      })
    }
    renderTable(){
      return(
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      )
    }
    renderRows(){
      return this.state.list.map(user =>{
          return (
            <tr key={user.id}>
              <td>{user.nome}</td> 
              <td>{user.email}</td>
              <td>
                <div className="d-flex">
                <button className="btn btn-warning" onClick={()=>this.load(user)}>
                  <i className="fa fa-pencil"></i>
                </button>
                <button className="btn btn-danger ml-2" onClick={()=>this.remove(user)}>
                  <i className="fa fa-trash"></i>
                </button>
                </div>
              </td>
            </tr>
          )
        }
      )
    }

    renderForm(){
      return (
        <div className="form">
          <div className="row">
            <div className="col-12 col-sm-6">
                <div className="form-grup">
                  <label htmlFor="">Nome: </label>
                  <input type="text" className="form-control"
                  name='nome' 
                  value={this.state.user.nome}
                  onChange = {e => this.updateFild(e)}
                  placeholder="Digite seu nome..."/>
                </div>
             </div>
             <div className="col-12 col-sm-6">
                <div className="form-grup">
                  <label htmlFor="">E-mail: </label>
                  <input type="text" className="form-control"
                  name='email' 
                  value={this.state.user.email}
                  onChange = {e => this.updateFild(e)}
                  placeholder="Digite o e-mail..."/>
                </div>
            </div>
          </div>
          <hr/>
          <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary mr-2"
            onClick = {e => this.save(e)}>Salvar</button>
            <button className="btn btn-secondary" onClick = {e => this.clear(e)}>Limpar</button>
          </div>
          </div>
        </div>
      )
    }
    
    render() {
      console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}