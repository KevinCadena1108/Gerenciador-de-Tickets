import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';

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
  async getByMatricula(@Param('matricula') matricula: string) {
    return await this.clienteService.getManyByMatricula(matricula);
  }

  @Get('cpf/:cpf')
  async getByCpf(@Param('cpf') cpf: string) {
    return await this.clienteService.getManyByCpf(cpf);
  }

  @Get('nome/:nome')
  async getByNome(@Param('nome') nome: string) {
    return await this.clienteService.getByNome(nome);
  }

  @Put(':cpf')
  async updateCliente(
    @Body() updateClienteDto: Partial<UpdateClienteDto>,
    @Param('cpf') cpf: string,
  ) {
    return await this.clienteService.updateCliente(cpf, updateClienteDto);
  }
}
