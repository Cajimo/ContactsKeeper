import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/acerca-de">Acerca de</Link>
        </li>
        <li>
          <Link to="/registro">Registro</Link>
        </li>
        <li>
          <Link to="/ingresar">Ingresar</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Gestor de Contactos',
  icon: 'fa fa-id-card-alt',
};

export default Navbar;
