import React from "react";

interface CardProps {
  type: "admin" | "funcionario" | "pqrsd";
  title: string;
  icon: string;
  description: string;
  buttonText: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ type, title, icon, description, buttonText, link }) => {
  return (
    <div className={`card ${type}`}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="icon">{icon}</div>
        <p>{description}</p>
        <a href={link} className="btn">{buttonText}</a>
      </div>
    </div>
  );
};

export default Card;
