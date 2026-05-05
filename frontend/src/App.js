import React, { useState, useEffect } from 'react'; // <-- Adicionado useEffect aqui
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importações de componentes
import Header from './components/jsx/Header';  
import Footer from './components/jsx/Footer'; 
import Sidebar from './components/jsx/Sidebar'; 
import SeletorUsuario from './components/jsx/SeletorUsuario';
import Mascote from './components/jsx/Mascote'; 

// Importações de páginas
import HomePage from './pages/jsx/Visitantes/Homepage';
import Login from './pages/jsx/Visitantes/Login';
import CadastroUser from './pages/jsx/Visitantes/CadastroUser';
import RedefinirSenha from './pages/jsx/Visitantes/RedefinirSenha';
import RedefinirSenhaGmail from './pages/jsx/Visitantes/RedefinirSenhaGmail';
import Feed from './pages/jsx/Visitantes/Feed';

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

const ProtectedRoute = ({ user, allowedTypes, children }) => {
  if (!allowedTypes.includes(user)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [tipoUsuario, setTipoUsuario] = useState('visitante'); 

  // --- NOVA LÓGICA PARA DETECTAR CELULAR ---
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Função que atualiza o estado quando a janela muda de tamanho
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Adiciona o "escutador" de eventos na tela
    window.addEventListener('resize', handleResize);

    // Limpa o evento quando o componente é desmontado (boa prática)
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // -----------------------------------------

  const isLoggedIn = tipoUsuario !== 'visitante';

  return (
    <Router>
      <div className="app-layout">
        
        {/* Renderiza o seletor APENAS se NÃO for mobile */}
        {!isMobile && (
          <SeletorUsuario 
            usuarioAtual={tipoUsuario} 
            setUsuarioAtual={setTipoUsuario} 
          />
        )}

        {/* O mascote continua aparecendo para todos, incluindo mobile */}
        <Mascote />
      
        {isLoggedIn && <Sidebar tipoUsuario={tipoUsuario} />}

        <div className="conteudo-principal">
          <Header isLoggedIn={isLoggedIn} tipoUsuario={tipoUsuario} />
          
          <Routes>
            {/* --- ROTAS PÚBLICAS --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/MuralVagas" element={<MuralVagas />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/CadastroUser" element={<CadastroUser />} />
            <Route path="/RedefinirSenha" element={<RedefinirSenha />} />
            <Route path="/RedefinirSenhaGmail" element={<RedefinirSenhaGmail />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/SobreNos" element={<SobreNos />} />
            <Route path="/Feed" element={<Feed />} />
  

            {/* --- ROTAS RESTRITAS: ONG --- */}
            <Route path="/DashboardONG" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <DashboardONG />
              </ProtectedRoute>
            } />
            <Route path="/GestaoVagas" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <GestaoVagas />
              </ProtectedRoute>
            } />
            <Route path="/Candidatos" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <Candidatos />
              </ProtectedRoute>
            } />
            <Route path="/Doacoes" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <Doacoes />
              </ProtectedRoute>
            } />
            <Route path="/Relatorios" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <Relatorios />
              </ProtectedRoute>
            } />
            <Route path="/CadastroDeVaga" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong']}>
                <CadastroDeVaga />
              </ProtectedRoute>
            } />

            {/* --- ROTAS RESTRITAS: VOLUNTÁRIO --- */}
            <Route path="/PainelVoluntario" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['voluntario']}>
                <PainelVoluntario />
              </ProtectedRoute>
            } />
            <Route path="/MinhasInscricoes" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['voluntario']}>
                <MinhasInscricoes />
              </ProtectedRoute>
            } />
            <Route path="/Conquistas" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['voluntario']}>
                <Conquistas />
              </ProtectedRoute>
            } />

            {/* --- ROTAS RESTRITAS: SUPER ADMIN --- */}
            <Route path="/PainelAdmin" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['admin']}>
                <PainelAdmin />
              </ProtectedRoute>
            } />

            {/* --- ROTAS RESTRITAS: QUALQUER USUÁRIO LOGADO --- */}
            <Route path="/ChatBox" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong', 'voluntario', 'admin']}>
                <ChatBox />
              </ProtectedRoute>
            } />
            <Route path="/CentralNotificacoes" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong', 'voluntario', 'admin']}>
                <CentralNotificacoes />
              </ProtectedRoute>
            } />
            <Route path="/Notificacoes" element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong', 'voluntario', 'admin']}>
                <Notificacoes />
              </ProtectedRoute>
            } />
            <Route path='/Perfil' element={
              <ProtectedRoute user={tipoUsuario} allowedTypes={['ong', 'voluntario', 'admin']}>
                <Perfil tipoUsuario={tipoUsuario} />
              </ProtectedRoute>
            } />
            
            {/* Rota de fallback: se digitar algo que não existe, volta pra home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;