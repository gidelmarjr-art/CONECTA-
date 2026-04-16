import React from 'react';
import  '../../css/Visitantes/RedefinirSenha.css';
import heroImg from '../../../images/ImgHome.png'; 

const RedefinirSenha = () => {
  return (
    <div className="alt-s-envoltorio">
      <section className="alt-s-secao-principal">
        <div className="alt-s-cartao-central">
          
          <div className="alt-s-bloco-conteudo">
            <h1 className="alt-s-titulo-principal">✱ ALTERAR SENHA</h1>

            <form className="alt-s-formulario">
              <div className="alt-s-grupo-entrada">
                <label>✱ CPF/E-mail:</label>
                <input type="text" className="alt-s-campo-texto" />
              </div>

              <div className="alt-s-grupo-entrada">
                <label>✱ Nova senha:</label>
                <input type="password" className="alt-s-campo-texto" />
              </div>

              <div className="alt-s-grupo-entrada">
                <label>✱ Confirme a nova senha:</label>
                <input type="password" className="alt-s-campo-texto" />
              </div>

              <button type="submit" className="alt-s-botao-confirmar">
                Alterar senha
              </button>
            </form>
          </div>

          <div className="alt-s-imagem-destaque">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedefinirSenha;