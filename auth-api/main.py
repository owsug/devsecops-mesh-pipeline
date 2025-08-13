from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from passlib.context import CryptContext

from database import engine, create_db_and_tables
from models import User
from schemas import UserCreate, UserRead

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI()
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Auth API is running!"}

@app.post("/register", response_model=UserRead)
def register_user(user_create: UserCreate, session: Session = Depends(get_session)):
    hashed_password = pwd_context.hash(user_create.password)
    db_user = User(username=user_create.username, hashed_password=hashed_password)
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return db_user