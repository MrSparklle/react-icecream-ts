import React from 'react';

type Props = {
  icecreamId: number;
};

const IcecreamImage = ({ icecreamId }: Props) => {
  return !!icecreamId ? (
    <img
      src={`${process.env.PUBLIC_URL}/ice-cream-images/ice-cream-${icecreamId}.svg`}
      alt=""
    />
  ) : (
    <img src="empty.svg" alt="" />
  );
};

export default IcecreamImage;
