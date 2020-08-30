import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .forms import TweetForm
from .models import Tweet
from .serializers import (TweetSerializer, TweetActionSerializer, TweetCreateSerializer)


# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, 'pages/feed.html')

def tweets_list_view(request, *args, **kwargs):
    return render(request, 'tweets/list.html')

def tweets_detail_view(request, tweet_id ,*args, **kwargs):
    return render(request, 'tweets/detail.html', context={"tweet_id":tweet_id})

# def tweet_create_view_pure_django(request, *args, **kwargs):
#     ''' 
#     REST API Create View
#     '''
#     if not request.user.is_authenticated:
#         #return redirect(settings.LOGIN_URL)
#         return JsonResponse({}, status=401)

#     form = TweetForm(request.POST or None)
#     next_url = request.POST.get('next') or None
#     if form.is_valid():
#         obj = form.save(commit=False)
#         obj.user = request.user
#         obj.save()
#         if True:
#             return JsonResponse(obj.serialize(), status=201) # status for created items

#         if next_url != None: #and is_safe_url(next_url, ALLOWED_HOSTS):
#             return redirect(next_url)
#         form = TweetForm()
#     if form.errors:
#         return JsonResponse(form.errors, status=400)  
#     return render(request, 'components/form.html', context={'form': form })

# def tweet_list_view_pure_django(request, *args, **kwargs):
#     '''
#     REST API VIEW
#     Return json data to consume by javascript
#     '''
#     qs = Tweet.objects.all()
#     tweets_list = [ tweet.serialize() for tweet in qs]

#     data = {
#         "isUser": False,
#         "response": tweets_list,
#     }
#     return JsonResponse(data)

# def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
#     '''
#     REST API VIEW
#     Return json data to consume by javascript
#     '''
#     data = {
#         "id": tweet_id,
#         #"image_path": obj.image.url.
#     }
#     status = 200
#     try:
#         obj = Tweet.objects.get(id=tweet_id)
#         data['content'] = obj.content
#     except:
#         data['message'] = "Not Found"
#         status = 404
    
#     return JsonResponse(data, status=status)
    