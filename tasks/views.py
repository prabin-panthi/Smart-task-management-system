from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# JWT IMPORTS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# CUSTOM JWT SERIALIZER
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # ADD EXTRA DATA TO TOKEN
        token['username'] = user.username

        return token


# CUSTOM LOGIN VIEW
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# GET all tasks, POST new task
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list(request):

    if request.method == 'GET':

        tasks = Task.objects.filter(user=request.user)

        # FILTER by status
        status_param = request.GET.get('status')

        if status_param:
            tasks = tasks.filter(status=status_param)

        # FILTER by priority
        priority_param = request.GET.get('priority')

        if priority_param:
            tasks = tasks.filter(priority=priority_param)

        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(serializer.errors)


# GET single task, UPDATE, DELETE
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request, pk):

    try:
        task = Task.objects.get(pk=pk, user=request.user)

    except Task.DoesNotExist:

        return Response(
            {"error": "Task not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # GET single task
    if request.method == 'GET':

        serializer = TaskSerializer(task)

        return Response(serializer.data)

    # UPDATE task
    elif request.method == 'PUT':

        serializer = TaskSerializer(task, data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # DELETE task
    elif request.method == 'DELETE':

        task.delete()

        return Response(
            {"message": "Task deleted"},
            status=status.HTTP_204_NO_CONTENT
        )


# REGISTER USER
@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    if not username:
        return Response(
            {"error": "Username is required"},
            status=400
        )

    if not password:
        return Response(
            {"error": "Password is required"},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return Response({
            'error': 'Username already exists'
        }, status=400)

    user = User.objects.create_user(
        username=username,
        password=password
    )

    return Response({
        'message': 'User created successfully'
    })