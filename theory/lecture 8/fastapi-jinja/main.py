from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

BASE = Path(__file__).parent
app = FastAPI()
app.mount("/static", StaticFiles(directory=BASE / "static"), name="static")
templates = Jinja2Templates(directory=BASE / "templates")


@app.get("/")
def home(request: Request):
    now = datetime.now().strftime("%d %B %Y, %H:%M:%S")
    return templates.TemplateResponse(request, "index.html", {"now": now})
