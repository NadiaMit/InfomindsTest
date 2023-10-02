import { CustomerListQuery, SupplierListQuery } from "./types";


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
    loadCustomers: (nameFilter?: string, emailFilter?: string): Promise<CustomerListQuery[]> => {
        return fetch(`/api/customers/list?name=${nameFilter ?? ''}&email=${emailFilter ?? ''}`)
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
}

export default api