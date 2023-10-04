import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  CategoryBody,
  CategoryItemContainer,
} from "./category-item.styles";

const CategoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  return (
    <CategoryItemContainer onClick={() => navigate(route)}>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryBody>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
