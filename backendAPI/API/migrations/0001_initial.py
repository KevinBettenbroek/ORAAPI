# Generated by Django 3.1.3 on 2021-01-11 13:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bag',
            fields=[
                ('bag_NR', models.IntegerField(primary_key=True, serialize=False)),
                ('bag_type', models.CharField(choices=[('PREBAG', 'Voorloopzakje'), ('MEDICATIONBAG', 'Medicatiezakje'), ('AFTERBAG', 'Naloopzakje')], max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('batch_NR', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('machine_ID', models.CharField(max_length=10)),
                ('packaging_code', models.IntegerField()),
                ('DB', models.CharField(max_length=40)),
                ('leave_datetime', models.DateTimeField()),
                ('forward_datetime', models.DateTimeField()),
                ('remarks_end_control', models.CharField(blank=True, max_length=200, null=True)),
                ('checked_by', models.CharField(max_length=40)),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('inspector', models.CharField(max_length=40)),
                ('batch_started', models.DateTimeField()),
                ('total_NR_bags', models.IntegerField()),
                ('bags_checked', models.IntegerField()),
                ('total_NR_patients', models.IntegerField()),
                ('bags_rejected', models.IntegerField()),
                ('NR_to_double_check', models.IntegerField()),
                ('double_checked', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Institute',
            fields=[
                ('institute', models.CharField(max_length=40, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_NR', models.IntegerField(primary_key=True,serialize=False)),
                ('order_released', models.BooleanField()),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.institute')),
            ],
        ),
        migrations.CreateModel(
            name='Roll',
            fields=[
                ('roll_NR', models.IntegerField(primary_key=True, serialize=False)),
                ('patient', models.CharField(max_length=40)),
                ('batch_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.batch')),
            ],
        ),
        migrations.CreateModel(
            name='PillsToBeAdded',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pil_ID', models.IntegerField()),
                ('medication_name', models.CharField(max_length=40)),
                ('free_text', models.CharField(blank=True, max_length=200, null=True)),
                ('bag_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.bag')),
            ],
        ),
        migrations.CreateModel(
            name='OrderBatch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('batch_NR', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='API.batch')),
                ('order_NR', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='API.order')),
            ],
        ),
        migrations.CreateModel(
            name='MissingPictures',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient', models.CharField(max_length=40)),
                ('corrected_by', models.CharField(max_length=40)),
                ('checked_by', models.CharField(max_length=40)),
                ('bag_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.bag')),
            ],
        ),
        migrations.CreateModel(
            name='Error',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('error_NR', models.IntegerField()),
                ('error', models.CharField(choices=[('TOO_MUCH', 'Te veel'), ('TOO_LITTLE', 'Te weinig'), ('TOO_EARLY', 'Te vroeg'), ('TOO_LATE', 'Te laat')], max_length=10)),
                ('patient', models.CharField(max_length=40)),
                ('error_desc', models.CharField(blank=True, max_length=200, null=True)),
                ('free_text', models.CharField(blank=True, max_length=200, null=True)),
                ('error_datetime', models.DateTimeField()),
                ('corrected_by', models.CharField(max_length=40)),
                ('checked_by', models.CharField(max_length=40)),
                ('bag_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.bag')),
            ],
        ),
        migrations.CreateModel(
            name='Check',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.order', blank=True, null=True)),
                ('batch_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.batch', blank=True, null=True)),
                ('roll_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.roll', blank=True, null=True)),
                ('bag_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.bag', blank=True, null=True)),
                ('check_type', models.CharField(max_length=40)),
                ('checked_by', models.CharField(max_length=40)),
                ('check_remarks', models.CharField(max_length=200, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.institute')),
            ],
        ),
        migrations.CreateModel(
            name='BatchRow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('split_NR', models.IntegerField()),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('NR_patients', models.IntegerField()),
                ('NR_bags', models.IntegerField()),
                ('MC_CD', models.CharField(choices=[('MC', 'MC'), ('CD', 'CD')], max_length=2)),
                ('remarks', models.CharField(blank=True, max_length=200, null=True)),
                ('batch_NR', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.batch')),
                ('department', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='API.department')),
            ],
        ),
        migrations.AddField(
            model_name='bag',
            name='roll_NR',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.roll'),
        ),
    ]
