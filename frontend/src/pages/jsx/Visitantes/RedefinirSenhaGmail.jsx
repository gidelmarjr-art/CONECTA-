import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook de navegação
import '../../css/Visitantes/RedefinirSenhaGmail.css';
import heroImg from '../../../images/Img3.png'; 

const RedefinirSenhaGmail = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();   
    navigate('/RedefinirGmail');
  };

  return (
    <div className="alt-s-envoltorio">
      <section className="alt-s-secao-principal">
        <div className="alt-s-cartao-central">
          
          <div className="alt-s-bloco-conteudo">
            <h1 className="alt-s-titulo-principal">✱ PARA ALTERAR SUA SENHA VERIFIQUE SEU GMAIL</h1>

            {/* 5. Adicionado o onSubmit aqui para escutar o botão de submit */}
            <form className="alt-s-formulario" onSubmit={handleSubmit}>
              <div className="alt-s-grupo-entrada">
                <label>✱E-mail:</label>
                <input type="text" className="alt-s-campo-texto" />
              </div>

              <button type="submit" className="alt-s-botao-confirmar">
                Verificar E-mail
              </button>
            </form>

             <p className="pg-log-texto-cadastro">
              Lembrou sua senha? <a href="/Login">Volte aqui</a>
            </p>
          </div>

          <div className="alt-s-imagem-destaque">
            <img src={heroImg} alt="Ilustração Conecta+" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedefinirSenhaGmail;