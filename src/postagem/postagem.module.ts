import { Module } from '@nestjs/common';
import { PostagemController } from './controller/postagem.controller';
import { PostagemService } from './service/postagem.service';
import { CassandraModule } from '../data/cassandra.module';

@Module({
  imports: [CassandraModule],
  providers: [PostagemService],
  controllers: [PostagemController],
})
export class PostagemModule {}
