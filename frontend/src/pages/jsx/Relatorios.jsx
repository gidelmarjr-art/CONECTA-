import React, { useState } from 'react';
import { 
  BarChart2, Download, Calendar, Users, 
  Clock, FileText, Filter, Heart, ArrowUp
} from 'lucide-react';
import '../css/Relatorios.css';

const Relatorios = () => {
  // Dados simulados para o gráfico de Voluntários por Mês
  const dadosGrafico = [
    { mes: 'Jan', valor: 45, altura: '45%' },
    { mes: 'Fev', valor: 52, altura: '52%' },
    { mes: 'Mar', valor: 38, altura: '38%' },
    { mes: 'Abr', valor: 85, altura: '85%', destaque: true },
    { mes: 'Mai', valor: 60, altura: '60%' },
    { mes: 'Jun', valor: 72, altura: '72%' }
  ];

  // Mock de relatórios salvos
  const relatoriosSalvos = [
    { id: 1, nome: "Relatório de Impacto - Q1 2026", data: "10 Abr 2026", tipo: "PDF", tamanho: "2.4 MB" },
    { id: 2, nome: "Horas Voluntárias - Março", data: "01 Abr 2026", tipo: "XLSX", tamanho: "1.1 MB" },
    { id: 3, nome: "Extrato de Doações - Anual", data: "15 Jan 2026", tipo: "PDF", tamanho: "3.5 MB" }
  ];

  return (
    <div className="pong-rel-container">
      
      {/* CABEÇALHO */}
      <header className="pong-rel-header">
        <div className="pong-rel-titulos">
          <h1>Relatórios e Métricas</h1>
          <p>Mensure o impacto da sua ONG e exporte dados detalhados.</p>
        </div>
        <div className="pong-rel-controles-header">
          <div className="pong-rel-filtro-data">
            <Calendar size={16} color="#7f8c8d" />
            <select>
              <option>Últimos 6 Meses</option>
              <option>Este Ano (2026)</option>
              <option>Ano Passado (2025)</option>
            </select>
          </div>
          <button className="pong-rel-btn-primario">
            <Download size={18} />
            <span>Gerar Novo Relatório</span>
          </button>
        </div>
      </header>

      {/* KPIs DE IMPACTO */}
      <section className="pong-rel-kpis">
        <div className="pong-rel-kpi-card">
          <div className="kpi-topo">
            <span className="kpi-titulo">Total de Voluntários</span>
            <Users size={20} color="#0056d2" />
          </div>
          <div className="kpi-valor">
            <strong>342</strong>
            <span className="kpi-crescimento texto-verde"><ArrowUp size={14}/> 12%</span>
          </div>
          <p className="kpi-descricao">em relação ao semestre passado</p>
        </div>

        <div className="pong-rel-kpi-card">
          <div className="kpi-topo">
            <span className="kpi-titulo">Horas Doadas</span>
            <Clock size={20} color="#f39c12" />
          </div>
          <div className="kpi-valor">
            <strong>1.250h</strong>
            <span className="kpi-crescimento texto-verde"><ArrowUp size={14}/> 8%</span>
          </div>
          <p className="kpi-descricao">impacto direto em projetos ativos</p>
        </div>

        <div className="pong-rel-kpi-card">
          <div className="kpi-topo">
            <span className="kpi-titulo">Pessoas Impactadas</span>
            <Heart size={20} color="#e74c3c" />
          </div>
          <div className="kpi-valor">
            <strong>+5.000</strong>
            <span className="kpi-crescimento texto-verde"><ArrowUp size={14}/> 25%</span>
          </div>
          <p className="kpi-descricao">estimativa baseada nos relatórios de campo</p>
        </div>
      </section>

      <div className="pong-rel-duas-colunas">
        
        {/* GRÁFICO (CSS-ONLY) */}
        <section className="pong-rel-secao pong-rel-grafico-box">
          <div className="secao-header">
            <h2>Voluntários Ativos (Últimos 6 meses)</h2>
            <button className="btn-icone" title="Filtrar"><Filter size={16}/></button>
          </div>
          
          <div className="pong-rel-grafico-container">
            <div className="grafico-eixo-y">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            
            <div className="grafico-barras">
              {dadosGrafico.map((item, index) => (
                <div className="barra-grupo" key={index}>
                  <div className="barra-track">
                    <div 
                      className={`barra-fill ${item.destaque ? 'destaque' : ''}`} 
                      style={{ height: item.altura }}
                      title={`${item.valor} voluntários`}
                    >
                      <span className="barra-tooltip">{item.valor}</span>
                    </div>
                  </div>
                  <span className="barra-rotulo">{item.mes}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LISTA DE RELATÓRIOS SALVOS */}
        <section className="pong-rel-secao">
          <div className="secao-header">
            <h2>Relatórios Salvos</h2>
            <button className="btn-link">Ver todos</button>
          </div>
          
          <div className="pong-rel-lista-arquivos">
            {relatoriosSalvos.map((arq) => (
              <div className="pong-rel-arquivo-card" key={arq.id}>
                <div className="arquivo-icone">
                  <FileText size={24} color="#0056d2" />
                </div>
                <div className="arquivo-info">
                  <h4>{arq.nome}</h4>
                  <span>Gerado em {arq.data} • {arq.tipo} ({arq.tamanho})</span>
                </div>
                <button className="btn-download-circulo" title="Baixar Arquivo">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Relatorios;