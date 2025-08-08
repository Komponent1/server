import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => {
        return service.getTypeOrmConfig({ entities: [__dirname + '/**/entity/*.entity{.ts,.js}'] });
      },
      inject: [ConfigService],
    }),
    ReservationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
