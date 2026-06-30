import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiDownload,
  FiShield
} from 'react-icons/fi';
import '../../css/SuperAdmin/LogAuditoria.css'; 

// Dados simulados para o Log de Auditoria
const mockLogs = [
  { id: "LOG-1042", dataHora: "15/03/2024 14:32:10", utilizador: "Admin Principal", acao: "Apagar", detalhes: "Eliminou a ONG 'SOS Animais'", ip: "192.168.1.45" },
  { id: "LOG-1041", dataHora: "15/03/2024 13:15:00", utilizador: "Mariana Souza (Voluntária)", acao: "Login", detalhes: "Sessão iniciada com sucesso", ip: "85.240.12.99" },
  { id: "LOG-1040", dataHora: "15/03/2024 11:20:05", utilizador: "Instituto Esperança", acao: "Criar", detalhes: "Publicou uma nova vaga: 'Professor de Inglês'", ip: "177.32.44.12" },
  { id: "LOG-1039", dataHora: "14/03/2024 18:45:22", utilizador: "Sistema", acao: "Alerta", detalhes: "Tentativa de login falhada múltiplas vezes (IP: 45.12.8.20)", ip: "45.12.8.20" },
  { id: "LOG-1038", dataHora: "14/03/2024 09:10:00", utilizador: "Admin Secundário", acao: "Editar", detalhes: "Alterou as permissões do utilizador ID 452", ip: "192.168.1.50" },
];

const LogAuditoria = () => {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Todos");

  // Filtragem dos dados
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.utilizador.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.detalhes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.ip.includes(searchTerm);
    const matchesType = filterType === "Todos" || log.acao === filterType;
    
    return matchesSearch && matchesType;
  });

  // Função auxiliar para renderizar a cor da badge da ação
  const getActionBadge = (acao) => {
    switch(acao) {
      case 'Criar': return <span className="status-badge badge-criar">Criar</span>;
      case 'Editar': return <span className="status-badge badge-editar">Editar</span>;
      case 'Apagar': return <span className="status-badge badge-apagar">Apagar</span>;
      case 'Login': return <span className="status-badge badge-login">Login</span>;
      case 'Alerta': return <span className="status-badge badge-alerta">Alerta de Segurança</span>;
      default: return <span className="status-badge">Desconhecido</span>;
    }
  };

  const handleExport = () => {
    alert("O relatório de logs está a ser gerado em formato CSV/PDF e o download começará em breve.");
  };

  const handleViewDetails = (id) => {
    alert(`A exibir detalhes técnicos do registo ${id}...\n(Abriria um modal com os dados brutos JSON)`);
  };

  return (
    <div className="sa-page-wrapper">
      
      {/* Cabeçalho da Página */}
      <div className="sa-header">
        <div>
          <h1 className="sa-title">Log de Auditoria</h1>
          <p className="sa-subtitle">Monitorize todas as ações, acessos e eventos de segurança do sistema.</p>
        </div>
        
        <div className="sa-header-stats">
          <div className="sa-stat-card">
            <span className="sa-stat-value">{logs.length}</span>
            <span className="sa-stat-label">Eventos Registados</span>
          </div>
          <div className="sa-stat-card highlight-security">
            <span className="sa-stat-value">{logs.filter(l => l.acao === 'Alerta').length}</span>
            <span className="sa-stat-label">Alertas de Segurança</span>
          </div>
          <button className="sa-btn-primary" onClick={handleExport}>
            <FiDownload className="btn-icon" /> Exportar Relatório
          </button>
        </div>
      </div>

      {/* Controles: Pesquisa e Filtros */}
      <div className="sa-controls-container">
        <div className="sa-search-box">
          <FiSearch className="sa-search-icon" />
          <input 
            type="text" 
            placeholder="Pesquise por utilizador, detalhes ou IP..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sa-filter-group">
          <FiFilter className="sa-filter-icon" />
          <button className={`sa-filter-btn ${filterType === 'Todos' ? 'active' : ''}`} onClick={() => setFilterType('Todos')}>Todos</button>
          <button className={`sa-filter-btn ${filterType === 'Login' ? 'active' : ''}`} onClick={() => setFilterType('Login')}>Logins</button>
          <button className={`sa-filter-btn ${filterType === 'Criar' ? 'active' : ''}`} onClick={() => setFilterType('Criar')}>Criações</button>
          <button className={`sa-filter-btn ${filterType === 'Alerta' ? 'active' : ''}`} onClick={() => setFilterType('Alerta')}><FiShield className="inline-icon"/> Alertas</button>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="sa-table-card">
        <div className="table-responsive">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Data / Hora</th>
                <th>Utilizador</th>
                <th>Ação</th>
                <th>Detalhes da Ação</th>
                <th>Endereço IP</th>
                <th className="text-right">Ações</th> {/* Alinhado à direita */}
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="text-muted font-medium">{log.dataHora}</td>
                    <td className="font-medium">{log.utilizador}</td>
                    <td>{getActionBadge(log.acao)}</td>
                    <td className="log-details-text">{log.detalhes}</td>
                    <td className="text-muted font-mono">{log.ip}</td>
                    <td>
                      <div className="sa-action-buttons"> {/* Flex-end no CSS */}
                        <button className="btn-icon-action btn-view" title="Ver Detalhes do Registo" onClick={() => handleViewDetails(log.id)}>
                          <FiEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="sa-empty-state">
                    <p>Nenhum registo de auditoria encontrado com os filtros atuais.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LogAuditoria;