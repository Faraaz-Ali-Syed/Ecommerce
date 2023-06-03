import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const initialUserEmail = localStorage.getItem("userEmail");
  const [items, setItems] = useState([]);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const url = "https://crudcrud.com/api/53560b4b945b4566b4ca142bc4dcb908";
  const userEmailHandler = (email) => {
    const newUserEmail = email.replace("@", "").replace(".", "");
    setUserEmail(newUserEmail);
    localStorage.setItem("userEmail", newUserEmail);
  };

  const addItemToCartHandler = (item) => {
    const itemsCopy = [...items];
    const idx = itemsCopy.findIndex((i) => i.id === item.id);

    if (idx === -1) {
      setItems([...items, item]);
    } else {
      itemsCopy[idx].quantity =
        Number(itemsCopy[idx].quantity) + Number(item.quantity);
      itemsCopy[idx].totalPrice =
        Number(itemsCopy[idx].totalPrice) * Number(itemsCopy[idx].quantity);
      setItems(itemsCopy);
    }

    axios
      .post(`${url}/cart${userEmail}`, item)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const removeItemFromCartHandler = (id) => {
  //   const itemsCopy = [...items];
  //   const idx = itemsCopy.findIndex((i) => i.id === id);

  //   if (idx !== -1) {
  //     itemsCopy.splice(idx, 1);
  //     setItems(itemsCopy);
  //   }
  //   console.log(id, userEmail)

  //   axios.delete(`https://crudcrud.com/api/4cff2bcfb6c74ceb894ca54c1a8f1018/cart${userEmail}/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  const incrementHandler = (item) => {
    const itemsCopy = [...items];
    const idx = itemsCopy.findIndex((i) => i._id === item._id);
    itemsCopy[idx].quantity++;

    setItems(itemsCopy);

    axios
      .put(`${url}/cart${userEmail}/${item._id}`, item)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const decrementHandler = (item) => {
    const itemsCopy = [...items];
    const idx = itemsCopy.findIndex((i) => i._id === item._id);

    if (idx !== -1 && itemsCopy[idx].quantity < 2) {
      itemsCopy.splice(idx, 1);
      setItems(itemsCopy);
    } else {
      itemsCopy[idx].quantity--;

      setItems(itemsCopy);
    }
    axios
      .delete(`${url}/cart${userEmail}/${item._id}`, item)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice = totalPrice + Number(item.price * item.quantity);
  });
  console.log(totalPrice);

  useEffect(() => {
    axios.get(`${url}/cart${userEmail}`).then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }, [userEmail]);

  const cartContext = {
    items: items,
    totalAmount: totalPrice,
    addItem: addItemToCartHandler,
    //  removeItem:removeItemFromCartHandler,
    quantityplus: incrementHandler,
    quantityminus: decrementHandler,
    userIdentifier: userEmailHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
