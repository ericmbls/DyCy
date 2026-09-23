import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsuariosModule } from '@modules/usuarios/usuarios.module';
import { CultivosModule } from '@modules/cultivos/cultivos.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { ReportesModule } from '@modules/reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    CultivosModule,
    DashboardModule,
    ReportesModule,
  ],
})
export class AppModule {}