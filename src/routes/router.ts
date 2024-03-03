import express from 'express'
import { customer } from '../controllers/customer';

export const router = () => {
    const itensRouter = express.Router();
    const {
        listCustomers,
        saveCustomers,
        removeCustomers,
        updateCustomers
    } = customer();

    itensRouter
        .post('/v1/customer', saveCustomers)
        .get('/v1/customer', listCustomers)
        .delete('/v1/customer/:id', removeCustomers)
        .put('/v1/customer/:id', updateCustomers);

    return itensRouter
}