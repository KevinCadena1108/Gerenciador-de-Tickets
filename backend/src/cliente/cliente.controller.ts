import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  @Get('pesquisar')
  async search(
    @Query('matricula') matricula?: string,
    @Query('cpf') cpf?: string,
    @Query('nome') nome?: string,
  ) {
    return await this.clienteService.searchMany({
      AND: [
        {
          matricula: {
            matricula: {
              contains: matricula,
              mode: 'insensitive',
            },
          },
        },
        {
          cpf: {
            contains: cpf,
            mode: 'insensitive',
          },
        },
        {
          nome: {
            contains: nome,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  @Get(':cpf')
  async searchByCPF(@Param('cpf') cpf: string) {
    return await this.clienteService.searchByCPF(cpf);
  }

  @Put(':cpf')
  async updateCliente(@Body() updateClienteDto: UpdateClienteDto, @Param('cpf') cpf: string) {
    return await this.clienteService.updateCliente(cpf, updateClienteDto);
  }
}
