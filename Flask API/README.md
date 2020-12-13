# Flask API

The API gathers recent tweets related to 3 keywords:
- Environment
- Climate change
- Forest fire

From 3 user profiles:
- @ClimateHome
- @SailForScience
- @ClimateNewsAfr1

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
`{0:{"Text": "            ", "tweet_date": "  ", "Keyword": " ", "UserHandle": "@ "},
 1:{"Text": "            ", "tweet_date": "  ", "Keyword": " ", "UserHandle": "@ "}}`


