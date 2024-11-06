import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ConfigService } from '@nestjs/config';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.createCliente(createClienteDto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get()
  async getAll() {
    return await this.clienteService.getAll();
  }

  @Get('api')
  async getAllApi(@Query('api-key') apiKey: string) {
    if (this.configService.get('DOWNLOAD_API_KEY') !== apiKey)
      throw new UnauthorizedException('API Key inválida!');

    return await this.clienteService.getAll();
  }

  @UseGuards(JwtGuard, AdminGuard)
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

  @UseGuards(JwtGuard, AdminGuard)
  @Get(':cpf')
  async searchByCPF(@Param('cpf') cpf: string) {
    return await this.clienteService.searchByCPF(cpf);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Put(':cpf')
  async updateCliente(@Body() updateClienteDto: UpdateClienteDto, @Param('cpf') cpf: string) {
    return await this.clienteService.updateCliente(cpf, updateClienteDto);
  }
}
