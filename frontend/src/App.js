import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes globais
// Os nomes devem ser idênticos aos arquivos: footer.jsx e header.jsx
import Header from './components/jsx/header';  
import Footer from './components/jsx/footer'; 

// Importação das páginas
// Os nomes devem ser idênticos aos arquivos: homepage.jsx e MuralVagas.jsx
import HomePage from './pages/jsx/homepage';
import MuralVagas from './pages/jsx/MuralVagas';

// Importação do CSS Global (opcional, se desejar resetar estilos)
import './App.css';

function App() {
  return (
    <Router>
      {/* O Header aparece em todas as rotas por estar fora do Routes */}
      <Header /> 
      
      <Routes>
        {/* Rota principal para a Home */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rota para o Mural de Vagas */}
        <Route path="/MuralVagas" element={<MuralVagas />} />
      </Routes>

      {/* O Footer aparece fixo no final de todas as páginas */}
      <Footer />
    </Router>
  );
}

export default App;