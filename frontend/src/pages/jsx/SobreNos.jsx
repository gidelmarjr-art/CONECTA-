import React, { useState } from 'react';
import '../css/SobreNos.css';

import img7 from '../../images/Img7.png';
import img8 from '../../images/Img8.png';
import equipeFoto from '../../images/equipe-foto.png';

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

  // Funções de máscara replicadas do seu CadastroUser
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

    // Ação que só recebe números (Regex /\D/g)
    if (["cpf", "telefone"].includes(name)) {
      valorLimpo = value.replace(/\D/g, "");
    }

    let valorComMascara = valorLimpo;
    if (name === "cpf") valorComMascara = maskCpf(valorLimpo);
    if (name === "telefone") valorComMascara = maskTelefone(valorLimpo);

    setForm({ ...form, [name]: valorComMascara });
  };

  return (
    <div className="sn-main-wrapper">
      <section className="sn-hero-section">
        <div className="sn-hero-container">
          <h1 className="sn-hero-title">CONECTA+</h1>
          <p className="sn-hero-description">
            É uma plataforma digital nascida com o propósito de transformar a realidade social 
            através da tecnologia. Nosso intuito é atuar como uma ponte inteligente e segura 
            entre organizações não governamentais (ONGs) e indivíduos que desejam gerar 
            impacto positivo, seja através do trabalho voluntário ou de doações financeiras.
          </p>
          <div className="sn-hero-image-box">
            <img src={img7} alt="Ilustração Hero" className="sn-img7" />
          </div>
        </div>
      </section>

      <section className="sn-content-section">
        <h2 className="sn-blue-title">NOSSA EQUIPE DE ENGENHEIROS DE SOFTWARE</h2>
        <div className="sn-blue-card sn-team-layout">
          <div className="sn-team-header">
            <div className="sn-photo-container">
              <img src={equipeFoto} alt="Equipe" className="sn-equipe-img" />
            </div>
            <p className="sn-team-intro">
              Somos um time de Engenharia de Software do UNICEPLAC, dedicados a construir soluções 
              éticas e robustas. Sob orientação acadêmica aplicam foi-se aplicado as melhores práticas 
              de desenvolvimento para garantir uma plataforma segura, transparente e focada na experiência do usuário.
            </p>
          </div>
          <div className="sn-integrantes-footer">
            <div className="sn-names-column">
              <h3>INTEGRANTES:</h3>
              <ul className="sn-list">
                {integrantes.map((nome, i) => (
                  <li key={i}>• {nome}</li>
                ))}
              </ul>
            </div>
            <img src={img8} alt="Engrenagens" className="sn-img8" />
          </div>
        </div>
      </section>

      <section className="sn-content-section">
        <h2 className="sn-blue-title">ENTRE EM CONTATO</h2>
        <div className="sn-blue-card">
          <form className="sn-contact-form">
            <div className="sn-input-row">
              <div className="sn-field">
                <label>★ Nome:</label>
                <input type="text" name="nome" value={form.nome} onChange={handleChange} />
              </div>
              <div className="sn-field">
                <label>★ Telefone:</label>
                <input 
                  type="text" 
                  name="telefone" 
                  placeholder="(00) 00000-0000" 
                  value={form.telefone} 
                  onChange={handleChange}
                  maxLength="15"
                />
              </div>
            </div>
            <div className="sn-input-row">
              <div className="sn-field">
                <label>★ E-mail:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="sn-field">
                <label>★ CPF:</label>
                <input 
                  type="text" 
                  name="cpf" 
                  placeholder="000.000.000-00" 
                  value={form.cpf} 
                  onChange={handleChange}
                  maxLength="14"
                />
              </div>
            </div>
            <div className="sn-field full-width">
              <label>★ Motivo Para o Contato:</label>
              <textarea name="mensagem" rows="5" value={form.mensagem} onChange={handleChange}></textarea>
            </div>
            <div className="sn-button-center">
              <button type="submit" className="sn-send-btn">ENVIAR</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SobreNos;