import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PostagemService } from '../service/postagem.service';

@Controller('postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Post()
  criarPostagem(@Body() postagem) {
    return this.postagemService.criarPostagem(postagem);
  }

  @Get()
  listarPostagens() {
    return this.postagemService.listarPostagens();
  }

  @Get('/:id')
  consultarPostagemPorId(@Param('id') id: string) {
    return this.postagemService.consultarPostagemPorId(id);
  }

  @Get('/conteudo/:conteudo')
  consultarPostagemPorConteudo(@Param('conteudo') conteudo: string) {
    return this.postagemService.consultarPostagemPorConteudo(conteudo);
  }

  @Put()
  atualizarPostagem(
    @Body() postagemAtualizada: any,
  ) {
    return this.postagemService.atualizarPostagem(postagemAtualizada);
  }

  @Delete(':id')
  deletarPostagem(@Param('id') id: string) {
    return this.postagemService.deletarPostagem(id);
  }
}