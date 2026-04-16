import React, { useState } from 'react';
import { 
  Check, Trash, Trophy, User, 
  FileCheck, ChevronLeft, ChevronRight, DollarSign
} from 'lucide-react';
import '../../css/Outros/Notificacoes.css';

const Notificacoes = () => {
  const [filtro, setFiltro] = useState('todas');

  // Mock de notificações baseado na sua imagem
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: 'conquista',
      titulo: 'A meta "Reforma do Canil" atingiu 100%!',
      descricao: 'Sua doação de R$ 50,00 contribuiu para este sucesso.',
      tempo: 'Há 15 minutos',
      lida: false
    },
    {
      id: 2,
      tipo: 'mensagem',
      titulo: 'Nova mensagem de Ana (ONG Animais):',
      descricao: '"Oi Thaline, temos uma dúvida sobre sua disponibilidade..."',
      tempo: 'Há 2 horas',
      lida: false
    },
    {
      id: 3,
      tipo: 'candidatura',
      titulo: 'Candidatura para "Educação Infantil" aprovada!',
      descricao: 'Parabéns, a ONG "Crianças Felizes" aprovou sua participação.',
      tempo: '12/03/2026 às 14:30',
      lida: true
    },
    {
      id: 4,
      tipo: 'financeiro',
      titulo: 'Recibo de doação disponível',
      descricao: 'O recibo da sua doação mensal já está na aba financeiro.',
      tempo: '10/03/2026 às 09:00',
      lida: true
    }
  ]);

  const getIconeDetalhes = (tipo) => {
    switch(tipo) {
      case 'conquista': return { icon: <Trophy size={24} />, class: 'icon-gold' };
      case 'mensagem': return { icon: <User size={24} />, class: 'icon-dark' };
      case 'candidatura': return { icon: <FileCheck size={24} />, class: 'icon-red' };
      case 'financeiro': return { icon: <DollarSign size={24} />, class: 'icon-green' };
      default: return { icon: <Check size={24} />, class: 'icon-blue' };
    }
  };

  const marcarTodasComoLidas = () => setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  const apagarTodas = () => setNotificacoes([]);

  return (
    <div className="notificacoes-wrapper">
      <div className="noti-app-container">
        
        {/* HEADER BRANCO COM ABAS */}
        <div className="noti-top-bar">
          <div className="noti-tabs-scroll">
            <button className={`noti-tab-btn ${filtro === 'todas' ? 'active' : ''}`} onClick={() => setFiltro('todas')}>
              Todas (15)
            </button>
            <button className={`noti-tab-btn ${filtro === 'nao-lidas' ? 'active' : ''}`} onClick={() => setFiltro('nao-lidas')}>
              Não Lidas (3)
            </button>
            <button className={`noti-tab-btn ${filtro === 'candidaturas' ? 'active' : ''}`} onClick={() => setFiltro('candidaturas')}>
              Candidaturas (6)
            </button>
            <button className={`noti-tab-btn ${filtro === 'financeiro' ? 'active' : ''}`} onClick={() => setFiltro('financeiro')}>
              Financeiro (4)
            </button>
            <button className={`noti-tab-btn ${filtro === 'sistema' ? 'active' : ''}`} onClick={() => setFiltro('sistema')}>
              Sistema (15)
            </button>
          </div>
        </div>

        {/* CORPO AZUL COM AS NOTIFICAÇÕES */}
        <div className="noti-blue-body">
          
          {/* BOTÕES DE AÇÃO */}
          <div className="noti-actions-bar">
            <button className="btn-pill btn-success" onClick={marcarTodasComoLidas}>
              <Check size={18} /> Marcar todas como lidas
            </button>
            <button className="btn-pill btn-danger" onClick={apagarTodas}>
              <Trash size={18} /> Apagar todas
            </button>
          </div>

          {/* LISTA */}
          <div className="noti-list-glass">
            {notificacoes.length === 0 ? (
              <div className="noti-empty-glass">Nenhuma notificação encontrada.</div>
            ) : (
              notificacoes.map((noti) => {
                const info = getIconeDetalhes(noti.tipo);
                return (
                  <div key={noti.id} className="noti-glass-card">
                    <div className={`noti-circle-icon ${info.class}`}>
                      {info.icon}
                    </div>
                    <div className="noti-glass-content">
                      <h3>{noti.titulo}</h3>
                      <p>{noti.descricao}</p>
                    </div>
                    <div className="noti-glass-time">
                      {noti.tempo}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PAGINAÇÃO */}
          <div className="noti-pagination">
            <button className="btn-page"><ChevronLeft size={18} /> Anterior</button>
            <span className="page-number">1</span>
            <button className="btn-page">Próximo <ChevronRight size={18} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notificacoes;