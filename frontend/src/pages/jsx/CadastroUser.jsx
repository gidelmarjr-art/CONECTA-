import React, { useState } from "react";
import "../css/CadastroUser.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CadastroUser = () => {
  const [aberto, setAberto] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  // Estados dos Campos
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

  // Função genérica para atualizar campos e garantir apenas números onde necessário
  const handleChange = (e, mascara) => {
    const { name, value } = e.target;
    let valorLimpo = value;

    if (
      ["cpf", "telefone", "cnpj", "cpfResponsavel", "dataFundacao"].includes(
        name,
      )
    ) {
      valorLimpo = value.replace(/\D/g, "");
    }

    setForm({ ...form, [name]: mascara ? mascara(valorLimpo) : valorLimpo });
  };

  // Máscaras
  const maskCpf = (v) =>
    v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  const maskTelefone = (v) =>
    v
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  const maskCNPJ = (v) =>
    v
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  const maskData = (v) =>
    v
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);

  const selecionar = (valor) => {
    setOpcaoSelecionada(valor);
    setAberto(false);
    setErroAtivo(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposUsuario = [
      "nome",
      "sobrenome",
      "cpf",
      "telefone",
      "email",
      "senha",
      "confirmarSenha",
    ];
    const camposOng = [
      "razaoSocial",
      "nomeFantasia",
      "cnpj",
      "dataFundacao",
      "nomeResponsavel",
      "cpfResponsavel",
      "email",
      "senha",
      "confirmarSenha",
    ];

    const camposParaValidar =
      opcaoSelecionada === "usuario" ? camposUsuario : camposOng;

    const temErro =
      camposParaValidar.some((campo) => !form[campo]) ||
      form.senha !== form.confirmarSenha;

    if (temErro) {
      setErroAtivo(true);
      setTimeout(() => setErroAtivo(false), 500);
    } else {
      alert("Cadastro realizado com sucesso!");
    }
  };

  return (
    <div className="pg-cad-container-geral">
      <section className="pg-cad-secao-principal">
        <div className="pg-cad-moldura-azul">
          <div className="pg-cad-area-conteudo">
            <h1 className="pg-cad-chamada-topo">
              ✱ SELECIONE A OPÇÃO DE CRIAÇÃO
            </h1>

            <div className={`pg-cad-dropdown-custom ${aberto ? "ativo" : ""}`}>
              <button
                className="pg-cad-btn-dropdown"
                onClick={() => setAberto(!aberto)}
              >
                {opcaoSelecionada === ""
                  ? "Selecione Uma Opção"
                  : opcaoSelecionada === "usuario"
                    ? "Cadastrar Usuário"
                    : "Cadastrar ONG"}
                <span className="pg-cad-seta"></span>
              </button>
              <div className="pg-cad-lista-opcoes">
                <div
                  className="pg-cad-item-opcao"
                  onClick={() => selecionar("usuario")}
                >
                  Cadastrar Usuário
                </div>
                <div
                  className="pg-cad-item-opcao"
                  onClick={() => selecionar("ong")}
                >
                  Cadastrar ONG
                </div>
              </div>
            </div>

            {/* FORMULÁRIO USUÁRIO */}
            {opcaoSelecionada === "usuario" && (
              <div className="pg-cad-bloco-animado">
                <h2 className="pg-cad-subtitulo-form">✱ CRIE SUA CONTA!</h2>
                <form className="pg-cad-formulario" onSubmit={handleSubmit}>
                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.nome ? "shake-anim" : ""}`}
                    >
                      <label>✱ Nome:</label>
                      <input
                        type="text"
                        name="nome"
                        className="pg-cad-campo"
                        value={form.nome}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.sobrenome ? "shake-anim" : ""}`}
                    >
                      <label>✱ Sobrenome:</label>
                      <input
                        type="text"
                        name="sobrenome"
                        className="pg-cad-campo"
                        value={form.sobrenome}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.cpf ? "shake-anim" : ""}`}
                    >
                      <label>✱ CPF:</label>
                      <input
                        type="text"
                        name="cpf"
                        className="pg-cad-campo"
                        value={form.cpf}
                        onChange={(e) => handleChange(e, maskCpf)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.telefone ? "shake-anim" : ""}`}
                    >
                      <label>✱ Telefone:</label>
                      <input
                        type="text"
                        name="telefone"
                        className="pg-cad-campo"
                        value={form.telefone}
                        onChange={(e) => handleChange(e, maskTelefone)}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div
                    className={`pg-cad-grupo-input ${erroAtivo && !form.email ? "shake-anim" : ""}`}
                  >
                    <label>✱ E-mail:</label>
                    <input
                      type="email"
                      name="email"
                      className="pg-cad-campo"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.senha ? "shake-anim" : ""}`}
                    >
                      <label>✱ Senha:</label>
                      <div className="pg-cad-caixa-senha">
                        <input
                          type={mostrarSenha ? "text" : "password"}
                          name="senha"
                          className="pg-cad-campo-senha"
                          value={form.senha}
                          onChange={handleChange}
                        />
                        <span
                          className="pg-cad-icone-olho"
                          onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && (form.senha !== form.confirmarSenha || !form.confirmarSenha) ? "shake-anim" : ""}`}
                    >
                      <label>✱ Confirmar Senha:</label>
                      <input
                        type={mostrarSenha ? "text" : "password"}
                        name="confirmarSenha"
                        className="pg-cad-campo"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="pg-cad-btn-enviar">
                    Criar conta
                  </button>
                </form>
              </div>
            )}

            {/* FORMULÁRIO ONG */}
            {opcaoSelecionada === "ong" && (
              <div className="pg-cad-bloco-animado">
                <h2 className="pg-cad-subtitulo-form">✱ CADASTRE SUA ONG</h2>
                <form className="pg-cad-formulario" onSubmit={handleSubmit}>
                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.razaoSocial ? "shake-anim" : ""}`}
                    >
                      <label>✱ Razão Social:</label>
                      <input
                        type="text"
                        name="razaoSocial"
                        className="pg-cad-campo"
                        value={form.razaoSocial}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.nomeFantasia ? "shake-anim" : ""}`}
                    >
                      <label>✱ Nome Fantasia:</label>
                      <input
                        type="text"
                        name="nomeFantasia"
                        className="pg-cad-campo"
                        value={form.nomeFantasia}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input pg-cad-flex-07 ${erroAtivo && !form.cnpj ? "shake-anim" : ""}`}
                    >
                      <label>✱ CNPJ:</label>
                      <input
                        type="text"
                        name="cnpj"
                        className="pg-cad-campo"
                        value={form.cnpj}
                        onChange={(e) => handleChange(e, maskCNPJ)}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input pg-cad-flex-05 ${erroAtivo && !form.dataFundacao ? "shake-anim" : ""}`}
                    >
                      <label>✱ Fundação:</label>
                      <input
                        type="text"
                        name="dataFundacao"
                        className="pg-cad-campo"
                        value={form.dataFundacao}
                        onChange={(e) => handleChange(e, maskData)}
                        placeholder="00/00/0000"
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.telefone ? "shake-anim" : ""}`}
                    >
                      <label>✱ Telefone:</label>
                      <input
                        type="text"
                        name="telefone"
                        className="pg-cad-campo"
                        value={form.telefone}
                        onChange={(e) => handleChange(e, maskTelefone)}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.nomeResponsavel ? "shake-anim" : ""}`}
                    >
                      <label>✱ Nome do Responsável:</label>
                      <input
                        type="text"
                        name="nomeResponsavel"
                        className="pg-cad-campo"
                        value={form.nomeResponsavel}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.cpfResponsavel ? "shake-anim" : ""}`}
                    >
                      <label>✱ CPF do Responsável:</label>
                      <input
                        type="text"
                        name="cpfResponsavel"
                        className="pg-cad-campo"
                        value={form.cpfResponsavel}
                        onChange={(e) => handleChange(e, maskCpf)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div
                    className={`pg-cad-grupo-input ${erroAtivo && !form.email ? "shake-anim" : ""}`}
                  >
                    <label>✱ E-mail:</label>
                    <input
                      type="email"
                      name="email"
                      className="pg-cad-campo"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* NOVOS CAMPOS DE SENHA PARA ONG */}
                  <div className="pg-cad-linha-campos">
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && !form.senha ? "shake-anim" : ""}`}
                    >
                      <label>✱ Senha:</label>
                      <div className="pg-cad-caixa-senha">
                        <input
                          type={mostrarSenha ? "text" : "password"}
                          name="senha"
                          className="pg-cad-campo-senha"
                          value={form.senha}
                          onChange={handleChange}
                        />
                        <span
                          className="pg-cad-icone-olho"
                          onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`pg-cad-grupo-input ${erroAtivo && (form.senha !== form.confirmarSenha || !form.confirmarSenha) ? "shake-anim" : ""}`}
                    >
                      <label>✱ Confirmar Senha:</label>
                      <input
                        type={mostrarSenha ? "text" : "password"}
                        name="confirmarSenha"
                        className="pg-cad-campo"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="pg-cad-btn-enviar">
                    Cadastrar ONG
                  </button>
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
