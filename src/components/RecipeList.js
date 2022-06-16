import { useState } from "react"
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Trashcan from '../assets/trashcan.svg'
import Add from '../assets/add.svg'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])

  const { mode } = useTheme()

  if (recipes.number === 0) {
    return <div className="error">No recipes to load...</div>
  }
 
  const handleAdd = (recipe) => {
    setSavedRecipes(prevSavedRecipes => {
      if(!prevSavedRecipes.includes(recipe)) {
        return [...prevSavedRecipes, recipe]
      } else {
        alert('This recipe is already saved!')
        return [...prevSavedRecipes]
      }
    })
  }

  const handleDelete = (recipe) => {
    setSavedRecipes(prevSavedRecipes => {
      return prevSavedRecipes.filter(savedRecipe => {
        return recipe.id !== savedRecipe.id
      })
    })

    setIngredients([])
  }

  const generateShoppingList = () => {
    const allIngredients = savedRecipes.map(savedRecipe => savedRecipe.nutrition.ingredients.map(ingredient => ingredient.name))
    const uniqueIngredients = [...new Set(allIngredients.flat())].sort()

    setIngredients(uniqueIngredients)
  }

  return (
    <div className="recipes">
      <div className="recipe-list">
        {recipes && recipes.results.map(recipe => (
          <div key={recipe.id} className={`card ${mode}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            {recipe.nutrition.nutrients
              .filter(nutrient => ['Protein', 'Fat', 'Carbohydrates'].includes(nutrient.name))
              .map(nutrient => (
                <p key={nutrient.name}>Amount of {nutrient.name}: {nutrient.amount.toFixed(0)}{nutrient.unit}</p>
              ))}
            <Link to={`/recipes/${recipe.id}`}>Show Price & Ingredients</Link>
            <img 
              className="add"
              onClick={() => handleAdd(recipe)}
              src={Add} alt="add icon"
            />
          </div>
        ))}
      </div>
      <div className="saved-list">
        <h2>Saved Recipes</h2>
        {savedRecipes.length > 0 && <button onClick={generateShoppingList} className="btn">Generate a shopping list from all saved recipes</button>}
      </div>  
      <div className="recipe-list">
        {savedRecipes && savedRecipes.map(recipe => (
          <div key={recipe.id} className={`card ${mode}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            {recipe.nutrition.nutrients
              .filter(nutrient => ['Protein', 'Fat', 'Carbohydrates'].includes(nutrient.name))
              .map(nutrient => (
              <p key={nutrient.name}>Amount of {nutrient.name}: {nutrient.amount.toFixed(0)}{nutrient.unit}</p>
            ))}
            <img 
              className="delete"
              onClick={() => handleDelete(recipe)}
              src={Trashcan} alt="delete icon"
            />
          </div>
        ))}
      </div>
      <h2>Shopping List</h2>  
      <ul className={`shopping-list ${mode}`}>
        {ingredients && ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  )
}
