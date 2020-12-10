from django.urls import path
from . import views
from rest_framework_jwt.views import \
    obtain_jwt_token, \
    refresh_jwt_token, \
    verify_jwt_token

urlpatterns = [
    # 로그인과 동시에 jwt 토큰발급
    # path("login/", obtain_jwt_token),
    # path("signup/", views.SignUpView.as_view(), name="login"),
    path("signup/", views.createUser),
    path('login/', views.login),
    path('list/', views.UserViewSet),


]
