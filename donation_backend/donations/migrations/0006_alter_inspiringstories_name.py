# Generated by Django 5.1.7 on 2025-05-04 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0005_inspiringstories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspiringstories',
            name='name',
            field=models.CharField(max_length=10),
        ),
    ]
