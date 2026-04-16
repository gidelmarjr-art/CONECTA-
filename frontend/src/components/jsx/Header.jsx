import React from 'react';
import { Search, Settings, Bell, User } from 'lucide-react'; 
import { NavLink } from 'react-router-dom';
import logoImg from '../../images/identidade/logo.png'; 
import '../css/Header.css'; 

const Header = ({ isLoggedIn }) => {
  return (
    <header className="main-header">
      <div className="header-container">
        
        {!isLoggedIn && (
          <NavLink to="/">
            <img src={logoImg} alt="Conecta+ Logo" className="logo-img" />
          </NavLink>
        )}

        <nav className="header-nav">
          <NavLink to="/Feed" className="nav-link nav-feed">FEED</NavLink>
          <NavLink to="/MuralVagas" className="nav-link nav-explorar">EXPLORAR</NavLink>
          <NavLink to="/SobreNos" className="nav-link nav-sobre">SOBRE NÓS</NavLink>
        </nav>

        <div className="search-container">
          <input type="text" className="search-input" placeholder="Buscar causas..." />
          <Search className="search-icon" size={16} strokeWidth={2} />
        </div>


        <div className="header-actions">
          {isLoggedIn ? (
            <div className="header-perfil-logado">
              <button className="btn-icone bg-azul-claro">
                <Settings size={20} className="icone-azul" />
              </button>
              
              <button className="btn-icone bg-vermelho-claro">
                <Bell size={20} className="icone-vermelho" />
                <span className="indicador-notificacao"></span>
              </button>
              
              <div className="info-usuario-header">
                <span className="nome-usuario-header">Nome user</span>
                <span className="arroba-usuario-header">@user</span>
              </div>
              
              <div className="avatar-usuario-header">
                <User size={24} color="#ffffff" strokeWidth={2} />
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/CadastroUser" className="btn-link">
                <button className="btn btn-cadastro">CADASTRO</button>
              </NavLink>
              
              <NavLink to="/Login" className="btn-link">
                <button className="btn btn-login">LOGIN</button>
              </NavLink>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;