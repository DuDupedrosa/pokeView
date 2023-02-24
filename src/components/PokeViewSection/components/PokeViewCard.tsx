import React from 'react';

interface PokeViewCardProps {
  CardImage: string;
}

const PokeViewCard = ({ CardImage }: PokeViewCardProps) => {
  return (
    <div>
      <img className="max-h-102" src={CardImage} alt="Polem image" />
    </div>
  );
};

export default PokeViewCard;
