type ICustomer = {
    id?: string,
    name?: string,
    parentId?: string,
    birthDate?: string,
    cellphone?: string,
    phone?: string,
    email?: string,
    occupation?: string,
    state?: string,
    createdAt?: string,
    updatedAt?: string
}

type ICustomerData = {
    data: Array<ICustomer>
}

type IListCustomer = {
    customers: ICustomerData
}

export type { ICustomer, ICustomerData, IListCustomer, }