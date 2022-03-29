import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { ButtonContainer, CategoryText, CategoryImage } from './style';
import { ButtonContainer, CategoryText } from './style';
import RecipesContext from '../../context/RecipesContext';

function CategoriesButton({ category }) {
  // const { strCategory, strCategoryThumb } = category;
  const { strCategory } = category;
  const { categoryHandle } = useContext(RecipesContext);
  return (
    <ButtonContainer
      type="button"
      onClick={ () => (
        categoryHandle(strCategory)
      ) }
      data-testid={ `${strCategory}-category-filter` }
    >
      {/* <CategoryImage
      src={ strCategoryThumb }
      alt={ strCategory }
    /> */}
      <CategoryText>
        {strCategory}
      </CategoryText>
    </ButtonContainer>
  );
}

CategoriesButton.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    // strCategoryThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoriesButton;
