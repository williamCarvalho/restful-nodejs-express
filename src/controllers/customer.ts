import { Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ICustomer, ICustomerData, IListCustomer } from './customer.types';

const sendResponse = (res: Response, success: boolean, message: string, list: ICustomerData) => {
    res.status(success ? 200 : 404).json({ success, message, list });
};

const updateCustomer = (existingCustomer: ICustomer, updates: ICustomer) => ({
        ...existingCustomer,
        ...updates,
        updatedAt: updates.updatedAt ?? new Date().toDateString(),
});

export const customer = () => {
    let customersDB: IListCustomer = JSON.parse(fs.readFileSync('src/data/customer.json', 'utf-8'))
    
    const {
        customers: customersMock,
    } = customersDB;

    const listCustomers = (_req: Request, res: Response) => res.status(200).json(customersDB);

    const saveCustomers = ({ body }: Request, res: Response) => {
        const customer: ICustomer = {
            id: body.id ?? uuidv4(),
            parentId: body.parentId ?? uuidv4(),
            createdAt: body.createdAt ?? new Date().toDateString(),
            ...body,
        };

        customersMock.data.push(customer)

        res.status(201).json({message: 'Customer added successfully!', customer});
    };

    const removeCustomers = ({ params }: Request, res: Response) => {
        const { id } = params;

        const foundCustomerIndex = customersMock.data.findIndex((customer: ICustomer) => customer.id === id);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.', customersMock);
            return;
        }

        customersMock.data.splice(foundCustomerIndex, 1);
        sendResponse(res, true, 'Customer found and deleted successfully!', customersMock);
    };

    const updateCustomers = ({ params, body } : Request, res: Response) => {
        const { id } = params;

        const foundCustomerIndex = customersMock.data.findIndex((customer: ICustomer) => customer.id === id);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.', customersMock);
            return;
        }

        const customer = customersMock.data[foundCustomerIndex];
        const updatedCustomer = updateCustomer(customer, body);

        customersMock.data.splice(foundCustomerIndex, 1, updatedCustomer);
        sendResponse(res, true, 'Customer found and updated successfully!', customersMock);
    };

    return {
        listCustomers,
        saveCustomers,
        removeCustomers,
        updateCustomers
    };
}