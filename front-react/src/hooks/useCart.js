import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(UserContext);

  const fetchCart = async () => {
    if (!user.token) return;
    try {
      const response = await axios.get('http://localhost:5001/api/cart', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5001/api/cart', {
        productId: product.id,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCart([...cart, response.data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrease = async (id) => {
    const product = cart.find(item => item.product_id === id);
    if (product) {
      try {
        const response = await axios.post('http://localhost:5001/api/cart', {
          productId: id,
          quantity: product.quantity + 1
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setCart(cart.map(item => item.product_id === id ? response.data : item));
      } catch (error) {
        console.error('Error increasing quantity:', error);
      }
    }
  };

  const handleDecrease = async (id) => {
    const product = cart.find(item => item.product_id === id);
    if (product && product.quantity > 1) {
      try {
        const response = await axios.post('http://localhost:5001/api/cart', {
          productId: id,
          quantity: product.quantity - 1
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setCart(cart.map(item => item.product_id === id ? response.data : item));
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    } else {
      handleRemove(id);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCart(cart.filter(item => item.product_id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:5001/api/cart', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = async () => {
    if (!user.token) {
      alert('Debes iniciar sesión.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/checkouts',
        { cart }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }
      );
      if (response.status === 200) {
        alert('Compra exitosa.');
        setCart([]);
      } else {
        alert('Error al procesar la compra.')
      }
    } catch (error) {
      console.error('Error al realizar el checkout.', error);
      alert('Error al realizar la compra. Intente nuevamente.');
    }
  };

  useEffect(() => {
    const totalActualizado = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotal(totalActualizado);
  }, [cart]);

  return {
    cart,
    total,
    handleAddToCart,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleClearCart,
    handleCheckout
  };
};

export default useCart;