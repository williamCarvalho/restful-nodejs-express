import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const sendResponse = (res: any, success: any, message: any) => {
    res.status(success ? 200 : 404).json({ success, message });
};

const updateCustomer = (existingCustomer: any, updates: any) => ({
        ...existingCustomer,
        ...updates,
        updatedAt: new Date(),
});

export const customer = () => {
    let customersDB = JSON.parse(fs.readFileSync('src/data/customer.json', 'utf-8'))

    const {
        customers: customersMock,
    } = customersDB;

    const listCustomers = (_req: any, res: any) => res.status(200).json(customersDB);

    const saveCustomers = ({ body }: any, res: any) => {
        const customer = {
            id: uuidv4(),
            parentId: uuidv4(),
            ...body,
            createdAt: new Date(),
        };

        customersMock.data.push(customer)

        res.status(201).json({message: 'Customer added successfully!', customer});
    };

    const removeCustomers = ({ params }: any, res: any) => {
        const { id } = params;

        const foundCustomerIndex = customersMock.data.findIndex((customer: any) => customer.id === id);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.');
            return;
        }

        customersMock.data.splice(foundCustomerIndex, 1);
        sendResponse(res, true, 'Customer found and deleted successfully!');
    };

    const updateCustomers = ({ params, body } : any, res: any) => {
        const { id } = params;

        const foundCustomerIndex = customersMock.data.findIndex((customer: any) => customer.id === id);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.');
            return;
        }

        const customer = customersMock.data[foundCustomerIndex];
        const updatedCustomer = updateCustomer(customer, body);

        customersMock.data.splice(foundCustomerIndex, 1, updatedCustomer);
        sendResponse(res, true, 'Customer found and updated successfully!');
    };

    return {
        listCustomers,
        saveCustomers,
        removeCustomers,
        updateCustomers
    };
}