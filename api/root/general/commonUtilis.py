import re
import string
import bcrypt
import pymongo
from random import choice
from bson import ObjectId

# Hardcoded values for MongoDB connection
LOCAL_MONGO_URI = "mongodb://localhost:27017"
LOCAL_MONGO_DATABASE = "gla1"

client = pymongo.MongoClient(LOCAL_MONGO_URI)
mdb = client[LOCAL_MONGO_DATABASE]

# Function to hash the password
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")

def numGenerator(size=6, chars=string.digits):
    return "".join(choice(chars) for _ in range(size))

def alphaNumGenerator(size=4, chars="ABCDEFGHJKLMNPQRSTUVWYZ123456789"):
    return "".join(choice(chars) for _ in range(size))

def verifyPassword(bcryptPasswordHash, password):
    return bcrypt.checkpw(password.encode("utf-8"), bcryptPasswordHash.encode("utf-8"))

def safelyConvertToInt(str):
    try:
        return int(float(str))
    except ValueError:
        return str

def cleanupEmail(value, ifEmpty=""):
    if not value:
        return ifEmpty

    return cleanupValue(value, returnType="string").lower()

def cleanupValue(value, returnType="string", ifEmpty=None):
    if returnType == "list":
        return value

    if not value:
        return ifEmpty

    value = str(value).strip()

    if value == "":
        return ifEmpty

    if returnType == "int":
        return safelyConvertToInt(value)
    elif returnType == "bool":
        value = value[:1].lower()
        return True if value in {"y", "t"} else False

    return value

def bcryptPasswordHash(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def maskEmail(value, ifEmpty=False):
    regex = (
        r"(?<=..)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)(?=[^@\n]*$)).(?=.*[^@\n]\.)"
    )
    subst = "*"

    result = re.sub(regex, subst, value, 0, re.MULTILINE)

    return result

def mdbObjectIdToStr(mongoId):
    return str(mongoId) if mongoId else None

def strToMongoId(str):
    return ObjectId(str) if str else None
