from django.db import models
from django.contrib.auth.models import User
from backend.models import Problem
from pathlib import Path
from django.conf import settings
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
    code_file_uuid = models.CharField(max_length=100, null=True, blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    execution_time = models.FloatField(null=True, blank=True)
    result_output = models.TextField(null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Enforce policy: keep ALL accepted + last 15 non-accepted
        if self.status != 'Accepted':
            # Count all non-Accepted for this user
            non_accepted_qs = Submission.objects.filter(
                user=self.user
            ).exclude(status='Accepted').order_by('-submitted_at')

            # Keep only latest 15
            excess = non_accepted_qs[15:]
            if excess.exists():
                for s in excess:
                    s.delete()

    def delete_files(self):
        if not self.code_file_uuid:
            return
        base_dir = settings.EXECUTOR_ROOT
        for folder in ['codes', 'inputs', 'outputs']:
            for ext in ['.py', '.cpp', '.java', '.txt']:
                path = base_dir / folder / f"{self.code_file_uuid}{ext}"
                if path.exists():
                    path.unlink()
    def delete(self, *args, **kwargs):
        self.delete_files()
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.username} - {self.problem.title} - {self.status}"