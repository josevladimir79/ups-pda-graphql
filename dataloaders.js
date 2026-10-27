import DataLoader from 'dataloader';

export const createLoaders = (db) => ({
    facturasPorCliente: new DataLoader((clienteIds) => db.fetchFacturasByClienteIdsBatch(clienteIds)),
});
