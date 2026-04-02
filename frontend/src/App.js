import React from 'react';
import './App.css';

// 1. Importação dos componentes globais (Header e Footer)
import Header from './components/jsx/header';   // Correto (sem chaves)
import Footer from './components/jsx/footer';   // Correto (sem chaves)
import Homepage from './pages/jsx/homepage';    // Correto (sem chaves)
function App() {
  return (
    <div className="App">
      {/* O Header aparece em todas as páginas */}
      <Header />
      
      <main>
        {/* O conteúdo principal da Home */}
        <Homepage />
      </main>

      {/* O Footer aparece no final de todas as páginas */}
      /<Footer />
    </div>
  );
}

export default App;