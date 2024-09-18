import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';
import { SearchClienteNomeDto } from './dto/search-cliente-nome.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.createCliente(createClienteDto);
  }

  @Get()
  async getAll() {
    return await this.clienteService.getAll();
  }

  @Get('matricula/:matricula')
  async getByMatricula(matricula: string) {
    return await this.clienteService.getByMatricula(matricula);
  }

  @Get('cpf/:cpf')
  async getByCpf(cpf: string) {
    return await this.clienteService.getByCpf(cpf);
  }

  @Get('nome')
  async getByNome(@Body() nome: SearchClienteNomeDto) {
    return await this.clienteService.getByNome(nome.nome);
  }
}
