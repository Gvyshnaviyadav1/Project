from rest_framework import serializers
from .models import Submission

class SubmissionSerializer(serializers.ModelSerializer):
    problem_title = serializers.CharField(source='problem.title', read_only=True)
    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ['id', 'user', 'submitted_at', 'status', 'execution_time', 'result_output', 'error_message']
