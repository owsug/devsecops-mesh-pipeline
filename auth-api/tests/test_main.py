# auth-api/tests/test_main.py
import sys
import os
from fastapi.testclient import TestClient

# --- Start of Path Fix ---
# This code adds the parent directory (which is the 'auth-api' folder)
# to the list of places Python looks for modules.
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)
# --- End of Path Fix ---

# Now that the path is fixed, this direct import will work.
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Auth API is running!"}