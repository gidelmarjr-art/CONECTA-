import React from 'react';
import VagasCard from '../../components/jsx/VagasCard'; 
import '../css/MuralVagas.css';

const MuralVagas = () => {
  const listaVagas = Array(8).fill({
    title: "Nome da vaga...",
    area: "Área de atuação",
    description: "Descrição bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    location: "loc - cidade - UF",
    image: require('../../images/imgex.jpg') 
  });

  return (
    <div className="mural-page">

      <section className="vagas-filter-section">
        <div className="vagas-filter-container">
          <svg 
            className="vagas-filter-svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 6H21M6 12H18M10 18H14" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          <button className="vagas-filter-tag">FILTRO ✕</button>
        </div>
      </section>

      <main className="vagas-content-area">
        <div className="vagas-title-group">
          <h1 className="vagas-main-h1">VAGAS</h1>
          <p className="vagas-subtitle">516 vagas encontradas...</p>
        </div>

        <div className="vagas-cards-grid">
          {listaVagas.map((vaga, index) => (
            <VagasCard 
              key={index}
              image={vaga.image}
              title={vaga.title}
              area={vaga.area}
              description={vaga.description}
              location={vaga.location}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MuralVagas;