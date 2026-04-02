import React from 'react';
import { Camera } from 'lucide-react'; 

import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-left">
            <h2 className="footer-title">CONECTA+</h2>
            <a href="#" className="footer-link">Sobre Nós</a>
          </div>

          <div className="footer-right">
            <h2 className="footer-title">CONTATO E SUPORTE</h2>
            <div className="footer-contact">
              <a href="mailto:email@gmail.com" className="footer-link">email@gmail.com</a>
              <a href="#" className="footer-link">FAQ</a>
              <a href="#" className="footer-icon" aria-label="Camera">
                <Camera size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

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