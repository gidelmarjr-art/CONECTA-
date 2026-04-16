import React from 'react';
import { 
  Briefcase, Clock, FileCheck, Award, 
  Download, Star, Target, Sparkles, 
  HeartHandshake, Flag
} from 'lucide-react';
import '../css/PainelVoluntario.css';

const PainelVoluntario = () => {
  // Mocks de dados
  const conquistas = [
    { id: 1, titulo: "Primeiro voluntariado", desc: "Sua jornada começou aqui!", xp: 20, ativo: true },
    { id: 2, titulo: "Mão na massa", desc: "5 campanhas concluídas", xp: 50, ativo: true },
    { id: 3, titulo: "Líder comunitário", desc: "Organizou um evento local", xp: 100, ativo: true },
    { id: 4, titulo: "Especialista em Ensino", desc: "50 horas ensinando jovens", xp: 150, ativo: false },
  ];

  const certificados = [
    { id: 1, titulo: "Certificado de Ensino", ong: "ONG Apoio Jovem", horas: 20, data: "15/10/2025" },
    { id: 2, titulo: "Apoio Ambiental", ong: "Verde Vida", horas: 15, data: "02/09/2025" },
    { id: 3, titulo: "Mentoria Tech", ong: "Code For All", horas: 10, data: "18/08/2025" },
  ];

  const metas = [
    { id: 1, titulo: "Completar 50 horas", atual: 24, total: 50, cor: "#27ae60" },
    { id: 2, titulo: "Ajudar 5 ONGs", atual: 2, total: 5, cor: "#007fb2" }
  ];

  return (
    <div className="pv-wrapper">
      
      {/* HEADER - Agora com o Azul do Conecta+ e Background Pattern */}
      <section className="pv-brand-header">
        <div className="pv-hero-main">
          <div className="pv-welcome">
            <div className="pv-badge-top"><Sparkles size={14} /> Trajetória de Impacto</div>
            <h1>Olá, <span className="text-highlight">User!</span></h1>
            <p>Você já impactou mais de <strong>200 pessoas</strong> através das suas ações.</p>
          </div>

          <div className="pv-level-card">
            <div className="pv-level-circle">
              <div className="circle-content">
                <strong>4</strong>
                <span>Nível</span>
              </div>
            </div>
            <div className="pv-level-details">
              <div className="level-label">
                <span>XP Total: 1.250</span>
                <span>85%</span>
              </div>
              <div className="pv-progress-track">
                <div className="pv-progress-bar" style={{ width: '85%' }}>
                  <div className="pv-progress-glow"></div>
                </div>
              </div>
              <p className="level-next">Faltam 150 XP para o Nível 5</p>
            </div>
          </div>
        </div>

        {/* STATS FLOATING - Agora com 4 itens para preencher o vazio */}
        <div className="pv-floating-stats">
          <div className="pv-stat-item">
            <div className="stat-icon-bg green"><Briefcase /></div>
            <div className="stat-info"><strong>02</strong><p>Projetos</p></div>
          </div>
          <div className="pv-stat-item">
            <div className="stat-icon-bg blue"><Clock /></div>
            <div className="stat-info"><strong>24h</strong><p>Horas</p></div>
          </div>
          <div className="pv-stat-item">
            <div className="stat-icon-bg cyan"><HeartHandshake /></div>
            <div className="stat-info"><strong>02</strong><p>ONGs</p></div>
          </div>
          <div className="pv-stat-item">
            <div className="stat-icon-bg gold"><Award /></div>
            <div className="stat-info"><strong>08</strong><p>Badges</p></div>
          </div>
        </div>
      </section>

      <div className="pv-content-grid">
        
        {/* COLUNA ESQUERDA: CONQUISTAS */}
        <div className="pv-card-glass">
          <div className="pv-card-header">
            <Target size={22} className="header-icon green-icon" />
            <h2>Conquistas Desbloqueadas</h2>
          </div>
          <div className="pv-list">
            {conquistas.map(item => (
              <div key={item.id} className={`pv-achievement-row ${item.ativo ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">
                  <Star fill={item.ativo ? "#f1c40f" : "none"} color={item.ativo ? "#f1c40f" : "#94a3b8"} />
                </div>
                <div className="achievement-text">
                  <h3>{item.titulo}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="achievement-points">+{item.xp} XP</div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: CERTIFICADOS E METAS */}
        <div className="pv-right-column">
          
          {/* SESSÃO DE METAS (Novo - Preenche o espaço) */}
          <div className="pv-card-glass mb-20">
            <div className="pv-card-header">
              <Flag size={22} className="header-icon blue-icon" />
              <h2>Minhas Metas</h2>
            </div>
            <div className="pv-metas-list">
              {metas.map(meta => (
                <div key={meta.id} className="pv-meta-item">
                  <div className="meta-info">
                    <span>{meta.titulo}</span>
                    <strong>{meta.atual} / {meta.total}</strong>
                  </div>
                  <div className="meta-bar-bg">
                    <div 
                      className="meta-bar-fill" 
                      style={{ width: `${(meta.atual / meta.total) * 100}%`, backgroundColor: meta.cor }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SESSÃO DE CERTIFICADOS (Estilo Ticket Horizontal) */}
          <div className="pv-card-glass">
            <div className="pv-card-header">
              <FileCheck size={22} className="header-icon blue-icon" />
              <h2>Diplomas e Certificados</h2>
            </div>
            <div className="pv-cert-list">
              {certificados.map(cert => (
                <div key={cert.id} className="pv-ticket-cert">
                  <div className="ticket-color-bar"></div>
                  <div className="ticket-content">
                    <div className="ticket-icon">
                      <Award size={24} color="#007fb2" />
                    </div>
                    <div className="ticket-text">
                      <h3>{cert.titulo}</h3>
                      <p>{cert.ong} • Emitido em {cert.data}</p>
                    </div>
                    <div className="ticket-action">
                      <span className="ticket-hours">{cert.horas}h</span>
                      <button className="btn-download-ticket" title="Baixar PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PainelVoluntario;