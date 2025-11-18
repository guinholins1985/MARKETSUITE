
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-16 text-center text-slate-500 border-t border-slate-800">
      <p>&copy; {new Date().getFullYear()} Market Suite. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;