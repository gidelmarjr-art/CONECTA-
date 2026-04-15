import React from 'react';
import { 
  Search, Bell, LogOut, DollarSign, Users, 
  Building2, AlertCircle, Activity, ChevronRight 
} from 'lucide-react';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import '../css/PainelAdmin.css';

const PainelAdmin = () => {
  // Dados simulados para a tabela de logs (Log de Auditoria)
  const atividades = [
    { id: 1, data: "15/04/2026 10:23", evento: "Aprovação de ONG", usuario: "ONG Vida Verde", status: "sucesso" },
    { id: 2, data: "15/04/2026 09:45", evento: "Doação Liquidada", usuario: "João Silva (R$ 500)", status: "info" },
    { id: 3, data: "15/04/2026 08:30", evento: "Alerta de Segurança", usuario: "IP Desconhecido", status: "alerta" },
    { id: 4, data: "14/04/2026 18:20", evento: "Nova Campanha", usuario: "Apoio Jovem", status: "info" },
    { id: 5, data: "14/04/2026 15:10", evento: "Validação Pendente", usuario: "Instituto Esperança", status: "pendente" },
  ];

  // Dados para o gráfico de Engajamento Diário
  const dadosEngajamento = [
    { dia: '01/04', acessos: 1200, doacoes: 4000 },
    { dia: '05/04', acessos: 1500, doacoes: 5500 },
    { dia: '10/04', acessos: 1800, doacoes: 8000 },
    { dia: '15/04', acessos: 2200, doacoes: 9500 },
    { dia: '20/04', acessos: 2800, doacoes: 12000 },
    { dia: '25/04', acessos: 3100, doacoes: 15000 },
    { dia: '30/04', acessos: 3600, doacoes: 18500 },
  ];

  // Dados para o gráfico de Rosca (Métodos de Pagamento)
  const dadosPagamento = [
    { nome: 'Pix', valor: 65, cor: '#0056d2' },
    { nome: 'Cartão', valor: 25, cor: '#27ae60' },
    { nome: 'Boleto', valor: 10, cor: '#f39c12' },
  ];

  // Função auxiliar para renderizar as cores das tags de status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'sucesso': return <span className="padm-badge padm-badge-sucesso">Concluído</span>;
      case 'info': return <span className="padm-badge padm-badge-info">Registrado</span>;
      case 'alerta': return <span className="padm-badge padm-badge-alerta">Crítico</span>;
      case 'pendente': return <span className="padm-badge padm-badge-pendente">Aguardando</span>;
      default: return <span className="padm-badge">Padrão</span>;
    }
  };

  return (
    <div className="padm-container">
      
      {/* B. CABEÇALHO SUPERIOR (TOPBAR) */}
      <header className="padm-topbar">
        <div className="padm-busca-global">
          <Search size={18} color="#7f8c8d" />
          <input type="text" placeholder="Buscar transações, e-mails ou CNPJs..." />
        </div>
        
        <div className="padm-topbar-acoes">
          <button className="padm-btn-icone">
            <Bell size={20} />
            <span className="padm-notificacao-ponto"></span>
          </button>
          
          <div className="padm-perfil-admin">
            <div className="padm-perfil-info">
              <strong>Admin Global</strong>
              <span>ROLE_ADMIN</span>
            </div>
            <div className="padm-avatar">AG</div>
          </div>
          
          <button className="padm-btn-logout" title="Encerrar Sessão">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* C. CARDS DE INDICADORES (KPI WIDGETS) */}
      <section className="padm-kpi-grid">
        <div className="padm-kpi-card">
          <div className="padm-kpi-icone" style={{ backgroundColor: '#dff5de', color: '#27ae60' }}>
            <DollarSign size={24} />
          </div>
          <div className="padm-kpi-info">
            <span>Total Arrecadado (Mês)</span>
            <strong>R$ 142.500</strong>
          </div>
        </div>

        <div className="padm-kpi-card">
          <div className="padm-kpi-icone" style={{ backgroundColor: '#d6f0ff', color: '#0056d2' }}>
            <Users size={24} />
          </div>
          <div className="padm-kpi-info">
            <span>Voluntários Ativos</span>
            <strong>1.840</strong>
          </div>
        </div>

        <div className="padm-kpi-card">
          <div className="padm-kpi-icone" style={{ backgroundColor: '#f3e6ff', color: '#8e44ad' }}>
            <Building2 size={24} />
          </div>
          <div className="padm-kpi-info">
            <span>ONGs Parceiras</span>
            <strong>342</strong>
          </div>
        </div>

        <div className="padm-kpi-card padm-kpi-destaque">
          <div className="padm-kpi-icone" style={{ backgroundColor: '#ffecd6', color: '#e67e22' }}>
            <AlertCircle size={24} />
          </div>
          <div className="padm-kpi-info">
            <span>Ações Pendentes</span>
            <strong>12</strong>
          </div>
        </div>
      </section>

      {/* D. ÁREA DE GRÁFICOS ANALÍTICOS */}
      {/* D. ÁREA DE GRÁFICOS ANALÍTICOS (AGORA COM RECHARTS) */}
      <section className="padm-graficos-grid">
        
        {/* GRÁFICO DE LINHA */}
        <div className="padm-card-grafico padm-grafico-largo">
          <div className="padm-card-cabecalho">
            <h3>Curva de Engajamento Diário</h3>
            <Activity size={18} color="#7f8c8d" />
          </div>
          
          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <ResponsiveContainer>
              <LineChart data={dadosEngajamento} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3f5" />
                <XAxis 
                  dataKey="dia" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#7f8c8d', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#7f8c8d', fontSize: 12 }} 
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#7f8c8d', fontSize: 12 }} 
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="doacoes" 
                  name="Doações (R$)"
                  stroke="#0056d2" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="acessos" 
                  name="Acessos"
                  stroke="#2ecc71" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO DE ROSCA */}
        <div className="padm-card-grafico">
          <div className="padm-card-cabecalho">
            <h3>Métodos de Pagamento</h3>
          </div>
          
          <div style={{ width: '100%', height: 220, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dadosPagamento}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="valor"
                  stroke="none"
                >
                  {dadosPagamento.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`${value}%`, 'Utilização']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="padm-rosca-legendas" style={{ marginTop: 'auto' }}>
            {dadosPagamento.map((item, index) => (
              <span key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i style={{ background: item.cor, width: '12px', height: '12px', borderRadius: '50%', marginRight: '10px' }}></i> 
                  {item.nome}
                </div>
                <strong>{item.valor}%</strong>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* E. TABELA DE ATIVIDADES RECENTES (LOG DE AUDITORIA) */}
      <section className="padm-tabela-section">
        <div className="padm-card-cabecalho">
          <h3>Log de Auditoria de Sistema</h3>
          <button className="padm-btn-link">Ver todos <ChevronRight size={16}/></button>
        </div>
        <div className="padm-tabela-container">
          <table className="padm-tabela">
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Evento</th>
                <th>Usuário / Alvo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((item) => (
                <tr key={item.id}>
                  <td className="padm-td-data">{item.data}</td>
                  <td className="padm-td-evento">{item.evento}</td>
                  <td className="padm-td-usuario">{item.usuario}</td>
                  <td>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default PainelAdmin;