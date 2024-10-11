import { Module } from '@nestjs/common';
import { SaldoController } from './saldo.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { SaldoService } from './saldo.service';

@Module({
  controllers: [SaldoController],
  imports: [RepositoryModule],
  providers: [SaldoService],
})
export class SaldoModule {}
