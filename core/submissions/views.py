
# import requests
# from django.contrib.auth.models import User
# from django.db.models import Count
# from django.shortcuts import render
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import generics, permissions
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status as http_status
# from backend.models import Problem,UserProfile
# from .models import Submission,SolvedProblem
# from .serializers import SubmissionSerializer
# from django.db.models import Q


# # Compiler service endpoint
# COMPILER_URL = "http://localhost:8000/api/compiler/compile/"

# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def submit_code(request):
#     """
#     Handles code submission: saves submission, runs against test cases via compiler,
#     updates status, and returns result.
#     """
#     user = request.user
#     problem_id = request.data.get('problem_id')
#     # language = request.data.get('language')
#     # code = request.data.get('code')

#     # # Validate request
#     # if not all([problem_id, code, language]):
#     #     return Response({"error": "Missing fields"}, status=http_status.HTTP_400_BAD_REQUEST)
#     language = request.data.get('language')
#     code = request.data.get('code')
#     print(code)

#     # Validate request
#     if not all([problem_id, code, language]):
#         return Response({"error": "Missing fields"}, status=http_status.HTTP_400_BAD_REQUEST)

#     # Normalize language
#     LANGUAGE_MAP = {
#         "Python": "py",
#         "C++": "cpp",
#         "Java": "java",
       
#     }
#     language_normalized = LANGUAGE_MAP.get(language)
#     if not language_normalized:
#         return Response({'error': f"Language '{language}' not supported."}, status=400)

#     try:
#         problem = Problem.objects.get(pk=problem_id)
#     except Problem.DoesNotExist:
#         return Response({'error': 'Problem not found'}, status=http_status.HTTP_404_NOT_FOUND)

#     # 1️⃣ Create the initial submission object
#     submission = Submission.objects.create(
#         user=user,
#         problem=problem,
#         language=language,
#         code=code,
#         status='Pending'
#     )

#     # 2️⃣ Judge logic
#     all_passed = True
#     error_message = ""
#     detailed_results = []
#     code_file_uuid =None
#     # Get all non-sample test cases
#     test_cases = problem.test_cases.filter(is_sample=False)
#     if not test_cases.exists():
#         submission.status = 'Error'
#         submission.error_message = 'No test cases found for this problem.'
#         submission.save()
#         serializer = SubmissionSerializer(submission)
#         return Response(serializer.data)

#     for idx, testcase in enumerate(test_cases, start=1):
#         try:
#             compiler_response = requests.post(COMPILER_URL, json={
#                 "language": language_normalized,
#                 "code": code,
#                 "input": testcase.input
#             }, timeout=15)

#             if compiler_response.status_code != 200:
#                 all_passed = False
#                 error_message = f"Compiler Error: {compiler_response.text}"
#                 break

#             result = compiler_response.json()
#             status_resp = result.get('status')
#             # output_obj = result.get('output', {})
#             # output_text = output_obj.get('output', '').strip()

#             output_obj = result.get('output', {})
#             output_text = output_obj.get('output', '').strip()
#             code_file_uuid = output_obj.get('uuid') or result.get('uuid')


#             if not code_file_uuid:
#                 code_file_uuid = result.get('uuid')
#             detailed_results.append({
#                 "TestCase": idx,
                
#                 "Expected": testcase.expected_output.strip(),
#                 "Output": output_text,
               
#             })

#             if status_resp != 'Success':
#                 all_passed = False
#                 error_message = f"Runtime Error on test case {idx}:\n{result.get('error', 'Unknown error')}"
#                 break

#             def normalize(s):
#                 return " ".join(s.strip().split()).lower()

#             expected_normalized = normalize(testcase.expected_output)
#             actual_normalized = normalize(output_text)

#             if actual_normalized != expected_normalized:
#                 all_passed = False
#                 error_message = f"Wrong Answer on test case {idx}.\nExpected: {expected_normalized}\nGot: {actual_normalized}"
#                 break


#         except requests.exceptions.Timeout:
#             all_passed = False
#             error_message = f"Time Limit Exceeded on test case {idx}"
#             break
#         except Exception as e:
#             all_passed = False
#             error_message = f"Internal Error: {str(e)}"
#             break
#     if code_file_uuid:
#         submission.code_file_uuid = code_file_uuid
#     # 3️⃣ Update submission result
#     if all_passed:
#         submission.status = 'Accepted'
#         submission.code_file_uuid = code_file_uuid
#         submission.result_output = "All test cases passed!"
#         submission.error_message = None
#         submission.save()
#         #award points for first time solving
#         already_solved = SolvedProblem.objects.filter(user=user, problem=problem).exists()
#         if not already_solved:
#              difficulty = problem.difficulty
#              coins_awarded = 10 if difficulty == 'Easy' else 20 if difficulty == 'Medium' else 30
#              user.profile.coins += coins_awarded
#              user.profile.save()
#     else:
#         submission.status = 'Wrong Answer'
#         submission.code_file_uuid = code_file_uuid
#         submission.result_output = str(detailed_results)
#         submission.error_message = error_message

#     submission.save()

#     serializer = SubmissionSerializer(submission)
#     return Response(serializer.data)


# # ✅ List all of *this user's* submissions
# class UserSubmissionsList(generics.ListAPIView):
#     serializer_class = SubmissionSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def leaderboard_view(request):
#     leaderboard = (
#          UserProfile.objects
#         .select_related('user')
#         .order_by('-coins')
#     )

#     result = [
#         {
#            "username": entry.user.username,
#             "coins": entry.coins
#         }
#         for entry in leaderboard
#     ]

#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def current_user_view(request):
#     return Response({"username": request.user.username})

# def award_points(user, problem):
#     # Only award if user hasn't already solved this problem
#     already_solved = Submission.objects.filter(user=user, problem=problem, status='Accepted').exists()
#     if not already_solved:
#         difficulty = problem.difficulty  # Assuming you have a field like this
#         coins = 10 if difficulty == 'Easy' else 20 if difficulty == 'Medium' else 30
#         return coins
#     return 0

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile(request):
#     user = request.user

#     # Get problems solved once
#     solved = Submission.objects.filter(user=user, status='Accepted').values('problem').distinct()
#     count = solved.count()

#     # Assuming you have difficulty levels in Problem model
#     problem_ids = [s['problem'] for s in solved]
#     from backend.models import Problem
#     problems = Problem.objects.filter(id__in=problem_ids)

#     coins = 0
#     for p in problems:
#         coins += 10 if p.difficulty == 'Easy' else 20 if p.difficulty == 'Medium' else 30

#     return Response({
#         'username': user.username,
#         'email': user.email,
#         'problems_solved': count,
#         'coins_earned': coins,
#     })

import requests
from django.contrib.auth.models import User
from django.db.models import Count
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status as http_status
from backend.models import Problem,UserProfile
from .models import Submission,SolvedProblem
from .serializers import SubmissionSerializer
from django.db.models import Q
from compiler.views import run_code

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

    if not all([problem_id, code, language]):
        return Response({"error": "Missing fields"}, status=http_status.HTTP_400_BAD_REQUEST)

    LANGUAGE_MAP = {"Python": "py", "C++": "cpp", "Java": "java"}
    language_normalized = LANGUAGE_MAP.get(language)
    if not language_normalized:
        return Response({'error': f"Language '{language}' not supported."}, status=400)

    try:
        problem = Problem.objects.get(pk=problem_id)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=http_status.HTTP_404_NOT_FOUND)

    submission = Submission.objects.create(
        user=user, problem=problem, language=language, code=code, status='Pending'
    )

    test_cases = problem.test_cases.filter(is_sample=False)
    for test_case in test_cases:
        print(test_case)
    if not test_cases.exists():
        submission.status = 'Error'
        submission.error_message = 'No test cases found for this problem.'
        submission.save()
        return Response(SubmissionSerializer(submission).data)

    all_passed = True
    error_message = ""
    final_status = 'Accepted'
    detailed_results = []
    code_file_uuid = None
    print("strt of the test case")

    for idx, testcase in enumerate(test_cases):
        print(f"running test case{idx} ",end=" ")
        try:
            # compiler_response = requests.post(COMPILER_URL, json={
            #     "language": language_normalized,
            #     "code": code,
            #     "input": testcase.input
            # }, timeout=40)
            compiler_response=run_code(language_normalized,code,testcase.input)

            # if compiler_response.status_code != 200:
            #     final_status = 'Error'
            #     error_message = f"Compiler service error: {compiler_response.text}"
            #     all_passed = False
            #     break
            compiler_response["status"]="Success"
            result = compiler_response
            if not code_file_uuid:
                code_file_uuid = result.get('uuid')

            if result.get('status') != 'Success':
                error_text = result.get('error', 'Unknown error')
                if 'Time Limit Exceeded' in error_text:
                    final_status = 'Time Limit Exceeded'
                # A simple heuristic for compilation error
                elif any(err in error_text for err in ["g++", "javac", "error:"]) and "runtime" not in error_text.lower():
                    final_status = 'Compilation Error'
                else:
                    final_status = 'Runtime Error'
                error_message = f"{final_status} on test case {idx}:\n{error_text}"
                all_passed = False
                break

            #output_obj = result.get('output', {})
            #output_text = output_obj.get('output', '').strip()
            output_text=result.get('output')
            
            def normalize(s):
                return " ".join(s.strip().split()).lower()

            expected_normalized = normalize(testcase.expected_output)
            actual_normalized = normalize(output_text)

            detailed_results.append({
                "TestCase": idx,
                "Expected": testcase.expected_output.strip(),
                "Output": output_text,
            })
            print("test case check ended")
            if actual_normalized != expected_normalized:
                final_status = 'Wrong Answer'
                error_message = f"Wrong Answer on test case {idx}.\nExpected: {expected_normalized}\nGot: {actual_normalized}"
                all_passed = False
                break
        
        except requests.exceptions.Timeout:
            final_status = 'Time Limit Exceeded'
            error_message = f"Time Limit Exceeded on test case {idx} (gateway timeout)"
            all_passed = False
            break
        except Exception as e:
            final_status = 'Error'
            error_message = f"An internal error occurred: {str(e)}"
            all_passed = False
            break

    submission.status = final_status
    submission.code_file_uuid = code_file_uuid
    submission.error_message = error_message
    
    if all_passed:
        submission.result_output = "All test cases passed!"
    else:
        submission.result_output = str(detailed_results)

    if submission.status == 'Accepted':
        already_solved = SolvedProblem.objects.filter(user=user, problem=problem).exists()
        if not already_solved:
            difficulty = problem.difficulty
            coins_awarded = 10 if difficulty == 'Easy' else 20 if difficulty == 'Medium' else 30
            user.profile.coins += coins_awarded
            user.profile.save()
            SolvedProblem.objects.create(user=user, problem=problem)


    submission.save()
    return Response(SubmissionSerializer(submission).data)


# ✅ List all of *this user's* submissions
class UserSubmissionsList(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leaderboard_view(request):
    leaderboard = (
         UserProfile.objects
        .select_related('user')
        .order_by('-coins')
    )

    result = [
        {
           "username": entry.user.username,
            "coins": entry.coins
        }
        for entry in leaderboard
    ]

    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    return Response({"username": request.user.username})

def award_points(user, problem):
    # Only award if user hasn't already solved this problem
    already_solved = Submission.objects.filter(user=user, problem=problem, status='Accepted').exists()
    if not already_solved:
        difficulty = problem.difficulty  # Assuming you have a field like this
        coins = 10 if difficulty == 'Easy' else 20 if difficulty == 'Medium' else 30
        return coins
    return 0

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    # Get problems solved once
    solved = Submission.objects.filter(user=user, status='Accepted').values('problem').distinct()
    count = solved.count()

    # Assuming you have difficulty levels in Problem model
    problem_ids = [s['problem'] for s in solved]
    from backend.models import Problem
    problems = Problem.objects.filter(id__in=problem_ids)

    coins = 0
    for p in problems:
        coins += 10 if p.difficulty == 'Easy' else 20 if p.difficulty == 'Medium' else 30

    return Response({
        'username': user.username,
        'email': user.email,
        'problems_solved': count,
        'coins_earned': coins,
    })


