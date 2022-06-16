import { useState } from 'react'
import RecipeList from '../../components/RecipeList'
import { apiURLParam } from '../../api/spoonacular'
import { useFetch } from '../../hooks/useFetch'

// styles
import './Home.css'

export default function Home() {
  const [minCarbs, setMinCarbs] = useState(0)
  const [minProtein, setMinProtein] = useState(0)
  const [minFat, setMinFat] = useState(0)
  const [url, setUrl] = useState(null)

  const { isPending, data: recipes } = useFetch(url)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (minCarbs === 0 && minProtein === 0 && minFat === 0) {
      alert('At least one nutrient must be greater than 0')
    } else {
      setUrl('https://api.spoonacular.com/recipes/complexSearch' + apiURLParam 
      + `&minCarbs=${minCarbs}&minProtein=${minProtein}&minFat=${minFat}&number=${3}`
      + '&addRecipeNutrition=true')
    }

    setMinCarbs(0)
    setMinProtein(0)
    setMinFat(0)
  } 

  return (
    <div className="home" >
      <form className='filter' onSubmit={handleSubmit}>
        <h2>Find the best recipes:</h2>
        <label>
          <span>Filter by Carbs:</span>
          <input
            type="number"
            onChange={e => setMinCarbs(e.target.value)}
            min="0"
            max="100"
            value={minCarbs}
            required
          />
        </label>
        <label>
          <span>Filter by Protein:</span>
          <input
            type="number"
            onChange={e => setMinProtein(e.target.value)}
            min="0"
            max="100"
            value={minProtein}
            required
          />
        </label>
        <label>
          <span>Filter by Fat:</span>
          <input
            type="number"
            onChange={e => setMinFat(e.target.value)}
            min="0"
            max="100"
            value={minFat}
            required
          />
        </label>
        <button type='submit'>Search</button>
      </form>
      
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}