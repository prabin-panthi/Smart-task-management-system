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

# GET all tasks, POST new task
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()

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
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors) 


# NEW: GET single task, UPDATE, DELETE
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

    # GET single task
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    

    # UPDATE task
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE task
    elif request.method == 'DELETE':
        task.delete()
        return Response({"message": "Task deleted"}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def register_user(request):
    data = request.data

    # Check if username already exists
    if User.objects.filter(username=data['username']).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create user
    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )

    return Response(
        {"message": "User registered successfully"},
        status=status.HTTP_201_CREATED
    )