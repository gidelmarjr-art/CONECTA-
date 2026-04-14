import React from 'react';
import '../css/Login.css';
import heroImg from '../../images/ImgHome.png'; 
import { FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa";

const Login = () => {
  return (
    <div className="pg-log-envoltorio">
      <section className="pg-log-secao-principal">
        <div className="pg-log-cartao-central">
          
          <div className="pg-log-bloco-conteudo">
            <h1 className="pg-log-titulo-principal">✱ BEM-VINDO(A)</h1>

            <form className="pg-log-formulario-entrada">
              <div className="pg-log-grupo-entrada">
                <label>✱ CPF/E-mail:</label>
                <input type="text" className="pg-log-campo-texto" />
              </div>

              <div className="pg-log-grupo-entrada">
                <label>✱ Senha:</label>
                <input type="password" className="pg-log-campo-texto" />
              </div>

              <div className="pg-log-bloco-recuperar">
                <a href="/redefinirsenhagmail" className="pg-log-link-esqueci">Esqueci minha senha?</a>
              </div>

              <button type="submit" className="pg-log-botao-acessar">
                FAÇA O LOGIN
              </button>
            </form>

            {/* Divisor Social atualizado conforme padrão do cadastro */}
            <div className="pg-log-divisor-social">
              <span>Entre com uma conta</span>
            </div>

            {/* Grades de botões sociais atualizadas */}
            <div className="pg-log-grade-social">
              <button className="pg-log-btn-social"><FaGoogle /></button>
              <button className="pg-log-btn-social"><FaApple /></button>
              <button className="pg-log-btn-social"><FaMicrosoft /></button>
            </div>

            <p className="pg-log-texto-cadastro">
              Não tem Conta? <a href="/CadastroUser">Crie aqui</a>
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