import React, { Fragment } from 'react';
import spinner from '../../assets/imgs/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Cargando..."
      style={{ width: '50px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
