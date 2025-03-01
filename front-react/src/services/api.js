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
    const token = localStorage.getItem('token');
    console.log('Interceptor - Token en localStorage:', token);
    console.log('Interceptor - Headers antes:', config.headers);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Interceptor - Headers después:', config.headers);
    return config;
  },
  (error) => {
    console.error('Error en interceptor:', error);
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
      console.log('Respuesta del servidor login:', response.data);
      
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

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },
};

// Servicios de productos
export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/productos/user/products');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },
  getProductById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    try {
      const response = await api.post('/productos', productData);
      return response.data.data;
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  },
  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/productos/${productId}`, productData);
      return response.data.data;
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  },
  deleteProduct: async (productId) => {
    try {
      await api.delete(`/productos/${productId}`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
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
    try {
      console.log('Intentando obtener el carrito...');
      const response = await api.get('/cart');
      console.log('Respuesta del carrito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error detallado al obtener el carrito:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      console.log('Intentando agregar al carrito:', {
        productId,
        quantity,
        token: localStorage.getItem('token'),
        headers: api.defaults.headers
      });

      const response = await api.post('/cart', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error detallado al agregar al carrito:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      console.log('Enviando actualización de cantidad:', { 
        productId, 
        quantity,
        url: `/cart/${productId}`,
        token: localStorage.getItem('token')
      });

      const response = await api.put(`/cart/${productId}`, { 
        quantity  // Usar 'quantity' en lugar de 'cantidad'
      });
      
      console.log('Respuesta de actualización:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error detallado al actualizar cantidad:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers,
        requestData: { productId, quantity }
      });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      return true;
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart');
      return true;
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
      throw error;
    }
  },

  checkout: async (cartData) => {
    try {
      const response = await api.post('/checkouts', cartData);
      return response.data;
    } catch (error) {
      console.error('Error al procesar el checkout:', error);
      throw error;
    }
  }
};

// Servicios de descuentos
export const discountService = {
  getDiscountCodes: async () => {
    const response = await api.get('/discounts');
    return response.data;
  },
};

// Servicios de resumen de compra
export const purchaseService = {
  getSummary: async () => {
    try {
      const response = await api.get('/purchase/summary');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el resumen de compra:', error);
      throw error;
    }
  },
  
  applyDiscount: async (discountCode) => {
    try {
      const response = await api.post('/discounts/apply', { code: discountCode });
      return response.data;
    } catch (error) {
      console.error('Error al aplicar el código de descuento:', error);
      throw error;
    }
  }
};

export default {
  auth: authService,
  products: productService,
  cart: cartService,
  discounts: discountService,
  purchase: purchaseService,
};
