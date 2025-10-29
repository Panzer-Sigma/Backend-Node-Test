import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Pokemon Module Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('REST API Tests', () => {
    let createdPokemonId: number;

    it('POST /pokemon - should create a new pokemon', async () => {
      const response = await request(app.getHttpServer())
        .post('/pokemon')
        .send({
          name: 'testmon',
          type: 'TEST',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('testmon');
      expect(response.body.type).toBe('TEST');
      createdPokemonId = response.body.id;
    });

    it('GET /pokemon - should return all pokemon', async () => {
      const response = await request(app.getHttpServer())
        .get('/pokemon')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /pokemon/:id - should return a specific pokemon', async () => {
      const response = await request(app.getHttpServer())
        .get('/pokemon/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('type');
    });

    it('PUT /pokemon/:id - should update a pokemon', async () => {
      const response = await request(app.getHttpServer())
        .put('/pokemon/1')
        .send({
          name: 'updated-bulbasaur',
          type: 'GRASS',
        })
        .expect(200);

      expect(response.body.name).toBe('updated-bulbasaur');
    });

    it('DELETE /pokemon/:id - should delete a pokemon', async () => {
      // First create a pokemon to delete
      const createResponse = await request(app.getHttpServer())
        .post('/pokemon')
        .send({
          name: 'to-delete',
          type: 'TEST',
        });

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/pokemon/${createResponse.body.id}`)
        .expect(200);

      expect(deleteResponse.body).toHaveProperty('message');
    });
  });

  describe('GraphQL API Tests', () => {
    it('Query findManyPokemon - should return all pokemon', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              findManyPokemon {
                id
                name
                type
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.errors).toBeUndefined();
      expect(Array.isArray(response.body.data.findManyPokemon)).toBe(true);
    });

    it('Mutation createOnePokemon - should create a new pokemon', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createOnePokemon(data: { name: "graphql-test", type: "TEST" }) {
                id
                name
                type
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.createOnePokemon).toHaveProperty('id');
      expect(response.body.data.createOnePokemon.name).toBe('graphql-test');
    });
  });
});
