import { OrderProduct } from "./orderProduct.types";
import { User } from "./user.types";

export type Order = {
    _id: string;
    date: Date;
    status: string;
    paymentMethod: string;
    customerName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    user: string | User;
    value: number;
    orderProducts: OrderProduct[];
};
