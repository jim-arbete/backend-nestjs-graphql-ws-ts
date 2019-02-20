import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
// bugfix => --detectOpenHandles --forceExit => added this to jest config in package.json

describe('AppController (e2e)', () => {
  let app;
  let authToken;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/homes (GET) => should show that we are NOT authorized', (done) => {
    return request(app.getHttpServer())
      .get('/homes')
      .expect(401)
      .expect({statusCode: 401, error: 'Unauthorized'})
      .end(done);
  });

  it('/homes (GET) => should show that we ARE authorized', (done) => {
    authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIn0.Pt_bG1sexU2z0yQYFbAd-n47_EQpEfUkeIvpjtLUgLw';
    return request(app.getHttpServer())
      .get('/homes')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end(done);
  });

  afterAll( async () => {
    return await app.close();
  });
});
