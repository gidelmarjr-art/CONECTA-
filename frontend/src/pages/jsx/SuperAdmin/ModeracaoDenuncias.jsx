import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiCheckCircle,
  FiArchive,
  FiAlertTriangle
} from 'react-icons/fi';
import '../../css/SuperAdmin/ModeracaoDenuncias.css'; 

// Dados simulados de denúncias
const mockDenuncias = [
  { id: "DEN-001", denunciado: "Ação Verde Brasil (ONG)", denunciante: "Mariana Souza", motivo: "Informações Falsas", data: "05/03/2024", status: "Pendente" },
  { id: "DEN-002", denunciado: "Carlos Eduardo Silva", denunciante: "Instituto Esperança", motivo: "Comportamento Inadequado", data: "08/03/2024", status: "Em Análise" },
  { id: "DEN-003", denunciado: "SOS Animais de Rua (ONG)", denunciante: "Rafael Costa", motivo: "Suspeita de Fraude", data: "10/03/2024", status: "Resolvido" },
  { id: "DEN-004", denunciado: "Ana Carolina Dias", denunciante: "Anônimo", motivo: "Spam / Mensagens em Massa", data: "12/03/2024", status: "Pendente" },
  { id: "DEN-005", denunciado: "Educação Para Todos (ONG)", denunciante: "Juliana Ferreira", motivo: "Vaga Inexistente", data: "14/03/2024", status: "Resolvido" },
];

const ModeracaoDenuncias = () => {
  const [denuncias, setDenuncias] = useState(mockDenuncias);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");

  // Funções de ação do Superadmin
  const handleAnalisar = (id) => {
    setDenuncias(denuncias.map(den => den.id === id ? { ...den, status: "Em Análise" } : den));
  };

  const handleResolver = (id) => {
    if(window.confirm(`Tem a certeza que deseja marcar a denúncia ${id} como RESOLVIDA?`)) {
      setDenuncias(denuncias.map(den => den.id === id ? { ...den, status: "Resolvido" } : den));
    }
  };

  const handleArquivar = (id) => {
    if(window.confirm(`Deseja ARQUIVAR a denúncia ${id}? Ela não aparecerá mais nos pendentes.`)) {
      setDenuncias(denuncias.filter(den => den.id !== id));
    }
  };

  // Filtragem dos dados
  const filteredDenuncias = denuncias.filter(den => {
    const matchesSearch = den.denunciado.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          den.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          den.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todas" || den.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Função auxiliar para renderizar a cor do status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Resolvido': return <span className="status-badge badge-resolvido">Resolvido</span>;
      case 'Em Análise': return <span className="status-badge badge-analise">Em Análise</span>;
      case 'Pendente': return <span className="status-badge badge-pendente">Pendente</span>;
      default: return <span className="status-badge">Desconhecido</span>;
    }
  };

  return (
    <div className="sa-page-wrapper">
      
      {/* Cabeçalho da Página */}
      <div className="sa-header">
        <div>
          <h1 className="sa-title">Moderação e Denúncias</h1>
          <p className="sa-subtitle">Analise e resolva as denúncias reportadas pelos utilizadores da plataforma.</p>
        </div>
        
        <div className="sa-header-stats">
          <div className="sa-stat-card">
            <span className="sa-stat-value">{denuncias.length}</span>
            <span className="sa-stat-label">Total de Registos</span>
          </div>
          <div className="sa-stat-card highlight-danger">
            <span className="sa-stat-value">{denuncias.filter(d => d.status === 'Pendente').length}</span>
            <span className="sa-stat-label">Aguardam Ação</span>
          </div>
        </div>
      </div>

      {/* Controles: Pesquisa e Filtros */}
      <div className="sa-controls-container">
        <div className="sa-search-box">
          <FiSearch className="sa-search-icon" />
          <input 
            type="text" 
            placeholder="Pesquise por ID, denunciado ou motivo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sa-filter-group">
          <FiFilter className="sa-filter-icon" />
          <button className={`sa-filter-btn ${statusFilter === 'Todas' ? 'active' : ''}`} onClick={() => setStatusFilter('Todas')}>Todas</button>
          <button className={`sa-filter-btn ${statusFilter === 'Pendente' ? 'active' : ''}`} onClick={() => setStatusFilter('Pendente')}>Pendentes</button>
          <button className={`sa-filter-btn ${statusFilter === 'Em Análise' ? 'active' : ''}`} onClick={() => setStatusFilter('Em Análise')}>Em Análise</button>
          <button className={`sa-filter-btn ${statusFilter === 'Resolvido' ? 'active' : ''}`} onClick={() => setStatusFilter('Resolvido')}>Resolvidas</button>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="sa-table-card">
        <div className="table-responsive">
          <table className="sa-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Denunciado(a)</th>
                <th>Motivo</th>
                <th>Denunciante</th>
                <th>Data</th>
                <th>Status</th>
                <th className="text-right">Ações</th> {/* Alinhado à direita */}
              </tr>
            </thead>
            <tbody>
              {filteredDenuncias.length > 0 ? (
                filteredDenuncias.map((den) => (
                  <tr key={den.id}>
                    <td className="font-medium text-muted">{den.id}</td>
                    <td className="font-medium">{den.denunciado}</td>
                    <td><span className="denuncia-motivo"><FiAlertTriangle className="icon-motivo" /> {den.motivo}</span></td>
                    <td>{den.denunciante}</td>
                    <td>{den.data}</td>
                    <td>{getStatusBadge(den.status)}</td>
                    <td>
                      <div className="sa-action-buttons"> {/* Flex-end no CSS */}
                        <button className="btn-icon-action btn-view" title="Ver Detalhes do Caso">
                          <FiEye />
                        </button>
                        
                        {den.status === 'Pendente' && (
                          <button className="btn-icon-action btn-analise" title="Colocar em Análise" onClick={() => handleAnalisar(den.id)}>
                            <FiSearch />
                          </button>
                        )}

                        {den.status !== 'Resolvido' && (
                          <button className="btn-icon-action btn-approve" title="Marcar como Resolvido" onClick={() => handleResolver(den.id)}>
                            <FiCheckCircle />
                          </button>
                        )}
                        
                        <button className="btn-icon-action btn-archive" title="Arquivar Denúncia" onClick={() => handleArquivar(den.id)}>
                          <FiArchive />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="sa-empty-state">
                    <p>Nenhuma denúncia encontrada com os filtros atuais.</p>
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

export default ModeracaoDenuncias;