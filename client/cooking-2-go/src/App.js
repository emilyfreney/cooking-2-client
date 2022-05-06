import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const basicUser = {
    email: "user@user.com",
    password: "user123"
  }

  const [user, setUser] = useState({email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
    // TODO some fetch call to heroku
    if (details.email == basicUser.email && details.password == basicUser.password) {
      console.log("Logged in");
      setUser({
        email: details.email
      });
    } else {
      setError("Details do not match!");
    }
  }

  const createUser = details => {
    console.log(details);

    if (details.email != "" && details.password != "") {
      console.log("created");
      //TODO  some fetch call to heroku
    } else {
      setError("Not a valid username or password");
    }
  }

  const Logout = () => {
    setUser({ email: "" });
  }

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setSearchQuery] = useState("lobster");
  useEffect(() => {
    retrieveRecipes();
  }, [query])
  const retrieveRecipes = async () => {
    const response = await fetch
          (`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    const data = await response.json();
    setRecipes(data.recipes);
  };
  const updateSearch = searchQuery => {
    setSearch(searchQuery.target.value);
  };
  const getSearch = searchQuery => {
    searchQuery.preventDefault();
    setSearchQuery(search);
    setSearch("");
  }
  
  return (
    <div className="App">
      {(user.email != "") ? (
        <div className="searchRecipes">
          <button onClick={Logout}>Logout</button>
          <form className="search-form" onSubmit={getSearch}  >
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            recipeID={recipe.recipe_id}
            publisher={recipe.publisher}
            title={recipe.title}
            url = {recipe.source_url}
            image={recipe.image_url}
          />
        ))}
      </div>
      </div>
    ) : (
      < LoginForm Login={Login} error={error} CreateUser={createUser} />
    )}
      </div>
  );
}

export default App;