import { Property } from "@/types/models/property.types";
import { axiosInstance } from "../axiosInstane";

const SRERVICE_URL = "/properties";

const propertiesService = {
    getProperties: async (params = {}) => {
        try {
            const response = await axiosInstance.get(SRERVICE_URL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching properties", error);
            throw error;
        }
    },

    getPropertyById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching property with id ${id}`, error);
            throw error;
        }
    },

    createProperty: async (property: Property) => {
        try {
            const response = await axiosInstance.post(SRERVICE_URL, property);
            return response.data;
        } catch (error) {
            console.error("Error creating property", error);
            throw error;
        }
    },

    updateProperty: async (id: string, property: Property) => {
        try {
            const response = await axiosInstance.put(`${SRERVICE_URL}/${id}`, property);
            return response.data;
        } catch (error) {
            console.error(`Error updating property with id ${id}`, error);
            throw error;
        }
    },

    deleteProperty: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting property with id ${id}`, error);
            throw error;
        }
    }
};

export default propertiesService;
