import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MapPin, Calendar, 
  Users, MoreVertical, Edit2, PauseCircle, CheckCircle, Trash2 
} from 'lucide-react';
import '../css/GestaoDeVagas.css';

const GestaoVagas = () => {
  // Mock de dados das vagas criadas pela ONG
  const [vagas] = useState([
    {
      id: 1,
      titulo: "Professor(a) de Reforço Escolar",
      local: "Presencial - Zona Sul",
      data: "Criado em 10/04/2026",
      status: "ativa",
      candidatos: 12,
      descricao: "Buscamos voluntários para dar aulas de matemática e português para crianças do 1º ao 5º ano."
    },
    {
      id: 2,
      titulo: "Designer Gráfico para Redes Sociais",
      local: "Trabalho Remoto",
      data: "Criado em 08/04/2026",
      status: "ativa",
      candidatos: 5,
      descricao: "Criação de artes para nossas campanhas de arrecadação no Instagram e Facebook."
    },
    {
      id: 3,
      titulo: "Organizador de Evento Beneficente",
      local: "Presencial - Centro",
      data: "Criado em 01/04/2026",
      status: "pausada",
      candidatos: 24,
      descricao: "Auxílio na logística, montagem e recepção do nosso jantar beneficente anual."
    },
    {
      id: 4,
      titulo: "Desenvolvedor(a) Web (Manutenção)",
      local: "Trabalho Remoto",
      data: "Criado em 15/03/2026",
      status: "encerrada",
      candidatos: 8,
      descricao: "Precisamos de ajuda para atualizar o nosso site institucional em WordPress."
    }
  ]);

  // Função auxiliar para definir as cores e textos das tags de status
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'ativa': 
        return <span className="pong-vagas-badge pong-vagas-badge-ativa"><CheckCircle size={14}/> Ativa</span>;
      case 'pausada': 
        return <span className="pong-vagas-badge pong-vagas-badge-pausada"><PauseCircle size={14}/> Pausada</span>;
      case 'encerrada': 
        return <span className="pong-vagas-badge pong-vagas-badge-encerrada"><CheckCircle size={14}/> Encerrada</span>;
      default: 
        return null;
    }
  };

  return (
    <div className="pong-vagas-container">
      
      {/* CABEÇALHO DA PÁGINA */}
      <header className="pong-vagas-header">
        <div className="pong-vagas-titulos">
          <h1>Gestão de Vagas</h1>
          <p>Acompanhe e gerencie as oportunidades de voluntariado da sua ONG.</p>
        </div>
        <button className="pong-vagas-btn-primario">
          <Plus size={20} />
          <span>Nova Vaga</span>
        </button>
      </header>

      {/* MÉTRICAS RÁPIDAS (KPIs) */}
      <section className="pong-vagas-kpis">
        <div className="pong-vagas-kpi-card">
          <span>Total de Vagas</span>
          <strong>24</strong>
        </div>
        <div className="pong-vagas-kpi-card destaque-verde">
          <span>Vagas Ativas</span>
          <strong>8</strong>
        </div>
        <div className="pong-vagas-kpi-card destaque-azul">
          <span>Candidatos Pendentes</span>
          <strong>49</strong>
        </div>
      </section>

      {/* BARRA DE PESQUISA E FILTROS */}
      <section className="pong-vagas-controles">
        <div className="pong-vagas-busca">
          <Search size={18} color="#7f8c8d" />
          <input type="text" placeholder="Buscar vaga por título ou palavra-chave..." />
        </div>
        <button className="pong-vagas-btn-filtro">
          <Filter size={18} />
          Filtrar por Status
        </button>
      </section>

      {/* GRID DE CARDS DE VAGAS */}
      <section className="pong-vagas-grid">
        {vagas.map((vaga) => (
          <div className="pong-vagas-card" key={vaga.id}>
            
            <div className="pong-vagas-card-header">
              {renderStatusBadge(vaga.status)}
              <button className="pong-vagas-btn-opcoes" title="Opções da vaga">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="pong-vagas-card-body">
              <h3>{vaga.titulo}</h3>
              <div className="pong-vagas-infos">
                <span><MapPin size={16} /> {vaga.local}</span>
                <span><Calendar size={16} /> {vaga.data}</span>
              </div>
              <p className="pong-vagas-descricao">{vaga.descricao}</p>
            </div>

            <div className="pong-vagas-card-footer">
              <div className="pong-vagas-candidatos">
                <Users size={18} />
                <strong>{vaga.candidatos}</strong> candidatos
              </div>
              <button className="pong-vagas-btn-secundario">
                Ver Detalhes
              </button>
            </div>

            {/* Hover Menu Oculto (Aparece ao passar o mouse para ações rápidas) */}
            <div className="pong-vagas-acoes-hover">
              <button title="Editar Vaga"><Edit2 size={18}/></button>
              {vaga.status === 'ativa' && <button title="Pausar Vaga"><PauseCircle size={18}/></button>}
              <button title="Excluir" className="btn-deletar"><Trash2 size={18}/></button>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
};

export default GestaoVagas;