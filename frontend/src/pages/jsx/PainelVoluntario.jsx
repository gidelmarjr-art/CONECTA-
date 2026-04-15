import React from 'react';
import { Briefcase, Clock, FileCheck, Award } from 'lucide-react';
import '../css/PainelVoluntario.css';

const PainelVoluntario = () => {
  const conquistas = [
    { id: 1, titulo: "Primeiro voluntariado", desc: "Completei meu primeiro trabalho como voluntário", xp: 20, ativo: true },
    { id: 2, titulo: "Mão na massa", desc: "Participei de 5 campanhas diferentes", xp: 20, ativo: true },
    { id: 3, titulo: "Líder comunitário", desc: "Ajudei a organizar um evento local", xp: 20, ativo: true },
    { id: 4, titulo: "Especialista em Ensino", desc: "Completei 50 horas ensinando jovens", xp: 30, ativo: false },
    { id: 5, titulo: "Embaixador", desc: "Convidei 3 amigos para a plataforma", xp: 20, ativo: false },
  ];

  const certificados = [
    { id: 1, ong: "ONG Apoio Jovem", funcao: "Professor de Inglês", desc: "Certificado de conclusão", horas: 20 },
    { id: 2, ong: "Verde Vida", funcao: "Apoio no Reflorestamento", desc: "Certificado de participação", horas: 15 },
  ];

  return (
    <div className="pv-container">
      
      {/* BANNER DE BOAS-VINDAS E STATUS */}
      <section className="pv-hero">
        <div className="pv-hero-cabecalho">
          <div>
            <h1>Bem-vindo (a), user!</h1>
            <p>Uma visão geral de toda sua trajetória no CONECTA+!</p>
          </div>
          
          <div className="pv-progresso-container">
            <div className="pv-progresso-textos">
              <span>Nível 1</span>
            </div>
            <div className="pv-progresso-trilha">
              <div className="pv-progresso-preenchido" style={{ '--progresso': '20%' }}></div>
            </div>
            <div className="pv-progresso-legendas">
              <span>20xp</span>
              <span>100xp</span>
            </div>
          </div>
        </div>

        <div className="pv-hero-estatisticas">
          <div className="pv-card-estatistica">
            <div className="pv-estatistica-textos">
              <span>COMPLETEI</span>
              <strong>02</strong>
              <p>TRABALHOS VOLUNTÁRIOS</p>
            </div>
            <div className="pv-estatistica-icone"><Briefcase size={36} color="#444"/></div>
          </div>
          
          <div className="pv-card-estatistica">
            <div className="pv-estatistica-textos">
              <span>COMPLETEI</span>
              <strong>24</strong>
              <p>HORAS DE SERVIÇO</p>
            </div>
            <div className="pv-estatistica-icone"><Clock size={36} color="#444"/></div>
          </div>
          
          <div className="pv-card-estatistica">
            <div className="pv-estatistica-textos">
              <span>TENHO</span>
              <strong>05</strong>
              <p>CERTIFICADOS</p>
            </div>
            <div className="pv-estatistica-icone"><FileCheck size={36} color="#444"/></div>
          </div>
          
          <div className="pv-card-estatistica">
            <div className="pv-estatistica-textos">
              <span>COMPLETEI</span>
              <strong>02</strong>
              <p>CONQUISTAS</p>
            </div>
            <div className="pv-estatistica-icone"><Award size={36} color="#444"/></div>
          </div>
        </div>
      </section>

      {/* ÁREA DE LISTAGENS (CONQUISTAS E CERTIFICADOS) */}
      <section className="pv-listas-grid">
        
        {/* COLUNA CONQUISTAS */}
        <div className="pv-card-secao">
          <h2 className="pv-secao-titulo">Conquistas</h2>
          <div className="pv-lista-scroll">
            {conquistas.map((item) => (
              <div key={item.id} className={`pv-conquista-item ${!item.ativo ? 'pv-inativo' : ''}`}>
                <div className="pv-conquista-icone">
                  <Briefcase size={20} color={item.ativo ? "#f39c12" : "#95a5a6"} />
                </div>
                <div className="pv-conquista-info">
                  <h3>{item.titulo}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="pv-conquista-xp">{item.xp}XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA CERTIFICADOS */}
        <div className="pv-card-secao">
          <h2 className="pv-secao-titulo">Certificados</h2>
          <div className="pv-lista-scroll">
            {certificados.map((cert) => (
              <div key={cert.id} className="pv-certificado-item">
                <div className="pv-certificado-conteudo-esq">
                  <div className="pv-certificado-icone">
                    <Briefcase size={20} color="#f39c12" />
                  </div>
                  <div className="pv-certificado-info">
                    <h3>{cert.ong} - {cert.funcao}</h3>
                    <p>{cert.desc}</p>
                  </div>
                </div>
                <div className="pv-certificado-acoes">
                  <span className="pv-certificado-horas">{cert.horas} Horas</span>
                  <button className="pv-btn-download">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default PainelVoluntario;