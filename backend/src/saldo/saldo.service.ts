import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClienteRepository } from 'src/repository/cliente.repository';

@Injectable()
export class SaldoService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async addBalance(user: any, cpf: string, balance: number) {
    if (user.cpf !== cpf) {
      const userCliente = await this.clienteRepository.getOneByCPF(user.cpf);
      if (!userCliente || !userCliente.isAdministrador) throw new UnauthorizedException();
    }

    const cliente = await this.clienteRepository.getOneByCPF(cpf);
    if (!cliente) throw new NotFoundException('O CPF não foi encontrado');

    const newBalance = cliente.saldo.add(balance);
    const newCliente = await this.clienteRepository.update({ saldo: newBalance }, { cpf });

    if (!newCliente) throw new BadRequestException('Ocorreu um erro ao atualizar o saldo!');
    return { saldo: newCliente.saldo };
  }

  async getSaldo(cpf: string) {
    const cliente = await this.clienteRepository.getOneByCPF(cpf);
    if (!cliente) throw new NotFoundException('O CPF não foi encontrado');
    return { saldo: cliente.saldo };
  }
}
