import axios from 'axios';

// Definir la URL base de la API según el entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Añadir interceptor para debugging
api.interceptors.request.use(
  (config) => {
    console.log('Realizando petición:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error.response?.data);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
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
