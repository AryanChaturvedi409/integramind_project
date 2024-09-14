from pymongo import MongoClient
import datetime
import json
import os
from bson.objectid import ObjectId
import bson
from root.static import G_ACCESS_EXPIRES, G_REFRESH_EXPIRES

# Hardcoded MongoDB settings
LOCAL_MONGO_URI = "mongodb://localhost:27017"
LOCAL_MONGO_DATABASE = "gla1"

def connect_mongodb():
    try:
        client = MongoClient(LOCAL_MONGO_URI)
        db = client[LOCAL_MONGO_DATABASE]
        print(f"Connected to MongoDB database: {LOCAL_MONGO_DATABASE}")
        return db
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        return None

# Connect to MongoDB
mdb = connect_mongodb()
