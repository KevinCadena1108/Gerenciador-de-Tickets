import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchClienteNomeDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome: string;
}
