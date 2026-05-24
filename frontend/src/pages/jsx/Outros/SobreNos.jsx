import React, { useState } from 'react';
import { User, Phone, Mail, FileText, Send, Users } from 'lucide-react';
import '../../css/Outros/SobreNos.css';

import img7 from '../../../images/Img7.png';
import equipeFoto from '../../../images/equipe-foto.png';

const SobreNos = () => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    mensagem: ""
  });

  const integrantes = [
    "EMERSON GONÇALVES GRANGEIRO",
    "GIDELMAR SOUSA SILVA JÚNIOR",
    "KIMBERLY CAMPOS DE FARIA CRUZ",
    "MARIA EDUARDA DOS SANTOS CASTRO",
    "THALINE THAIS TELES DA SILVA"
  ];

  const maskCpf = (v) => {
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const maskTelefone = (v) => {
    return v
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorLimpo = value;

    if (["cpf", "telefone"].includes(name)) {
      valorLimpo = value.replace(/\D/g, "");
    }

    let valorComMascara = valorLimpo;
    if (name === "cpf") valorComMascara = maskCpf(valorLimpo);
    if (name === "telefone") valorComMascara = maskTelefone(valorLimpo);

    setForm({ ...form, [name]: valorComMascara });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
    setForm({ nome: "", telefone: "", email: "", cpf: "", mensagem: "" });
  };

  return (
    <main className="sobre-nos-main">
      
      {/* HERO SECTION - Split Layout Moderno */}
      <section className="sobre-hero">
        <div className="sobre-hero-content">
          <div className="hero-text-side">
            <span className="hero-badge">Conheça nossa missão</span>
            <h1 className="hero-title">A ponte entre o <span>impacto</span> e quem deseja fazer a diferença.</h1>
            <p className="hero-description">
              O <strong>CONECTA+</strong> é uma plataforma digital nascida com o propósito de transformar a realidade social através da tecnologia. Conectamos ONGs a voluntários e doadores em um ambiente inteligente e totalmente seguro.
            </p>
          </div>
          <div className="hero-image-side">
            <div className="hero-image-blob">
              <img src={img7} alt="Ilustração de conexão humana" className="img-hero-float" />
            </div>
          </div>
        </div>
      </section>

{/* TEAM SECTION - Layout para Foto Paisagem */}
      <section className="sobre-team">
        <div className="section-header center">
          <h2>Quem Faz Acontecer</h2>
          <p>Nossa equipe de Engenheiros de Software</p>
        </div>

        <div className="team-landscape-card">
          <div className="team-image-box">
            <img src={equipeFoto} alt="Equipe de desenvolvimento" className="team-photo-landscape" />
          </div>
          
          <div className="team-info-box">
            <h3>Construindo soluções com propósito</h3>
            <p className="team-bio">
              Somos estudantes de Engenharia de Software do UNICEPLAC, apaixonados por tecnologia e impacto social. Sob rigorosa orientação acadêmica, aplicamos as melhores práticas de desenvolvimento, arquitetura e segurança para garantir que a plataforma entregue uma experiência fluida e transparente.
            </p>
            
            <div className="team-members-list">
              <span className="members-title">Desenvolvedores</span>
              <ul className="members-grid-landscape">
                {integrantes.map((nome, i) => (
                  <li key={i}>
                    <div className="member-icon-wrapper">
                      <User size={16} />
                    </div>
                    <span>{nome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT SECTION - Formulário Premium */}
      <section className="sobre-contact">
        <div className="contact-container">
          <div className="contact-text">
            <h2>Fale Conosco</h2>
            <p>Dúvidas, parcerias ou sugestões? Preencha o formulário e nosso time retornará o mais rápido possível.</p>
          </div>

          <div className="contact-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="nome">Nome Completo</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input type="text" id="nome" name="nome" required placeholder="Ex: João da Silva" value={form.nome} onChange={handleChange} />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="telefone">Telefone</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input type="text" id="telefone" name="telefone" required placeholder="(00) 00000-0000" value={form.telefone} onChange={handleChange} maxLength="15" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input type="email" id="email" name="email" required placeholder="seu@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="cpf">CPF</label>
                  <div className="input-wrapper">
                    <FileText size={18} className="input-icon" />
                    <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} maxLength="14" />
                  </div>
                </div>
              </div>

              <div className="input-group full-width">
                <label htmlFor="mensagem">Como podemos ajudar?</label>
                <div className="input-wrapper textarea-wrapper">
                  <textarea id="mensagem" name="mensagem" required rows="4" placeholder="Descreva o motivo do seu contato..." value={form.mensagem} onChange={handleChange}></textarea>
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span>Enviar Mensagem</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SobreNos;