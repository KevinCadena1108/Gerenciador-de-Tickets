import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagemService } from './imagem.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('imagem')
export class ImagemController {
  constructor(
    private readonly imagemService: ImagemService,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload/:cpf')
  @UseGuards(JwtGuard, AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imagens',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@Param('cpf') cpf: string, @UploadedFile() file: Express.Multer.File) {
    return await this.imagemService.saveImage(cpf, file);
  }

  @Get('download/:cpf')
  async download(@Param('cpf') cpf: string, @Query('api-key') apiKey: string) {
    if (apiKey !== this.configService.get('DOWNLOAD_API_KEY'))
      throw new UnauthorizedException('API Key inválida!');

    return await this.imagemService.download(cpf);
  }
}
