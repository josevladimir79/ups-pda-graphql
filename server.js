import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { resolvers } from './resolvers.optimized.js';
import { createLoaders } from './dataloaders.js';
import { db } from './database.js';

// 4. INICIALIZACIÓN DEL SERVIDOR
const server = new ApolloServer({
    typeDefs: loadFilesSync(`${import.meta.dirname}/schema.graphql`),
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
        db,
        loaders: createLoaders(db),
    }),
});

console.log(`🚀 Servidor listo en Académico listo en: ${url}`);
