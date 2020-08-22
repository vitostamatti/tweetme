import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

from .forms import TweetForm
from .models import Tweet

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)

def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()

        if True:
            return JsonResponse(obj.serialize(), status=201) # status for created items

        if next_url != None: #and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    return render(request, 'components/form.html', context={'form': form })

def tweet_list_view(request, *args, **kwargs):
    '''
    REST API VIEW
    Return json data to consume by javascript
    '''
    qs = Tweet.objects.all()
    tweets_list = [ tweet.serialize() for tweet in qs]

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
    