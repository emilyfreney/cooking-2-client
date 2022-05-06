import React from "react";
import style from './recipes.css';
  
const Recipe = ({recipeID, publisher, title, image, url}) =>{
    const instanceData = {recipeID: recipeID, title: title, publisher: publisher, image: image, url: url};
    const storeRecipe = function(){
        //TODO store recipe in database
        const request = ""; // Need to get actual url
        fetch(request, {method: 'POST', headers: {'Content-Type': 'application/json',}, body:JSON.stringify(instanceData)}).then((response) => {
            console.log(response);
        })
    }
    
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
                <p>Publisher : {publisher}</p>
                <a href={url}>Link<br></br></a>
                <img className={style.image} src={image} alt=""/>
                <input type="button" onClick={storeRecipe} value="Like" />
        </div>
    );
}
export default Recipe;