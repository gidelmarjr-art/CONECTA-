import React from 'react';
import { Link } from 'react-router-dom'; 
import { Camera } from 'lucide-react'; 

import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-left">
            <h2 className="footer-title">CONECTA+</h2>
            <Link to="/SobreNos" className="footer-link">Sobre Nós</Link>
          </div>

          <div className="footer-right">
            <h2 className="footer-title">CONTATO E SUPORTE</h2>
            <div className="footer-contact">
              <a href="mailto:email@gmail.com" className="footer-link">email@gmail.com</a>
              <Link to="/FAQ" className="footer-link">FAQ</Link>
              <Link to="/" className="footer-icon" aria-label="Camera">
                <Camera size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2026 Conecta+. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <Link to="/">Políticas de Privacidade</Link>
            <Link to="/">Termos de Uso</Link>
            <Link to="/">Política de cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;