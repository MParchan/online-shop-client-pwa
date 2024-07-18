import { axiosInstance } from "../axiosInstane";
import { Brand } from "@/types/models/brand.types";

const SRERVICE_URL = "/brands";

const brandsService = {
    getBrands: async (params = {}) => {
        try {
            const response = await axiosInstance.get(SRERVICE_URL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching brands", error);
            throw error;
        }
    },

    getBrandById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching brand with id ${id}`, error);
            throw error;
        }
    },

    createBrand: async (brand: Brand) => {
        try {
            const response = await axiosInstance.post(SRERVICE_URL, brand);
            return response.data;
        } catch (error) {
            console.error("Error creating brand", error);
            throw error;
        }
    },

    updateBrand: async (id: string, brand: Brand) => {
        try {
            const response = await axiosInstance.put(`${SRERVICE_URL}/${id}`, brand);
            return response.data;
        } catch (error) {
            console.error(`Error updating brand with id ${id}`, error);
            throw error;
        }
    },

    deleteBrand: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting brand with id ${id}`, error);
            throw error;
        }
    }
};

export default brandsService;
