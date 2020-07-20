import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => logout();

  const authLinks = (
    <Fragment>
      <li>Hola {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/registro">Registro</Link>
      </li>
      <li>
        <Link to="/ingresar">Ingresar</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
        {/*  <li>
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
        </li> */}
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
