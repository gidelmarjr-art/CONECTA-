import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Settings, Bell, User, Menu, X, 
  MessageCircle, Briefcase, BarChart2, Shield, Palette, HelpCircle, LogOut, CheckCircle2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../images/identidade/logo.png'; 
import '../css/Header.css'; 

// Dados mockados para ilustrar um pop-up rico em detalhes
const mockNotifications = [
  { id: 1, icon: MessageCircle, text: '@maria comentou na sua postagem.', time: 'Há 5 min', unread: true, color: '#0074BD' },
  { id: 2, icon: Briefcase, text: 'Nova oportunidade próxima a você!', time: 'Há 2h', unread: true, color: '#53B848' },
  { id: 3, icon: BarChart2, text: 'Seu perfil atingiu 500 visualizações.', time: 'Ontem', unread: false, color: '#ED5C37' },
];

const menuSettings = [
  { id: 'conta', icon: User, label: 'Preferências da Conta' },
  { id: 'privacidade', icon: Shield, label: 'Privacidade e Segurança' },
  { id: 'tema', icon: Palette, label: 'Tema e Exibição' },
  { id: 'ajuda', icon: HelpCircle, label: 'Central de Ajuda' },
];

const Header = ({ isLoggedIn = true }) => { // Deixei true por padrão para você testar visualmente
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null); // 'config', 'notif', ou null
  
  const configRef = useRef(null);
  const notificacoesRef = useRef(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const togglePopup = (popupName) => {
    setActivePopup(activePopup === popupName ? null : popupName);
  };

  // Fecha os pop-ups ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (configRef.current && !configRef.current.contains(event.target)) &&
        (notificacoesRef.current && !notificacoesRef.current.contains(event.target))
      ) {
        setActivePopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Variantes de animação do Framer Motion
  const popupVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 350, damping: 25 } 
    },
    exit: { opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)', transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* LOGO */}
        <NavLink to="/">
          <img src={logoImg} alt="Conecta+ Logo" className="logo-img" />
        </NavLink>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="header-nav desktop-only">
          <NavLink to="/Feed" className="nav-link nav-feed">FEED</NavLink>
          <NavLink to="/MuralVagas" className="nav-link nav-explorar">EXPLORAR</NavLink>
          <NavLink to="/SobreNos" className="nav-link nav-sobre">SOBRE NÓS</NavLink>
        </nav>

        {/* BUSCA DESKTOP */}
        <div className="search-container desktop-only">
          <input type="text" className="search-input" placeholder="Buscar causas, vagas..." />
          <Search className="search-icon" size={16} strokeWidth={2.5} />
        </div>

        {/* AÇÕES DA DIREITA */}
        <div className="header-actions desktop-only">
          {isLoggedIn ? (
            <div className="header-perfil-logado">
              
              {/* POP-UP CONFIGURAÇÕES */}
              <div className="popup-container" ref={configRef}>
                <button 
                  className={`btn-icone bg-azul-claro ${activePopup === 'config' ? 'active-icon' : ''}`} 
                  onClick={() => togglePopup('config')}
                >
                  <Settings size={20} className="icone-azul" />
                </button>
                
                <AnimatePresence>
                  {activePopup === 'config' && (
                    <motion.div 
                      className="popup-dropdown modern-glass"
                      variants={popupVariants}
                      initial="hidden" animate="visible" exit="exit"
                    >
                      <div className="popup-header">
                        <h4>Configurações</h4>
                      </div>
                      
                      <motion.ul className="popup-list" transition={{ staggerChildren: 0.05 }}>
                        {menuSettings.map((item) => (
                          <motion.li key={item.id} variants={itemVariants} className="popup-item">
                            <div className="popup-item-icon-wrapper" style={{ backgroundColor: '#f0f4f8', color: '#0074BD' }}>
                              <item.icon size={16} />
                            </div>
                            <span>{item.label}</span>
                          </motion.li>
                        ))}
                        <motion.li variants={itemVariants} className="popup-item item-danger">
                          <div className="popup-item-icon-wrapper" style={{ backgroundColor: '#fff0f0', color: '#ED5C37' }}>
                            <LogOut size={16} />
                          </div>
                          <span>Sair da conta</span>
                        </motion.li>
                      </motion.ul>

                      <NavLink to="/configuracoes" className="popup-footer-link" onClick={() => setActivePopup(null)}>
                        Ver todas as configurações
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* POP-UP NOTIFICAÇÕES */}
              <div className="popup-container" ref={notificacoesRef}>
                <button 
                  className={`btn-icone bg-vermelho-claro ${activePopup === 'notif' ? 'active-icon' : ''}`} 
                  onClick={() => togglePopup('notif')}
                >
                  <Bell size={20} className="icone-vermelho" />
                  {mockNotifications.some(n => n.unread) && <span className="indicador-notificacao"></span>}
                </button>

                <AnimatePresence>
                  {activePopup === 'notif' && (
                    <motion.div 
                      className="popup-dropdown popup-notificacoes modern-glass"
                      variants={popupVariants}
                      initial="hidden" animate="visible" exit="exit"
                    >
                      <div className="popup-header popup-header-flex">
                        <h4>Notificações</h4>
                        <button className="mark-read-btn">
                          <CheckCircle2 size={14} /> Marcar lidas
                        </button>
                      </div>

                      <motion.ul className="popup-list" transition={{ staggerChildren: 0.05 }}>
                        {mockNotifications.map((notif) => (
                          <motion.li key={notif.id} variants={itemVariants} className={`popup-item-notif ${notif.unread ? 'unread' : ''}`}>
                            <div className="notif-icon-circle" style={{ backgroundColor: `${notif.color}15`, color: notif.color }}>
                              <notif.icon size={16} />
                            </div>
                            <div className="notif-content">
                              <p>{notif.text}</p>
                              <span>{notif.time}</span>
                            </div>
                            {notif.unread && <div className="notif-dot"></div>}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <NavLink to="/notificacoes" className="popup-footer-link" onClick={() => setActivePopup(null)}>
                        Ver todas as notificações
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="info-usuario-header desktop-only">
                <span className="nome-usuario-header">Usúario</span>
                <span className="arroba-usuario-header">@conectauser/span>
              </div>
              
              <div className="avatar-usuario-header">
                {/* Você pode trocar por uma imagem real aqui depois */}
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

        {/* BOTÃO MOBILE */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MENU MOBILE (Com animação) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-dropdown modern-glass"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {/* O conteúdo do menu mobile pode permanecer o mesmo, apenas envolto na motion.div */}
            <div style={{ padding: '20px' }}>
              <nav className="mobile-nav">
                <NavLink to="/Feed" className="nav-link nav-feed" onClick={toggleMenu}>FEED</NavLink>
                <NavLink to="/MuralVagas" className="nav-link nav-explorar" onClick={toggleMenu}>EXPLORAR</NavLink>
                <NavLink to="/SobreNos" className="nav-link nav-sobre" onClick={toggleMenu}>SOBRE NÓS</NavLink>
              </nav>

              <div className="search-container-mobile">
                <input type="text" className="search-input mobile-input" placeholder="Buscar..." />
                <Search className="search-icon" size={16} />
              </div>

              {isLoggedIn && (
                <div className="mobile-settings-container">
                  <NavLink to="/notificacoes" className="mobile-settings" onClick={toggleMenu}>
                    <button className="btn-icone bg-vermelho-claro"><Bell size={20} className="icone-vermelho" /></button>
                    <span className="mobile-settings-text">Notificações</span>
                  </NavLink>
                  <NavLink to="/configuracoes" className="mobile-settings" onClick={toggleMenu}>
                    <button className="btn-icone bg-azul-claro"><Settings size={20} className="icone-azul" /></button>
                    <span className="mobile-settings-text">Configurações</span>
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;