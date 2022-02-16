import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  headingText: string;
};

const Main = ({ children, headingText }: Props) => {
  const heading = useRef<HTMLHeadingElement>(null);
  const location = useLocation();

  // seting focus on heading element for better keyboard navigation
  useEffect(() => {
    if (location.state) {
      const { focus } = location.state as any;
      if (focus) {
        heading.current?.focus();
      }
    }
    window.scroll(0, 0);
  }, [location.state]);

  return (
    <main>
      <Helmet>
        <title>{headingText} | React Icecream</title>
      </Helmet>
      <h2 className="main-heading" ref={heading} tabIndex={-1}>
        {headingText}
      </h2>
      {children}
    </main>
  );
};

export default Main;
