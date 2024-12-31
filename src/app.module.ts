// app.module.ts
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PostagemModule } from './postagem/postagem.module';
import { CassandraModule } from './data/cassandra.module';

@Module({
  imports: [
    CassandraModule,
    UsuarioModule,
    PostagemModule,
  ],
})
export class AppModule {}
