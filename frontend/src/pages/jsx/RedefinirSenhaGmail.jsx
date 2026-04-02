import React from 'react';
import '../css/RedefinirSenhaGmail.css';
import heroImg from '../../images/ImgHome.png'; 

const RedefinirSenhaGmail = () => {
  return (
    <div className="alt-s-envoltorio">
      <section className="alt-s-secao-principal">
        <div className="alt-s-cartao-central">
          
          <div className="alt-s-bloco-conteudo">
            <h1 className="alt-s-titulo-principal">✱ PARA ALTERAR SUA SENHA VERIFIQUE SEU GMAIL</h1>

            <form className="alt-s-formulario">
              <div className="alt-s-grupo-entrada">
                <label>✱E-mail:</label>
                <input type="text" className="alt-s-campo-texto" />
              </div>

              <button type="submit" className="alt-s-botao-confirmar">
                Verificar E-mail
              </button>
            </form>

             <p className="pg-log-texto-cadastro">
              Lembrou sua senha? <a href="/Login">Volte aqui</a>
            </p>
          </div>

          <div className="alt-s-imagem-destaque">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedefinirSenhaGmail;