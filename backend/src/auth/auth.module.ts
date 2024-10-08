import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [ClienteModule],
})
export class AuthModule {}
