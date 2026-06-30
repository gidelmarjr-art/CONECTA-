import React, { useState } from 'react';
import { 
  FiSearch, 
  FiChevronDown, 
  FiChevronUp, 
  FiUser, 
  FiMail, 
  FiMessageSquare, 
  FiSend,
  FiLifeBuoy
} from 'react-icons/fi';
import '../../css/Outros/FAQ.css';

const faqData = [
  { 
    id: 1, 
    question: "Como funciona a plataforma?", 
    answer: "Nossa plataforma conecta voluntários dispostos a ajudar com ONGs que precisam de apoio. Você pode buscar vagas por causa, localização ou habilidade, e se candidatar diretamente pelo nosso sistema."
  },
  { 
    id: 2, 
    question: "Como eu me candidato a uma vaga de voluntariado?", 
    answer: "Primeiro, crie uma conta gratuita. Depois, navegue pelas vagas disponíveis e clique em 'Quero me candidatar'. A ONG responsável receberá seu perfil e entrará em contato."
  },
  { 
    id: 3, 
    question: "Vou receber algum certificado pelas horas trabalhadas?", 
    answer: "Sim! Após a conclusão das atividades, a ONG pode validar suas horas na plataforma, e você poderá emitir um certificado digital detalhando sua contribuição."
  },
  { 
    id: 4, 
    question: "Como minha ONG pode cadastrar vagas no site?", 
    answer: "Representantes de ONGs devem criar uma conta do tipo 'Instituição'. Após a verificação dos documentos da ONG por nossa equipe, o painel para criação de vagas será liberado."
  },
  { 
    id: 5, 
    question: "Como sei que uma ONG é real e confiável?", 
    answer: "Todas as ONGs cadastradas passam por um processo rigoroso de verificação do CNPJ e do estatuto social antes de poderem publicar vagas em nossa plataforma."
  },
  { 
    id: 6, 
    question: "Preciso ter alguma experiência prévia?", 
    answer: "Na maioria dos casos, não! Muitas vagas exigem apenas vontade de ajudar. Vagas que demandam conhecimentos técnicos específicos (como médicos ou advogados voluntários) terão essa exigência na descrição."
  },
];

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOpenQuestion(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Chamado enviado com sucesso! Nossa equipe responderá em breve.");
  };

  const filteredFaqs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-page-wrapper">
      
      {/* --- BANNER AZUL COM TÍTULO E PESQUISA --- */}
      <div className="faq-top-banner">
        <div className="faq-banner-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="faq-banner-content">
          <h1 className="faq-main-title">Central de Ajuda</h1>
          <p className="faq-subtitle">Como podemos fazer a diferença juntos hoje?</p>
        </div>

        <div className="faq-search-wrapper">
          <div className="faq-search-container">
            <FiSearch className="faq-search-icon" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Pesquise suas dúvidas aqui..." 
              className="faq-search-input"
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Pesquisar dúvidas"
            />
          </div>
        </div>
      </div>

      <main className="faq-main-content">
      
        {/* --- SEÇÃO DE FAQ --- */}
        <section className="faq-section">
          <div className="faq-section-header">
            <h2 className="faq-section-title">
              <span className="title-highlight">Perguntas</span> Frequentes
            </h2>
            <div className="faq-title-underline"></div>
          </div>
          
          <div className="faq-list-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isActive = openQuestion === item.id;
                
                return (
                  <div key={item.id} className={`faq-item ${isActive ? 'active' : ''}`}>
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleQuestion(item.id)}
                      aria-expanded={isActive}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <div className="faq-question-content">
                        <span className="faq-number">{index + 1}</span>
                        <span className="faq-question-text">{item.question}</span>
                      </div>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isActive ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </button>
                    
                    <div 
                      id={`faq-answer-${item.id}`} 
                      className="faq-answer-container"
                      role="region"
                    >
                      <div className="faq-answer-content">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-no-results">
                <FiSearch size={40} className="faq-no-results-icon" />
                <p>Nenhuma pergunta encontrada para "{searchTerm}".</p>
                <span>Tente usar palavras-chave diferentes ou fale conosco abaixo.</span>
              </div>
            )}
          </div>
        </section>

        {/* --- SEÇÃO DE SUPORTE --- */}
        <section className="faq-support-section">
          <div className="faq-support-card">
            
            <div className="faq-support-info">
              <FiLifeBuoy className="faq-support-icon" />
              <h2>Não encontrou o que procurava?</h2>
              <p>Nossa equipe está pronta para ajudar você ou sua ONG. Preencha o formulário e retornaremos o mais rápido possível.</p>
            </div>

            <div className="faq-form-wrapper">
              <form className="faq-support-form" onSubmit={handleSubmit}>
                <div className="faq-input-group">
                  <label htmlFor="name">Nome completo</label>
                  <div className="faq-input-wrapper">
                    <FiUser className="faq-input-icon" />
                    <input type="text" id="name" required placeholder="Seu nome" />
                  </div>
                </div>
                
                <div className="faq-input-group">
                  <label htmlFor="email">E-mail</label>
                  <div className="faq-input-wrapper">
                    <FiMail className="faq-input-icon" />
                    <input type="email" id="email" required placeholder="exemplo@email.com" />
                  </div>
                </div>
                
                <div className="faq-input-group">
                  <label htmlFor="message">Como podemos ajudar?</label>
                  <div className="faq-textarea-wrapper">
                    <FiMessageSquare className="faq-input-icon textarea-icon" />
                    <textarea id="message" rows="4" required placeholder="Descreva sua dúvida..."></textarea>
                  </div>
                </div>
                
                <button type="submit" className="faq-submit-btn">
                  <FiSend className="faq-btn-icon" />
                  Enviar Chamado
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Faq;