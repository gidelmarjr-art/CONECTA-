import React, { useState } from 'react';
import { 
  FiLock, 
  FiBell, 
  FiSave, 
  FiTrash2
} from 'react-icons/fi';
import '../../css/Outros/Configuracoes.css';

const Configuracoes = () => {
  // A aba padrão agora é 'seguranca'
  const [activeTab, setActiveTab] = useState('seguranca');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso!');
  };

  // Renderiza o conteúdo com base na aba selecionada
  const renderContent = () => {
    switch (activeTab) {
      case 'seguranca':
        return (
          <div className="settings-section fade-in">
            <h2 className="settings-section-title">Segurança</h2>
            <p className="settings-section-subtitle">Gerencie sua senha e proteja sua conta.</p>

            <form className="settings-form" onSubmit={handleSave}>
              <div className="settings-input-group">
                <label htmlFor="senhaAtual">Senha atual</label>
                <div className="settings-input-wrapper">
                  <FiLock className="settings-input-icon" />
                  <input type="password" id="senhaAtual" placeholder="Digite sua senha atual" required />
                </div>
              </div>

              <div className="settings-input-row">
                <div className="settings-input-group">
                  <label htmlFor="novaSenha">Nova senha</label>
                  <div className="settings-input-wrapper">
                    <FiLock className="settings-input-icon" />
                    <input type="password" id="novaSenha" placeholder="Mínimo de 8 caracteres" required />
                  </div>
                </div>
                
                <div className="settings-input-group">
                  <label htmlFor="confirmaSenha">Confirmar nova senha</label>
                  <div className="settings-input-wrapper">
                    <FiLock className="settings-input-icon" />
                    <input type="password" id="confirmaSenha" placeholder="Repita a nova senha" required />
                  </div>
                </div>
              </div>

              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">
                  <FiSave className="btn-icon" /> Atualizar Senha
                </button>
              </div>
            </form>

            <hr className="settings-divider" />

            <div className="settings-danger-zone">
              <div>
                <h3>Excluir Conta</h3>
                <p>Ao excluir sua conta, todos os seus dados, histórico e candidaturas serão removidos permanentemente. Esta ação não pode ser desfeita.</p>
              </div>
              <button className="settings-btn-danger" type="button">
                <FiTrash2 className="btn-icon" /> Excluir minha conta
              </button>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="settings-section fade-in">
            <h2 className="settings-section-title">Notificações</h2>
            <p className="settings-section-subtitle">Escolha como e quando você deseja ser avisado pela plataforma.</p>

            <div className="settings-toggle-list">
              <div className="settings-toggle-item">
                <div className="toggle-info">
                  <h3>Novas Vagas</h3>
                  <p>Receber alertas quando surgirem vagas compatíveis com meu perfil.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="toggle-info">
                  <h3>Mensagens de ONGs</h3>
                  <p>Ser notificado por e-mail quando uma ONG entrar em contato.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="toggle-info">
                  <h3>Boletim Informativo</h3>
                  <p>Receber notícias, dicas de voluntariado e atualizações da plataforma.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="settings-form-actions">
              <button className="settings-btn-save" onClick={handleSave} type="button">
                <FiSave className="btn-icon" /> Salvar Preferências
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-page-wrapper">
      <div className="settings-header-banner">
        <div className="settings-header-content">
          <h1 className="settings-main-title">Configurações</h1>
          <p className="settings-subtitle">Gerencie suas preferências de acesso e notificações</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Sidebar de Navegação */}
        <aside className="settings-sidebar">
          <button 
            className={`settings-tab-btn ${activeTab === 'seguranca' ? 'active' : ''}`}
            onClick={() => setActiveTab('seguranca')}
          >
            <FiLock className="tab-icon" />
            Segurança
          </button>
          
          <button 
            className={`settings-tab-btn ${activeTab === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notificacoes')}
          >
            <FiBell className="tab-icon" />
            Notificações
          </button>
        </aside>

        {/* Área de Conteúdo */}
        <main className="settings-content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;