import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('CASSANDRA_CLIENT') private readonly cassandraClient: Client,
  ) {}


  async criarUsuario(usuario) {
    const id = uuidv4();
    const dataCriacao = new Date(); 
    const query = `INSERT INTO usuario (id, nome, email, senha, data_criacao)
                   VALUES (?, ?, ?, ?, ?)`;
    await this.cassandraClient.execute(query, [
      id,
      usuario.nome,
      usuario.email,
      usuario.senha,
      dataCriacao,
    ]);
    return { message: 'Usuário criado com sucesso!' };
  }

  async listarUsuarios() {
    const query = 'SELECT * FROM usuario';
    const result = await this.cassandraClient.execute(query);
    return result.rows;
  }
}
