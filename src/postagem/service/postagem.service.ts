import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostagemService {
  constructor(
    @Inject('CASSANDRA_CLIENT') private readonly cassandraClient: Client,
  ) {}

  async listarPostagens() {
    const query = 'SELECT * FROM postagem';
    const result = await this.cassandraClient.execute(query);
    return result.rows;
  }

  async consultarPostagemPorId(id: string) {
    const query = 'SELECT * FROM postagem WHERE id = ?';
    const result = await this.cassandraClient.execute(query, [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundException('Postagem não encontrada');
    }
    
    return result.rows[0];
  }

  async consultarPostagemPorConteudo(conteudo: string) {
    const query = 'SELECT * FROM postagem';
    const result = await this.cassandraClient.execute(query);
    
    // Filtra os resultados na aplicação
    const filteredRows = result.rows.filter(row => 
      row.conteudo.toLowerCase().includes(conteudo.toLowerCase())
    );
    
    return filteredRows;
  }

  async criarPostagem(postagem) {
    const id = uuidv4();
    const dataCriacao = new Date();
    const query = `INSERT INTO postagem (id, usuario_id, conteudo, data_criacao)
                   VALUES (?, ?, ?, ?)`;
    await this.cassandraClient.execute(query, [
      id,
      postagem.usuario_id,
      postagem.conteudo,
      dataCriacao,
    ], { prepare: true });
    return { message: 'Postagem criada com sucesso!' };
  }

  async atualizarPostagem(postagemAtualizada: any) {
    // Primeiro verifica se a postagem existe
    const postagem = await this.consultarPostagemPorId(postagemAtualizada.id);
    
    const query = `UPDATE postagem 
                   SET conteudo = ?
                   WHERE id = ?`;
                   
    await this.cassandraClient.execute(query, [
      postagemAtualizada.conteudo,
      postagemAtualizada.id,
    ]);
    
    return { message: 'Postagem atualizada com sucesso!' };
  }

  async deletarPostagem(id: string) {
    // Primeiro verifica se a postagem existe
    await this.consultarPostagemPorId(id);
    
    const query = 'DELETE FROM postagem WHERE id = ?';
    await this.cassandraClient.execute(query, [id]);
    
    return { message: 'Postagem deletada com sucesso!' };
  }
}