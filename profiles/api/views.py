import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.contrib.auth import get_user_model

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Profile
from ..serializers import PublicProfileSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()


@api_view(["GET", "POST"])
def profile_detail_api_view(request, username, *args, **kwargs):
    #get the profile from de username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail":"User not found"},status=404)
    profile_obj = qs.first()
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    data = request.data or {}
    if request.method == 'POST':
        follower = request.user
        action = data.get("action")
        if profile_obj.user != follower:
            if action == "follow":
                profile_obj.followers.add(follower)  
            elif action == "unfollow":
                profile_obj.followers.remove(follower)
            else:
                pass
    return Response(serializer.data, status=200)


#@authentication_classes([SessionAuthentication])
@api_view(["GET",'POST'])
@permission_classes([IsAuthenticated]) #REST API course
def user_follow_view(request, username, *args, **kwargs):
    follower = request.user
    followed = User.objects.filter(username=username)
    if follower.username == username:
        my_followers = follower.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)
    #profile = Profile.objects.filter(user__username=username).first()
    if followed.exists() == False:
        return Response({}, status=404)
    followed = followed.first()
    profile = followed.profile
    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        profile.followers.add(follower)  
    elif action == "unfollow":
        profile.followers.remove(follower)
    else:
        pass
    current_followers = profile.followers.all()
    data = PublicProfileSerializer(instance=profile, context={"request": request})
    return Response(data.data, status=200)
