import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from 'src/repository/repository.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [JwtModule.register({}), RepositoryModule],
})
export class AuthModule {}
