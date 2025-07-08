from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Problem(models.Model):
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    constraints = models.TextField()
    sample_input = models.TextField()
    sample_output = models.TextField()
    time_limit = models.FloatField(help_text="Time limit in seconds")
    memory_limit = models.IntegerField(help_text="Memory limit in MB")
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='Medium')
    def __str__(self):
        return self.title

# ------------------------------
# Test Case Model
# ------------------------------
class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='test_cases')
    input = models.TextField()
    expected_output = models.TextField()
    is_sample = models.BooleanField(default=False)

    def __str__(self):
        return f"TestCase for {self.problem.title} (Sample: {self.is_sample})"

#User profile coins 
#------------------------------
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    coins = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.coins} coins"