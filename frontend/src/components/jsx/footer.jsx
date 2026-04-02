import React from 'react';
// Corrigido para Instagram com "I" maiúsculo
import { Camera } from 'lucide-react'; 

import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Parte Superior do Footer */}
        <div className="footer-top">
          {/* Lado Esquerdo */}
          <div className="footer-left">
            <h2 className="footer-title">CONECTA+</h2>
            <a href="#" className="footer-link">Sobre Nós</a>
          </div>

          {/* Lado Direito */}
          <div className="footer-right">
            <h2 className="footer-title">CONTATO E SUPORTE</h2>
            <div className="footer-contact">
              <a href="mailto:email@gmail.com" className="footer-link">email@gmail.com</a>
              <a href="#" className="footer-link">FAQ</a>
              <a href="#" className="footer-icon" aria-label="Camera">
                {/* Agora o nome aqui bate com o nome do import */}
                <Camera size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <hr className="footer-divider" />

        {/* Parte Inferior (Copyright e Links Legais) */}
        <div className="footer-bottom">
          <p>© 2026 Conecta+. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <a href="#">Políticas de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Política de cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;