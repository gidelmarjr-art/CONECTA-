/*git*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 

import HomePage from './pages/jsx/Homepage';
import MuralVagas from './pages/jsx/MuralVagas';
import Login from './pages/jsx/Login';
import CadastroUser from './pages/jsx/CadastroUser';
import RedefinirSenha from './pages/jsx/RedefinirSenha';
import RedefinirSenhaGmail from './pages/jsx/RedefinirSenhaGmail';


import './App.css';

function App() {
  return (
    <Router>
      <Header /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MuralVagas" element={<MuralVagas />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroUser" element={<CadastroUser />} />
        <Route path="/RedefinirSenha" element={<RedefinirSenha />} />
        <Route path="/RedefinirSenhaGmail" element={<RedefinirSenhaGmail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;