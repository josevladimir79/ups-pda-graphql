// RESOLUTORES (IMPLEMENTACIÓN INGENUA)
// Los estudiantes deberán modificar este archivo para inyectar el DataLoader desde el contexto
export const resolvers = {
    Query: {
        clientes: async (_parent, _args, { db }) => await db.fetchAllClientes(),
        clientesOptimizados: async (_parent, _args, { db }) => await db.fetchAllClientes(),
    },
    Cliente: {
        facturas: async (parent, _args, { db }) => {
            // El 'parent' es el cliente actual. GraphQL llama a esta función por CADA cliente devuelto.
            return await db.fetchFacturasByClienteId(parent.id);
        }
    },
    ClienteOptimizado: {
        facturas: async (parent, _args, { loaders }) => {
            // Cada cliente encola su id; el DataLoader agrupa todas las llamadas del mismo tick
            // en una sola invocación a db.fetchFacturasByClienteIdsBatch.
            return await loaders.facturasPorCliente.load(parent.id);
        }
    }
};
