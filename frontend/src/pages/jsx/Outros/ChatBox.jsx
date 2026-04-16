import React, { useState } from 'react';
import '../../css/Outros/ChatBox.css';
import { FaPaperPlane, FaSearch } from 'react-icons/fa';

import imgAbrigo from '../../../images/imgAbrigo.png';
import imgCoracao from '../../../images/imgCoracao.png';

const ChatBox = () => {
  const [mensagem, setMensagem] = useState("");

  const contatos = [
    { id: 1, nome: "ABRIGO ESPERANÇA", img: imgAbrigo, ultima: "Olá! Como podemos ajudar?", ativa: true },
    { id: 2, nome: "ONG CORAÇÃO", img: imgCoracao, ultima: "A doação foi recebida!", ativa: false }
  ];

  return (
    <div className="cb-wrapper">
      <div className="cb-main-container">
        
        {/* Barra Lateral de Contatos */}
        <aside className="cb-sidebar">
          <div className="cb-search-bar">
            <FaSearch className="cb-search-icon" />
            <input type="text" placeholder="Pesquisar mensagens" />
          </div>
          
          <div className="cb-contacts-list">
            {contatos.map(contato => (
              <div key={contato.id} className={`cb-contact-item ${contato.ativa ? 'active' : ''}`}>
                <img src={contato.img} alt={contato.nome} className="cb-contact-img" />
                <div className="cb-contact-info">
                  <h4>{contato.nome}</h4>
                  <p>{contato.ultima}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Área do Chat */}
        <main className="cb-chat-area">
          <header className="cb-chat-header">
            <img src={imgAbrigo} alt="Abrigo Esperança" className="cb-header-img" />
            <div className="cb-header-text">
              <h3>ABRIGO ESPERANÇA</h3>
              <span>Online agora</span>
            </div>
          </header>

          <div className="cb-messages-log">
            <div className="cb-msg-received">
              <p>Olá! Gostaria de saber como posso entregar as doações de alimento?</p>
              <span className="cb-time">10:45</span>
            </div>
            
            <div className="cb-msg-sent">
              <p>Olá! Você pode entregar diretamente em nossa sede das 08h às 18h.</p>
              <span className="cb-time">10:47</span>
            </div>
          </div>

          <footer className="cb-chat-footer">
            <div className="cb-input-group">
              <input 
                type="text" 
                placeholder="Escreva sua mensagem..." 
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
              <button className="cb-btn-send">
                <FaPaperPlane />
              </button>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
};

export default ChatBox;