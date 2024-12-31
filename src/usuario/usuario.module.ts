import { Module } from '@nestjs/common';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';
import { CassandraModule } from '../data/cassandra.module';

@Module({
  imports: [CassandraModule],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
