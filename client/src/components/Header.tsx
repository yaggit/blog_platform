import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="text-2xl font-bold"><br></br></Link>
      </div>
    </header>
  );
};

export default Header;