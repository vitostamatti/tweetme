from django.db import models
from django.conf import settings
import random
from django.db.models import Q
# Create your models here.

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact=username)
    
    def feed(self, user):
        profiles = user.following.exists()
        followed_users_id=[]
        if profiles:
            followed_users_id = user.following.values_list("user__id", flat=True)
        return self.filter(
                Q(user__id__in=followed_users_id) | 
                Q(user=user)
            ).distinct().order_by("-timestamp")

class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def get_feed(self,user):
        return self.get_queryset().feed(user)

class Tweet(models.Model):
    # id = models.AutoField(pk=True)
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    likes = models.ManyToManyField(User, related_name="tweet_user", blank=True, through=TweetLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="image/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    #def __str__(self):
    #    return self.content

    objects = TweetManager()

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        '''
        Not used
        '''
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0,100)
        }

