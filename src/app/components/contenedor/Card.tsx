import React from 'react';

interface CardProps {
  type: 'admin' | 'pqrsd' | 'estado';
  title: string;
  icon: string;
  description: string;
  buttonText: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ type, title, icon, description, buttonText, link }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <div className={`card ${type === 'admin' ? 'admin-funcionario' : type}`}>
      <div className="card-header">
        {title}
      </div>
      <div className="card-body">
        <div className={type === 'admin' ? 'icon-container' : ''}>
          <div className="icon">{icon}</div>
        </div>
        <p>{description}</p>
        <button onClick={handleClick} className="btnEspecial">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
