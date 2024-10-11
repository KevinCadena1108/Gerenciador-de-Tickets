import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AddBalanceDto } from './dto/add_balance.dto';
import { SaldoService } from './saldo.service';
import { GetCurrentUser } from 'src/auth/decorator/get_current_user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('saldo')
@UseGuards(JwtGuard)
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Post('adicionar/:cpf')
  async add(@GetCurrentUser() user: any, @Param('cpf') cpf: string, @Body() dto: AddBalanceDto) {
    return await this.saldoService.addBalance(user, cpf, dto.saldo);
  }
}
