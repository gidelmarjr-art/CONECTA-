import React, { useState } from 'react';
import '../../css/ONG/CadastroDeVaga.css';

const CadastroDeVaga = () => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'Presencial',
    cargaHoraria: '',
    periodos: [],
    experiencia: 'Iniciante',
    vagasDisponiveis: '',
    descricao: ''
  });

  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  // Gerencia múltipla seleção dos períodos
  const togglePeriodo = (periodo) => {
    const novos = formData.periodos.includes(periodo)
      ? formData.periodos.filter(p => p !== periodo)
      : [...formData.periodos, periodo];
    setFormData({ ...formData, periodos: novos });
  };

  const validarFormulario = () => {
    if (
      !formData.titulo.trim() ||
      !formData.cargaHoraria ||
      !formData.vagasDisponiveis ||
      !formData.descricao.trim() ||
      formData.periodos.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handlePublicar = () => {
    if (validarFormulario()) {
      // TODO: Substituir por dados dinâmicos da API/Backend
      // Aqui entrará a requisição POST (ex: axios.post('/api/vagas', formData))
      
      setMensagem({ texto: '✅ Vaga publicada com sucesso!', tipo: 'sucesso' });
      
      // Limpar formulário após sucesso (opcional, dependendo do fluxo)
      setFormData({
        titulo: '', tipo: 'Presencial', cargaHoraria: '',
        periodos: [], experiencia: 'Iniciante', vagasDisponiveis: '', descricao: ''
      });
    } else {
      setMensagem({ texto: '❌ Por favor, preencha todos os campos obrigatórios.', tipo: 'erro' });
    }

    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 4000);
  };

  const handleSalvarRascunho = () => {
    // TODO: Substituir por dados dinâmicos da API/Backend
    // Aqui entrará a requisição para salvar como rascunho (ex: axios.post('/api/vagas/rascunho', formData))
    setMensagem({ texto: '💾 Rascunho salvo com sucesso!', tipo: 'sucesso' });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 4000);
  };

  return (
    <div className="container-publicar">
      <main className="main-content cv-glass-panel">
        <h1 className="titulo-pagina">Criar Nova Oportunidade de Voluntariado</h1>
        <p className="subtitulo-pagina">Preencha os detalhes abaixo para encontrar o voluntário ideal.</p>

        {/* INFORMAÇÕES BÁSICAS */}
        <section className="secao-formulario">
          <h2 className="secao-titulo">Informações Básicas</h2>
          <div className="campo-grupo">
            <label className="label-obrigatorio">Título da Vaga</label>
            <input 
              type="text" 
              className="input-padrao" 
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder="Ex: Professor de Informática Básica"
            />
          </div>
        </section>

        {/* ONDE E QUANDO */}
        <section className="secao-formulario">
          <h2 className="secao-titulo">Onde e Quando</h2>
          <div className="grid-duas-colunas">
            <div className="campo-grupo">
              <label className="label-obrigatorio">Tipo de Vaga</label>
              <div className="container-chips">
                {['Presencial', 'Remoto', 'Híbrido'].map(t => (
                  <button 
                    key={t} 
                    className={`chip ${formData.tipo === t ? 'ativo' : ''}`}
                    onClick={() => setFormData({...formData, tipo: t})}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="campo-grupo">
              <label className="label-obrigatorio">Carga Horária Semanal (h)</label>
              <input 
                type="number" 
                className="input-padrao" 
                value={formData.cargaHoraria}
                placeholder="Ex: 4"
                min="1"
                onChange={(e) => setFormData({...formData, cargaHoraria: e.target.value})}
              />
            </div>
          </div>

          <div className="campo-grupo">
            <label className="label-obrigatorio">Período (Selecione ao menos um)</label>
            <div className="container-checkbox">
              {['Manhã', 'Tarde', 'Noite', 'Finais de Semana'].map(p => (
                <label key={p} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={formData.periodos.includes(p)}
                    onChange={() => togglePeriodo(p)}
                  /> 
                  <span className="custom-checkbox"></span>
                  {p}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* O QUE PRECISAMOS */}
        <section className="secao-formulario">
          <h2 className="secao-titulo">Requisitos</h2>
          <div className="campo-grupo">
            <label className="label-obrigatorio">Nível de Experiência</label>
            <div className="container-chips">
              {['Iniciante', 'Intermediário', 'Especialista'].map(exp => (
                <button 
                  key={exp} 
                  className={`chip ${formData.experiencia === exp ? 'ativo' : ''}`}
                  onClick={() => setFormData({...formData, experiencia: exp})}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DETALHES DA VAGA */}
        <section className="secao-formulario">
          <h2 className="secao-titulo">Detalhes da Vaga</h2>
          <div className="campo-grupo">
            <label className="label-obrigatorio">Vagas Disponíveis</label>
            <input 
              type="number" 
              className="input-padrao" 
              value={formData.vagasDisponiveis}
              placeholder="Ex: 2"
              min="1"
              onChange={(e) => setFormData({...formData, vagasDisponiveis: e.target.value})}
            />
          </div>
          <div className="campo-grupo">
            <label className="label-obrigatorio">Descrição Completa</label>
            <textarea 
              className="textarea-padrao" 
              rows="5"
              placeholder="Descreva as atividades, benefícios e o impacto que o voluntário causará..."
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            ></textarea>
          </div>
        </section>

        {/* AÇÕES E FEEDBACK */}
        <div className="container-acoes">
          <button className="btn-acao gray" onClick={handleSalvarRascunho}>Salvar Rascunho</button>
          <button className="btn-acao primary" onClick={handlePublicar}>Publicar Vaga</button>
        </div>

        {mensagem.texto && (
          <div className={`alerta slide-in ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}
      </main>
    </div>
  );
};

export default CadastroDeVaga;