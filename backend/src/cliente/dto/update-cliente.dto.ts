import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsString, Length, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @MinLength(3, { message: 'O email deve ter no mínimo 3 caracteres' })
  @MaxLength(320, { message: 'O email deve ter no máximo 320 caracteres' })
  email: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @MinLength(8, { message: 'O telefone deve ter no mínimo 8 caracteres' })
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
  telefone: string;

  @IsOptional()
  @IsDateString({}, { message: 'O nascimento deve ser uma data válida' })
  nascimento: Date;

  @IsOptional()
  @IsInt({ message: 'O id da categoria deve ser um número maior que zero' })
  @Min(0, { message: 'O id da categoria deve ser um maior que zero' })
  idCategoria: number;

  @IsOptional()
  @IsString({ message: 'O número de matrícula deve ser uma string' })
  @IsNotEmpty({ message: 'O número de matrícula não pode ser vazio' })
  @Length(10, 10, { message: 'O número de matrícula deve ter 10 caracteres' })
  numeroMatricula: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve possuir ao menos 8 caracteres' })
  senha: string;
}
