import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  ValidationError,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: errors.map((error) => {
              return {
                property: error.property,
                constraints: error.constraints,
              };
            }),
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
