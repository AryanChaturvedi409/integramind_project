// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./style.css";
// import { showToast } from "@/utils/toast"; // Assuming you're using toast notifications

// const FavoriteRecipes = () => {
//   const [recipes, setRecipes] = useState([]); // All available recipes
//   const [favorites, setFavorites] = useState([]); // Favorite recipes
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch all recipes and favorite recipes from the API
//     const fetchRecipes = async () => {
//       try {
//         const allRecipesResponse = await axios.get("/api/recipes"); // Get all available recipes
//         const favoriteRecipesResponse = await axios.get("/api/recipes/favorites"); // Get favorite recipes
        
//         // Ensure both `data` are arrays. If not, fallback to empty arrays.
//         setRecipes(Array.isArray(allRecipesResponse.data) ? allRecipesResponse.data : []);
//         setFavorites(Array.isArray(favoriteRecipesResponse.data) ? favoriteRecipesResponse.data : []);
//         setLoading(false);
//       } catch (error) {
//         showToast("Error fetching recipes", "error");
//         setLoading(false);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   const handleAddFavorite = async (recipeId) => {
//     try {
//       const response = await axios.post(`/api/recipes/favorites`, {
//         recipe_id: recipeId,
//       });
//       if (response.data.status) {
//         // Add the recipe to the favorites list if successfully saved
//         const recipeToAdd = recipes.find((recipe) => recipe._id === recipeId);
//         if (recipeToAdd) {
//           setFavorites((prevFavorites) => [...prevFavorites, recipeToAdd]);
//         }
//         showToast("Recipe added to favorites", "success");
//       } else {
//         showToast("Failed to add recipe to favorites", "error");
//       }
//     } catch (error) {
//       showToast("Error adding recipe to favorites", "error");
//     }
//   };

//   const handleRemoveFavorite = async (recipeId) => {
//     try {
//       await axios.delete(`/api/recipes/favorites`, {
//         data: { recipe_id: recipeId },
//       });
//       // Update the favorites list by filtering out the removed recipe
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((recipe) => recipe._id !== recipeId)
//       );
//       showToast("Recipe removed from favorites", "success");
//     } catch (error) {
//       showToast("Error removing recipe from favorites", "error");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display loading message while fetching data
//   }

//   return (
//     <div className="favorite-recipes-container">
//       <h2>All Recipes</h2>
//       {recipes.length > 0 ? (
//         <ul className="recipe-list">
//           {recipes.map((recipe) => (
//             <li key={recipe._id} className="recipe-item">
//               <span className="recipe-name">{recipe.name}</span>
//               {favorites.some((fav) => fav._id === recipe._id) ? (
//                 <button
//                   className="remove-btn"
//                   onClick={() => handleRemoveFavorite(recipe._id)}
//                 >
//                   Remove from Favorites
//                 </button>
//               ) : (
//                 <button
//                   className="add-btn"
//                   onClick={() => handleAddFavorite(recipe._id)}
//                 >
//                   Add to Favorites
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No recipes available</p>
//       )}

//       <h2>Your Favorite Recipes</h2>
//       {favorites.length > 0 ? (
//         <ul className="recipe-list">
//           {favorites.map((recipe) => (
//             <li key={recipe._id} className="recipe-item">
//               <span className="recipe-name">{recipe.name}</span>
//               <button
//                 className="remove-btn"
//                 onClick={() => handleRemoveFavorite(recipe._id)}
//               >
//                 Remove from Favorites
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No favorite recipes yet!</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRecipes;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { showToast } from "@/utils/toast"; // Assuming you're using toast notifications

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]); // All available recipes
  const [favorites, setFavorites] = useState([]); // Favorite recipes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all recipes and favorite recipes from the API
    const fetchRecipes = async () => {
      try {
        const allRecipesResponse = await axios.get("/api/recipes"); // Get all available recipes
        const favoriteRecipesResponse = await axios.get("/api/recipes/favorites"); // Get favorite recipes

        // Ensure both `data` are arrays. If not, fallback to empty arrays.
        setRecipes(Array.isArray(allRecipesResponse.data) ? allRecipesResponse.data : []);
        setFavorites(Array.isArray(favoriteRecipesResponse.data) ? favoriteRecipesResponse.data : []);
        setLoading(false);
      } catch (error) {
        showToast("Error fetching recipes", "error");
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleAddFavorite = async (recipeId) => {
    try {
      const response = await axios.post(`/api/recipes/favorites`, {
        recipe_id: recipeId,
      });
      if (response.data.status) {
        // Add the recipe to the favorites list if successfully saved
        const recipeToAdd = recipes.find((recipe) => recipe._id === recipeId);
        if (recipeToAdd) {
          setFavorites((prevFavorites) => [...prevFavorites, recipeToAdd]);
        }
        showToast("Recipe added to favorites", "success");
      } else {
        showToast("Failed to add recipe to favorites", "error");
      }
    } catch (error) {
      showToast("Error adding recipe to favorites", "error");
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await axios.delete(`/api/recipes/favorites`, {
        data: { recipe_id: recipeId },
      });
      // Update the favorites list by filtering out the removed recipe
      setFavorites((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe._id !== recipeId)
      );
      showToast("Recipe removed from favorites", "success");
    } catch (error) {
      showToast("Error removing recipe from favorites", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="favorite-recipes-container">
      <h2>All Recipes</h2>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <span className="recipe-name">{recipe.name}</span>
              <span className="recipe-rating">Rating: {recipe.rating || "N/A"}</span> {/* Display recipe rating */}
              {favorites.some((fav) => fav._id === recipe._id) ? (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFavorite(recipe._id)}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => handleAddFavorite(recipe._id)}
                >
                  Add to Favorites
                </button>
              )}
              <button
                className="share-btn"
                onClick={() => {
                  const shareUrl = `https://yourapp.com/recipes/${recipe._id}`;
                  navigator.share({
                    title: recipe.name,
                    url: shareUrl,
                  }).then(() => {
                    showToast("Recipe shared successfully!", "success");
                  }).catch(() => {
                    showToast("Failed to share recipe", "error");
                  });
                }}
              >
                Share Recipe
              </button> {/* Share button for social sharing */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available</p>
      )}

      <h2>Your Favorite Recipes</h2>
      {favorites.length > 0 ? (
        <ul className="recipe-list">
          {favorites.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <span className="recipe-name">{recipe.name}</span>
              <span className="recipe-rating">Rating: {recipe.rating || "N/A"}</span> {/* Display recipe rating */}
              <button
                className="remove-btn"
                onClick={() => handleRemoveFavorite(recipe._id)}
              >
                Remove from Favorites
              </button>
              <button
                className="share-btn"
                onClick={() => {
                  const shareUrl = `https://yourapp.com/recipes/${recipe._id}`;
                  navigator.share({
                    title: recipe.name,
                    url: shareUrl,
                  }).then(() => {
                    showToast("Recipe shared successfully!", "success");
                  }).catch(() => {
                    showToast("Failed to share recipe", "error");
                  });
                }}
              >
                Share Recipe
              </button> {/* Share button for social sharing */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite recipes yet!</p>
      )}
    </div>
  );
};

export default FavoriteRecipes;
