import React, { useState } from 'react';
import { 
  Bookmark, Building, MapPin, Calendar, 
  Clock, CheckCircle, XCircle, Eye, Trash2 
} from 'lucide-react';
import '../css/MinhasInscricoes.css';

const MinhasInscricoes = () => {
  const [filtroAtivo, setFiltroAtivo] = useState('TODAS');

  // MOCK DE DADOS: Simulando as inscrições do voluntário
  const inscricoesMock = [
    {
      id: 1,
      vaga: 'Professor(a) de Matemática Básica',
      ong: 'Instituto Esperança',
      local: 'São Paulo, SP (Presencial)',
      dataInscricao: '12/10/2025',
      status: 'APROVADO',
      descricao: 'Apoio escolar para turmas do 6º ao 9º ano aos sábados de manhã.'
    },
    {
      id: 2,
      vaga: 'Desenvolvedor(a) Web Front-end',
      ong: 'ONG Code For All',
      local: 'Remoto',
      dataInscricao: '14/10/2025',
      status: 'PENDENTE',
      descricao: 'Criação de landing pages para campanhas de arrecadação de fundos.'
    },
    {
      id: 3,
      vaga: 'Voluntário para Triagem de Roupas',
      ong: 'Ação Solidária de Inverno',
      local: 'Curitiba, PR (Presencial)',
      dataInscricao: '05/09/2025',
      status: 'CONCLUIDO',
      descricao: 'Organização e separação das doações da campanha de agasalho.'
    },
    {
      id: 4,
      vaga: 'Social Media',
      ong: 'Amparo Animal',
      local: 'Remoto',
      dataInscricao: '01/10/2025',
      status: 'CANCELADO',
      descricao: 'Criação de posts para o Instagram focados em adoção responsável.'
    }
  ];

  // Filtra as inscrições com base na aba selecionada
  const inscricoesFiltradas = inscricoesMock.filter(inscricao => {
    if (filtroAtivo === 'TODAS') return true;
    return inscricao.status === filtroAtivo;
  });

  // Função auxiliar para renderizar o Status com cor e ícone correto
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'APROVADO':
        return <span className="inscricoes-badge aprovado"><CheckCircle size={14} /> Aprovado</span>;
      case 'PENDENTE':
        return <span className="inscricoes-badge pendente"><Clock size={14} /> Em Análise</span>;
      case 'CONCLUIDO':
        return <span className="inscricoes-badge concluido"><Bookmark size={14} /> Concluído</span>;
      case 'CANCELADO':
        return <span className="inscricoes-badge cancelado"><XCircle size={14} /> Cancelado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="inscricoes-container">
      
      {/* CABEÇALHO (Mesmo estilo do Perfil) */}
      <header className="inscricoes-header">
        <div className="inscricoes-titulos">
          <h1>Minhas Inscrições</h1>
          <p>Acompanhe o status das vagas de voluntariado que você se candidatou.</p>
        </div>
      </header>

      {/* ABAS DE FILTRO */}
      <div className="inscricoes-filtros">
        {['TODAS', 'PENDENTE', 'APROVADO', 'CONCLUIDO'].map(filtro => (
          <button 
            key={filtro}
            className={`btn-filtro ${filtroAtivo === filtro ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo(filtro)}
          >
            {filtro === 'TODAS' ? 'Todas' : 
             filtro === 'PENDENTE' ? 'Em Análise' : 
             filtro === 'APROVADO' ? 'Aprovadas' : 'Concluídas'}
          </button>
        ))}
      </div>

      {/* LISTA DE CARDS */}
      <div className="inscricoes-grid">
        {inscricoesFiltradas.length > 0 ? (
          inscricoesFiltradas.map((item) => (
            <div key={item.id} className="inscricao-card">
              
              <div className="inscricao-card-header">
                <h3>{item.vaga}</h3>
                {renderStatusBadge(item.status)}
              </div>
              
              <p className="inscricao-descricao">{item.descricao}</p>
              
              <div className="inscricao-infos">
                <div className="info-item">
                  <Building size={16} /> <span>{item.ong}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} /> <span>{item.local}</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} /> <span>Inscrito em: {item.dataInscricao}</span>
                </div>
              </div>

              <div className="inscricao-card-footer">
                <button className="btn-acao-outline">
                  <Eye size={16} /> Ver Detalhes da Vaga
                </button>
                
                {/* Só mostra botão de cancelar se estiver pendente ou recém aprovado */}
                {(item.status === 'PENDENTE' || item.status === 'APROVADO') && (
                  <button className="btn-acao-texto btn-cancelar">
                    <Trash2 size={16} /> Cancelar Inscrição
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="inscricoes-vazio">
            <Bookmark size={40} color="#bdc3c7" />
            <p>Nenhuma inscrição encontrada para este filtro.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MinhasInscricoes;