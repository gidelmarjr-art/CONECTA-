import React from 'react';
import '../css/homepage.css';
// Caminho corrigido para sua estrutura de pastas
import heroImg from '../../images/ImgHome.png'; 

const Homepage = () => {
  return (
    <div className="hp-main-wrapper">

      <section className="hp-hero-section">
        <div className="hp-hero-container">
          
          <div className="hp-hero-content">
            <h1 className="hp-hero-title">CONECTA+</h1>
            <p className="hp-hero-subtitle">
              Conectando corações a causas que transformam.
            </p>

            <div className="hp-hero-grid">
              <div className="hp-feature-box">
                <span className="hp-asterisk">✱</span>
                <p>Apoie ONGs verificadas e acompanhe o impacto real das suas doações e ações.</p>
              </div>
              <div className="hp-feature-box">
                <span className="hp-asterisk">✱</span>
                <p>Faça parte da rede que impulsiona as metas globais da ONU em nossa cidade.</p>
              </div>
            </div>

            <div className="hp-hero-btns">
              <button className="hp-btn-white">QUERO AJUDAR</button>
              <button className="hp-btn-white">SOU UMA ONG</button>
            </div>
          </div>

          {/* Renderização da Imagem Corrigida */}
          <div className="hp-hero-image">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>

      {/* Frase de Impacto Verde */}
      <section className="hp-impact-phrase">
        <h2>O nosso compromisso <span>com o futuro.</span></h2>
      </section>

    </div>
  );
};

export default Homepage;