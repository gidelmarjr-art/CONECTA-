import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 
import Sidebar from './components/jsx/Sidebar'; 
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
import FAQ from './pages/jsx/FAQ';
import SobreNos from './pages/jsx/SobreNos';
import ChatBox from './pages/jsx/ChatBox';

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="app-layout">
      
        {isLoggedIn && <Sidebar tipoUsuario="ADMIN" />}

        <div className="conteudo-principal">
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
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/SobreNos" element={<SobreNos />} />
            <Route path="/ChatBox" element={<ChatBox />} /> 

          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
