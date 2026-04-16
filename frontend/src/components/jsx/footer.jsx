/*git*/
/* eslint-disable jsx-a11y/anchor-is-valid */
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
            <a href="SobreNos" className="footer-link">Sobre Nós</a>
          </div>

          <div className="footer-right">
            <h2 className="footer-title">CONTATO E SUPORTE</h2>
            <div className="footer-contact">
              <a href="mailto:email@gmail.com" className="footer-link">email@gmail.com</a>
              <a href="FAQ" className="footer-link">FAQ</a>
              <a href="Homepage" className="footer-icon" aria-label="Camera">
                <Camera size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2026 Conecta+. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <a href="Homepage">Políticas de Privacidade</a>
            <a href="Homepage">Termos de Uso</a>
            <a href="Homepage">Política de cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
