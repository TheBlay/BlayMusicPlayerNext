import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({ logger: true });

// Configuração do Swagger
fastify.register(swagger, {
  swagger: {
    info: { // Descreve o projeto que o Swagger documenta
      title: 'Blay Music Player API',
      description: 'Documentação da API do Blay Music Player',
      version: '1.0.0',
      contact: {
    name: 'Henrique Blay Barboza',
    email: 'henriblay12@gmail.com'
  }
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

fastify.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Rotas
fastify.get('/ping', async () => {
  return { msg: 'pong' };
});

// Inicialização
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};


start();