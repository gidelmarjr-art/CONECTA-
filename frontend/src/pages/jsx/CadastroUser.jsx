import React from 'react';
import '../css/CadastroUser.css'; 
import heroImg from '../../images/ImgHome.png';

const CadastroUser = () => {
  return (
    <div className="cadastro-wrapper">
      <section className="cadastro-section">
        <div className="cadastro-container">
          
          <div className="cadastro-content">
            <h1 className="cadastro-title">✱ CRIE SUA CONTA!</h1>

            <div className="social-login-divider">
              <span>Entre com uma conta</span>
            </div>

            <div className="social-icons-grid">
              <div className="social-box"></div>
              <div className="social-box"></div>
              <div className="social-box"></div>
            </div>

            <form className="cadastro-form">
              <div className="input-row">
                <div className="input-group">
                  <label>✱ Nome:</label>
                  <input type="text" className="cadastro-input" />
                </div>
                <div className="input-group">
                  <label>✱ Sobrenome:</label>
                  <input type="text" className="cadastro-input" />
                </div>
              </div>

              <div className="input-group">
                <label>✱ Usuário:</label>
                <input type="text" className="cadastro-input" />
              </div>

              <div className="input-group">
                <label>✱ E-mail:</label>
                <input type="email" className="cadastro-input" />
              </div>

              <div className="input-group">
                <label>✱ Confirme seu e-mail:</label>
                <input type="email" className="cadastro-input" />
              </div>

              <div className="input-group">
                <label>✱ Senha:</label>
                <input type="password" className="cadastro-input" />
              </div>

              <div className="input-group">
                <label>✱ Confirma sua senha:</label>
                <input type="password" className="cadastro-input" />
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="check1" className="custom-checkbox" />
                <input type="checkbox" id="check2" className="custom-checkbox" />
              </div>

              <button type="submit" className="btn-cadastro-submit">
                Criar conta
              </button>
            </form>
          </div>

          <div className="cadastro-hero-image">
            <img src={heroImg} alt="Ilustração Cadastro" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CadastroUser;