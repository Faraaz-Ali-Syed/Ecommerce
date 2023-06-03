import { useContext } from "react";

import classes from "./ProductDetails.module.css";
import ProductContext from "../Store/ProductContext";

const ProductDetails = () => {
  const productCtx = useContext(ProductContext);
  return (
    <div className={classes.product}>
      <img src={productCtx.imageUrl} alt={productCtx.title} />
      <div className={classes.detail}>
        <h3>{productCtx.title}</h3>
        <h2>${productCtx.price.toFixed(2)}</h2>
        <span className={classes.rating}>
          Rating <span>{productCtx.rating}&#9733;</span>
        </span>
        <p>{productCtx.detail}</p>
      </div>
    </div>
  );
};

export default ProductDetails;