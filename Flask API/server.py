import sys, os
from flask import Flask, flash, request, redirect, url_for, jsonify, send_file
from flask_cors import CORS, cross_origin
import tweepy
from tweepy import OAuthHandler
from data.twitter_data import twitter_api_call


sys.path = os.getcwd()

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def getTweets():
    # Twittter App Credentials
    consumer_key = "7b2fTzv0D6hYBy0D8zt8Bj3wU"
    consumer_secret = "QgZUEIShFnH0FhUCgSdgLGtwDLy38Crxc9RBHC0vfudvfqbeyp"
    access_token = "1179780108988477440-jZ3qFH8CVc9tcxxyKxZzOfdkhc5YkF"
    access_token_secret = "AKT87Hz1OgvRSdHXhCdU0psm2rlSZGNFo9VgmMFkNA7g5"

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

