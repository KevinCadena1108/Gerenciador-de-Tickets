import { IsNumber, Min } from 'class-validator';

export class AddBalanceDto {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O saldo deve ser um número!' })
  @Min(0, { message: 'O saldo deve ser um número positivo!' })
  saldo: number;
}
