import { useNavigate } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ category, products }) => {
  const navigate = useNavigate();
  return (
    <div className="category-preview-container">
      <h2 onClick={() => navigate(category)}>
        <span className="title">{category}</span>
      </h2>
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
