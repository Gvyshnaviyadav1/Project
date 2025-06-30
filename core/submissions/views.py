# from django.shortcuts import render
# from rest_framework import generics, permissions
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from backend.models import Problem
# from .models import Submission
# from .serializers import SubmissionSerializer
# COMPILER_URL = "http://localhost:8000/api/compiler/compile/"
# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def submit_code(request):
#     user = request.user
#     problem_id = request.data.get('problem_id')
#     language = request.data.get('language')
#     code = request.data.get('code')
    

#     try:
#         problem = Problem.objects.get(pk=problem_id)
#     except Problem.DoesNotExist:
#         return Response({'error': 'Problem not found'}, status=404)

#     submission = Submission.objects.create(
#         user=user,
#         problem=problem,
#         language=language,
#         code=code,
#         status='Pending'
#     )

#     # STUB: Fake judge logic for now (replace with real executor later!)
#     submission.status = 'Accepted'
#     submission.execution_time = 0.2
#     submission.result_output = 'Sample output'
#     submission.error_message = None
#     submission.save()

#     serializer = SubmissionSerializer(submission)
#     return Response(serializer.data)


# # List all of *this user's* submissions
# class UserSubmissionsList(generics.ListAPIView):
#     serializer_class = SubmissionSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')

# # Create your views here.
import requests
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status as http_status
from backend.models import Problem
from .models import Submission
from .serializers import SubmissionSerializer

# Compiler service endpoint
COMPILER_URL = "http://localhost:8000/api/compiler/compile/"

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def submit_code(request):
    """
    Handles code submission: saves submission, runs against test cases via compiler,
    updates status, and returns result.
    """
    user = request.user
    problem_id = request.data.get('problem_id')
    language = request.data.get('language')
    code = request.data.get('code')

    # Validate request
    if not all([problem_id, code, language]):
        return Response({"error": "Missing fields"}, status=http_status.HTTP_400_BAD_REQUEST)

    try:
        problem = Problem.objects.get(pk=problem_id)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=http_status.HTTP_404_NOT_FOUND)

    # 1️⃣ Create the initial submission object
    submission = Submission.objects.create(
        user=user,
        problem=problem,
        language=language,
        code=code,
        status='Pending'
    )

    # 2️⃣ Judge logic
    all_passed = True
    error_message = ""
    detailed_results = []

    # Get all non-sample test cases
    test_cases = problem.test_cases.filter(is_sample=False)
    if not test_cases.exists():
        submission.status = 'Error'
        submission.error_message = 'No test cases found for this problem.'
        submission.save()
        serializer = SubmissionSerializer(submission)
        return Response(serializer.data)

    for idx, testcase in enumerate(test_cases, start=1):
        try:
            compiler_response = requests.post(COMPILER_URL, json={
                "language": language,
                "code": code,
                "input": testcase.input
            }, timeout=15)

            if compiler_response.status_code != 200:
                all_passed = False
                error_message = f"Compiler Error: {compiler_response.text}"
                break

            result = compiler_response.json()
            status_resp = result.get('status')
            output = result.get('output', '').strip()

            detailed_results.append({
                "test_case": idx,
                "input": testcase.input,
                "expected_output": testcase.expected_output.strip(),
                "actual_output": output,
                "status": status_resp
            })

            if status_resp != 'Success':
                all_passed = False
                error_message = f"Runtime Error on test case {idx}:\n{result.get('error', 'Unknown error')}"
                break

            def normalize(s):
                return " ".join(s.strip().split())

            expected_normalized = normalize(testcase.expected_output)
            actual_normalized = normalize(output)

            if actual_normalized != expected_normalized:
                all_passed = False
                error_message = f"Wrong Answer on test case {idx}.\nExpected: {expected_normalized}\nGot: {actual_normalized}"
                break


        except requests.exceptions.Timeout:
            all_passed = False
            error_message = f"Time Limit Exceeded on test case {idx}"
            break
        except Exception as e:
            all_passed = False
            error_message = f"Internal Error: {str(e)}"
            break

    # 3️⃣ Update submission result
    if all_passed:
        submission.status = 'Accepted'
        submission.result_output = "All test cases passed!"
        submission.error_message = None
    else:
        submission.status = 'Wrong Answer'
        submission.result_output = str(detailed_results)
        submission.error_message = error_message

    submission.save()

    serializer = SubmissionSerializer(submission)
    return Response(serializer.data)


# ✅ List all of *this user's* submissions
class UserSubmissionsList(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')

