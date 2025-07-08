from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Submission

@receiver(pre_delete, sender=Submission)
def submission_file_cleanup(sender, instance, **kwargs):
    """
    Called automatically before a Submission object is deleted.
    """
    instance.delete_files()
