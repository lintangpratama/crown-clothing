import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ category, products }) => {
  return (
    <div className="category-preview-container">
      <Link className="title" to={category}>
        <span>{category}</span>
      </Link>
      <div className="preview">
        {products.map(
          (product, index) =>
            index < 4 && <ProductCard key={product.id} product={product} />
        )}
      </div>
    </div>
  );
};

export default CategoryPreview;
