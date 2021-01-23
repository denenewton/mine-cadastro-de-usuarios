import React from 'react'
import Main from '../template/Main'

const headerProps = {
  icon:"home", 
  title:"Início",     
  subtitle:"Segundo Projeto do capítulo de React."
}
export default props =>
    <Main {...headerProps } >
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema feito com amor para exemplificar o desenvolvimento
            de um cadastro feito em React!</p>
    </Main>