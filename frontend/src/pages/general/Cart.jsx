import React, { useEffect, useState } from 'react';
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    const fetchCardFoods = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/cart",{
                withCredentials: true
            });
            console.log("response", response)
        } catch (error) {
            console.error("Error Fetchinf cart foods: ", error)
        }
    }
  })

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-lg shadow-md p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 ml-3">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.store}</p>
                <p className="text-xs text-gray-500">{item.address}</p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="mx-3 text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-2 text-red-500 font-semibold text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-inner">
          <button className="w-full bg-green-500 text-white py-2 rounded-md font-semibold text-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
