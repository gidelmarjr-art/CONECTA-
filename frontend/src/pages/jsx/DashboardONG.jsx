import React from 'react';
import { 
  Users, Briefcase, HeartHandshake, Hourglass, 
  School, HeartPulse, TreePine, UserPlus, CircleDollarSign 
} from 'lucide-react';
// NOVOS IMPORTS DO RECHARTS AQUI:
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import '../css/DashboardONG.css';

const DashboardONG = () => {
  // DADOS PARA O GRÁFICO )
  const dadosGrafico = [
    { nome: 'Mar', doacoes: 150 },
    { nome: 'Abr', doacoes: 300 },
    { nome: 'Mai', doacoes: 250 },
    { nome: 'Jun', doacoes: 600 },
    { nome: 'Jul', doacoes: 400 },
    { nome: 'Ago', doacoes: 550 },
    { nome: 'Set', doacoes: 450 },
  ];

  return (
    <div className="painel-ong-container">
      <main className="painel-ong-conteudo">
        
        {/* BANNER PRINCIPAL DE ESTATÍSTICAS */}
        <section className="painel-ong-secao-destaque">
          <div className="painel-ong-cabecalho-destaque">
            <div>
              <h1 className="painel-ong-titulo-destaque">Bem-vindo(a), ONG Apoio Jovem!</h1>
              <p className="painel-ong-subtitulo-destaque">Uma visão geral de toda sua trajetória no CONECTA+!</p>
            </div>
            
            <div className="painel-ong-area-progresso">
              <div className="painel-ong-nivel-topo">
                <span className="painel-ong-badge-nivel">Nível 1</span>
              </div>
              <div className="painel-ong-textos-progresso">
                <span>Meta de Doações (R$)</span>
              </div>
              <div className="painel-ong-barra-fundo">
                <div className="painel-ong-barra-preenchimento" style={{ '--progresso': '50%' }}></div>
              </div>
              <div className="painel-ong-textos-progresso-rodape">
                <span>R$ 5k de R$ 10k</span>
              </div>
            </div>
          </div>

          <div className="painel-ong-cartoes-estatisticas">
            <div className="painel-ong-cartao-estatistica">
              <div className="painel-ong-icone-estatistica"><Users size={32} /></div>
              <div className="painel-ong-info-estatistica">
                <span>VOLUNTÁRIOS ATIVOS</span>
                <h2>120</h2>
              </div>
            </div>
            <div className="painel-ong-cartao-estatistica">
              <div className="painel-ong-icone-estatistica"><Briefcase size={32} /></div>
              <div className="painel-ong-info-estatistica">
                <span>VAGAS ABERTAS</span>
                <h2>15</h2>
              </div>
            </div>
            <div className="painel-ong-cartao-estatistica">
              <div className="painel-ong-icone-estatistica"><HeartHandshake size={32} /></div>
              <div className="painel-ong-info-estatistica">
                <span>DOAÇÕES RECEBIDAS</span>
                <h2>R$ 5k</h2>
              </div>
            </div>
            <div className="painel-ong-cartao-estatistica">
              <div className="painel-ong-icone-estatistica"><Hourglass size={32} /></div>
              <div className="painel-ong-info-estatistica">
                <span>HORAS VOLUNTÁRIAS GERADAS</span>
                <h2>1.200h</h2>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREA DE CONTEÚDO EM GRID */}
        <section className="painel-ong-grade-principal">
          
          {/* COLUNA ESQUERDA */}
          <div className="painel-ong-coluna-esquerda">
        
            {/* Gráfico de Doações (Limpo e Interativo com Recharts) */}
            <div className="painel-ong-cartao-widget">
              <h3 className="painel-ong-titulo-widget">Histórico de doações</h3>
              
              <div className="painel-ong-conteiner-grafico" style={{ height: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dadosGrafico}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="gradienteAzulRecharts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0056d2" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0056d2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="nome" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                      formatter={(value) => [`R$ ${value}`, 'Doações']}
                    />
                    <Area type="monotone" dataKey="doacoes" stroke="#0056d2" strokeWidth={3} fillOpacity={1} fill="url(#gradienteAzulRecharts)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>


            {/* Principais Causas Apoiadas */}
            <div className="painel-ong-cartao-widget">
              <h3 className="painel-ong-titulo-widget">Principais Causas Apoiadas</h3>
              <div className="painel-ong-lista-causas">
                <div className="painel-ong-item-causa">
                  <div className="painel-ong-icone-causa fundo-laranja-claro">
                    <School size={20} color="#e67e22" />
                  </div>
                  <h4>Educação Infantil</h4>
                </div>
                <div className="painel-ong-item-causa">
                  <div className="painel-ong-icone-causa fundo-azul-claro">
                    <HeartPulse size={20} color="#2980b9" />
                  </div>
                  <h4>Saúde Comunitária</h4>
                </div>
                <div className="painel-ong-item-causa">
                  <div className="painel-ong-icone-causa fundo-verde-claro">
                    <TreePine size={20} color="#27ae60" />
                  </div>
                  <h4>Reflorestamento Local</h4>
                </div>
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA */}
          <div className="painel-ong-coluna-direita">
            
            {/* Vagas Abertas */}
            <div className="painel-ong-cartao-widget">
              <h3 className="painel-ong-titulo-widget">Vagas Abertas</h3>
              <div className="painel-ong-lista-itens">
                <div className="painel-ong-item-lista">
                  <div className="painel-ong-icone-item">
                    <Briefcase size={20} color="#c0392b" />
                  </div>
                  <div className="painel-ong-info-item">
                    <h4>Professor de Inglês</h4>
                    <p>Alfabetização Digital</p>
                  </div>
                  <span className="painel-ong-detalhe-item">20 Horas</span>
                </div>
                <div className="painel-ong-item-lista">
                  <div className="painel-ong-icone-item">
                    <Briefcase size={20} color="#c0392b" />
                  </div>
                  <div className="painel-ong-info-item">
                    <h4>Apoio Psicológico</h4>
                    <p>Atendimento Comunitário</p>
                  </div>
                  <span className="painel-ong-detalhe-item">10 Horas</span>
                </div>
              </div>
            </div>

            {/* Atividade Recente */}
            <div className="painel-ong-cartao-widget">
              <h3 className="painel-ong-titulo-widget">Atividade recente</h3>
              <div className="painel-ong-lista-itens">
                <div className="painel-ong-item-lista">
                  <div className="painel-ong-icone-item fundo-roxo-claro">
                    <UserPlus size={20} color="#8e44ad" />
                  </div>
                  <div className="painel-ong-info-item">
                    <h4>Nova Candidatura</h4>
                    <p>João Silva se candidatou à vaga.</p>
                  </div>
                  <span className="painel-ong-detalhe-item">Hoje</span>
                </div>
                <div className="painel-ong-item-lista">
                  <div className="painel-ong-icone-item fundo-amarelo">
                    <CircleDollarSign size={20} color="#f39c12" />
                  </div>
                  <div className="painel-ong-info-item">
                    <h4>Doação Recebida</h4>
                    <p>Você recebeu uma doação de R$ 50,00.</p>
                  </div>
                  <span className="painel-ong-detalhe-item">Ontem</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardONG;