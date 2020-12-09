import sys, os
from flask import Flask, flash, request, redirect, url_for, jsonify, send_file
from flask_cors import CORS, cross_origin
import tweepy
from tweepy import OAuthHandler
from data.twitter_data import twitter_api_call
from dotenv import load_dotenv


sys.path = os.getcwd()

load_dotenv('.env')

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def getTweets():
    # Twittter App Credentials
    consumer_key = os.getenv("consumer_key")
    consumer_secret = os.getenv("consumer_secret")
    access_token = os.getenv("access_token")
    access_token_secret = os.getenv("access_token_secret")

    # Calling API
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True, 
                    wait_on_rate_limit_notify=True)
    
    tweet = twitter_api_call(api)
    return tweet


@cross_origin()
@app.route('/tweets', methods=['GET'])
def generate_uml():
    if request.method == 'GET':
        data = getTweets()
        return jsonify(data)

