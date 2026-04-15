import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 
import Sidebar from './components/jsx/Sidebar'; // <-- Importe a Sidebar

import HomePage from './pages/jsx/Homepage';
import MuralVagas from './pages/jsx/MuralVagas';
import Login from './pages/jsx/Login';
import CadastroUser from './pages/jsx/CadastroUser';
import RedefinirSenha from './pages/jsx/RedefinirSenha';
import RedefinirSenhaGmail from './pages/jsx/RedefinirSenhaGmail';
import DashboardONG from './pages/jsx/DashboardONG';
import PainelVoluntario from './pages/jsx/PainelVoluntario';
import PainelAdmin from './pages/jsx/PainelAdmin';
import GestaoVagas from './pages/jsx/GestaoDeVagas';
import Candidatos from './pages/jsx/Candidatos';
import Doacoes from './pages/jsx/Doacoes';  
import Relatorios from './pages/jsx/Relatorios';

import './App.css';

function App() {
  // SIMULAÇÃO DE LOGIN (Mude para false para ver a sidebar sumir)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      {/* A div app-layout vai organizar a Sidebar na esquerda 
        e o resto do site na direita 
      */}
      <div className="app-layout">
        
        {/* Renderização Condicional: Só mostra a Sidebar SE estiver logado */}
        {isLoggedIn && <Sidebar tipoUsuario="ADMIN" />}

        <div className="conteudo-principal">
          {/* Se quiser que o Header também suma no login, coloque a condicional nele */}
          <Header isLoggedIn={isLoggedIn} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/MuralVagas" element={<MuralVagas />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/CadastroUser" element={<CadastroUser />} />
            <Route path="/RedefinirSenha" element={<RedefinirSenha />} />
            <Route path="/RedefinirSenhaGmail" element={<RedefinirSenhaGmail />} />
            <Route path="/DashboardONG" element={<DashboardONG />} />
            <Route path="/PainelVoluntario" element ={<PainelVoluntario/>} />
            <Route path="/PainelAdmin" element ={<PainelAdmin/>} />
            <Route path="/GestaoVagas" element ={<GestaoVagas/>} />
            <Route path="/Candidatos" element ={<Candidatos/>} />
            <Route path="/Doacoes" element ={<Doacoes/>} />
            <Route path="/Relatorios" element ={<Relatorios/>} />

          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;