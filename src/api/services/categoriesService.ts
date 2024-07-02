import { axiosInstance } from "../axiosInstane";
import { Category } from "@/types/models/category.types";

const SRERVICE_URL = "/categories";

const categoriesService = {
    getSubcategories: async (params = {}) => {
        try {
            const response = await axiosInstance.get(SRERVICE_URL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories", error);
            throw error;
        }
    },

    getCategoryById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching category with id ${id}`, error);
            throw error;
        }
    },

    createCategory: async (category: Category) => {
        try {
            const response = await axiosInstance.post(SRERVICE_URL, category);
            return response.data;
        } catch (error) {
            console.error("Error creating category", error);
            throw error;
        }
    },

    updateCategory: async (id: string, category: Category) => {
        try {
            const response = await axiosInstance.put(`${SRERVICE_URL}/${id}`, category);
            return response.data;
        } catch (error) {
            console.error(`Error updating category with id ${id}`, error);
            throw error;
        }
    },

    deleteCategory: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting category with id ${id}`, error);
            throw error;
        }
    }
};

export default categoriesService;
