from django.db import models
from django.contrib.auth.models import User
from backend.models import Problem
# Create your models here.
class Submission(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Running', 'Running'),
        ('Accepted', 'Accepted'),
        ('Wrong Answer', 'Wrong Answer'),
        ('Runtime Error', 'Runtime Error'),
        ('Compilation Error', 'Compilation Error'),
        ('Time Limit Exceeded', 'Time Limit Exceeded'),
        ('Error', 'Error')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    language = models.CharField(max_length=20)
    code = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    execution_time = models.FloatField(null=True, blank=True)
    result_output = models.TextField(null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.problem.title} - {self.status}"