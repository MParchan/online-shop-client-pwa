import { OrderProduct } from "./orderProduct.types";
import { User } from "./user.types";

export type Order = {
    _id: string;
    date: Date;
    status: string;
    paymentMethod: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    user: string | User;
    orderProducts: OrderProduct[];
};
