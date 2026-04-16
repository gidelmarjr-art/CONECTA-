import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 
import Sidebar from './components/jsx/Sidebar'; 
import SeletorUsuario from './components/jsx/SeletorUsuario';
import Mascote from './components/jsx/Mascote'; // <-- IMPORTAMOS O MASCOTE AQUI!

import HomePage from './pages/jsx/Visitantes/Homepage';
import Login from './pages/jsx/Visitantes/Login';
import CadastroUser from './pages/jsx/Visitantes/CadastroUser';
import RedefinirSenha from './pages/jsx/Visitantes/RedefinirSenha';
import RedefinirSenhaGmail from './pages/jsx/Visitantes/RedefinirSenhaGmail';

import MuralVagas from './pages/jsx/Outros/MuralVagas';
import FAQ from './pages/jsx/Outros/FAQ';
import SobreNos from './pages/jsx/Outros/SobreNos';
import CentralNotificacoes from './pages/jsx/Outros/CentralNotificacoes'; 
import Notificacoes from './pages/jsx/Outros/Notificacoes'; 
import ChatBox from './pages/jsx/Outros/ChatBox';
import Perfil from './pages/jsx/Outros/Perfil';

import DashboardONG from './pages/jsx/ONG/PainelONG';
import Candidatos from './pages/jsx/ONG/Candidatos';
import Doacoes from './pages/jsx/ONG/Doacoes';  
import Relatorios from './pages/jsx/ONG/Relatorios';
import GestaoVagas from './pages/jsx/ONG/GestaoDeVagas';
import CadastroDeVaga from './pages/jsx/ONG/CadastroDeVaga';

import PainelVoluntario from './pages/jsx/Voluntarios/PainelVoluntario';


import MinhasInscricoes from './pages/jsx/Voluntarios/MinhasInscricoes';
import Conquistas from './pages/jsx/Voluntarios/Conquistas';
 
import PainelAdmin from './pages/jsx/SuperAdmin/PainelAdmin';

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

        {/* NOSSO MASCOTE FLUTUANTE EM TODAS AS PÁGINAS! */}
        <Mascote />
      
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
            <Route path="/CentralNotificacoes" element={<CentralNotificacoes />} /> 
            <Route path="/Notificacoes" element={<Notificacoes />} /> 
            <Route path="/CadastroDeVaga" element={<CadastroDeVaga />} /> 

            
            <Route path='/Perfil' element={<Perfil tipoUsuario={tipoUsuario} />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;