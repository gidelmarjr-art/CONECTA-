import React, { useState } from 'react';
import '../../css/Outros/FAQ.css';

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    { id: 1, question: "Como Funciona a Plataforma?" },
    { id: 2, question: "Como eu me candidato a uma vaga de voluntariado?" },
    { id: 3, question: "Vou receber algum certificado pelas horas trabalhadas?" },
    { id: 4, question: "Como minha ONG pode cadastrar vagas no site?" },
    { id: 5, question: "Como sei que uma ONG é real e confiável?" },
    { id: 6, question: "Preciso ter alguma experiência prévia?" },
    { id: 0, question: "Outras Perguntas" },
  ];

  return (
    <div className="faq-page-wrapper">
      
      {/* --- FAIXA DE PESQUISA AZUL --- */}
      <div className="faq-search-banner">
        <div className="faq-search-container">
          <span className="faq-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Pesquise Suas Dúvidas Aqui" 
            className="faq-search-input"
          />
        </div>
      </div>

      <main className="faq-main-content">
      
        <section className="faq-section">
          <h2 className="faq-section-title">PERGUNTAS FREQUENTES</h2>
          
          <div className="faq-box-container">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${openQuestion === index ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleQuestion(index)}>
                  <div className="faq-question-content">
                    <span className="faq-number">{item.id}</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <span className="faq-toggle-icon">
                    {openQuestion === index ? '−' : '+'}
                  </span>
                </button>
                
                <div className="faq-answer-container">
                  <div className="faq-answer-content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Suporte */}
        <section className="faq-support-section">
          <h2 className="faq-section-title">FORMULÁRIO PARA SUPORTE</h2>
          
          <div className="faq-box-container faq-form-container">
            <form className="faq-support-form">
              <div className="faq-input-group">
                <label>★Nome:</label>
                <input type="text" />
              </div>
              
              <div className="faq-input-group">
                <label>★E-mail:</label>
                <input type="email" />
              </div>
              
              <div className="faq-input-group">
                <label>★Mensagem Para o Suporte:</label>
                <textarea rows="6"></textarea>
              </div>
              
              <div className="faq-submit-container">
                <button type="submit" className="faq-submit-btn">
                  ENVIAR CHAMADO
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Faq;