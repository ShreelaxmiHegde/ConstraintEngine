from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Message(BaseModel):
  message: str

@app.get("/hello")
def hello():
  print("request recieved")
  res = "hello from AI services"
  return res

@app.post("/c/{chat_id}")
def message(message: Message):
  print(message)
  return {"response": f"You asked '{message.message}'"}