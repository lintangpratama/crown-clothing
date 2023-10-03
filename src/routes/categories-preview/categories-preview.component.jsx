import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((category) => {
        const product = categoriesMap[category];
        return (
          <CategoryPreview
            key={category}
            category={category}
            products={product}
          />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
