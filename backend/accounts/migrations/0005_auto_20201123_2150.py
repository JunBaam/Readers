# Generated by Django 3.0.10 on 2020-11-23 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, default='accounts/user.png', null=True, upload_to='accounts/avatar/%Y/%m/%d'),
        ),
    ]
