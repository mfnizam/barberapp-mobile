import { User } from "./user.interface";

export interface Pemesanan {
    id: string;
    barber: User;
    user: User;
    amount: number;
    price: number;
}

export interface PemesananParameter {
    barber: string;
    user: string;
    amount: number;
    price: number;
}