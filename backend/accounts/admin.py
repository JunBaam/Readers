from django.contrib import admin
from .models import User


@admin.register(User)
class AccountsAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'username',
        'is_staff',
    )
