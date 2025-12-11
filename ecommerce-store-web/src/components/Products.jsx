import { products } from "../api/productData";
import ProductCard from "./common/ProductCard";

export const Products = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          productName={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};
