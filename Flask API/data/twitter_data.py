import tweepy
from datetime import datetime
import pandas as pd
import re
import string
from nltk.tokenize import word_tokenize

'''
    Clean the tweets text
'''
def clean_tweets(tweet):
    #HappyEmoticons
    emoticons_happy = set([
        ':-)', ':)', ';)', ':o)', ':]', ':3', ':c)', ':>', '=]', '8)', '=)', ':}',
        ':^)', ':-D', ':D', '8-D', '8D', 'x-D', 'xD', 'X-D', 'XD', '=-D', '=D',
        '=-3', '=3', ':-))', ":'-)", ":')", ':*', ':^*', '>:P', ':-P', ':P', 'X-P',
        'x-p', 'xp', 'XP', ':-p', ':p', '=p', ':-b', ':b', '>:)', '>;)', '>:-)',
        '<3'
        ])
    # Sad Emoticons
    emoticons_sad = set([
        ':L', ':-/', '>:/', ':S', '>:[', ':@', ':-(', ':[', ':-||', '=L', ':<',
        ':-[', ':-<', '=\\', '=/', '>:(', ':(', '>.<', ":'-(", ":'(", ':\\', ':-c',
        ':c', ':{', '>:\\', ';('
        ])
    #combine sad and happy emoticons
    emoticons = emoticons_happy.union(emoticons_sad)
    #Emoji patterns
    emoji_pattern = re.compile("["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
            u"\U00002702-\U000027B0"
            u"\U000024C2-\U0001F251"
            "]+", flags=re.UNICODE)
    tweet = re.sub(r'‚Ä¶', '', tweet)
    tweet = re.sub(r'(?:^|\s)[＠ @]{1}([^\s#<>[\]|{}]+)', '',tweet)    
    tweet = re.sub(r'[^\x00-\x7F]+',' ', tweet)    
    tweet = emoji_pattern.sub(r'', tweet)
    tweet = re.sub(r':', '', tweet)
    word_tokens = word_tokenize(tweet)
    filtered_tweet = []
    for w in word_tokens:        
        if w not in emoticons:            
            filtered_tweet.append(w)            
    return ' '.join(filtered_tweet)

'''
    To filter only required data from Twitter API
'''
def filter_data(tweet, keyword, userhandle):
    df = pd.DataFrame()
    text=[]
    tweetdate = []
    for data in tweet:
        text.append(clean_tweets(data['text']))
        tweetdate.append(data['created_at'])
    df['Tweet_date'] = tweetdate
    df['Text'] = text
    df['Keyword'] = keyword
    df['UserHandle'] = userhandle
    data = df.to_dict(orient="index")
    return data

'''
    Twitter API call
'''
def twitter_api_call(api):
    date = datetime.utcnow().date()
    keywords = ["environment", "climate change", "forest fire"]
    userhandles = ['@ClimateHome', "@SailForScience", "@ClimateNewsAfr1"]
    # Fetching tweets
    tweet = []
    keyword_list = []
    userhandle_list = []
    for keyword in keywords:
        for userhandle in userhandles:
            for status in tweepy.Cursor(api.search, screen_name=userhandle, q = keyword, count=10, lang='en', exclude='retweets', since=str(date), result_type='popular').items(2):
                tweet.append(status._json)   
                keyword_list.append(keyword)
                userhandle_list.append(userhandle)
    data = filter_data(tweet, keyword_list, userhandle_list)
    return data