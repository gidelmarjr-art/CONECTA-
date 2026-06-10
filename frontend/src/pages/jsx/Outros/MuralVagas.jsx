import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import VagasCard from '../../../components/jsx/VagasCard'; 
import '../../css/Outros/MuralVagas.css';

const MuralVagas = () => {
  // Lista de vagas fictícias
  const listaVagas = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      ong: "Instituto Raízes Verdes",
      title: "Educador Ambiental",
      area: "Meio Ambiente",
      description: "Buscamos voluntários apaixonados por sustentabilidade para ministrar oficinas de reciclagem e plantio para crianças de escolas públicas.",
      location: "São Paulo, SP"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
      ong: "Abrigo Patinhas Felizes",
      title: "Cuidador de Animais",
      area: "Causa Animal",
      description: "Ajude-nos na rotina de alimentação, banho e recreação de cães e gatos resgatados que aguardam adoção responsável.",
      location: "Curitiba, PR"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      ong: "Tech Para Todos",
      title: "Instrutor de Informática",
      area: "Educação",
      description: "Compartilhe seu conhecimento ensinando o uso básico de computadores e internet para idosos em nossa comunidade.",
      location: "Remoto"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1593113514214-dfba05ce8f4b?auto=format&fit=crop&w=600&q=80",
      ong: "Associação Mão Amiga",
      title: "Triagem de Doações",
      area: "Assistência Social",
      description: "Precisamos de pessoas organizadas para ajudar na triagem, separação e montagem de cestas básicas e kits de higiene.",
      location: "Brasília, DF"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
      ong: "Saúde Solidária",
      title: "Apoio Psicológico",
      area: "Saúde",
      description: "Profissionais ou estudantes de psicologia (último ano) para escuta ativa e acolhimento de pessoas em situação de vulnerabilidade.",
      location: "Rio de Janeiro, RJ"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
      ong: "Cultura na Praça",
      title: "Contador de Histórias",
      area: "Cultura",
      description: "Leve magia e imaginação para crianças em hospitais infantis através da leitura e contação de histórias lúdicas.",
      location: "Belo Horizonte, MG"
    }
  ];

  // ==========================================
  // ESTADOS (STATE) PARA OS FILTROS
  // ==========================================
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroLocal, setFiltroLocal] = useState("");

  // ==========================================
  // LÓGICA DE EXTRAÇÃO E FILTRAGEM
  // ==========================================
  // 1. Extrai áreas e locais únicos da lista para popular os <select> automaticamente
  const areasUnicas = [...new Set(listaVagas.map(vaga => vaga.area))];
  const locaisUnicos = [...new Set(listaVagas.map(vaga => vaga.location))];

  // 2. Filtra a lista com base no que foi selecionado
  const vagasFiltradas = listaVagas.filter(vaga => {
    const correspondeArea = filtroArea === "" || vaga.area === filtroArea;
    const correspondeLocal = filtroLocal === "" || vaga.location === filtroLocal;
    return correspondeArea && correspondeLocal;
  });

  return (
    <div className="mural-page">
      
      {/* Barra de Filtros */}
      <section className="vagas-filter-section">
        <div className="vagas-filter-container">
          <div className="filter-icon-wrapper">
            <Filter size={20} className="vagas-filter-icon" />
            <span className="filter-label">Filtros:</span>
          </div>

          {/* Menus de Seleção (Dropdowns) */}
          <div className="filter-selectors">
            <select 
              className="vagas-select" 
              value={filtroArea} 
              onChange={(e) => setFiltroArea(e.target.value)}
            >
              <option value="">Todas as Áreas</option>
              {areasUnicas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>

            <select 
              className="vagas-select" 
              value={filtroLocal} 
              onChange={(e) => setFiltroLocal(e.target.value)}
            >
              <option value="">Todas as Localidades</option>
              {locaisUnicos.map((local, index) => (
                <option key={index} value={local}>{local}</option>
              ))}
            </select>
          </div>

          {/* Tags de filtros ativos (só aparecem se houver algo selecionado) */}
          <div className="active-filters">
            {filtroArea && (
              <button className="vagas-filter-tag" onClick={() => setFiltroArea("")}>
                {filtroArea} <X size={14} />
              </button>
            )}
            
            {filtroLocal && (
              <button className="vagas-filter-tag" onClick={() => setFiltroLocal("")}>
                {filtroLocal} <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="vagas-content-area">
        <div className="vagas-title-group">
          <h1 className="vagas-main-h1">Explorar Vagas</h1>
          <p className="vagas-subtitle">
            Encontramos <strong>{vagasFiltradas.length} {vagasFiltradas.length === 1 ? 'vaga' : 'vagas'}</strong> 
            {filtroArea || filtroLocal ? ' com os filtros selecionados.' : ' disponíveis.'}
          </p>
        </div>

        {/* Grid de Cards - Agora mapeando a lista FILTRADA */}
        {vagasFiltradas.length > 0 ? (
          <div className="vagas-cards-grid">
            {vagasFiltradas.map((vaga) => (
              <VagasCard 
                key={vaga.id}
                image={vaga.image}
                ong={vaga.ong}
                title={vaga.title}
                area={vaga.area}
                description={vaga.description}
                location={vaga.location}
              />
            ))}
          </div>
        ) : (
          <div className="vagas-empty-state">
            <p>Poxa, não encontramos nenhuma vaga com esses filtros.</p>
            <button className="btn-clear-filters" onClick={() => { setFiltroArea(""); setFiltroLocal(""); }}>
              Limpar Filtros
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
};

export default MuralVagas;