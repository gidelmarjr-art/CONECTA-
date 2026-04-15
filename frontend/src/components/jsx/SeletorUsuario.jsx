import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Settings, User, Building, ShieldAlert, LogOut, X, Check } from 'lucide-react';
import '../css/SeletorUsuario.css'; 

const SeletorUsuario = ({ usuarioAtual, setUsuarioAtual }) => {
  const [aberto, setAberto] = useState(false);
  const [classePosicao, setClassePosicao] = useState('menu-bottom-left');
  
  const nodeRef = useRef(null);

  // Função inteligente que calcula onde o botão está antes de abrir o menu
  const toggleMenu = () => {
    if (!aberto && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const telaLargura = window.innerWidth;
      const telaAltura = window.innerHeight;

      // Descobre se está mais pro topo ou mais pro fundo
      const isTop = rect.top < telaAltura / 2;
      // Descobre se está mais pra direita ou mais pra esquerda
      const isRight = rect.left > telaLargura / 2;

      // Define a classe CSS correspondente
      setClassePosicao(`menu-${isTop ? 'top' : 'bottom'}-${isRight ? 'right' : 'left'}`);
    }
    setAberto(!aberto);
  };

  const perfis = [
    { id: 'visitante', nome: 'Visitante (Deslogado)', icone: <LogOut size={16} />, cor: '#7f8c8d' },
    { id: 'voluntario', nome: 'Voluntário', icone: <User size={16} />, cor: '#27ae60' },
    { id: 'ong', nome: 'ONG', icone: <Building size={16} />, cor: '#0056d2' },
    { id: 'admin', nome: 'Super Admin', icone: <ShieldAlert size={16} />, cor: '#8e44ad' }
  ];

  return (
    <Draggable nodeRef={nodeRef} bounds="body" cancel=".area-menu">
      <div ref={nodeRef} className="debug-seletor-container">
        
        {/* Botão Flutuante (FAB) */}
        <button 
          className={`debug-seletor-fab ${aberto ? 'aberto' : ''}`}
          onClick={toggleMenu}
          title="Alterar visão de usuário (Arraste para mover)"
          style={{ cursor: 'move' }}
        >
          {aberto ? <X size={24} /> : <Settings size={24} />}
        </button>

        {/* Card do Menu dinâmico */}
        <div className={`debug-seletor-painel area-menu ${classePosicao} ${aberto ? 'painel-visivel' : ''}`}>
          <div className="debug-seletor-header">
            <div>
              <h4>Modo de Visualização</h4>
              <p>Simulador de apresentação</p>
            </div>
          </div>

          <div className="debug-seletor-opcoes">
            {perfis.map((perfil) => {
              const isActive = usuarioAtual === perfil.id;
              
              return (
                <button
                  key={perfil.id}
                  onClick={() => {
                    setUsuarioAtual(perfil.id);
                    setAberto(false);
                  }}
                  className={`debug-seletor-btn-opcao ${isActive ? 'ativo' : ''}`}
                  style={{ '--cor-hover': `${perfil.cor}15`, '--cor-borda': perfil.cor }}
                >
                  <div className="debug-seletor-icone-wrapper" style={{ color: isActive ? perfil.cor : '#7f8c8d' }}>
                    {perfil.icone}
                  </div>
                  <span style={{ color: isActive ? perfil.cor : '#2c3e50', fontWeight: isActive ? '600' : '500' }}>
                    {perfil.nome}
                  </span>
                  {isActive && <Check size={16} color={perfil.cor} className="debug-seletor-check" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default SeletorUsuario;