import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone } from 'lucide-react';
import '../../css/Outros/ChatBox.css';

// Mantenha suas importações de imagem originais
import imgAbrigo from '../../../images/imgAbrigo.png';
import imgCoracao from '../../../images/imgCoracao.png';

const ChatBox = () => {
  const [mensagem, setMensagem] = useState("");

  const contatos = [
    { id: 1, nome: "ABRIGO ESPERANÇA", img: imgAbrigo, ultima: "Você: Olá! Você pode entregar diretam...", tempo: "10:47", ativa: true },
    { id: 2, nome: "ONG CORAÇÃO", img: imgCoracao, ultima: "A doação foi recebida! Muito obrig...", tempo: "Ontem", ativa: false }
  ];

  return (
    <div className="cb-wrapper">
      <div className="cb-main-container">
        
        {/* ================= BARRA LATERAL ================= */}
        <aside className="cb-sidebar">
          {/* Cabeçalho do Sidebar */}
          <div className="cb-sidebar-header">
            <h2>Mensagens</h2>
          </div>

          {/* Busca */}
          <div className="cb-search-bar">
            <Search size={18} className="cb-search-icon" />
            <input type="text" placeholder="Pesquisar..." />
          </div>
          
          {/* Lista de Contatos */}
          <div className="cb-contacts-list">
            {contatos.map(contato => (
              <div key={contato.id} className={`cb-contact-item ${contato.ativa ? 'active' : ''}`}>
                <img src={contato.img} alt={contato.nome} className="cb-contact-img" />
                <div className="cb-contact-info">
                  <div className="cb-contact-info-top">
                    <h4>{contato.nome}</h4>
                    <span className="cb-contact-time">{contato.tempo}</span>
                  </div>
                  <p>{contato.ultima}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ================= ÁREA DO CHAT ================= */}
        <main className="cb-chat-area">
          
          {/* Header do Chat */}
          <header className="cb-chat-header">
            <div className="cb-header-profile">
              <img src={imgAbrigo} alt="Abrigo Esperança" className="cb-header-img" />
              <div className="cb-header-text">
                <h3>ABRIGO ESPERANÇA</h3>
                <div className="cb-status">
                  <span className="cb-status-dot"></span>
                  <span>Online agora</span>
                </div>
              </div>
            </div>
            
            {/* Ícones de ação (Estéticos) */}
            <div className="cb-header-actions">
              <button className="cb-icon-btn"><Phone size={20} /></button>
              <button className="cb-icon-btn"><MoreVertical size={20} /></button>
            </div>
          </header>

          {/* Log de Mensagens */}
          <div className="cb-messages-log">
            <div className="cb-date-divider">
              <span>Hoje</span>
            </div>

            <div className="cb-msg-received">
              <p>Olá! Gostaria de saber como posso entregar as doações de alimento?</p>
              <span className="cb-time">10:45</span>
            </div>
            
            <div className="cb-msg-sent">
              <p>Olá! Você pode entregar diretamente em nossa sede das 08h às 18h. Ficamos na Rua das Flores, 123.</p>
              <span className="cb-time">10:47</span>
            </div>
          </div>

          {/* Footer / Input de Mensagem */}
          <footer className="cb-chat-footer">
            <button className="cb-attach-btn">
              <Paperclip size={20} />
            </button>
            
            <div className="cb-input-group">
              <input 
                type="text" 
                placeholder="Escreva sua mensagem..." 
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setMensagem("")} // Simula o envio ao apertar Enter
              />
            </div>

            <button className="cb-btn-send" onClick={() => setMensagem("")}>
              <Send size={18} className="send-icon" />
            </button>
          </footer>
        </main>

      </div>
    </div>
  );
};

export default ChatBox;