import { NavLink } from 'react-router-dom';
import { Menu } from './MenuProfile';
import { Authorization } from './Authorization';

import './Header.scss';
import { RefObject, useEffect, useRef } from 'react';
import { Classnames } from './constants';

export const Header = () => {
  const headerRef = useRef(null) as RefObject<HTMLElement>;

  useEffect(() => {
    const headerElement = headerRef.current as HTMLElement;
    const { height } = headerElement.getBoundingClientRect();

    const handleScroll = () => {
      scrollY <= height
        ? headerElement.classList.remove(Classnames.headerOnScrollActive)
        : headerElement.classList.add(Classnames.headerOnScrollActive);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header ref={headerRef} className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo"></NavLink>
        <Menu />
      </div>
      <Authorization />
    </header>
  );
};
