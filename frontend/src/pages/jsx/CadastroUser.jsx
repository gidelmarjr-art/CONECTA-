import React from 'react';
import '../css/CadastroUser.css'; 
import heroImg from '../../images/ImgHome.png';

const CadastroUser = () => {
  return (
    <div className="pg-cad-envoltório">
      <section className="pg-cad-secao-principal">
        <div className="pg-cad-cartao-central">
          
          <div className="pg-cad-bloco-conteudo">
            <h1 className="pg-cad-titulo-principal">✱ CRIE SUA CONTA!</h1>

            <div className="pg-cad-divisor-social">
              <span>Entre com uma conta</span>
            </div>

            <div className="pg-cad-grade-social">
              <div className="pg-cad-caixa-social"></div>
              <div className="pg-cad-caixa-social"></div>
              <div className="pg-cad-caixa-social"></div>
            </div>

            <form className="pg-cad-formulario-registro">
              <div className="pg-cad-linha-dupla">
                <div className="pg-cad-grupo-entrada">
                  <label>✱ Nome:</label>
                  <input type="text" className="pg-cad-campo-texto" />
                </div>
                <div className="pg-cad-grupo-entrada">
                  <label>✱ Sobrenome:</label>
                  <input type="text" className="pg-cad-campo-texto" />
                </div>
              </div>

              <div className="pg-cad-grupo-entrada">
                <label>✱ Usuário:</label>
                <input type="text" className="pg-cad-campo-texto" />
              </div>

              <div className="pg-cad-grupo-entrada">
                <label>✱ E-mail:</label>
                <input type="email" className="pg-cad-campo-texto" />
              </div>

              <div className="pg-cad-grupo-entrada">
                <label>✱ Confirme seu e-mail:</label>
                <input type="email" className="pg-cad-campo-texto" />
              </div>

              <div className="pg-cad-grupo-entrada">
                <label>✱ Senha:</label>
                <input type="password" className="pg-cad-campo-texto" />
              </div>

              <div className="pg-cad-grupo-entrada">
                <label>✱ Confirma sua senha:</label>
                <input type="password" className="pg-cad-campo-texto" />
              </div>

              <div className="pg-cad-grupo-selecao">
                <input type="checkbox" id="check1" className="pg-cad-caixa-selecao" />
                <input type="checkbox" id="check2" className="pg-cad-caixa-selecao" />
              </div>

              <button type="submit" className="pg-cad-botao-enviar">
                Criar conta
              </button>
            </form>
          </div>

          <div className="pg-cad-imagem-destaque">
            <img src={heroImg} alt="Ilustração Cadastro" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CadastroUser;