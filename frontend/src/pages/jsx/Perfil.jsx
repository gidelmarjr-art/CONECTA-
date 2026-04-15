import React, { useState, useRef, useEffect } from 'react';
import { 
  Pencil, Building, Mail, Phone, MapPin, Globe, 
  FileText, Heart, ShieldCheck, Check, X, Image as ImageIcon, 
  MessageSquare, ThumbsUp, Calendar, Camera, User, Award, Clock, Star, Activity
} from 'lucide-react';
import '../css/Perfil.css'; 

const Perfil = ({ tipoUsuario = 'VOLUNTARIO' }) => {
  // Normaliza o tipo de usuário que vem da prop (do Seletor)
  const tipoNormalizado = tipoUsuario.toUpperCase();
  
  const [isEditing, setIsEditing] = useState(false);
  const capaInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // Dados unificados simulando o Backend
  const baseData = {
    capaUrl: '',
    avatarUrl: '',
    // Dados ONG
    nomeFantasia: 'Instituto Esperança',
    razaoSocial: 'Associação Instituto Esperança',
    cnpj: '12.345.678/0001-90',
    fundacao: '2015-08-12',
    areaAtuacao: 'Educação e Cidadania',
    // Dados Voluntário
    nomeCompleto: 'Ana Beatriz Silva',
    cpf: '123.456.789-00',
    nascimento: '1998-05-20',
    profissao: 'Engenheira de Software',
    causasInteresse: 'Educação, Meio Ambiente',
    // Dados Admin
    nomeAdmin: 'Super Administrador',
    setor: 'Tecnologia e Segurança',
    nivelAcesso: 'Acesso Total (Nível 5)',
    // Dados Comuns
    telefone: '(11) 98765-4321',
    site: 'www.conecta.org',
    cep: '01234-567',
    rua: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP'
  };

  const [formData, setFormData] = useState(baseData);
  const [tempData, setTempData] = useState(baseData);

  // Atualiza os textos dinâmicos quando o usuário muda no Seletor
  useEffect(() => {
    let emailDinamico = 'ana.silva@email.com';
    let descricaoDinamica = 'Sou apaixonada por tecnologia e educação. Quero usar minhas habilidades em programação para ajudar ONGs a expandirem seu impacto digital.';

    if (tipoNormalizado === 'ONG') {
      emailDinamico = 'contato@institutoesperanca.org';
      descricaoDinamica = 'Transformando vidas através da educação básica e profissionalizante para jovens em situação de vulnerabilidade. Acreditamos que o conhecimento é a chave para um futuro melhor.';
    } else if (tipoNormalizado === 'ADMIN') {
      emailDinamico = 'admin@conecta.com';
      descricaoDinamica = 'Responsável pela moderação de usuários, auditoria de doações e manutenção da estabilidade da plataforma Conecta+.';
    }

    const newData = { ...baseData, email: emailDinamico, descricao: descricaoDinamica };
    setFormData(newData);
    setTempData(newData);
    setIsEditing(false); // Sai do modo de edição se trocar de usuário
  }, [tipoNormalizado]);

  const galeriaMock = [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1593113589914-07553e1f37e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  ];

  const historicoOng = [
    { id: 1, data: 'Há 2 dias', texto: 'Hoje foi dia de formatura da nossa 5ª turma de robótica! 🎓🤖', likes: 124, comentarios: 18 }
  ];

  const historicoVoluntario = [
    { id: 1, ong: 'Instituto Esperança', acao: 'Mentoria de Carreira', data: 'Outubro/2025', horas: 12 },
    { id: 2, ong: 'EcoAção', acao: 'Limpeza do Parque', data: 'Setembro/2025', horas: 5 }
  ];

  const handleEditClick = () => { setTempData({ ...formData }); setIsEditing(true); };
  const handleCancel = () => { setTempData({ ...formData }); setIsEditing(false); };
  const handleSave = () => { setFormData({ ...tempData }); setIsEditing(false); alert("Alterações salvas!"); };
  const handleChange = (e) => { const { name, value } = e.target; setTempData(prev => ({ ...prev, [name]: value })); };

  const handleImageUpload = (e, campo) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempData(prev => ({ ...prev, [campo]: imageUrl }));
    }
  };

  const capaAtual = isEditing ? tempData.capaUrl : formData.capaUrl;
  const avatarAtual = isEditing ? tempData.avatarUrl : formData.avatarUrl;

  // Lógica de Cores e Nomes
  const isONG = tipoNormalizado === 'ONG';
  const isAdmin = tipoNormalizado === 'ADMIN';
  
  const corPrimaria = isAdmin ? '#8e44ad' : (isONG ? '#0056d2' : '#27ae60');
  const gradienteCapa = isAdmin ? 'linear-gradient(135deg, #8e44ad, #9b59b6)' : 
                       (isONG ? 'linear-gradient(135deg, #0056d2, #5a9fff)' : 'linear-gradient(135deg, #27ae60, #2ecc71)');

  const nomeExibicao = isAdmin ? formData.nomeAdmin : (isONG ? formData.nomeFantasia : formData.nomeCompleto);

  return (
    <div className={`pong-perfil-container ${isEditing ? 'pong-perfil-mode-editing' : ''}`}>
      
      <header className="pong-perfil-header">
        <div className="pong-perfil-titulos">
          <h1>Meu Perfil</h1>
          <p>Informações da sua conta na plataforma.</p>
        </div>
        {!isEditing && (
          <button className="pong-perfil-btn-edit-toggle" onClick={handleEditClick}>
            <Pencil size={18} />
            <span>Editar Perfil</span>
          </button>
        )}
      </header>

      {/* ÁREA DE BANNER E AVATAR */}
      <section className="pong-perfil-capa-card">
        <div 
          className="pong-perfil-banner"
          style={{ 
            backgroundImage: capaAtual ? `url(${capaAtual})` : gradienteCapa,
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}
        >
          <input type="file" accept="image/*" hidden ref={capaInputRef} onChange={(e) => handleImageUpload(e, 'capaUrl')} />
          {!isEditing ? (
            <button className="pong-perfil-btn-circle-edit pong-perfil-pos-banner" onClick={handleEditClick} title="Editar Capa"><Pencil size={18} /></button>
          ) : (
            <button className="pong-perfil-btn-circle-edit pong-perfil-pos-banner" onClick={() => capaInputRef.current.click()} title="Fazer Upload de Capa"><Camera size={18} /></button>
          )}
        </div>

        <div className="pong-perfil-avatar-section">
          <div className="pong-perfil-avatar">
            {avatarAtual ? (
              <img src={avatarAtual} alt="Avatar" className="pong-perfil-avatar-img" />
            ) : (
              isAdmin ? <ShieldCheck size={40} color={corPrimaria} /> :
              isONG ? <Building size={40} color={corPrimaria} /> : 
              <User size={40} color={corPrimaria} />
            )}
            <input type="file" accept="image/*" hidden ref={avatarInputRef} onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
            {isEditing && (
              <button className="pong-perfil-btn-circle-edit pong-perfil-pos-avatar" onClick={() => avatarInputRef.current.click()} title="Alterar Foto"><Camera size={14} /></button>
            )}
          </div>
          
          <div className="pong-perfil-status">
            <h2>{nomeExibicao}</h2>
            {isAdmin ? (
              <span className="pong-perfil-badge-verificado" style={{ color: '#8e44ad', backgroundColor: '#f4ecf8' }}><ShieldCheck size={14}/> Staff Conecta+</span>
            ) : isONG ? (
              <span className="pong-perfil-badge-verificado"><ShieldCheck size={14}/> ONG Verificada</span>
            ) : (
              <span className="pong-perfil-badge-verificado" style={{ color: '#f39c12', backgroundColor: '#fef5e7' }}><Award size={14}/> Voluntário Ativo</span>
            )}
          </div>
        </div>
      </section>

      {/* GRID DE FORMULÁRIOS */}
      <div className="pong-perfil-grid">
        <div className="pong-perfil-coluna">
          
          {/* DADOS PRINCIPAIS */}
          <div className="pong-perfil-card">
            <div className="pong-perfil-card-header">
              <FileText size={20} color={corPrimaria} />
              <h3>Dados Principais</h3>
            </div>
            <div className="pong-perfil-card-body pong-perfil-form-grid">
              {isAdmin ? (
                <>
                  <div className="pong-perfil-form-group pong-perfil-span-2">
                    <label>Nome do Administrador</label>
                    <input type="text" name="nomeAdmin" value={isEditing ? tempData.nomeAdmin : formData.nomeAdmin} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div className="pong-perfil-form-group pong-perfil-span-2">
                    <label>Nível de Acesso</label>
                    <input type="text" value={formData.nivelAcesso} disabled className="pong-perfil-input-readonly" />
                  </div>
                </>
              ) : isONG ? (
                <>
                  <div className="pong-perfil-form-group pong-perfil-span-2">
                    <label>Nome Fantasia</label>
                    <input type="text" name="nomeFantasia" value={isEditing ? tempData.nomeFantasia : formData.nomeFantasia} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div className="pong-perfil-form-group pong-perfil-span-2">
                    <label>Razão Social</label>
                    <input type="text" name="razaoSocial" value={isEditing ? tempData.razaoSocial : formData.razaoSocial} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div className="pong-perfil-form-group">
                    <label>CNPJ</label>
                    <input type="text" value={formData.cnpj} disabled className="pong-perfil-input-readonly" />
                  </div>
                  <div className="pong-perfil-form-group">
                    <label>Fundação</label>
                    <input type="date" name="fundacao" value={isEditing ? tempData.fundacao : formData.fundacao} onChange={handleChange} disabled={!isEditing} />
                  </div>
                </>
              ) : (
                <>
                  <div className="pong-perfil-form-group pong-perfil-span-2">
                    <label>Nome Completo</label>
                    <input type="text" name="nomeCompleto" value={isEditing ? tempData.nomeCompleto : formData.nomeCompleto} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div className="pong-perfil-form-group">
                    <label>CPF</label>
                    <input type="text" value={formData.cpf} disabled className="pong-perfil-input-readonly" />
                  </div>
                  <div className="pong-perfil-form-group">
                    <label>Data de Nascimento</label>
                    <input type="date" name="nascimento" value={isEditing ? tempData.nascimento : formData.nascimento} onChange={handleChange} disabled={!isEditing} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* SOBRE */}
          <div className="pong-perfil-card">
            <div className="pong-perfil-card-header">
              <Heart size={20} color="#e74c3c" />
              <h3>{isAdmin ? 'Informações do Cargo' : (isONG ? 'Sobre a Instituição' : 'Perfil do Voluntário')}</h3>
            </div>
            <div className="pong-perfil-card-body pong-perfil-form-grid">
              <div className="pong-perfil-form-group pong-perfil-span-2">
                <label>{isAdmin ? 'Setor/Departamento' : (isONG ? 'Área de Atuação Principal' : 'Profissão / Ocupação')}</label>
                {isONG ? (
                  <select name="areaAtuacao" value={isEditing ? tempData.areaAtuacao : formData.areaAtuacao} onChange={handleChange} disabled={!isEditing}>
                    <option value="Educação e Cidadania">Educação e Cidadania</option>
                    <option value="Meio Ambiente">Meio Ambiente</option>
                  </select>
                ) : (
                  <input type="text" name={isAdmin ? 'setor' : 'profissao'} value={isEditing ? (isAdmin ? tempData.setor : tempData.profissao) : (isAdmin ? formData.setor : formData.profissao)} onChange={handleChange} disabled={!isEditing} />
                )}
              </div>
              
              {!isAdmin && !isONG && (
                <div className="pong-perfil-form-group pong-perfil-span-2">
                  <label>Causas de Interesse</label>
                  <input type="text" name="causasInteresse" value={isEditing ? tempData.causasInteresse : formData.causasInteresse} onChange={handleChange} disabled={!isEditing} placeholder="Ex: Animais, Educação..." />
                </div>
              )}

              <div className="pong-perfil-form-group pong-perfil-span-2">
                <label>{isAdmin ? 'Atribuições no Sistema' : (isONG ? 'Missão e Descrição' : 'Biografia (Por que quero ser voluntário?)')}</label>
                <textarea name="descricao" value={isEditing ? tempData.descricao : formData.descricao} onChange={handleChange} disabled={!isEditing} rows="4" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTATO E ENDEREÇO */}
        <div className="pong-perfil-coluna">
          <div className="pong-perfil-card">
            <div className="pong-perfil-card-header">
              <Phone size={20} color="#f39c12" />
              <h3>Contato</h3>
            </div>
            <div className="pong-perfil-card-body pong-perfil-form-grid">
              <div className="pong-perfil-form-group pong-perfil-span-2">
                <label><Mail size={14}/> E-mail</label>
                <input type="email" name="email" value={isEditing ? tempData.email : formData.email} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="pong-perfil-form-group pong-perfil-span-2">
                <label><Phone size={14}/> Telefone</label>
                <input type="text" name="telefone" value={isEditing ? tempData.telefone : formData.telefone} onChange={handleChange} disabled={!isEditing} />
              </div>
              {isONG && (
                <div className="pong-perfil-form-group pong-perfil-span-2">
                  <label><Globe size={14}/> Site</label>
                  <input type="text" name="site" value={isEditing ? tempData.site : formData.site} onChange={handleChange} disabled={!isEditing} />
                </div>
              )}
            </div>
          </div>

          <div className="pong-perfil-card">
            <div className="pong-perfil-card-header">
              <MapPin size={20} color="#27ae60" />
              <h3>Endereço</h3>
            </div>
            <div className="pong-perfil-card-body pong-perfil-form-grid">
              <div className="pong-perfil-form-group pong-perfil-span-2">
                <label>Rua/Avenida</label>
                <input type="text" name="rua" value={isEditing ? tempData.rua : formData.rua} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="pong-perfil-form-group">
                <label>Número</label>
                <input type="text" name="numero" value={isEditing ? tempData.numero : formData.numero} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="pong-perfil-form-group">
                <label>Cidade/UF</label>
                <input type="text" value={`${formData.cidade} - ${formData.estado}`} disabled className="pong-perfil-input-readonly" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO EXTRA DINÂMICA */}
      <div className="pong-perfil-grid pong-perfil-mt-20">
        
        {isAdmin ? (
          /* VISÃO ADMIN: STATUS DO SISTEMA */
          <>
            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <Activity size={20} color="#8e44ad" />
                <h3>Suas Ações Recentes (Log)</h3>
              </div>
              <div className="pong-perfil-posts-lista">
                <div className="pong-perfil-post-card">
                  <p style={{margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold'}}>Aprovação de ONG</p>
                  <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Você aprovou o cadastro do "Instituto Esperança".</span>
                  <div style={{ marginTop: '10px', fontSize: '11px', color: '#bdc3c7'}}>Há 2 horas</div>
                </div>
                <div className="pong-perfil-post-card">
                  <p style={{margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold'}}>Moderação de Denúncia</p>
                  <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Usuário banido por comportamento inadequado no chat.</span>
                  <div style={{ marginTop: '10px', fontSize: '11px', color: '#bdc3c7'}}>Ontem às 14:30</div>
                </div>
              </div>
            </div>
            
            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <ShieldCheck size={20} color="#e67e22" />
                <h3>Estatísticas Rápidas</h3>
              </div>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', textAlign: 'center', marginTop: '10px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#8e44ad', fontSize: '28px' }}>12</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>Auditorias Hoje</p>
                </div>
                <div>
                  <h2 style={{ margin: 0, color: '#e74c3c', fontSize: '28px' }}>3</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>Denúncias Pendentes</p>
                </div>
              </div>
            </div>
          </>
        ) : isONG ? (
          /* VISÃO ONG: GALERIA E POSTS */
          <>
            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <ImageIcon size={20} color="#9b59b6" />
                <h3>Galeria de Fotos</h3>
              </div>
              <div className="pong-perfil-galeria-grid">
                {galeriaMock.map((url, i) => (
                  <div key={i} className="pong-perfil-foto-wrapper"><img src={url} alt="Galeria" className="pong-perfil-foto-item" /></div>
                ))}
              </div>
            </div>

            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <MessageSquare size={20} color="#3498db" />
                <h3>Histórico de Posts</h3>
              </div>
              <div className="pong-perfil-posts-lista">
                {historicoOng.map(post => (
                  <div key={post.id} className="pong-perfil-post-card">
                    <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>{post.texto}</p>
                    <div className="pong-perfil-post-footer" style={{borderTop: 'none', padding: 0}}>
                      <span className="pong-perfil-post-stat"><ThumbsUp size={14}/> {post.likes} Curtidas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* VISÃO VOLUNTÁRIO: IMPACTO E HISTÓRICO */
          <>
            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <Star size={20} color="#f1c40f" />
                <h3>Meu Impacto</h3>
              </div>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', textAlign: 'center', marginTop: '10px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#27ae60', fontSize: '28px' }}>17h</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>Horas Doadas</p>
                </div>
                <div>
                  <h2 style={{ margin: 0, color: '#3498db', fontSize: '28px' }}>2</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>ONGs Apoiadas</p>
                </div>
              </div>
            </div>

            <div className="pong-perfil-card pong-perfil-h-fit">
              <div className="pong-perfil-card-header">
                <Clock size={20} color="#e67e22" />
                <h3>Histórico de Ações</h3>
              </div>
              <div className="pong-perfil-posts-lista">
                {historicoVoluntario.map(acao => (
                  <div key={acao.id} className="pong-perfil-post-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{acao.acao}</h4>
                      <span style={{ fontSize: '12px', color: '#7f8c8d' }}>{acao.ong} • {acao.data}</span>
                    </div>
                    <span style={{ backgroundColor: '#e8f8f5', color: '#27ae60', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                      +{acao.horas}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* POPUP DE SALVAR ALTERAÇÕES (SÓ APARECE AO EDITAR) */}
      {isEditing && (
        <div className="pong-perfil-footer-acoes">
          <div className="pong-perfil-footer-content">
            <p>Você tem alterações não salvas.</p>
            <div className="pong-perfil-footer-btns">
              <button className="pong-perfil-btn-cancelar" onClick={handleCancel}><X size={18} /> Cancelar</button>
              <button className="pong-perfil-btn-salvar" onClick={handleSave}><Check size={18} /> Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Perfil;