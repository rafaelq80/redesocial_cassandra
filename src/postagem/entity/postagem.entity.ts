export class Postagem {
    id: string; // PRIMARY KEY
    usuario_id: string; // FK para o Usuário
    conteudo: string;
    data_criacao: Date;
  }
  