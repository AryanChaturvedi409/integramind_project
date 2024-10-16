


from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = MongoClient("mongodb://localhost:27017/")
db = client['Integraminds']
profile_collection = db['Vansh']
recipes_collection = db['Recipes']  # Assuming you have a Recipes collection for managing recipes


# Get User Profile by Full Name
@app.route("/api/user/profile/<fullName>", methods=["GET"])
def get_user_profile(fullName):
    try:
        user_profile = profile_collection.find_one({"fullName": fullName})

        if not user_profile:
            return jsonify({"status": False, "msg": "User not found", "cls": "error"}), 404

        return jsonify({
            "status": True,
            "payload": {
                "fullName": user_profile.get("fullName", ""),
                "email": user_profile.get("email", "")
            },
            "msg": "Profile fetched successfully",
            "cls": "success"
        }), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Create New User Profile
@app.route("/api/user/profile", methods=["POST"])
def create_user_profile():
    try:
        data = request.json
        full_name = data.get("fullName")
        email = data.get("email")

        if not full_name or not email:
            return jsonify({"status": False, "msg": "Required fields missing", "cls": "error"}), 400

        new_profile = {
            "fullName": full_name,
            "email": email
        }

        result = profile_collection.insert_one(new_profile)

        return jsonify({
            "status": True,
            "msg": "Profile created successfully",
            "cls": "success",
            "payload": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Update User Profile (Profile Editing)
@app.route("/api/user/profile/<userId>", methods=["PUT"])
def update_user_profile(userId):
    try:
        data = request.json
        update_fields = {}
        
        if "fullName" in data:
            update_fields["fullName"] = data.get("fullName")
        if "email" in data:
            update_fields["email"] = data.get("email")

        if not update_fields:
            return jsonify({"status": False, "msg": "No fields to update", "cls": "error"}), 400

        result = profile_collection.update_one({"_id": ObjectId(userId)}, {"$set": update_fields})

        if result.matched_count == 0:
            return jsonify({"status": False, "msg": "User not found", "cls": "error"}), 404

        return jsonify({"status": True, "msg": "Profile updated successfully", "cls": "success"}), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Add Recipe to Favorites
@app.route("/api/recipes/favorites", methods=["POST"])
def add_favorite_recipe():
    try:
        data = request.json
        recipe_id = data.get("recipe_id")
        user_id = data.get("user_id")

        if not recipe_id or not user_id:
            return jsonify({"status": False, "msg": "Required fields missing", "cls": "error"}), 400

        recipe = recipes_collection.find_one({"_id": ObjectId(recipe_id)})
        if not recipe:
            return jsonify({"status": False, "msg": "Recipe not found", "cls": "error"}), 404

        profile_collection.update_one({"_id": ObjectId(user_id)}, {"$addToSet": {"favorites": ObjectId(recipe_id)}})

        return jsonify({"status": True, "msg": "Recipe added to favorites", "cls": "success"}), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Remove Recipe from Favorites
@app.route("/api/recipes/favorites", methods=["DELETE"])
def remove_favorite_recipe():
    try:
        data = request.json
        recipe_id = data.get("recipe_id")
        user_id = data.get("user_id")

        if not recipe_id or not user_id:
            return jsonify({"status": False, "msg": "Required fields missing", "cls": "error"}), 400

        profile_collection.update_one({"_id": ObjectId(user_id)}, {"$pull": {"favorites": ObjectId(recipe_id)}})

        return jsonify({"status": True, "msg": "Recipe removed from favorites", "cls": "success"}), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Get All Favorite Recipes for User
@app.route("/api/recipes/favorites/<userId>", methods=["GET"])
def get_favorite_recipes(userId):
    try:
        user_profile = profile_collection.find_one({"_id": ObjectId(userId)})
        if not user_profile or "favorites" not in user_profile:
            return jsonify({"status": False, "msg": "No favorite recipes found", "cls": "error"}), 404

        favorite_recipe_ids = user_profile.get("favorites", [])
        favorite_recipes = list(recipes_collection.find({"_id": {"$in": favorite_recipe_ids}}))

        return jsonify({
            "status": True,
            "payload": favorite_recipes,
            "msg": "Favorite recipes fetched successfully",
            "cls": "success"
        }), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


# Update Recipe Rating
@app.route("/api/recipes/rating/<recipeId>", methods=["PUT"])
def update_recipe_rating(recipeId):
    try:
        data = request.json
        rating = data.get("rating")

        if not rating or not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
            return jsonify({"status": False, "msg": "Invalid rating value", "cls": "error"}), 400

        result = recipes_collection.update_one({"_id": ObjectId(recipeId)}, {"$set": {"rating": rating}})

        if result.matched_count == 0:
            return jsonify({"status": False, "msg": "Recipe not found", "cls": "error"}), 404

        return jsonify({"status": True, "msg": "Rating updated successfully", "cls": "success"}), 200

    except Exception as e:
        return jsonify({"status": False, "msg": str(e), "cls": "error"}), 500


if __name__ == "__main__":
    app.run(debug=True)



# from flask import Flask, jsonify, request
# from pymongo import MongoClient

# app = Flask(__name__)



# # MongoDB Atlas connection
# client = MongoClient("mongodb://localhost:27017/")
# db = client['Integraminds']
# users_collection = db['Vansh']
# recipes_collection = db['recipes']

# @app.route('/api/user/<user_id>', methods=['GET'])

# def get_user_profile(user_id):
#     user = users_collection.find_one({"user_id": user_id})
#     if user:
#         return jsonify({"user": user}), 200
#     return jsonify({"error": "User not found"}), 404

# @app.route('/api/user/<user_id>/favorites', methods=['GET'])

# def get_user_favorites(user_id):
#     user = users_collection.find_one({"user_id": user_id})
#     if user:
#         favorite_recipes = recipes_collection.find({"_id": {"$in": user['favorite_recipes']}})
#         return jsonify({"favorites": list(favorite_recipes)}), 200
#     return jsonify({"error": "User not found"}), 404

# @app.route('/api/user/<user_id>/update', methods=['POST'])

# def update_profile(user_id):
#     data = request.json
#     users_collection.update_one({"user_id": user_id}, {"$set": data})
#     return jsonify({"message": "Profile updated"}), 200

# if __name__ == '__main__':
#     app.run(debug=True)