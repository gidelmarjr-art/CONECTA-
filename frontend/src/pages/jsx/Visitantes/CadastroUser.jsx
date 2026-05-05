import React, { useState } from "react";
import '../../css/Visitantes/CadastroUser.css';
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaMicrosoft, FaCheck, FaTimes } from "react-icons/fa"; // Adicionado FaCheck e FaTimes

const CadastroUser = () => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("usuario");

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    dataFundacao: "",
    nomeResponsavel: "",
    cpfResponsavel: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroAtivo, setErroAtivo] = useState(false);

  // NOVO: Estados para controlar as regras da senha e se o input está focado
  const [senhaFocada, setSenhaFocada] = useState(false);
  const [regrasSenha, setRegrasSenha] = useState({
    tamanho: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
  });

  const handleChange = (e, mascara) => {
    const { name, value } = e.target;
    let valorLimpo = value;

    if (["cpf", "telefone", "cnpj", "cpfResponsavel", "dataFundacao"].includes(name)) {
      valorLimpo = value.replace(/\D/g, "");
    }

    // NOVO: Validação em tempo real da senha
    if (name === "senha") {
      setRegrasSenha({
        tamanho: value.length >= 8,
        maiuscula: /[A-Z]/.test(value),
        minuscula: /[a-z]/.test(value),
        numero: /[0-9]/.test(value),
        especial: /[^A-Za-z0-9]/.test(value), // Qualquer coisa que não seja letra ou número
      });
    }

    setForm({ ...form, [name]: mascara ? mascara(valorLimpo) : valorLimpo });
  };

  const maskCpf = (v) => v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").slice(0, 14);
  const maskTelefone = (v) => v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  const maskCNPJ = (v) => v.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 18);
  const maskData = (v) => v.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();
    const camposUsuario = ["nome", "sobrenome", "cpf", "telefone", "email", "senha", "confirmarSenha"];
    const camposOng = ["razaoSocial", "nomeFantasia", "cnpj", "dataFundacao", "nomeResponsavel", "cpfResponsavel", "email", "senha", "confirmarSenha"];
    const camposParaValidar = opcaoSelecionada === "usuario" ? camposUsuario : camposOng;

    // NOVO: Verifica se TODAS as regras da senha foram cumpridas (todas são true)
    const senhaValida = Object.values(regrasSenha).every((regra) => regra === true);

    const temErro = camposParaValidar.some((campo) => !form[campo]) || form.senha !== form.confirmarSenha || !senhaValida;

    if (temErro) {
      setErroAtivo(true);
      setTimeout(() => setErroAtivo(false), 500);
      
      if (!senhaValida) {
        alert("A senha não cumpre todas as regras exigidas.");
      } else if (form.senha !== form.confirmarSenha) {
        alert("As senhas não coincidem.");
      }

    } else {
      alert("Cadastro realizado com sucesso!");
    }
  };

  // Componente extra para renderizar as regras da senha (evita repetição de código)
  const CaixaRegrasSenha = () => {
    if (!senhaFocada && form.senha.length === 0) return null; // Só mostra se estiver digitando ou se tiver texto

    return (
      <div className="pg-cad-regras-senha-box">
        <span className={regrasSenha.tamanho ? "regra-ok" : "regra-erro"}>
          {regrasSenha.tamanho ? <FaCheck /> : <FaTimes />} Mínimo de 8 caracteres
        </span>
        <span className={regrasSenha.maiuscula ? "regra-ok" : "regra-erro"}>
          {regrasSenha.maiuscula ? <FaCheck /> : <FaTimes />} Uma letra maiúscula
        </span>
        <span className={regrasSenha.minuscula ? "regra-ok" : "regra-erro"}>
          {regrasSenha.minuscula ? <FaCheck /> : <FaTimes />} Uma letra minúscula
        </span>
        <span className={regrasSenha.numero ? "regra-ok" : "regra-erro"}>
          {regrasSenha.numero ? <FaCheck /> : <FaTimes />} Um número
        </span>
        <span className={regrasSenha.especial ? "regra-ok" : "regra-erro"}>
          {regrasSenha.especial ? <FaCheck /> : <FaTimes />} Um caractere especial (!@#$...)
        </span>
      </div>
    );
  };

  return (
    <div className="pg-cad-container-geral">
      <section className="pg-cad-secao-principal">
        <div className="pg-cad-moldura-azul">
          <div className="pg-cad-area-conteudo">
            <h1 className="pg-cad-chamada-topo">✱ SELECIONE A OPÇÃO DE CRIAÇÃO</h1>

            <div className="pg-cad-selecao-botoes">
              <button
                className={`pg-cad-btn-selecao ${opcaoSelecionada === "usuario" ? "ativo" : ""}`}
                onClick={() => setOpcaoSelecionada("usuario")}
              >
                Cadastrar Usuário
              </button>
              <button
                className={`pg-cad-btn-selecao ${opcaoSelecionada === "ong" ? "ativo" : ""}`}
                onClick={() => setOpcaoSelecionada("ong")}
              >
                Cadastrar ONG
              </button>
            </div>

            {opcaoSelecionada === "usuario" && (
              <div className="pg-cad-bloco-animado">
                <h2 className="pg-cad-subtitulo-form">✱ CRIE SUA CONTA!</h2>
                
                {/* SEÇÃO SOCIAL LOGIN */}
                <div className="pg-cad-social-container">
                  <div className="pg-cad-divisor">
                    <span>Entre com uma conta</span>
                  </div>
                  <div className="pg-cad-social-icones">
                    <button className="pg-cad-btn-social"><FaGoogle /></button>
                    <button className="pg-cad-btn-social"><FaApple /></button>
                    <button className="pg-cad-btn-social"><FaMicrosoft /></button>
                  </div>
                </div>

                <form className="pg-cad-formulario" onSubmit={handleSubmit}>
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.nome ? "shake-anim" : ""}`}>
                      <label>✱ Nome:</label>
                      <input type="text" name="nome" className="pg-cad-campo" value={form.nome} onChange={handleChange} />
                    </div>
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.sobrenome ? "shake-anim" : ""}`}>
                      <label>✱ Sobrenome:</label>
                      <input type="text" name="sobrenome" className="pg-cad-campo" value={form.sobrenome} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.cpf ? "shake-anim" : ""}`}>
                      <label>✱ CPF:</label>
                      <input type="text" name="cpf" className="pg-cad-campo" value={form.cpf} onChange={(e) => handleChange(e, maskCpf)} placeholder="000.000.000-00" />
                    </div>
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.telefone ? "shake-anim" : ""}`}>
                      <label>✱ Telefone:</label>
                      <input type="text" name="telefone" className="pg-cad-campo" value={form.telefone} onChange={(e) => handleChange(e, maskTelefone)} placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div className={`pg-cad-grupo-input ${erroAtivo && !form.email ? "shake-anim" : ""}`}>
                    <label>✱ E-mail:</label>
                    <input type="email" name="email" className="pg-cad-campo" value={form.email} onChange={handleChange} />
                  </div>
                  
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && (!form.senha || !Object.values(regrasSenha).every(Boolean)) ? "shake-anim" : ""}`}>
                      <label>✱ Senha:</label>
                      <div className="pg-cad-caixa-senha">
                        <input 
                          type={mostrarSenha ? "text" : "password"} 
                          name="senha" 
                          className="pg-cad-campo-senha" 
                          value={form.senha} 
                          onChange={handleChange}
                          onFocus={() => setSenhaFocada(true)} // NOVO: Detecta clique
                          onBlur={() => setSenhaFocada(false)} // NOVO: Detecta saída
                        />
                        <span className="pg-cad-icone-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <CaixaRegrasSenha /> {/* NOVO: Chamando o componente de regras */}
                    </div>
                    
                    <div className={`pg-cad-grupo-input ${erroAtivo && (form.senha !== form.confirmarSenha || !form.confirmarSenha) ? "shake-anim" : ""}`}>
                      <label>✱ Confirmar Senha:</label>
                      <input type={mostrarSenha ? "text" : "password"} name="confirmarSenha" className="pg-cad-campo" value={form.confirmarSenha} onChange={handleChange} />
                    </div>
                  </div>
                  <button type="submit" className="pg-cad-btn-enviar">Criar conta</button>
                </form>
              </div>
            )}

            {opcaoSelecionada === "ong" && (
              <div className="pg-cad-bloco-animado">
                <h2 className="pg-cad-subtitulo-form">✱ CADASTRE SUA ONG</h2>
                <form className="pg-cad-formulario" onSubmit={handleSubmit}>
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.razaoSocial ? "shake-anim" : ""}`}>
                      <label>✱ Razão Social:</label>
                      <input type="text" name="razaoSocial" className="pg-cad-campo" value={form.razaoSocial} onChange={handleChange} />
                    </div>
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.nomeFantasia ? "shake-anim" : ""}`}>
                      <label>✱ Nome Fantasia:</label>
                      <input type="text" name="nomeFantasia" className="pg-cad-campo" value={form.nomeFantasia} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input pg-cad-flex-07 ${erroAtivo && !form.cnpj ? "shake-anim" : ""}`}>
                      <label>✱ CNPJ:</label>
                      <input type="text" name="cnpj" className="pg-cad-campo" value={form.cnpj} onChange={(e) => handleChange(e, maskCNPJ)} placeholder="00.000.000/0000-00" />
                    </div>
                    <div className={`pg-cad-grupo-input pg-cad-flex-05 ${erroAtivo && !form.dataFundacao ? "shake-anim" : ""}`}>
                      <label>✱ Fundação:</label>
                      <input type="text" name="dataFundacao" className="pg-cad-campo" value={form.dataFundacao} onChange={(e) => handleChange(e, maskData)} placeholder="00/00/0000" />
                    </div>
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.telefone ? "shake-anim" : ""}`}>
                      <label>✱ Telefone:</label>
                      <input type="text" name="telefone" className="pg-cad-campo" value={form.telefone} onChange={(e) => handleChange(e, maskTelefone)} placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.nomeResponsavel ? "shake-anim" : ""}`}>
                      <label>✱ Nome do Responsável:</label>
                      <input type="text" name="nomeResponsavel" className="pg-cad-campo" value={form.nomeResponsavel} onChange={handleChange} />
                    </div>
                    <div className={`pg-cad-grupo-input ${erroAtivo && !form.cpfResponsavel ? "shake-anim" : ""}`}>
                      <label>✱ CPF do Responsável:</label>
                      <input type="text" name="cpfResponsavel" className="pg-cad-campo" value={form.cpfResponsavel} onChange={(e) => handleChange(e, maskCpf)} placeholder="000.000.000-00" />
                    </div>
                  </div>
                  <div className={`pg-cad-grupo-input ${erroAtivo && !form.email ? "shake-anim" : ""}`}>
                    <label>✱ E-mail:</label>
                    <input type="email" name="email" className="pg-cad-campo" value={form.email} onChange={handleChange} />
                  </div>
                  
                  <div className="pg-cad-linha-campos">
                    <div className={`pg-cad-grupo-input ${erroAtivo && (!form.senha || !Object.values(regrasSenha).every(Boolean)) ? "shake-anim" : ""}`}>
                      <label>✱ Senha:</label>
                      <div className="pg-cad-caixa-senha">
                        <input 
                          type={mostrarSenha ? "text" : "password"} 
                          name="senha" 
                          className="pg-cad-campo-senha" 
                          value={form.senha} 
                          onChange={handleChange}
                          onFocus={() => setSenhaFocada(true)}
                          onBlur={() => setSenhaFocada(false)}
                        />
                        <span className="pg-cad-icone-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <CaixaRegrasSenha /> {/* NOVO: Chamando o componente de regras */}
                    </div>

                    <div className={`pg-cad-grupo-input ${erroAtivo && (form.senha !== form.confirmarSenha || !form.confirmarSenha) ? "shake-anim" : ""}`}>
                      <label>✱ Confirmar Senha:</label>
                      <input type={mostrarSenha ? "text" : "password"} name="confirmarSenha" className="pg-cad-campo" value={form.confirmarSenha} onChange={handleChange} />
                    </div>
                  </div>
                  <button type="submit" className="pg-cad-btn-enviar">Cadastrar ONG</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CadastroUser;