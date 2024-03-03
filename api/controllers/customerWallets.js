const { v4: uuidv4 } = require('uuid');

const sendResponse = ({ status }, success, message) => {
    status(success ? 200 : 404).json({ success, message });
};

const updateCustomer = (existingCustomer, updates) => ({
        ...existingCustomer,
        ...updates,
        updatedAt: new Date(),
});

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;

    const {
        customerWallets: customerWalletsMock,
    } = customerWalletsDB;

    const listCustomerWallets = (_req, res) => res.status(200).json(customerWalletsDB);

    const saveCustomerWallets = ({ body }, res) => {
        const customer = {
            id: uuidv4(),
            parentId: uuidv4(),
            ...body,
            createdAt: new Date(),
        };

        customerWalletsMock.data.push(customer)

        res.status(201).json({message: 'Customer added successfully!', customer});
    };

    const removeCustomerWallets = ({ params }, res) => {
        const { customerId } = params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.');
            return;
        }

        customerWalletsMock.data.splice(foundCustomerIndex, 1);
        sendResponse(res, true, 'Customer found and deleted successfully!');
    };

    const updateCustomerWallets = ({ params, body }, res) => {
        const { customerId } = params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

        if (foundCustomerIndex === -1) {
            sendResponse(res, false, 'Customer not found on base.');
            return;
        }

        const customer = customerWalletsMock.data[foundCustomerIndex];
        const updatedCustomer = updateCustomer(customer, body);

        customerWalletsMock.data.splice(foundCustomerIndex, 1, updatedCustomer);
        sendResponse(res, true, 'Customer found and updated successfully!');
    };

    return {
        listCustomerWallets,
        saveCustomerWallets,
        removeCustomerWallets,
        updateCustomerWallets
    };
}
