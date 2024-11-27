import { User } from "./user.types";

export type Address = {
    _id: string;
    name: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    user: string | User;
    createdAt: Date;
    updatedAt: Date;
};
