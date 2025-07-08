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
        try:
            # Get the original version from DB
            original = Submission.objects.get(pk=self.pk)
            old_uuid = original.code_file_uuid
        except Submission.DoesNotExist:
            old_uuid = None

        super().save(*args, **kwargs)

        # 🧹 If UUID changed, delete old files
        if old_uuid and old_uuid != self.code_file_uuid:
            self.delete_files(uuid_to_delete=old_uuid)

        # 🧹 Keep only last 15 non-Accepted
        if self.status != 'Accepted':
            all_user_submissions = Submission.objects.filter(
                user=self.user
                        ).order_by('-submitted_at')

            excess = all_user_submissions[15:]
            for s in excess:
                s.delete()


    def delete_files(self, uuid_to_delete=None):
        """
        Deletes files associated with a given UUID.
        If uuid_to_delete is None, uses self.code_file_uuid.
        """
        uuid_to_use = uuid_to_delete or self.code_file_uuid
        if not uuid_to_use:
            return

        base_dir = settings.EXECUTOR_ROOT
        for folder in ['codes', 'inputs', 'outputs']:
            for ext in ['.py', '.cpp', '.java', '.txt']:
                path = base_dir / folder / f"{uuid_to_use}{ext}"
                if path.exists():
                    path.unlink()

    def delete(self, *args, **kwargs):
        self.delete_files()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.problem.title} - {self.status}"
    
class SolvedProblem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    solved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'problem')
