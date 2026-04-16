import React, { useState, useMemo} from 'react';
import '../../css/Outros/CentralNotificacoes.css';

const CentralNotificacoes = () => {
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3; 

  const todasNotificacoes = [
    { id: 1, tipo: 'Sistema', titulo: 'Meta atingida!', lida: false, tempo: '15 min', icone: '🏆' },
    { id: 2, tipo: 'Candidaturas', titulo: 'Nova mensagem de Ana', lida: false, tempo: '2 horas', icone: '👤' },
    { id: 3, tipo: 'Candidaturas', titulo: 'Candidatura Aprovada', lida: true, tempo: 'Ontem', icone: '🧩' },
    { id: 4, tipo: 'Financeiro', titulo: 'Doação Recebida', lida: true, tempo: '2 dias', icone: '💰' },
    { id: 5, tipo: 'Sistema', titulo: 'Manutenção agendada', lida: false, tempo: '3 dias', icone: '⚙️' },
    { id: 6, tipo: 'Candidaturas', titulo: 'Vaga encerrada', lida: true, tempo: '4 dias', icone: '🚫' },
  ];

  const notificacoesFiltradas = useMemo(() => {
    let filtradas = todasNotificacoes;
    
    if (filtroAtivo === 'Não Lidas') {
      filtradas = todasNotificacoes.filter(n => !n.lida);
    } else if (filtroAtivo !== 'Todas') {
      filtradas = todasNotificacoes.filter(n => n.tipo === filtroAtivo);
    }
    
    return filtradas;
  }, [filtroAtivo]);

  const totalPaginas = Math.ceil(notificacoesFiltradas.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const notificacoesExibidas = notificacoesFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina);

  // Handlers
  const mudarFiltro = (filtro) => {
    setFiltroAtivo(filtro);
    setPaginaAtual(1); 
  };

  return (
    <main className="nt-secao-principal">
      <div className="nt-cartao-central">
        
        <nav className="nt-abas-navegacao">
          {['Todas', 'Não Lidas', 'Candidaturas', 'Financeiro', 'Sistema'].map((tab) => (
            <button 
              key={tab}
              className={`nt-aba-item ${filtroAtivo === tab ? 'ativa' : ''}`}
              onClick={() => mudarFiltro(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="nt-acoes-lote">
          <button className="nt-btn-utilitario">✓ Marcar todas como lidas</button>
          <button className="nt-btn-utilitario">🗑 Apagar todas</button>
        </div>

        <div className="nt-lista-feed">
          {notificacoesExibidas.length > 0 ? (
            notificacoesExibidas.map((n) => (
              <div key={n.id} className={`nt-card-notificacao ${n.lida ? 'lida' : 'nao-lida'}`}>
                <div className="nt-notif-icone">{n.icone}</div>
                <div className="nt-notif-conteudo">
                  <h4 className="nt-notif-titulo">{n.titulo}</h4>
                  <p className="nt-notif-descricao">Tipo: {n.tipo}</p>
                </div>
                <div className="nt-notif-tempo">{n.tempo}</div>
              </div>
            ))
          ) : (
            <p className="nt-vazio">Nenhuma notificação encontrada neste filtro.</p>
          )}
        </div>

        <div className="nt-paginacao">
          <button 
            className="nt-btn-pag" 
            onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          
          <span className="nt-pag-numero">{paginaAtual} de {totalPaginas || 1}</span>
          
          <button 
            className="nt-btn-pag" 
            onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual >= totalPaginas}
          >
            Próximo
          </button>
        </div>

      </div>
    </main>
  );
};

export default CentralNotificacoes;