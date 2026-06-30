import React, { useState } from 'react';
import '../../css/Visitantes/Login.css';
import { 
  FaGoogle, FaApple, FaMicrosoft, 
  FaUserCircle, FaLock, FaEye, FaEyeSlash 
} from "react-icons/fa";

const Login = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [credenciais, setCredenciais] = useState({
    identificacao: "",
    senha: ""
  });

  const handleChange = (e) => {
    setCredenciais({
      ...credenciais,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!credenciais.identificacao || !credenciais.senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Lógica de autenticação aqui
    alert("Login efetuado com sucesso!");
  };

  return (
    <div className="log-wrapper">
      <div className="log-container">
        
        {/* LADO ESQUERDO: VISUAL (Sem imagem, texto centralizado) */}
        <div className="log-visual-side">
          <div className="log-visual-content">
            <h2 className="log-brand">Conecta+</h2>
            <h1>Bem-vindo(a) de volta!</h1>
            <p>Acesse a sua conta e continue a transformar o mundo com a nossa rede de impacto social.</p>
          </div>
          
          {/* Formas decorativas de fundo */}
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="log-form-side">
          <div className="log-form-header">
            <h3>Acessar plataforma</h3>
            <p>Não tem uma conta? <a href="/CadastroUser">Crie aqui</a></p>
          </div>

          <div className="log-social-buttons">
            <button type="button" className="social-btn google" title="Entrar com Google"><FaGoogle /></button>
            <button type="button" className="social-btn apple" title="Entrar com Apple"><FaApple /></button>
            <button type="button" className="social-btn ms" title="Entrar com Microsoft"><FaMicrosoft /></button>
          </div>

          <div className="log-divider"><span>ou entre com os seus dados</span></div>

          <form className="log-main-form" onSubmit={handleSubmit}>
            
            <div className="log-input-box">
              <label><FaUserCircle className="label-icon"/> CPF ou E-mail</label>
              <input 
                type="text" 
                name="identificacao" 
                placeholder="Digite seu e-mail ou CPF" 
                value={credenciais.identificacao}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="log-input-box">
              <label><FaLock className="label-icon"/> Senha</label>
              <div className="log-password-wrapper">
                <input 
                  type={mostrarSenha ? "text" : "password"} 
                  name="senha" 
                  placeholder="Digite sua senha" 
                  value={credenciais.senha}
                  onChange={handleChange}
                  required 
                />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} tabIndex="-1">
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="log-forgot-password">
                <a href="/redefinirsenhagmail">Esqueci a minha senha</a>
              </div>
            </div>

            <button type="submit" className="log-btn-submit">
              FAZER LOGIN
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;