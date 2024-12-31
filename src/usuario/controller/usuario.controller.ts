import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';


@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  criarUsuario(@Body() usuario) {
    return this.usuarioService.criarUsuario(usuario);
  }

  @Get()
  listarUsuarios() {
    return this.usuarioService.listarUsuarios();
  }
}
