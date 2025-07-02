from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import generics
from backend.models import Problem
from backend.serializers import ProblemSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        return data

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Problem
from .your_llm_module import generate_from_gemini
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(password)
    except ValidationError as e:
        return Response({'detail': e.messages}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'detail': 'User registered successfully'}, status=status.HTTP_201_CREATED)



# GET /api/problems/
class ProblemListView(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# GET /api/problems/<id>/
class ProblemDetailView(generics.RetrieveAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ai_hint(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)

    prompt = f"""
    Provide a concise hint for solving this competitive programming problem:

    Title: {problem.title}
    Description: {problem.description}
    Constraints: {problem.constraints}
    """

    hint = generate_from_gemini(prompt)
    return Response({'hint': hint})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ai_solution(request, pk):
    language = request.GET.get('language', 'Python')
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)

    prompt = f"""
    Write a complete solution in {language} for this competitive programming problem:

    Title: {problem.title}
    Description: {problem.description}
    Constraints: {problem.constraints}
    """

    solution = generate_from_gemini(prompt)
    return Response({'solution': solution})