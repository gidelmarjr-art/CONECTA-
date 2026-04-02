/*git*/

import React from 'react';
import '../css/VagasCard.css';

const VagasCard = ({ image, title, area, description, location }) => {
  return (
    <div className="vagas-card">
      <div className="vagas-card-image">
        <img src={image} alt={title} />
      </div>
      
      <div className="vagas-card-body">
        <h2 className="vagas-card-title">{title}</h2>
        <h3 className="vagas-card-area">{area}</h3>
        
        <p className="vagas-card-description">
          {description}
        </p>
        
        <div className="vagas-card-divider"></div>
        
        <p className="vagas-card-location">{location}</p>
        
        <button className="vagas-card-button">APLICAR</button>
      </div>
    </div>
  );
};

export default VagasCard;