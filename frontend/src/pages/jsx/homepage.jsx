import React from 'react';
import '../css/Homepage.css';

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

          {/* Renderização da Imagem */}
          <div className="hp-hero-image">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>

      {/* Frase Verde */}
      <section className="hp-impact-phrase">
        <h2>O nosso compromisso <span>com o futuro.</span></h2>
      </section>

      {/* Nova Seção: Cards de Compromisso */}
<section className="hp-commitments-section">
  <div className="hp-commitments-grid">
    
    {/* Card 1 */}
    <div className="hp-commitment-card">
      <div className="hp-card-header">
        <span className="hp-card-number">1</span>
        <h3>Transformação Digital no Terceiro Setor</h3>
      </div>
      <div className="hp-card-content">
        <p>Conecta+ é uma plataforma integrada que utiliza a tecnologia para profissionalizar a colaboração entre voluntários, doadores e instituições sociais.</p>
        <img src={require('../../images/Img1.png')} alt="Transformação Digital" />
      </div>
    </div>

    {/* Card 2 */}
    <div className="hp-commitment-card">
      <div className="hp-card-header">
        <span className="hp-card-number">2</span>
        <h3>Conexão Segura e Transparente</h3>
      </div>
      <div className="hp-card-content">
        <p>Oferecemos um ecossistema confiável com verificação de perfis para garantir que a ajuda chegue com segurança a quem realmente precisa.</p>
        <img src={require('../../images/Img2.png')} alt="Conexão Segura" />
      </div>
    </div>

    {/* Card 3 */}
    <div className="hp-commitment-card">
      <div className="hp-card-header">
        <span className="hp-card-number">3</span>
        <h3>Engajamento com Propósito</h3>
      </div>
      <div className="hp-card-content">
        <p>Facilitamos o encontro de voluntários com causas específicas através de geolocalização, transformando boas intenções em ações práticas e mensuráveis.</p>
        <img src={require('../../images/Img3.png')} alt="Engajamento" />
      </div>
    </div>

    {/* Card 4 */}
    <div className="hp-commitment-card">
      <div className="hp-card-header">
        <span className="hp-card-number">4</span>
        <h3>Compromisso com Metas Globais</h3>
      </div>
      <div className="hp-card-content">
        <p>Nosso projeto é estrategicamente alinhado à Agenda 2030 da ONU, fortalecendo parcerias para o desenvolvimento sustentável e a redução de desigualdades.</p>
        <img src={require('../../images/Img4.png')} alt="Metas Globais" />
      </div>
    </div>

    

  </div>
</section>

{/* Seção ONGs em Destaque */}
<section className="hp-featured-ongs">
  <h2>ONGS EM DESTAQUE</h2>
  
  <div className="hp-ongs-grid">
    {/* Card de ONG - Repetido 3 vezes */}
    {[1, 2, 3].map((item) => (
      <div key={item} className="hp-ong-card">
        <div className="hp-ong-image-container">
          {/* Use a imagem da sua pasta images aqui */}
          <img src={require('../../images/ImgHome.png')} alt="ONG em destaque" />
        </div>
        
        <div className="hp-ong-info">
          <h3>NOME DA ONG</h3>
          
          <div className="hp-progress-container">
            <div className="hp-progress-bar">
              <div className="hp-progress-fill" style={{ width: '60%' }}></div>
            </div>
            <span>60% DA META DE DOAÇÕES ATINGIDA</span>
          </div>

          <button className="hp-btn-help">QUERO AJUDAR</button>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Seção de Conquistas e Certificados */}
<section className="hp-rewards-section">
  <div className="hp-rewards-container">
    
    <div className="hp-rewards-content">
      <h2>TRANSFORME SEU TEMPO EM CONQUISTAS E CERTIFICADOS!</h2>
      
      <ul className="hp-rewards-list">
        <li>
          <strong>Horas Acadêmicas:</strong> Emita certificados de horas complementares automaticamente após concluir uma atividade.
        </li>
        <li>
          <strong>Sistema de Medalhas:</strong> Ganhe insígnias exclusivas e suba no ranking conforme o seu nível de engajamento social.
        </li>
        <li>
          <strong>Histórico de Impacto:</strong> Mantenha um portfólio digital de todas as causas que você já apoiou.
        </li>
      </ul>
    </div>

    <div className="hp-rewards-image">
      <img src={require('../../images/Img5.png')} alt="Troféu de Conquistas" />
    </div>

  </div>
</section>

    </div>
  );
};

/*home*/

export default Homepage;