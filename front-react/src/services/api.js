import axios from 'axios';

// Definir la URL base de la API según el entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Servicios de productos
export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/productos');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post('/productos', productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/productos/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
  getProductsByCategory: async (category) => {
    const response = await api.get(`/productos/categoria/${category}`);
    return response.data;
  },
  searchProducts: async (query) => {
    const response = await api.get(`/productos/search?q=${query}`);
    return response.data;
  },
};

// Servicios del carrito
export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  addToCart: async (productData) => {
    const response = await api.post('/cart', productData);
    return response.data;
  },
  removeFromCart: async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },
};

// Servicios de descuentos
export const discountService = {
  getDiscountCodes: async () => {
    const response = await api.get('/discounts');
    return response.data;
  },
};

export default {
  auth: authService,
  products: productService,
  cart: cartService,
  discounts: discountService,
};
