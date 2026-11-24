import requests

API_URL = "https://jsonplaceholder.typicode.com/users"


def get_external_data(user_id):
    try:
        response = requests.get(f"{API_URL}/{user_id}", timeout=3)
        response.raise_for_status()
        return {"data": response.json(), "error": None}
    except requests.Timeout:
        return {"data": None, "error": "External service timed out"}
    except requests.RequestException:
        return {"data": None, "error": "External service failed"}
