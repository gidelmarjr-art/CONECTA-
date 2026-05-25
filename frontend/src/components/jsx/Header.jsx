import React, { useState } from 'react';
import { Search, Settings, Bell, User, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logoImg from '../../images/identidade/logo.png'; 
import '../css/Header.css'; 

const Header = ({ isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* LOGO */}
        {!isLoggedIn && (
          <NavLink to="/">
            <img src={logoImg} alt="Conecta+ Logo" className="logo-img" />
          </NavLink>
        )}

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="header-nav desktop-only">
          <NavLink to="/Feed" className="nav-link nav-feed">FEED</NavLink>
          <NavLink to="/MuralVagas" className="nav-link nav-explorar">EXPLORAR</NavLink>
          <NavLink to="/SobreNos" className="nav-link nav-sobre">SOBRE NÓS</NavLink>
        </nav>

        {/* BUSCA DESKTOP */}
        <div className="search-container desktop-only">
          <input type="text" className="search-input" placeholder="Buscar causas..." />
          <Search className="search-icon" size={16} strokeWidth={2} />
        </div>

        {/* AÇÕES DA DIREITA (Somen no celular) */}
        <div className="header-actions desktop-only">
          {isLoggedIn ? (
            <div className="header-perfil-logado">
              <button className="btn-icone bg-azul-claro desktop-only">
                <Settings size={20} className="icone-azul" />
              </button>
              
              <button className="btn-icone bg-vermelho-claro">
                <Bell size={20} className="icone-vermelho" />
                <span className="indicador-notificacao"></span>
              </button>
              
              <div className="info-usuario-header desktop-only">
                <span className="nome-usuario-header">Nome user</span>
                <span className="arroba-usuario-header">@user</span>
              </div>
              
              <div className="avatar-usuario-header">
                <User size={24} color="#ffffff" strokeWidth={2} />
              </div>
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <NavLink to="/CadastroUser" className="btn-link">
                <button className="btn btn-cadastro">CADASTRO</button>
              </NavLink>
              
              <NavLink to="/Login" className="btn-link">
                <button className="btn btn-login">LOGIN</button>
              </NavLink>
            </div>
          )}
        </div>

        {/* BOTÃO HAMBURGUER (Livre e solto para aparecer no celular) */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MENU SUSPENSO MOBILE */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <nav className="mobile-nav">
            <NavLink to="/Feed" className="nav-link nav-feed" onClick={toggleMenu}>FEED</NavLink>
            <NavLink to="/MuralVagas" className="nav-link nav-explorar" onClick={toggleMenu}>EXPLORAR</NavLink>
            <NavLink to="/SobreNos" className="nav-link nav-sobre" onClick={toggleMenu}>SOBRE NÓS</NavLink>
          </nav>

          <div className="search-container-mobile">
            <input type="text" className="search-input mobile-input" placeholder="Buscar causas..." />
            <Search className="search-icon" size={16} strokeWidth={2} />
          </div>

          {!isLoggedIn && (
            <div className="mobile-auth-buttons">
              <NavLink to="/CadastroUser" className="btn-link" onClick={toggleMenu}>
                <button className="btn btn-cadastro mobile-btn-full">CADASTRO</button>
              </NavLink>
              <NavLink to="/Login" className="btn-link" onClick={toggleMenu}>
                <button className="btn btn-login mobile-btn-full">LOGIN</button>
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div className="mobile-settings">
              <button className="btn-icone bg-azul-claro">
                <Settings size={20} className="icone-azul" />
              </button>
              <span className="mobile-settings-text">Configurações da Conta</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;