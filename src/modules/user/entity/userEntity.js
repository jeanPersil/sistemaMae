export class User {
  constructor({ id, nome, email, senha, role, ativo = true, criado_em }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.role = role;
    this.ativo = ativo;
    this.criado_em = criado_em || new Date();
  }

  isAdmin() {
    return this.role === "admin";
  }

  isAtivo() {
    return this.ativo === true;
  }

  dadosPublicos() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      role: this.role,
    };
  }

  atualizarDados({ nome, email }) {
    if (nome) this.nome = nome;
    if (email) this.email = email;
  }
}
