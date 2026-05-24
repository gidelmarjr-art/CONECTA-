import React from 'react';
import { MapPin } from 'lucide-react';
import '../css/VagasCard.css';

const VagasCard = ({ image, title, area, description, location }) => {
  return (
    <div className="vagas-card">
      {/* Imagem e Badge flutuante da Área */}
      <div className="vagas-card-header">
        <img src={image} alt={title} className="vagas-card-image" />
        <span className="vagas-card-badge">{area}</span>
      </div>
      
      {/* Corpo do card: Título e Descrição */}
      <div className="vagas-card-body">
        <h2 className="vagas-card-title">{title}</h2>
        <p className="vagas-card-description">{description}</p>
      </div>
      
      {/* Rodapé: Localização e Botão de Ação */}
      <div className="vagas-card-footer">
        <div className="vagas-card-location">
          <MapPin size={16} className="location-icon" />
          <span>{location}</span>
        </div>
        
        <button className="vagas-card-button">APLICAR</button>
      </div>
    </div>
  );
};

export default VagasCard;