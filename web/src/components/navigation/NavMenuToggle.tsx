
import React from 'react';
import ButtonBootstrap, { ButtonType } from '../button/ButtonBootstrap';

interface Props {
  className?: string | object,
  onClick?: React.ReactEventHandler,
  title?: string,
  type?: ButtonType,
};

const NavMenuToggle: React.FC<Props> = ({
  className,
  onClick,
  title,
  type,
}) => {
  return (
    <ButtonBootstrap
      type={type} className={className}
      onClick={onClick}
    >
      {title ? (
        <>{title}&nbsp;&nbsp;</>
      ) : null}
      <i className="fas fa-bars" />
    </ButtonBootstrap>
  );
};

export default NavMenuToggle;
