import { IsNumber, Max, Min } from 'class-validator';

export class AddBalanceDto {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O saldo deve ser um número!' })
  @Min(0, { message: 'O saldo deve ser um número positivo!' })
  @Max(1000, { message: 'O saldo não pode ultrapassar R$1000.00!' })
  saldo: number;
}
