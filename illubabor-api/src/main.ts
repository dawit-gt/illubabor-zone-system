import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = process.env.API_PREFIX ?? 'api/v1';
  app.setGlobalPrefix(prefix);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const productionOrigin = process.env.FRONTEND_URL;
  const vercelPreviewRegex = /^https:\/\/illubabor-web-.*\.vercel\.app$/;

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin === productionOrigin || vercelPreviewRegex.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Illubabor Zone API running on port ${port} (prefix: /${prefix})`);
}
bootstrap();
