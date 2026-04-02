import React from 'react';
import '../css/Login.css';
import heroImg from '../../images/ImgHome.png'; 

const Login = () => {
  return (
    <div className="login-wrapper">
      <section className="hp-hero-section">
        <div className="hp-hero-container">
          
          <div className="hp-hero-content">
            <h1 className="hp-hero-title">✱ BEM-VINDO(A)</h1>

            <form className="login-form">
              <div className="input-group">
                <label>✱ Usuário/E-mail:</label>
                <input type="text" className="login-input" />
              </div>

              <div className="input-group">
                <label>✱ Senha:</label>
                <input type="password" className="login-input" />
              </div>

              <div className="forgot-password-container">
                <a href="/recuperar" className="forgot-password-link">Esqueci minha senha?</a>
              </div>

              <button type="submit" className="btn-login-submit">
                FAÇA O LOGIN
              </button>
            </form>

            <div className="social-login-divider">
              <span>Entre com uma conta</span>
            </div>

            <div className="social-icons-grid">
              <div className="social-box"></div>
              <div className="social-box"></div>
              <div className="social-box"></div>
            </div>

            <p className="signup-text">
              Não tem Conta? <a href="/CadastroUsuario">Crie aqui</a>
            </p>
          </div>

          <div className="hp-hero-image">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;