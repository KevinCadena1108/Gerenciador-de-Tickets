import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { MatriculaModule } from './matricula/matricula.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ClienteModule,
    MatriculaModule,
    CategoriaModule,
    SaldoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
