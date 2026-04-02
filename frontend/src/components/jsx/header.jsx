import React from 'react';
import { Search } from 'lucide-react'; 
import { NavLink } from 'react-router-dom';
import logoImg from '../../images/identidade/logo.png';
import '../css/Header.css'; 

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        
        <NavLink to="/">
          <img src={logoImg} alt="Conecta+ Logo" className="logo-img" />
        </NavLink>

        <nav className="header-nav">
          <NavLink to="/MuralVagas" className="nav-link nav-explorar">EXPLORAR</NavLink>
          <NavLink to="/sobre" className="nav-link nav-sobre">SOBRE NÓS</NavLink>
        </nav>

        <div className="search-container">
          <input type="text" className="search-input" placeholder="Buscar causas..." />
          <Search className="search-icon" size={16} strokeWidth={2} />
        </div>

        <div className="header-actions">
          <NavLink to="/CadastroUser" className="btn-link">
            <button className="btn btn-cadastro">CADASTRO</button>
          </NavLink>
          
          <NavLink to="/Login" className="btn-link">
            <button className="btn btn-login">LOGIN</button>
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default Header;