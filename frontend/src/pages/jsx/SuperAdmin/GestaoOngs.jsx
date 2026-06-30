import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiTrash2,
  FiMoreVertical
} from 'react-icons/fi';
import '../../css/SuperAdmin/GestaoOng.css'; // Ajuste o caminho conforme seu projeto

// Dados simulados para o Superadmin
const mockOngs = [
  { id: 1, nome: "Instituto Esperança", cnpj: "12.345.678/0001-90", email: "contato@esperanca.org", dataCadastro: "10/10/2023", status: "Aprovada" },
  { id: 2, nome: "Ação Verde Brasil", cnpj: "98.765.432/0001-10", email: "verde@acaobrasil.br", dataCadastro: "15/10/2023", status: "Pendente" },
  { id: 3, nome: "Crianças do Futuro", cnpj: "45.123.890/0001-55", email: "diretoria@futuro.org", dataCadastro: "02/11/2023", status: "Aprovada" },
  { id: 4, nome: "SOS Animais de Rua", cnpj: "33.444.555/0001-22", email: "resgate@sosanimais.com", dataCadastro: "20/11/2023", status: "Suspensa" },
  { id: 5, nome: "Educação Para Todos", cnpj: "11.222.333/0001-44", email: "contato@educatodos.org", dataCadastro: "01/12/2023", status: "Pendente" },
];

const GestaoOngs = () => {
  const [ongs, setOngs] = useState(mockOngs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");

  // Funções de ação do Superadmin
  const handleAprovar = (id, nome) => {
    if(window.confirm(`Tem certeza que deseja APROVAR a ONG "${nome}"?`)) {
      setOngs(ongs.map(ong => ong.id === id ? { ...ong, status: "Aprovada" } : ong));
    }
  };

  const handleSuspender = (id, nome) => {
    if(window.confirm(`Tem certeza que deseja SUSPENDER a ONG "${nome}"?`)) {
      setOngs(ongs.map(ong => ong.id === id ? { ...ong, status: "Suspensa" } : ong));
    }
  };

  const handleExcluir = (id, nome) => {
    if(window.confirm(`ATENÇÃO: Deseja EXCLUIR permanentemente a ONG "${nome}" do sistema?`)) {
      setOngs(ongs.filter(ong => ong.id !== id));
    }
  };

  // Filtragem dos dados
  const filteredOngs = ongs.filter(ong => {
    const matchesSearch = ong.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ong.cnpj.includes(searchTerm) ||
                          ong.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todas" || ong.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Função auxiliar para renderizar a cor do status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Aprovada': return <span className="status-badge badge-aprovada">Aprovada</span>;
      case 'Pendente': return <span className="status-badge badge-pendente">Pendente</span>;
      case 'Suspensa': return <span className="status-badge badge-suspensa">Suspensa</span>;
      default: return <span className="status-badge">Desconhecido</span>;
    }
  };

  return (
    <div className="sa-page-wrapper">
      
      {/* Cabeçalho da Página */}
      <div className="sa-header">
        <div>
          <h1 className="sa-title">Gestão de ONGs</h1>
          <p className="sa-subtitle">Analise, aprove e gerencie as instituições cadastradas na plataforma.</p>
        </div>
        
        <div className="sa-header-stats">
          <div className="sa-stat-card">
            <span className="sa-stat-value">{ongs.length}</span>
            <span className="sa-stat-label">Total Cadastrado</span>
          </div>
          <div className="sa-stat-card highlight-pending">
            <span className="sa-stat-value">{ongs.filter(o => o.status === 'Pendente').length}</span>
            <span className="sa-stat-label">Aguardando Análise</span>
          </div>
        </div>
      </div>

      {/* Controles: Pesquisa e Filtros */}
      <div className="sa-controls-container">
        <div className="sa-search-box">
          <FiSearch className="sa-search-icon" />
          <input 
            type="text" 
            placeholder="Pesquise por nome, CNPJ ou e-mail..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sa-filter-group">
          <FiFilter className="sa-filter-icon" />
          <button className={`sa-filter-btn ${statusFilter === 'Todas' ? 'active' : ''}`} onClick={() => setStatusFilter('Todas')}>Todas</button>
          <button className={`sa-filter-btn ${statusFilter === 'Pendente' ? 'active' : ''}`} onClick={() => setStatusFilter('Pendente')}>Pendentes</button>
          <button className={`sa-filter-btn ${statusFilter === 'Aprovada' ? 'active' : ''}`} onClick={() => setStatusFilter('Aprovada')}>Aprovadas</button>
          <button className={`sa-filter-btn ${statusFilter === 'Suspensa' ? 'active' : ''}`} onClick={() => setStatusFilter('Suspensa')}>Suspensas</button>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="sa-table-card">
        <div className="table-responsive">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Nome da ONG</th>
                <th>CNPJ</th>
                <th>Contato</th>
                <th>Data de Cadastro</th>
                <th>Status</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOngs.length > 0 ? (
                filteredOngs.map((ong) => (
                  <tr key={ong.id}>
                    <td className="font-medium">{ong.nome}</td>
                    <td>{ong.cnpj}</td>
                    <td><span className="text-muted">{ong.email}</span></td>
                    <td>{ong.dataCadastro}</td>
                    <td>{getStatusBadge(ong.status)}</td>
                    <td>
                      <div className="sa-action-buttons">
                        <button className="btn-icon-action btn-view" title="Ver Detalhes">
                          <FiEye />
                        </button>
                        
                        {ong.status !== 'Aprovada' && (
                          <button className="btn-icon-action btn-approve" title="Aprovar ONG" onClick={() => handleAprovar(ong.id, ong.nome)}>
                            <FiCheckCircle />
                          </button>
                        )}
                        
                        {ong.status !== 'Suspensa' && (
                          <button className="btn-icon-action btn-suspend" title="Suspender ONG" onClick={() => handleSuspender(ong.id, ong.nome)}>
                            <FiXCircle />
                          </button>
                        )}
                        
                        <button className="btn-icon-action btn-delete" title="Excluir ONG" onClick={() => handleExcluir(ong.id, ong.nome)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="sa-empty-state">
                    <p>Nenhuma ONG encontrada com os filtros atuais.</p>
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

export default GestaoOngs;