import React, { useState } from "react";

const ProductContext = React.createContext({
  title: "",
  image: "",
  rating: 0,
  price: 0,
  detail: "",
  changeDetail: () => {},
});

export const ProductContextProvider = (props) => {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    rating: 0,
    price: 0,
    detail: "",
  });

  const changeDetailHandler = (item) => {
    console.log("calledContext");
    setProduct({
      title: item.title,
      image: item.image,
      rating: item.rating,
      detail: item.detail,
      price: item.price,
    });
  };
  return (
    <ProductContext.Provider
      value={{
        title: product.title,
        image: product.image,
        rating: product.rating,
        detail: product.detail,
        price: product.price,
        changeDetail: changeDetailHandler,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;