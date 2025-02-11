import { Module } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { ServiceModule } from './controller/service/service.module';
import { ControllerService } from './config/controller/controller.service';
import { ConfigController } from './config/config.controller';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './common/prisma/prisma.module';
@Module({
  imports: [AuthModule, ServiceModule, ConfigModule, PrismaModule],
  controllers: [ConfigController],
  providers: [AuthService, ControllerService],
})
export class AppModule {}
