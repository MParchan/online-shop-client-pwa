import { axiosInstance } from "../axiosInstane";
import { Subcategory } from "@/types/models/subcategory.types";

const SRERVICE_URL = "/subcategories";

const subcategoriesService = {
    getSubcategories: async () => {
        try {
            const response = await axiosInstance.get(SRERVICE_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching subcategories", error);
            throw error;
        }
    },

    getSubcategoryById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching subcategory with id ${id}`, error);
            throw error;
        }
    },

    createSubcategory: async (subcategory: Subcategory) => {
        try {
            const response = await axiosInstance.post(SRERVICE_URL, subcategory);
            return response.data;
        } catch (error) {
            console.error("Error creating subcategory", error);
            throw error;
        }
    },

    updateSubcategory: async (id: string, subcategory: Subcategory) => {
        try {
            const response = await axiosInstance.put(`${SRERVICE_URL}/${id}`, subcategory);
            return response.data;
        } catch (error) {
            console.error(`Error updating subcategory with id ${id}`, error);
            throw error;
        }
    },

    deleteSubcategory: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting subcategory with id ${id}`, error);
            throw error;
        }
    }
};

export default subcategoriesService;
