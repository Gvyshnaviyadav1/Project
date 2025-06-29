from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from backend.models import Problem
from .models import Submission
from .serializers import SubmissionSerializer

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def submit_code(request):
    user = request.user
    problem_id = request.data.get('problem_id')
    language = request.data.get('language')
    code = request.data.get('code')

    try:
        problem = Problem.objects.get(pk=problem_id)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)

    submission = Submission.objects.create(
        user=user,
        problem=problem,
        language=language,
        code=code,
        status='Pending'
    )

    # STUB: Fake judge logic for now (replace with real executor later!)
    submission.status = 'Accepted'
    submission.execution_time = 0.2
    submission.result_output = 'Sample output'
    submission.error_message = None
    submission.save()

    serializer = SubmissionSerializer(submission)
    return Response(serializer.data)


# List all of *this user's* submissions
class UserSubmissionsList(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')

# Create your views here.
