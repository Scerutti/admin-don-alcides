import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/carrito">Carrito</Link>
    </nav>
  );
};

export default Navbar;
