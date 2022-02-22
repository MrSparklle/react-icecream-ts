import React from 'react';

type Props = {
  children: React.ReactNode;
};

// display each Icecream card inside this container
const IcecreamCardContainer = ({ children }: Props) => {
  return (
    <ul className="container">
      {React.Children.map(children, (card) => (
        <li>{card}</li>
      ))}
    </ul>
  );
};

export default IcecreamCardContainer;
