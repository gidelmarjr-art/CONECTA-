import React, { useState } from "react";
import '../../css/Visitantes/CadastroUser.css';
import { 
  FaEye, FaEyeSlash, FaGoogle, FaApple, FaMicrosoft, 
  FaCheck, FaTimes, FaUser, FaBuilding, FaEnvelope, 
  FaLock, FaIdCard, FaPhone, FaCalendarAlt, FaAsterisk
} from "react-icons/fa";

const CadastroUser = () => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("usuario");
  const [form, setForm] = useState({
    nome: "", sobrenome: "", cpf: "", telefone: "", email: "",
    senha: "", confirmarSenha: "", razaoSocial: "", nomeFantasia: "",
    cnpj: "", dataFundacao: "", nomeResponsavel: "", cpfResponsavel: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erroAtivo, setErroAtivo] = useState(false);
  const [senhaFocada, setSenhaFocada] = useState(false);
  const [regrasSenha, setRegrasSenha] = useState({
    tamanho: false, maiuscula: false, minuscula: false, numero: false, especial: false,
  });

  const maskCpf = (v) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").slice(0, 14);
  const maskTelefone = (v) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  const maskCNPJ = (v) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 18);
  const maskData = (v) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 10);

  const handleChange = (e, mascara) => {
    const { name, value } = e.target;
    let valorLimpo = value;

    if (name === "senha") {
      setRegrasSenha({
        tamanho: value.length >= 8,
        maiuscula: /[A-Z]/.test(value),
        minuscula: /[a-z]/.test(value),
        numero: /[0-9]/.test(value),
        especial: /[^A-Za-z0-9]/.test(value),
      });
    }

    setForm({ ...form, [name]: mascara ? mascara(valorLimpo) : valorLimpo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const senhaValida = Object.values(regrasSenha).every(Boolean);
    if (!senhaValida || form.senha !== form.confirmarSenha) {
      setErroAtivo(true);
      setTimeout(() => setErroAtivo(false), 800);
      return;
    }
    alert("Cadastro enviado com sucesso!");
  };

  return (
    <div className="cad-wrapper">
      <div className="cad-container">
        
        {/* LADO ESQUERDO: VISUAL */}
        <div className="cad-visual-side">
          <div className="cad-visual-content">
            <h2 className="cad-brand">Conecta+</h2>
            <h1>Transforme o mundo com a gente.</h1>
            <p>Escolha como deseja contribuir e faça parte da maior rede de impacto social do país.</p>
            <div className="cad-visual-footer">
              <span>Já possui uma conta?</span>
              <button className="btn-outline-white">Fazer Login</button>
            </div>
          </div>
          {/* Elementos decorativos de fundo */}
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="cad-form-side">
          <div className="cad-form-header">
            <h3>Crie a sua conta</h3>
            
            <div className="cad-segmented-control">
              <button 
                type="button"
                className={opcaoSelecionada === "usuario" ? "active" : ""} 
                onClick={() => setOpcaoSelecionada("usuario")}
              >
                <FaUser /> Voluntário
              </button>
              <button 
                type="button"
                className={opcaoSelecionada === "ong" ? "active" : ""} 
                onClick={() => setOpcaoSelecionada("ong")}
              >
                <FaBuilding /> Instituição
              </button>
            </div>
          </div>

          <div className="cad-form-body">
            <div className="cad-social-buttons">
              <button type="button" className="social-btn google" title="Continuar com Google"><FaGoogle /></button>
              <button type="button" className="social-btn apple" title="Continuar com Apple"><FaApple /></button>
              <button type="button" className="social-btn ms" title="Continuar com Microsoft"><FaMicrosoft /></button>
            </div>

            <div className="cad-divider"><span>ou use o seu e-mail</span></div>

            <form className="cad-main-form" onSubmit={handleSubmit}>
              {opcaoSelecionada === "usuario" ? (
                <div className="cad-grid-row">
                  <div className="cad-input-box">
                    <label><FaUser className="label-icon"/> Nome <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
                  </div>
                  <div className="cad-input-box">
                    <label>Sobrenome <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="sobrenome" value={form.sobrenome} onChange={handleChange} required />
                  </div>
                  <div className="cad-input-box">
                    <label><FaIdCard className="label-icon"/> CPF <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="cpf" value={form.cpf} onChange={(e) => handleChange(e, maskCpf)} placeholder="000.000.000-00" required />
                  </div>
                  <div className="cad-input-box">
                    <label><FaPhone className="label-icon"/> Telefone <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="telefone" value={form.telefone} onChange={(e) => handleChange(e, maskTelefone)} placeholder="(00) 00000-0000" required />
                  </div>
                </div>
              ) : (
                <div className="cad-grid-row">
                  <div className="cad-input-box full">
                    <label><FaBuilding className="label-icon"/> Razão Social <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="razaoSocial" value={form.razaoSocial} onChange={handleChange} required />
                  </div>
                  <div className="cad-input-box">
                    <label><FaIdCard className="label-icon"/> CNPJ <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="cnpj" value={form.cnpj} onChange={(e) => handleChange(e, maskCNPJ)} placeholder="00.000.000/0000-00" required />
                  </div>
                  <div className="cad-input-box">
                    <label><FaCalendarAlt className="label-icon"/> Fundação <FaAsterisk className="required-icon"/></label>
                    <input type="text" name="dataFundacao" value={form.dataFundacao} onChange={(e) => handleChange(e, maskData)} placeholder="DD/MM/AAAA" required />
                  </div>
                </div>
              )}

              <div className="cad-input-box">
                <label><FaEnvelope className="label-icon"/> E-mail <FaAsterisk className="required-icon"/></label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="cad-grid-row">
                <div className="cad-input-box">
                  <label><FaLock className="label-icon"/> Senha <FaAsterisk className="required-icon"/></label>
                  <div className="cad-password-wrapper">
                    <input 
                      type={mostrarSenha ? "text" : "password"} 
                      name="senha" value={form.senha} 
                      onChange={handleChange} 
                      onFocus={() => setSenhaFocada(true)}
                      onBlur={() => setSenhaFocada(false)}
                      required 
                    />
                    <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  
                  {(senhaFocada || form.senha.length > 0) && (
                    <div className="cad-password-rules">
                      <span className={regrasSenha.tamanho ? "ok" : ""}>{regrasSenha.tamanho ? <FaCheck /> : <FaTimes />} 8 caracteres</span>
                      <span className={regrasSenha.maiuscula ? "ok" : ""}>{regrasSenha.maiuscula ? <FaCheck /> : <FaTimes />} Maiúscula</span>
                      <span className={regrasSenha.numero ? "ok" : ""}>{regrasSenha.numero ? <FaCheck /> : <FaTimes />} Número</span>
                      <span className={regrasSenha.especial ? "ok" : ""}>{regrasSenha.especial ? <FaCheck /> : <FaTimes />} Especial</span>
                    </div>
                  )}
                </div>

                <div className="cad-input-box">
                  <label>Confirmar Senha <FaAsterisk className="required-icon"/></label>
                  <div className="cad-password-wrapper">
                    <input 
                      type={mostrarConfirmarSenha ? "text" : "password"} 
                      name="confirmarSenha" 
                      value={form.confirmarSenha} 
                      onChange={handleChange} 
                      required 
                    />
                    <button type="button" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                      {mostrarConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className={`cad-btn-submit ${erroAtivo ? 'shake' : ''}`}>
                Finalizar Registo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUser;