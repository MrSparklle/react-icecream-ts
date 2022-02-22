import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IIceCream } from '../models/Icecream';
import IcecreamImage from './IcecreamImage';

type Props = {
  children?: React.ReactNode;
  to: string;
  icecream: IIceCream;
};

const IcecreamCard = ({ children, to, icecream }: Props) => {
  const navigate = useNavigate();

  // when a card is clicked
  const onItemClickHandler = () => {
    // navigate with react router
    navigate(to, { state: { focus: true } });
  };

  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IcecreamImage icecreamId={icecream.id} />
      </div>
      <div className="text-container">
        <h3>
          <Link to={to} onClick={(e) => e.stopPropagation()}>
            {icecream.name}
          </Link>
        </h3>
        {children}
      </div>
    </section>
  );
};

export default IcecreamCard;
