import React from 'react';
import { 
  Award, Download, Star, ShieldCheck, 
  Calendar, Building, Medal, Trophy, Clock,
  Zap, Heart, Users
} from 'lucide-react';
import '../../css/Voluntarios/Conquistas.css';

const Conquistas = () => {
  return (
    <div className="conquistas-container">
      {/* HEADER COM PROGRESSO */}
      <header className="conquistas-hero">
        <div className="hero-content">
          <h1>Suas Conquistas</h1>
          <p>Você está fazendo a diferença no mundo!</p>
          
          <div className="level-box">
            <div className="level-info">
              <span>Nível 4 - Voluntário Engajado</span>
              <span>1.250 / 2.000 XP</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div>
              <strong>48h</strong>
              <p>Dedicadas</p>
            </div>
          </div>
          <div className="stat-card">
            <Heart className="stat-icon" />
            <div>
              <strong>12</strong>
              <p>Ações</p>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div>
              <strong>5</strong>
              <p>ONGs</p>
            </div>
          </div>
        </div>
      </header>

      <div className="conquistas-layout">
        {/* CERTIFICADOS */}
        <section className="certificados-section">
          <div className="section-header">
            <ShieldCheck size={24} color="#27ae60" />
            <h2>Certificados Oficiais</h2>
          </div>
          
          <div className="certificados-grid">
            <div className="cert-card-premium">
              <div className="cert-header-gold">
                <Zap size={20} />
                <span>EXCLUSIVO</span>
              </div>
              <div className="cert-body">
                <Award size={48} className="cert-medal" />
                <h3>Mentoria de Carreira</h3>
                <p className="ong-name">Instituto Esperança</p>
                <div className="cert-meta">
                  <span><Calendar size={14}/> 20 Out 2025</span>
                  <span><Clock size={14}/> 12 Horas</span>
                </div>
              </div>
              <button className="btn-cert-download">
                <Download size={18} /> Baixar Certificado
              </button>
            </div>

            {/* Outro card para exemplo */}
            <div className="cert-card-premium blue">
              <div className="cert-header-blue">
                <Star size={20} />
                <span>MEIO AMBIENTE</span>
              </div>
              <div className="cert-body">
                <Award size={48} className="cert-medal" />
                <h3>Limpeza de Parques</h3>
                <p className="ong-name">EcoAção Brasil</p>
                <div className="cert-meta">
                  <span><Calendar size={14}/> 15 Set 2025</span>
                  <span><Clock size={14}/> 5 Horas</span>
                </div>
              </div>
              <button className="btn-cert-download">
                <Download size={18} /> Baixar Certificado
              </button>
            </div>
          </div>
        </section>

        {/* DISTINTIVOS LATERAIS */}
        <aside className="badges-sidebar-pro">
          <h3>Distintivos Extraordinários</h3>
          <div className="badges-list">
            <div className="badge-pro unlocked">
              <div className="badge-hex">
                <Trophy size={24} />
              </div>
              <div className="badge-info">
                <h4>Pioneiro</h4>
                <p>Primeiro passo dado</p>
              </div>
            </div>

            <div className="badge-pro locked">
              <div className="badge-hex">
                <Medal size={24} />
              </div>
              <div className="badge-info">
                <h4>Mestre do Ensino</h4>
                <p>Ajude 5 escolas</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Conquistas;