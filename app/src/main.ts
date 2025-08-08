import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = process.env.NODE_ENV === 'production';

  /**
   * valiationPipe 로그
   */
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  /**
   * 1. Error 로깅 시스템 연결
   * EX> sentry, logstash, newrelic
   */

  /**
   * API 문서화 적용
   */
  const config = new DocumentBuilder()
    .setTitle('API 문서')
    .setDescription('API 설명서입니다.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
