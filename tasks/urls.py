from django.urls import path
from .views import task_detail, task_list
from .views import task_list, task_detail, register_user


urlpatterns = [
    path('tasks/', task_list),
     path('tasks/<int:pk>/', task_detail),  # NEW
     path('register/', register_user),#JWT registration endpoint
]