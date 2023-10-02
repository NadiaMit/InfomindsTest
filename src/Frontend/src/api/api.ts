import { SupplierListQuery, CustomerListQuery, EmployeeListQuery } from "./types";


const api = {
    loadSuppliers: (): Promise<SupplierListQuery[]> => {
        return fetch("/api/suppliers/list")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json() as Promise<SupplierListQuery[]>;
        })
        .catch((error) => {
            console.error('Error while loading suppliers:', error);
            return [] as SupplierListQuery[];
        });
    },
    loadCustomers: (name?: string, email?: string): Promise<CustomerListQuery[]> => {
        return fetch(`/api/customers/list?name=${name ?? ''}&email=${email ?? ''}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json() as Promise<CustomerListQuery[]>;
        })
        .catch((error) => {
            console.error('Error while loading customers:', error);
            return [] as CustomerListQuery[];
        });
    },
    loadEmployees: (firstName?: string, lastName?: string): Promise<EmployeeListQuery[]> => {
        return fetch(`/api/employees/list?firstName=${firstName ?? ''}&lastName=${lastName ?? ''}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json() as Promise<EmployeeListQuery[]>;
        })
        .catch((error) => {
            console.error('Error while loading employees:', error);
            return [] as EmployeeListQuery[];
        });
    },
}

export default api