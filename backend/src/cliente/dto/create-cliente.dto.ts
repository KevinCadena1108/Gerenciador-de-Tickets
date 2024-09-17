import { Exclude } from 'class-transformer';
import { IsDateString, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { IsString, Length, MaxLength, Min, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio' })
  @Length(11, 11, { message: 'O CPF deve ter 11 caracteres' })
  cpf: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @MinLength(3, { message: 'O email deve ter no mínimo 3 caracteres' })
  @MaxLength(320, { message: 'O email deve ter no máximo 320 caracteres' })
  email: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @MinLength(8, { message: 'O telefone deve ter no mínimo 8 caracteres' })
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
  telefone: string;

  @IsDateString({}, { message: 'O nascimento deve ser uma data válida' })
  nascimento: Date;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Exclude()
  senha: string;

  @IsInt({ message: 'O id da categoria deve ser um número inteiro' })
  @Min(0, { message: 'O id da categoria deve ser um número positivo' })
  idCategoria: number;

  @IsString({ message: 'O número de matrícula deve ser uma string' })
  @IsNotEmpty({ message: 'O número de matrícula não pode ser vazio' })
  @Length(10, 10, { message: 'O número de matrícula deve ter 10 caracteres' })
  numeroMatricula: string;
}