import { IsDateString, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { IsString, Length, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateClienteDto {
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
  
    @IsInt({ message: 'O id da categoria deve ser um número maior que zero' })
    @Min(0, { message: 'O id da categoria deve ser um maior que zero' })
    idCategoria: number;
  
    @IsString({ message: 'O número de matrícula deve ser uma string' })
    @IsNotEmpty({ message: 'O número de matrícula não pode ser vazio' })
    @Length(10, 10, { message: 'O número de matrícula deve ter 10 caracteres' })
    numeroMatricula: string;
}