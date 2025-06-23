from django.contrib import admin
from backend.models import Problem, TestCase

@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'difficulty')  # ✅ shows difficulty in list view
    list_filter = ('difficulty',)  
    list_display_links = ('title',)               # ✅ allows filtering by difficulty
    search_fields = ('title',)
admin.site.register(TestCase)

