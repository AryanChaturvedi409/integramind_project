import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Use this for additional styles
import { FaUtensils, FaSearch, FaPlusCircle } from 'react-icons/fa'; // Font Awesome Icons

function App() {
  const [ingredient, setIngredient] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [category, setCategory] = useState('');
  const [flavor, setFlavor] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ingredient.trim() && cuisine) {
      const newIngredient = { ingredient, cuisine, category, flavor_profile: flavor.split(',') };
      try {
        const response = await axios.post('http://localhost:5000/ingredients', newIngredient);
        alert(response.data.message);
        setIngredient('');
        setCuisine('');
        setCategory('');
        setFlavor('');
      } catch (error) {
        console.error("Error adding ingredient:", error);
        alert("Failed to add ingredient. Try again.");
      }
    } else {
      alert('Please enter both ingredient and cuisine!');
    }
  };

  const handleSearch = async () => {
    if (searchCuisine) {
      try {
        const response = await axios.get(
          `http://localhost:5000/ingredients?cuisine=${searchCuisine}&category=${category}&flavor=${flavor}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        alert("Failed to fetch ingredients. Try again.");
      }
    } else {
      alert('Please select a cuisine to search!');
    }
  };

  return (
    <div className="App container-fluid p-5" style={{ backgroundImage: 'linear-gradient(to right, #ff9a9e, #fecfef)' }}>
      <div className="hero text-center text-white py-5">
        <h1 className="display-3">Flavour Fusion</h1>
        <p className="lead">Discover and manage ingredients from around the world!</p>
      </div>

      <div className="row">
        {/* Form Section */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4 mb-4">
            <h2 className="text-center mb-4"><FaPlusCircle /> Add Ingredient</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Ingredient:</label>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="form-control"
                  placeholder="Enter ingredient name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Cuisine:</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select a cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  placeholder="Enter ingredient category (e.g., vegetable)"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Flavor Profile:</label>
                <input
                  type="text"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="form-control"
                  placeholder="Enter flavor profile (e.g., savory, spicy)"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 btn-lg">Add Ingredient</button>
            </form>
          </div>
        </div>

        {/* Search Section */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4 mb-4">
            <h2 className="text-center mb-4"><FaSearch /> Search by Cuisine</h2>

            <div className="mb-3">
              <label className="form-label">Select Cuisine:</label>
              <select
                value={searchCuisine}
                onChange={(e) => setSearchCuisine(e.target.value)}
                className="form-select"
              >
                <option value="">Select a cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                placeholder="Search by category"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Flavor Profile:</label>
              <input
                type="text"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="form-control"
                placeholder="Search by flavor profile"
              />
            </div>

            <button onClick={handleSearch} className="btn btn-secondary w-100 btn-lg">Search</button>
          </div>

          <div className="results mt-4">
            <h4 className="text-center">Search Results</h4>
            <ul className="list-group">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.ingredient}</strong> ({item.cuisine})
                      <p className="mb-0 text-muted">{item.category} | {item.flavor_profile.join(', ')}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">No results found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
