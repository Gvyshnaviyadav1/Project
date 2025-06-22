from rest_framework import serializers
from backend.models import Problem, TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ['id', 'input', 'expected_output', 'is_sample']

class ProblemSerializer(serializers.ModelSerializer):
    test_cases = TestCaseSerializer(many=True, read_only=True)

    class Meta:
        model = Problem
        fields = ['id', 'title', 'description', 'constraints', 'sample_input', 'sample_output', 'time_limit', 'memory_limit', 'test_cases']
