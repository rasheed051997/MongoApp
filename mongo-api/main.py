from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from pydantic import BaseModel,Field
from datetime import datetime, timedelta
from passlib.context import CryptContext
from typing import List

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200", 
]

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mongo-app"]
tickets_collection = db["tickets"]
users_collection = db["users"]

# JWT Configuration
SECRET_KEY = "qwertyuiop"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2PasswordBearer for authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Model for user registration
class UserRegister(BaseModel):
    username: str
    password: str


# Model for user login
class UserLogin(BaseModel):
    username: str
    password: str


# Model for JWT token
class Token(BaseModel):
    access_token: str
    token_type: str


# Function to create JWT token
def create_token(data: dict):
    to_encode = data.copy()
    expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Function to verify JWT token
def verify_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception


# Function to get user information from the database
def get_user(username: str):
    user = users_collection.find_one({"username": username})
    return user


# Function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Function to create hashed password
def get_password_hash(password):
    return pwd_context.hash(password)


# User registration route
@app.post("/register", response_model=dict)
async def register(user: UserRegister):
    # Check if the username is already taken
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    
    print(user.username,"----",user.password)
    # Hash the password
    hashed_password = get_password_hash(user.password)

    print("123")
    # Create a new user in the database
    users_collection.insert_one({"username": user.username, "password": hashed_password})
    return {"message": "User registered successfully"}


# Token generation route (login)
@app.post("/token", response_model=Token)
async def login_for_access_token(user: UserLogin):
    # Check if the user exists
    user_data = users_collection.find_one({"username": user.username})
    if not user_data or not verify_password(user.password, user_data["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate and return a JWT token
    token_data = {"sub": user.username}
    token = create_token(token_data)
    return {"access_token": token, "token_type": "bearer"}


# CRUD Operations for Tickets
# @app.get("/tickets", response_model=list)
# async def read_tickets(token: str = Depends(verify_token)):
#     return list(tickets_collection.find())

# Ticket model with ObjectId as a string
# class TicketModel(BaseModel):
#     subject: str
#     description: str
#     email: str
#     contact_name: str


# # CRUD Operations for Tickets
# @app.get("/tickets", response_model=list[TicketModel])
# async def read_tickets(token: str = Depends(verify_token)):
#     tickets = tickets_collection.find()
#     return [{"_id": str(ticket["_id"]), **ticket} for ticket in tickets]

# Model for Ticket
class Ticket(BaseModel):
    id: str = Field(..., alias='_id')
    subject: str
    description: str
    email: str
    contactName: str
    status: str
    createdAt: datetime
    updatedAt: datetime

# CRUD Operations for Tickets
@app.get("/tickets", response_model=List[Ticket])
async def read_tickets(token: str = Depends(verify_token)):
    print(list(tickets_collection.find()))
    return list(tickets_collection.find())

@app.post("/tickets", response_model=dict)
async def create_ticket(ticket: dict, token: str = Depends(verify_token)):
    ticket["_id"] = str(ObjectId())
    ticket["status"] = "open"
    current_time = datetime.utcnow().isoformat()
    ticket["createdAt"] = current_time
    ticket["updatedAt"] = current_time

    tickets_collection.insert_one(ticket)
    return {"message": "Ticket created successfully"}


# @app.put("/tickets/{ticket_id}", response_model=dict)
# async def update_ticket(ticket_id: str, updated_ticket: dict, token: str = Depends(verify_token)):
#     tickets_collection.update_one({"_id": ticket_id}, {"$set": updated_ticket})
#     return {"message": "Ticket updated successfully"}
from fastapi import HTTPException

@app.put("/tickets/{ticket_id}", response_model=dict)
async def update_ticket(ticket_id: str, updated_ticket: dict, token: str = Depends(verify_token)):
    # Retrieve the existing ticket
    existing_ticket = tickets_collection.find_one({"_id": ticket_id})

    # Check if the ticket exists
    if not existing_ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Update only the specified fields
    update_data = {key: value for key, value in updated_ticket.items() if key in existing_ticket}
    
    # Perform the update
    tickets_collection.update_one({"_id": ticket_id}, {"$set": update_data})

    return {"message": "Ticket updated successfully"}


@app.delete("/tickets/{ticket_id}", response_model=dict)
async def delete_ticket(ticket_id: str, token: str = Depends(verify_token)):
    tickets_collection.delete_one({"_id": ticket_id})
    return {"message": "Ticket deleted successfully"}
