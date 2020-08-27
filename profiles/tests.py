from django.test import TestCase

# Create your tests here.
from .models import Profile
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="test", password="somepassword")
        self.user2 = User.objects.create_user(username="test2", password="somepassword")
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user1.username, password='somepassword')
        return client


    def test_profile_signal_created(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)
    
    def test_following(self):
        first = self.user1
        second = self.user2
        first.profile.followers.add(second) #added a follower
        qs = second.following.filter(user=first) #checked a new user is follow
        self.assertTrue(qs.exists())
        first_following = first.following.all()
        self.assertFalse(first_following.exists())

    def test_follow_api(self):
        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.user2.username}/follow",
            {"action": "follow"}
        )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count,1)
    
    def test_cannot_follow_api(self):
        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.user1.username}/follow",
            {"action": "follow"}
        )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count,0)
    
    def test_unfollow_api(self):
        first = self.user1
        second = self.user2
        first.profile.followers.add(second)

        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.user2.username}/follow",
            {"action": "unfollow"}
        )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count,0)
    
        

    