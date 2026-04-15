import React, { useState } from 'react';
import { 
  Search, Filter, Check, X, MessageSquare, 
  Eye, User, Briefcase, Star, Clock 
} from 'lucide-react';
import '../css/Candidatos.css';

const Candidatos = () => {

  //Inicio de dados estáticos para teste
  const [candidatos] = useState([
    {
      id: 1,
      nome: "Ana Beatriz Silva",
      vaga: "Professor(a) de Reforço Escolar",
      data: "Há 2 horas",
      status: "pendente",
      match: 95,
      habilidades: ["Matemática", "Didática", "Paciência"]
    },
    {
      id: 2,
      nome: "Carlos Eduardo Mendes",
      vaga: "Designer Gráfico para Redes Sociais",
      data: "Ontem",
      status: "aprovado",
      match: 88,
      habilidades: ["Photoshop", "Illustrator", "Criatividade"]
    },
    {
      id: 3,
      nome: "Juliana Costa",
      vaga: "Professor(a) de Reforço Escolar",
      data: "Há 2 dias",
      status: "pendente",
      match: 60,
      habilidades: ["História", "Leitura"]
    },
    {
      id: 4,
      nome: "Marcos Vinícius",
      vaga: "Desenvolvedor(a) Web",
      data: "Há 3 dias",
      status: "recusado",
      match: 45,
      habilidades: ["Excel", "Atendimento"]
    }
  ]);

  
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'pendente': 
        return <span className="pong-cand-badge pong-cand-badge-pendente"><Clock size={14}/> Em Análise</span>;
      case 'aprovado': 
        return <span className="pong-cand-badge pong-cand-badge-aprovado"><Check size={14}/> Aprovado</span>;
      case 'recusado': 
        return <span className="pong-cand-badge pong-cand-badge-recusado"><X size={14}/> Recusado</span>;
      default: 
        return null;
    }
  };
//fim dos dados estáticos
  
  return (
    <div className="pong-cand-container">
      
      <header className="pong-cand-header">
        <div className="pong-cand-titulos">
          <h1>Análise de Candidatos</h1>
          <p>Avalie os voluntários inscritos e gerencie sua equipe de impacto.</p>
        </div>
      </header>

      <section className="pong-cand-kpis">
        <div className="pong-cand-kpi-card">
          <span>Total Inscritos</span>
          <strong>142</strong>
        </div>
        <div className="pong-cand-kpi-card destaque-amarelo">
          <span>Aguardando Análise</span>
          <strong>49</strong>
        </div>
        <div className="pong-cand-kpi-card destaque-verde">
          <span>Aprovados (Mês)</span>
          <strong>18</strong>
        </div>
      </section>

      <section className="pong-cand-controles">
        <div className="pong-cand-busca">
          <Search size={18} color="#7f8c8d" />
          <input type="text" placeholder="Buscar candidato por nome..." />
        </div>
        
        <div className="pong-cand-filtros-grupo">
          <select className="pong-cand-select">
            <option value="">Todas as Vagas</option>
            <option value="1">Professor de Reforço</option>
            <option value="2">Designer Gráfico</option>
          </select>
          
          <select className="pong-cand-select">
            <option value="">Todos os Status</option>
            <option value="pendente">Em Análise</option>
            <option value="aprovado">Aprovados</option>
            <option value="recusado">Recusados</option>
          </select>
        </div>
      </section>

      <section className="pong-cand-lista">
        {candidatos.map((cand) => (
          <article className="pong-cand-card-linha" key={cand.id}>
            
            <div className="pong-cand-perfil">
              <div className="pong-cand-avatar">
                <User size={24} color="#0056d2" />
              </div>
              <div className="pong-cand-info">
                <h3>{cand.nome}</h3>
                <span className="pong-cand-vaga-alvo">
                  <Briefcase size={14} /> {cand.vaga}
                </span>
                <span className="pong-cand-data">Inscrito {cand.data}</span>
              </div>
            </div>

            <div className="pong-cand-skills-area">
              <div className="pong-cand-match" title="Compatibilidade com a vaga">
                <Star size={16} color={cand.match >= 80 ? "#f1c40f" : "#bdc3c7"} />
                <strong>{cand.match}% Match</strong>
              </div>
              <div className="pong-cand-tags">
                {cand.habilidades.map((hab, index) => (
                  <span key={index} className="pong-cand-tag">{hab}</span>
                ))}
              </div>
            </div>

            <div className="pong-cand-status-area">
              {renderStatusBadge(cand.status)}
            </div>

            <div className="pong-cand-acoes">
              <button className="btn-acao btn-chat" title="Enviar Mensagem">
                <MessageSquare size={18} />
              </button>
              <button className="btn-acao btn-perfil" title="Ver Perfil Completo">
                <Eye size={18} />
              </button>
            
              {cand.status === 'pendente' && (
                <>
                  <div className="pong-cand-divisor-acoes"></div>
                  <button className="btn-acao btn-recusar" title="Recusar">
                    <X size={20} />
                  </button>
                  <button className="btn-acao btn-aprovar" title="Aprovar">
                    <Check size={20} />
                  </button>
                </>
              )}
            </div>

          </article>
        ))}
      </section>

    </div>
  );
};

export default Candidatos;
