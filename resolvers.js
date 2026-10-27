// RESOLUTORES (IMPLEMENTACIÓN INGENUA)
// Los estudiantes deberán modificar este archivo para inyectar el DataLoader desde el contexto
export const resolvers = {
    Query: {
        clientes: async (_parent, _args, { db }) => await db.fetchAllClientes(),
    },
    Cliente: {
        facturas: async (parent, _args, { db }) => {
            // El 'parent' es el cliente actual. GraphQL llama a esta función por CADA cliente devuelto.
            return await db.fetchFacturasByClienteId(parent.id);
        }
    }
};
