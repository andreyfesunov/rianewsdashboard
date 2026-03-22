import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { application } from './application';
import { infrastructure } from './infrastructure';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExporterEnv } from '@/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>(ExporterEnv.key, ExporterEnv.defaultValue),
        maxRetries: 3,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [...application, ...infrastructure],
})
export class NewsModule {}
