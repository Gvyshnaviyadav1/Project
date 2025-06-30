from django.contrib import admin
from .models import Submission

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'problem', 'language', 'status', 'submitted_at')
    list_filter = ('status', 'language')
    search_fields = ('user__username', 'problem__title', 'code')
    list_display_links = ('problem',)

# Register your models here.
