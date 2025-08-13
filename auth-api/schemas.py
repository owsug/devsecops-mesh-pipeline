from sqlmodel import SQLModel

# Model for receiving data when creating a user (e.g., in /register)
class UserCreate(SQLModel):
    username: str
    password: str # Expects a plain password

# Model for sending data back to the client (e.g., after successful registration)
class UserRead(SQLModel):
    id: int
    username: str
