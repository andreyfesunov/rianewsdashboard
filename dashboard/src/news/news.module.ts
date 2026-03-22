import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { application } from './application';
import { infrastructure } from './infrastructure';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>(
          'EXPORTER_BASE_URL',
          'http://localhost:8000',
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [...application, ...infrastructure],
})
export class NewsModule {}
