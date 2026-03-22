import { ExporterEnv } from '@/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { application } from './application';
import { infrastructure } from './infrastructure';
import { presentation } from './presentation';

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
  controllers: [...presentation],
  providers: [...application, ...infrastructure],
})
export class NewsModule {}
