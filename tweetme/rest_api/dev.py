from rest_framework import authentication
from django.contrib.auth import get_user_model
from rest_framework import exceptions

User = get_user_model()

class DevAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.first()
        return (user , None)