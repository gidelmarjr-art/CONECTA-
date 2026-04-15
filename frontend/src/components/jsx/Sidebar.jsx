import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  // Ícones Gerais
  LayoutDashboard, User, MessageSquare, Bell, Settings, HelpCircle, ChevronLeft, ChevronRight,
  // Ícones Voluntário
  Search, Bookmark, Award,
  // Ícones ONG
  Briefcase, Users, HeartHandshake, FileText,
  // Ícones Admin
  ShieldCheck, Building2, AlertTriangle, PieChart
} from 'lucide-react';

import '../css/Sidebar.css'; 
import ilustracaoImg from '../../images/Img6.png';
import logoImg from '../../images/identidade/logo.png'; 

// O componente agora recebe o "tipoUsuario" (pode ser 'VOLUNTARIO', 'ONG' ou 'ADMIN')
const Sidebar = ({ tipoUsuario = 'VOLUNTARIO' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // ==========================================
  // DEFINIÇÃO DOS MENUS POR TIPO DE USUÁRIO
  // ==========================================
  
  const menuVoluntario = [
    { path: '/PainelVoluntario', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/MuralVagas', icon: Search, label: 'Explorar Vagas' },
    { path: '/MinhasInscricoes', icon: Bookmark, label: 'Minhas Inscrições' },
    { path: '/Conquistas', icon: Award, label: 'Conquistas e XP' },
    { path: '/Chat', icon: MessageSquare, label: 'Mensagens' }
  ];

  const menuONG = [
    { path: '/DashboardONG', icon: LayoutDashboard, label: 'Visão Geral' },
    { path: '/GestaoVagas', icon: Briefcase, label: 'Gestão de Vagas' },
    { path: '/Candidatos', icon: Users, label: 'Candidatos' },
    { path: '/Doacoes', icon: HeartHandshake, label: 'Doações' },
    { path: '/Relatorios', icon: FileText, label: 'Relatórios' },
    { path: '/Chat', icon: MessageSquare, label: 'Mensagens' }
  ];

  const menuAdmin = [
    { path: '/PainelAdmin', icon: PieChart, label: 'Dashboard Global' },
    { path: '/GestaoONGs', icon: Building2, label: 'Gestão de ONGs' },
    { path: '/GestaoVoluntarios', icon: Users, label: 'Voluntários' },
    { path: '/Moderacao', icon: AlertTriangle, label: 'Moderação e Denúncias' },
    { path: '/Auditoria', icon: ShieldCheck, label: 'Log de Auditoria' }
  ];

  // Lógica para selecionar qual menu renderizar
  const obterMenuAtual = () => {
    switch (tipoUsuario) {
      case 'ONG': return menuONG;
      case 'ADMIN': return menuAdmin;
      case 'VOLUNTARIO': 
      default: return menuVoluntario;
    }
  };

  const menuAtual = obterMenuAtual();

  return (
    <aside className={`sidebar-container ${isExpanded ? 'expandida' : 'recolhida'}`}>
      
      {/* CABEÇALHO DA SIDEBAR */}
      <div className="sidebar-cabecalho">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Conecta+" className="logo-icone-img" /> 
          {isExpanded && <span className="logo-texto">Conecta+</span>}
        </div>
        <button className="btn-toggle" onClick={toggleSidebar}>
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* MENU PRINCIPAL DINÂMICO */}
      <nav className="sidebar-menu">
        {menuAtual.map((item, index) => {
          const Icone = item.icon;
          return (
            <NavLink 
              key={index} 
              to={item.path} 
              className={({ isActive }) => `menu-item ${isActive ? 'ativo' : ''}`}
            >
              <Icone size={20} />
              {isExpanded && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <hr className="sidebar-divisor" />

      {/* MENU SECUNDÁRIO (COMUM A TODOS) */}
      <nav className="sidebar-menu secundario">
        <NavLink to="/perfil" className="menu-item">
          <User size={20} />
          {isExpanded && <span>Meu Perfil</span>}
        </NavLink>
        <NavLink to="/notificacoes" className="menu-item">
          <Bell size={20} />
          {isExpanded && <span>Notificações</span>}
        </NavLink>
        <NavLink to="/configuracoes" className="menu-item">
          <Settings size={20} />
          {isExpanded && <span>Configurações</span>}
        </NavLink>
        
        {/* Admin geralmente não precisa de botão de suporte na mesma área, mas mantive para Voluntário/ONG */}
        {tipoUsuario !== 'ADMIN' && (
          <NavLink to="/suporte" className="menu-item">
            <HelpCircle size={20} />
            {isExpanded && <span>Suporte</span>}
          </NavLink>
        )}
      </nav>

      {/* ÁREA INFERIOR (ILUSTRAÇÃO E PERFIL) */}
      <div className="sidebar-rodape">
        {/* Esconde a ilustração se for ADMIN para ficar mais sério */}
        {isExpanded && tipoUsuario !== 'ADMIN' && (
          <div className="sidebar-ilustracao">
             <img src={ilustracaoImg} alt="Ilustração" className="img-ilustracao" />
          </div>
        )}
        
        <div className="sidebar-perfil">
          <div className="perfil-avatar">
            <User size={20} color="#ffffff" strokeWidth={2} />
          </div>
          {isExpanded && (
            <div className="perfil-info">
              <span className="perfil-saudacao">Bem-vindo(a) 👋</span>
              <span className="perfil-nome">
                {tipoUsuario === 'ADMIN' ? 'Admin Global' : 'Johnathan'}
              </span>
            </div>
          )}
          {isExpanded && <ChevronRight size={16} className="perfil-seta" />}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;