import { NavLink, useLocation } from 'react-router-dom';
import { Authorization } from './Authorization';
import './Header.scss';
import { RefObject, useEffect, useRef } from 'react';
import { Classnames } from './constants';

export const Header = () => {
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (pathname.match('main') || pathname.match('boards')) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  });

  return (
    <header ref={headerRef} className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo"></NavLink>
      </div>
      <Authorization />
    </header>
  );
};
