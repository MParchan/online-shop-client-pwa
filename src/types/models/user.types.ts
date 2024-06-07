import { Opinion } from "./opinion.types";

export type User = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    opinions: Opinion[];
    createdAt: Date;
    updatedAt: Date;
};
