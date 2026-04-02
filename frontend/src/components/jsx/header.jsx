import React from 'react';
import { Search } from 'lucide-react'; 
import logoImg from '../../images/identidade/logo.png';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        
        <img src={logoImg} alt="Conecta+ Logo" className="logo-img" />

        <nav className="header-nav">
          <a href="#" className="nav-link nav-explorar">EXPLORAR</a>
          <a href="#" className="nav-link nav-sobre">SOBRE NÓS</a>
        </nav>


        <div className="search-container">
          <input type="text" className="search-input" />
          <Search className="search-icon" size={16} strokeWidth={2} />
        </div>

        <div className="header-actions">
          <button className="btn btn-cadastro">CADASTRO</button>
          <button className="btn btn-login">LOGIN</button>
        </div>

      </div>
    </header>
  );
};

export default Header;