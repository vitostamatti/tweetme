import random
from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Tweet

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)

def tweet_list_view(request, *args, **kwargs):
    '''
    REST API VIEW
    Return json data to consume by javascript
    '''
    qs = Tweet.objects.all()
    tweets_list = [{
        "id": tweet.id,
        "content": tweet.content,
        "likes": random.randint(0,100), 
    } for tweet in qs]

    data = {
        "isUser": False,
        "response": tweets_list,
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    '''
    REST API VIEW
    Return json data to consume by javascript
    '''
    data = {
        "id": tweet_id,
        #"image_path": obj.image.url.
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404
    
    return JsonResponse(data, status=status)
    