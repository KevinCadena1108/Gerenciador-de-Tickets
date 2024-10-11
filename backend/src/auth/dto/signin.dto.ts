import { IsNotEmpty } from 'class-validator';
import { IsString, Length, MinLength } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio' })
  @Length(11, 11, { message: 'O CPF deve ter 11 caracteres' })
  cpf: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  senha: string;
}
