import React, { useState } from 'react';
import '../css/Cadastro.css';
import heroImg from '../../images/ImgHome.png';

const Cadastro = () => {
  // Estado para controlar qual formulário exibir
  const [tipoCadastro, setTipoCadastro] = useState("");

  const lidarMudancaOpcao = (e) => {
    setTipoCadastro(e.target.value);
  };

  return (
    <div className="pg-cad-envoltorio">
      <section className="pg-cad-secao-principal">
        <div className="pg-cad-cartao-central">
          
          <div className="pg-cad-bloco-conteudo">
            <h1 className="pg-cad-titulo-principal">✱ SELECIONE A OPÇÃO DE CRIAÇÃO</h1>
            
            <div className="pg-cad-grupo-seletor">
              <select 
                className="pg-cad-campo-select" 
                value={tipoCadastro} 
                onChange={lidarMudancaOpcao}
              >
                <option value="">Selecione Uma Opção</option>
                <option value="usuario">Cadastrar Usuário</option>
                <option value="ong">Cadastrar ONG</option>
              </select>
            </div>

            {/* FORMULÁRIO DE USUÁRIO */}
            {tipoCadastro === "usuario" && (
              <form className="pg-cad-formulario-dinamico">
                <h2 className="pg-cad-subtitulo">✱ CRIE SUA CONTA!</h2>
                
                <div className="pg-cad-divisor-social">
                  <span>Entre com uma conta</span>
                </div>
                <div className="pg-cad-grade-social">
                  <div className="pg-cad-caixa-social"></div>
                  <div className="pg-cad-caixa-social"></div>
                  <div className="pg-cad-caixa-social"></div>
                </div>

                <div className="pg-cad-linha-dupla">
                  <div className="pg-cad-grupo-entrada">
                    <label>✱ Nome:</label>
                    <input type="text" className="pg-cad-campo-texto" />
                  </div>
                  <div className="pg-cad-grupo-entrada">
                    <label>✱ Sobrenome:</label>
                    <input type="text" className="pg-cad-campo-texto" />
                  </div>
                </div>

                <div className="pg-cad-grupo-entrada">
                  <label>✱ Usuário:</label>
                  <input type="text" className="pg-cad-campo-texto" />
                </div>

                <div className="pg-cad-grupo-entrada">
                  <label>✱ E-mail:</label>
                  <input type="email" className="pg-cad-campo-texto" />
                </div>

                <div className="pg-cad-grupo-entrada">
                  <label>✱ Senha:</label>
                  <input type="password" className="pg-cad-campo-texto" />
                </div>

                <button type="submit" className="pg-cad-botao-finalizar">Criar conta</button>
              </form>
            )}

            {/* FORMULÁRIO DE ONG */}
            {tipoCadastro === "ong" && (
              <form className="pg-cad-formulario-dinamico">
                <h2 className="pg-cad-subtitulo">✱ CADASTRE SUA ONG</h2>
                
                <div className="pg-cad-linha-dupla">
                  <div className="pg-cad-grupo-entrada">
                    <label>✱ Razão Social:</label>
                    <input type="text" className="pg-cad-campo-texto" />
                  </div>
                  <div className="pg-cad-grupo-entrada">
                    <label>✱ CNPJ:</label>
                    <input type="text" className="pg-cad-campo-texto" />
                  </div>
                </div>

                <div className="pg-cad-grupo-entrada">
                  <label>✱ Nome do Responsável:</label>
                  <input type="text" className="pg-cad-campo-texto" />
                </div>

                <div className="pg-cad-grupo-entrada">
                  <label>✱ E-mail Institucional:</label>
                  <input type="email" className="pg-cad-campo-texto" />
                </div>

                <div className="pg-cad-area-arquivos">
                  <p>✱ Arquivos Obrigatórios:</p>
                  <div className="pg-cad-box-upload">
                    Comprovante de Endereço, Estatuto Social, Ata de Eleição...
                  </div>
                </div>

                <button type="submit" className="pg-cad-botao-finalizar">Cadastrar ONG</button>
              </form>
            )}
          </div>

          <div className="pg-cad-imagem-destaque">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastro;