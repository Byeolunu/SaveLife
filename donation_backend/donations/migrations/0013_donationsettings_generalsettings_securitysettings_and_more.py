# Generated by Django 5.1.7 on 2025-05-24 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0012_alter_campaign_start_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='DonationSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fees_configuration', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('minimum_donation_amount', models.DecimalField(decimal_places=2, default=1.0, max_digits=10)),
                ('receipt_footer_text', models.TextField(blank=True, null=True)),
                ('enable_anonymous_donations', models.BooleanField(default=False)),
                ('enable_recurring_donations', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organization_name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('tax_id', models.CharField(blank=True, max_length=50, null=True)),
                ('currency', models.CharField(default='USD', max_length=10)),
                ('language', models.CharField(default='en', max_length=50)),
                ('timezone', models.CharField(default='UTC', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SecuritySettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('two_factor_authentication', models.BooleanField(default=False)),
                ('audit_log_enabled', models.BooleanField(default=False)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='description',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
