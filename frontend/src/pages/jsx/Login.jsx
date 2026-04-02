import React from 'react';
import '../css/Login.css';
import heroImg from '../../images/ImgHome.png'; 

const Login = () => {
  return (
    <div className="pg-log-envoltório">
      <section className="pg-log-secao-principal">
        <div className="pg-log-cartao-central">
          
          <div className="pg-log-bloco-conteudo">
            <h1 className="pg-log-titulo-principal">✱ BEM-VINDO(A)</h1>

            <form className="pg-log-formulario-entrada">
              <div className="pg-log-grupo-entrada">
                <label>✱ Usuário/E-mail:</label>
                <input type="text" className="pg-log-campo-texto" />
              </div>

              <div className="pg-log-grupo-entrada">
                <label>✱ Senha:</label>
                <input type="password" className="pg-log-campo-texto" />
              </div>

              <div className="pg-log-bloco-recuperar">
                <a href="/recuperar" className="pg-log-link-esqueci">Esqueci minha senha?</a>
              </div>

              <button type="submit" className="pg-log-botao-acessar">
                FAÇA O LOGIN
              </button>
            </form>

            <div className="pg-log-divisor-social">
              <span>Entre com uma conta</span>
            </div>

            <div className="pg-log-grade-social">
              <div className="pg-log-caixa-social"></div>
              <div className="pg-log-caixa-social"></div>
              <div className="pg-log-caixa-social"></div>
            </div>

            <p className="pg-log-texto-cadastro">
              Não tem Conta? <a href="/CadastroUsuario">Crie aqui</a>
            </p>
          </div>

          <div className="pg-log-imagem-destaque">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;