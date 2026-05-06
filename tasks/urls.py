from django.urls import path
from .views import task_detail, task_list

urlpatterns = [
    path('tasks/', task_list),
     path('tasks/<int:pk>/', task_detail),  # NEW
]