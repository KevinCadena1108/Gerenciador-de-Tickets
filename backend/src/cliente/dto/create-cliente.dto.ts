import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(320)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  telefone: string;

  @IsDate()
  nascimento: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Exclude()
  senha: string;

  @IsInt()
  @Min(0)
  idCategoria: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  numeroMatricula: string;
}
