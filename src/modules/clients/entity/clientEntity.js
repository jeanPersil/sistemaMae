export class ClientEntity {
  constructor({
    id,
    name,
    phone,
    email,
    neighborhood,
    fk_city,
    howDidYouHear,
    birthday,
    notes,
    criado_em,
    atualizado_em,
  }) {
    if (!name) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.neighborhood = neighborhood;
    this.fk_city = fk_city;
    this.howDidYouHear = howDidYouHear;
    this.birthday = birthday ? new Date(birthday) : null;
    this.notes = notes;
    this.criado_em = criado_em || new Date();
    this.atualizado_em = atualizado_em || new Date();
  }

  isAniversarianteDoMes(mesAtual) {
    if (!this.birthday) return false;

    return this.birthday.getMonth() + 1 === mesAtual;
  }

  atualizarDados({
    name,
    phone,
    email,
    neighborhood,
    fk_city,
    notes,
    birthday,
  }) {
    if (name) this.name = name;
    if (phone) this.phone = phone;
    if (email) this.email = email;
    if (neighborhood) this.neighborhood = neighborhood;
    if (fk_city) this.fk_city = fk_city;
    if (birthday) this.birthday = birthday;

    if (notes !== undefined) this.notes = notes;
  }

  adicionarObservacao(novaObservacao) {
    if (!this.notes) {
      this.notes = novaObservacao;
    } else {
      this.notes = `${this.notes} | ${novaObservacao}`;
    }
    this.atualizado_em = new Date();
  }

  dadosPublicos() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      neighborhood: this.neighborhood,
      fk_city: this.fk_city,
      howDidYouHear: this.howDidYouHear,
      birthday: this.birthday,
      notes: this.notes,
    };
  }
}
