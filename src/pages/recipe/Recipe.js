import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useFetch } from '../../hooks/useFetch'
import { apiURLParam } from '../../api/spoonacular'

// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const url = `https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json/${apiURLParam}`

  const { error, isPending, data: recipe } = useFetch(url)

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">Recipe Price Breakdown</h2>
          <p className="cost">Total cost for this recipe: {recipe.totalCost.toFixed(0)}</p>
          <p className="cost">Total cost per serving: {recipe.totalCostPerServing.toFixed(0)}</p>
          <h2 className="page-title">Recipe Ingredients</h2>
          <ul>
            {recipe.ingredients.map(ing => (
              <li key={Math.random()}>{ing.amount.metric.value} {ing.amount.metric.unit} {ing.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}