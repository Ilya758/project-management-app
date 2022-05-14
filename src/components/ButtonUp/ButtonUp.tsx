import { FC, useEffect, useState } from 'react';
import './ButtonUp.scss';

export const ButtonUp: FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > document.documentElement.clientHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  const smoothJumpUp = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={visible ? 'button-up flex' : 'button-up flex hide'} onClick={smoothJumpUp}>
      <span />
    </button>
  );
};
