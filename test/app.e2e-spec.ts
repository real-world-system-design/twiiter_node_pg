import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppService } from './../src/app.service';
import { AppController } from './../src/app.controller';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
  });

  it('/ (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/hello',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe('Hello World!');
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
