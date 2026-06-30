import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, User, MessageSquare, Bell, Settings, HelpCircle, ChevronLeft, ChevronRight,
  Search, Bookmark, Briefcase, Users, HeartHandshake, FileText,
  ShieldCheck, Building2, AlertTriangle, PieChart
} from 'lucide-react';

import '../css/Sidebar.css'; 
import logoImg from '../../images/identidade/logo.png'; 
import ilustracaoImg from '../../images/Img6.png'; // Ilustração de volta!

const Sidebar = ({ tipoUsuario = 'VOLUNTARIO' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tipoNormalizado = tipoUsuario.toUpperCase();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  const menuVoluntario = [
    { path: '/PainelVoluntario', icon: LayoutDashboard, label: 'Conquistas e Certificados' },
    { path: '/MuralVagas', icon: Search, label: 'Explorar Vagas' },
    { path: '/MinhasInscricoes', icon: Bookmark, label: 'Minhas Inscrições' },
    { path: '/ChatBox', icon: MessageSquare, label: 'Mensagens' }
  ];

  const menuONG = [
    { path: '/DashboardONG', icon: LayoutDashboard, label: 'Visão Geral' },
    { path: '/GestaoVagas', icon: Briefcase, label: 'Gestão de Vagas' },
    { path: '/Candidatos', icon: Users, label: 'Candidatos' },
    { path: '/Doacoes', icon: HeartHandshake, label: 'Doações' },
    { path: '/Relatorios', icon: FileText, label: 'Relatórios' },
    { path: '/ChatBox', icon: MessageSquare, label: 'Mensagens' }
  ];

  const menuAdmin = [
    { path: '/PainelAdmin', icon: PieChart, label: 'Dashboard Global' },
    { path: '/GestaoONGs', icon: Building2, label: 'Gestão de ONGs' },
    { path: '/GestaoVoluntarios', icon: Users, label: 'Voluntários' },
    { path: '/ModeracaoDenuncias', icon: AlertTriangle, label: 'Moderação e Denúncias' },
    { path: '/LogAuditoria', icon: ShieldCheck, label: 'Log de Auditoria' }
  ];
  
  const obterMenuAtual = () => {
    switch (tipoNormalizado) {
      case 'ONG': return menuONG;
      case 'ADMIN': return menuAdmin;
      case 'VOLUNTARIO': 
      case 'VISITANTE': 
      default: return menuVoluntario;
    }
  };

  const menuAtual = obterMenuAtual();

  return (
    <aside className={`sidebar-container ${isExpanded ? 'expandida' : 'recolhida'}`}>
      
      {/* BOTÃO TOGGLE - Fora de caixas para flutuar centralizado na borda */}
      <button className="btn-toggle" onClick={toggleSidebar} aria-label="Recolher menu">
        {isExpanded ? <ChevronLeft size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
      </button>

      <div className="sidebar-cabecalho">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Conecta+" className="logo-icone-img" /> 
          {isExpanded && <span className="logo-texto">Conecta+</span>}
        </div>
      </div>

      {/* MENU PRINCIPAL */}
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

      {/* MENU SECUNDÁRIO */}
      <nav className="sidebar-menu secundario">
        <NavLink to="/Perfil" className={({ isActive }) => `menu-item ${isActive ? 'ativo' : ''}`}>
          <User size={20} />
          {isExpanded && <span>Meu Perfil</span>}
        </NavLink>
        <NavLink to="/notificacoes" className={({ isActive }) => `menu-item ${isActive ? 'ativo' : ''}`}>
          <Bell size={20} />
          {isExpanded && <span>Notificações</span>}
        </NavLink>
        <NavLink to="/configuracoes" className={({ isActive }) => `menu-item ${isActive ? 'ativo' : ''}`}>
          <Settings size={20} />
          {isExpanded && <span>Configurações</span>}
        </NavLink>
        
        {tipoNormalizado !== 'ADMIN' && (
          <NavLink to="/FAQ" className={({ isActive }) => `menu-item ${isActive ? 'ativo' : ''}`}>
            <HelpCircle size={20} />
            {isExpanded && <span>Suporte</span>}
          </NavLink>
        )}
      </nav>

      {/* RODAPÉ COM A ILUSTRAÇÃO (Apenas quando expandido) */}
      <div className="sidebar-rodape">
        {isExpanded && tipoNormalizado !== 'ADMIN' && (
          <div className="sidebar-ilustracao">
            <img src={ilustracaoImg} alt="Ilustração de Apoio" className="img-ilustracao" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;