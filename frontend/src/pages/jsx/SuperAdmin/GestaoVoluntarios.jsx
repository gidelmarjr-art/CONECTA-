import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiTrash2,
  FiSlash,
  FiCheckCircle
} from 'react-icons/fi';
import '../../css/SuperAdmin/GestaoVoluntarios.css'; 

// Dados simulados para o Superadmin
const mockVoluntarios = [
  { id: 1, nome: "Ana Carolina Dias", email: "ana.dias@email.com", interesses: "Educação, Artes", dataCadastro: "12/01/2024", status: "Ativo" },
  { id: 2, nome: "Carlos Eduardo Silva", email: "carlos.silva@email.com", interesses: "Saúde, Idosos", dataCadastro: "25/01/2024", status: "Inativo" },
  { id: 3, nome: "Mariana Souza", email: "mari.souza@email.com", interesses: "Meio Ambiente", dataCadastro: "03/02/2024", status: "Ativo" },
  { id: 4, nome: "Rafael Costa Mendes", email: "rafael.cm@email.com", interesses: "Tecnologia, Gestão", dataCadastro: "14/02/2024", status: "Suspenso" },
  { id: 5, nome: "Juliana Ferreira", email: "ju.ferreira@email.com", interesses: "Animais, Resgate", dataCadastro: "20/02/2024", status: "Ativo" },
];

const GestaoVoluntarios = () => {
  const [voluntarios, setVoluntarios] = useState(mockVoluntarios);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  // Funções de ação do Superadmin
  const handleAtivar = (id, nome) => {
    if(window.confirm(`Tem certeza que deseja REATIVAR o voluntário "${nome}"?`)) {
      setVoluntarios(voluntarios.map(vol => vol.id === id ? { ...vol, status: "Ativo" } : vol));
    }
  };

  const handleSuspender = (id, nome) => {
    if(window.confirm(`Tem certeza que deseja SUSPENDER o voluntário "${nome}"? Ele perderá acesso à plataforma.`)) {
      setVoluntarios(voluntarios.map(vol => vol.id === id ? { ...vol, status: "Suspenso" } : vol));
    }
  };

  const handleExcluir = (id, nome) => {
    if(window.confirm(`ATENÇÃO: Deseja EXCLUIR permanentemente o voluntário "${nome}" do sistema?`)) {
      setVoluntarios(voluntarios.filter(vol => vol.id !== id));
    }
  };

  // Filtragem dos dados
  const filteredVoluntarios = voluntarios.filter(vol => {
    const matchesSearch = vol.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vol.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vol.interesses.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || vol.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Função auxiliar para renderizar a cor do status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Ativo': return <span className="status-badge badge-ativo">Ativo</span>;
      case 'Inativo': return <span className="status-badge badge-inativo">Inativo</span>;
      case 'Suspenso': return <span className="status-badge badge-suspenso">Suspenso</span>;
      default: return <span className="status-badge">Desconhecido</span>;
    }
  };

  return (
    <div className="sa-page-wrapper">
      
      {/* Cabeçalho da Página */}
      <div className="sa-header">
        <div>
          <h1 className="sa-title">Gestão de Voluntários</h1>
          <p className="sa-subtitle">Analise, faça a gestão de acessos e acompanhe os utilizadores da plataforma.</p>
        </div>
        
        <div className="sa-header-stats">
          <div className="sa-stat-card">
            <span className="sa-stat-value">{voluntarios.length}</span>
            <span className="sa-stat-label">Total Registado</span>
          </div>
          <div className="sa-stat-card highlight-active">
            <span className="sa-stat-value">{voluntarios.filter(v => v.status === 'Ativo').length}</span>
            <span className="sa-stat-label">Voluntários Ativos</span>
          </div>
        </div>
      </div>

      {/* Controles: Pesquisa e Filtros */}
      <div className="sa-controls-container">
        <div className="sa-search-box">
          <FiSearch className="sa-search-icon" />
          <input 
            type="text" 
            placeholder="Pesquise por nome, e-mail ou interesse..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sa-filter-group">
          <FiFilter className="sa-filter-icon" />
          <button className={`sa-filter-btn ${statusFilter === 'Todos' ? 'active' : ''}`} onClick={() => setStatusFilter('Todos')}>Todos</button>
          <button className={`sa-filter-btn ${statusFilter === 'Ativo' ? 'active' : ''}`} onClick={() => setStatusFilter('Ativo')}>Ativos</button>
          <button className={`sa-filter-btn ${statusFilter === 'Inativo' ? 'active' : ''}`} onClick={() => setStatusFilter('Inativo')}>Inativos</button>
          <button className={`sa-filter-btn ${statusFilter === 'Suspenso' ? 'active' : ''}`} onClick={() => setStatusFilter('Suspenso')}>Suspensos</button>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="sa-table-card">
        <div className="table-responsive">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Nome do Voluntário</th>
                <th>E-mail</th>
                <th>Interesses / Habilidades</th>
                <th>Data de Registo</th>
                <th>Status</th>
                <th className="text-right">Ações</th> {/* Alinhado à direita */}
              </tr>
            </thead>
            <tbody>
              {filteredVoluntarios.length > 0 ? (
                filteredVoluntarios.map((vol) => (
                  <tr key={vol.id}>
                    <td className="font-medium">{vol.nome}</td>
                    <td><span className="text-muted">{vol.email}</span></td>
                    <td>{vol.interesses}</td>
                    <td>{vol.dataCadastro}</td>
                    <td>{getStatusBadge(vol.status)}</td>
                    <td>
                      <div className="sa-action-buttons"> {/* Flex-end no CSS */}
                        <button className="btn-icon-action btn-view" title="Ver Perfil Completo">
                          <FiEye />
                        </button>
                        
                        {vol.status === 'Suspenso' ? (
                          <button className="btn-icon-action btn-approve" title="Reativar Utilizador" onClick={() => handleAtivar(vol.id, vol.nome)}>
                            <FiCheckCircle />
                          </button>
                        ) : (
                          <button className="btn-icon-action btn-suspend" title="Suspender Utilizador" onClick={() => handleSuspender(vol.id, vol.nome)}>
                            <FiSlash />
                          </button>
                        )}
                        
                        <button className="btn-icon-action btn-delete" title="Excluir Conta" onClick={() => handleExcluir(vol.id, vol.nome)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="sa-empty-state">
                    <p>Nenhum voluntário encontrado com os filtros atuais.</p>
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

export default GestaoVoluntarios;