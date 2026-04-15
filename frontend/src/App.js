import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 
import Sidebar from './components/jsx/Sidebar'; 
import SeletorUsuario from './components/jsx/SeletorUsuario'; // <-- Importado aqui (ajuste o caminho se necessário)

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
import Perfil from './pages/jsx/Perfil';
import MinhasInscricoes from './pages/jsx/MinhasInscricoes';
import Conquistas from './pages/jsx/Conquistas';

import './App.css';

function App() {
  // Estado global que controla quem está "logado" na apresentação
  const [tipoUsuario, setTipoUsuario] = useState('visitante'); // Começa como ONG para a apresentação

  // Lógica: se for visitante, não está logado. Qualquer outro, está logado.
  const isLoggedIn = tipoUsuario !== 'visitante';

  return (
    <Router>
      <div className="app-layout">
        
        {/* O botão flutuante que controla o site inteiro */}
        <SeletorUsuario 
          usuarioAtual={tipoUsuario} 
          setUsuarioAtual={setTipoUsuario} 
        />
      
        {/* A Sidebar agora recebe o tipo de usuário dinamicamente! */}
        {isLoggedIn && <Sidebar tipoUsuario={tipoUsuario} />}

        <div className="conteudo-principal">
          <Header isLoggedIn={isLoggedIn} tipoUsuario={tipoUsuario} />
          
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
            <Route path="/MinhasInscricoes" element={<MinhasInscricoes />} /> 
            <Route path="/Conquistas" element={<Conquistas />} /> 
            
            {/* O Perfil agora recebe a prop para saber se renderiza como ONG ou Voluntário */}
            <Route path='/Perfil' element={<Perfil tipoUsuario={tipoUsuario} />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;