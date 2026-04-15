import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Target, Download, Plus,
  Search, Filter, Heart, ArrowUpRight, ArrowDownRight, CreditCard, X
} from 'lucide-react';
import '../css/Doacoes.css';

const Doacoes = () => {
  // Estado para controlar a abertura do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock de campanhas (Agora como estado para simular a adição de novas)
  const [campanhas, setCampanhas] = useState([
    {
      id: 1,
      titulo: "Campanha de Inverno 2026",
      arrecadado: 12500,
      meta: 15000,
      doadores: 145,
      diasRestantes: 12
    },
    {
      id: 2,
      titulo: "Reforma da Biblioteca",
      arrecadado: 3200,
      meta: 10000,
      doadores: 38,
      diasRestantes: 45
    }
  ]);

  const [transacoes] = useState([
    { id: 101, nome: "Marcos Vinícius", valor: 150.00, data: "Hoje, 14:30", metodo: "PIX", tipo: "entrada" },
    { id: 102, nome: "Ana Beatriz Silva", valor: 50.00, data: "Hoje, 09:15", metodo: "Cartão de Crédito", tipo: "entrada" },
    { id: 103, nome: "Taxa da Plataforma", valor: 15.00, data: "Ontem, 18:00", metodo: "Desconto", tipo: "saida" },
    { id: 104, nome: "Empresa Parceira S/A", valor: 1000.00, data: "Ontem, 10:20", metodo: "Transferência", tipo: "entrada" }
  ]);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calcularProgresso = (arrecadado, meta) => {
    return Math.min(Math.round((arrecadado / meta) * 100), 100);
  };

  return (
    <div className="pong-doac-container">
      
      {/* CABEÇALHO */}
      <header className="pong-doac-header">
        <div className="pong-doac-titulos">
          <h1>Gestão de Doações</h1>
          <p>Acompanhe suas campanhas, metas e o histórico de arrecadações.</p>
        </div>
        <div className="pong-doac-header-acoes">
            <button className="pong-doac-btn-exportar">
                <Download size={18} />
                <span>Exportar</span>
            </button>
            <button className="pong-doac-btn-nova-meta" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                <span>Nova Meta</span>
            </button>
        </div>
      </header>

      {/* KPIs */}
      <section className="pong-doac-kpis">
        <div className="pong-doac-kpi-card destaque-verde">
          <div className="kpi-icone"><DollarSign size={24} color="#27ae60"/></div>
          <div className="kpi-info">
            <span>Saldo Disponível</span>
            <strong>{formatarMoeda(15700)}</strong>
          </div>
        </div>
        <div className="pong-doac-kpi-card">
          <div className="kpi-icone"><TrendingUp size={24} color="#0056d2"/></div>
          <div className="kpi-info">
            <span>Arrecadado no Mês</span>
            <strong>{formatarMoeda(4350)}</strong>
          </div>
        </div>
      </section>

      {/* CAMPANHAS ATIVAS */}
      <section className="pong-doac-secao">
        <div className="pong-doac-secao-header">
          <h2>Campanhas Ativas</h2>
        </div>
        
        <div className="pong-doac-campanhas-grid">
          {campanhas.map(campanha => {
            const progresso = calcularProgresso(campanha.arrecadado, campanha.meta);
            return (
              <div className="pong-doac-campanha-card" key={campanha.id}>
                <div className="campanha-header">
                  <h3>{campanha.titulo}</h3>
                  <span className="badge-dias">{campanha.diasRestantes} dias restantes</span>
                </div>
                <div className="campanha-valores">
                  <strong>{formatarMoeda(campanha.arrecadado)}</strong>
                  <span>de {formatarMoeda(campanha.meta)}</span>
                </div>
                <div className="campanha-barra-fundo">
                  <div className="campanha-barra-preenchimento" style={{ width: `${progresso}%` }}></div>
                </div>
                <div className="campanha-footer">
                  <span className="porcentagem">{progresso}% da meta</span>
                  <span className="doadores"><Heart size={14} color="#e74c3c" /> {campanha.doadores} apoiadores</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HISTÓRICO - RESUMIDO PARA EXEMPLO */}
      <section className="pong-doac-secao">
        <h2>Transações Recentes</h2>
        <div className="pong-doac-tabela-container">
          <table className="pong-doac-tabela">
            <thead>
              <tr>
                <th>Doador</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.nome}</strong></td>
                  <td>{t.data}</td>
                  <td className={t.tipo === 'entrada' ? 'texto-verde' : 'texto-vermelho'}>
                    {t.tipo === 'entrada' ? '+' : '-'} {formatarMoeda(t.valor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL PARA NOVA META */}
      {isModalOpen && (
        <div className="pong-doac-modal-overlay">
          <div className="pong-doac-modal">
            <div className="modal-header">
              <h2>Criar Nova Meta de Arrecadação</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="form-group">
                <label>Título da Campanha</label>
                <input type="text" placeholder="Ex: Natal Solidário 2026" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valor Alvo (R$)</label>
                  <input type="number" placeholder="5000" required />
                </div>
                <div className="form-group">
                  <label>Prazo (Dias)</label>
                  <input type="number" placeholder="30" required />
                </div>
              </div>

              <div className="form-group">
                <label>Descrição da Finalidade</label>
                <textarea placeholder="Explique para que esse dinheiro será usado..."></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-confirmar">Criar Campanha</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Doacoes;