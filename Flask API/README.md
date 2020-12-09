# Flask API

The API gathers recent tweets related to 3 keywords:
- Environment
- Climate change
- Forest fire

## How to run Flask API?
- Step 1:
Clone the repo
- Step 2: 
Go to folder Flask API
- Step 3:
Install all the packages: `pip install -r requirements.txt`
- Step 5:

```
set FLASK_APP=server.py
flask run
```

The server will run on port `5000`


## How to call the Flask API?

- **API Call:** `http://127.0.0.1:5000/tweets`
- **Request Method:** get 
- **Returns:** JSON
`{0:{"text": "            ", "tweet_date": "  "}, 1:"text": "            ", "tweet_date": "  "}}`


