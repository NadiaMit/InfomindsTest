export interface SupplierListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
}

export interface CustomerListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    iban: string;
    category?: {
        code: string;
        description: string;
    }
}

export interface EmployeeListQuery {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    department?: {
        code: string;
        description: string;
    }
}