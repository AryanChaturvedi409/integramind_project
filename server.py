from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['Ingredients']
collection = db['Integraminds']



@app.route('/ingredients', methods=['POST'])
def add_ingredient():
    data = request.json
    result = collection.insert_one(data)
    return jsonify({"message": "Ingredient added successfully", "id": str(result.inserted_id)}), 201

# Get ingredients filtered by cuisine and optional categorization features (e.g., category, flavor)
@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    cuisine = request.args.get('cuisine')
    category = request.args.get('category', None)  
    flavor = request.args.get('flavor', None)  
    
    query = {"cuisine": cuisine}
    
    if category:
        query["category"] = category
    if flavor:
        query["flavor_profile"] = flavor
    
    ingredients = list(collection.find(query, {"_id": 0}))
    return jsonify(ingredients), 200

# For integration with Recipe Search and Upload
@app.route('/recipes', methods=['POST'])
def upload_recipe():
    data = request.json
    # Recipe upload logic will go here
    return jsonify({"message": "Recipe uploaded successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
