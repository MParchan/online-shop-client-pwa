import { axiosInstance } from "../axiosInstane";
import { Product } from "@/types/models/product.types";

const SRERVICE_URL = "/products";

const productsService = {
    getProducts: async (params = {}) => {
        try {
            const response = await axiosInstance.get(SRERVICE_URL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching products", error);
            throw error;
        }
    },

    getProductById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}`, error);
            throw error;
        }
    },

    createProduct: async (product: Product) => {
        try {
            const response = await axiosInstance.post(SRERVICE_URL, product);
            return response.data;
        } catch (error) {
            console.error("Error creating product", error);
            throw error;
        }
    },

    updateProduct: async (id: string, product: Product) => {
        try {
            const response = await axiosInstance.put(`${SRERVICE_URL}/${id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with id ${id}`, error);
            throw error;
        }
    },

    deleteProduct: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${SRERVICE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting product with id ${id}`, error);
            throw error;
        }
    }
};

export default productsService;
