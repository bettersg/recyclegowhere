# Generated by Django 3.2 on 2022-01-16 08:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recycleapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='b',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CallForCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('items_collected', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='g',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(blank=True, max_length=1000, null=True)),
                ('suggestion', models.CharField(blank=True, max_length=1000, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('bluebinrecyclable', models.IntegerField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='n',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('in_good_condition', models.CharField(blank=True, max_length=1000, null=True)),
                ('in_need_of_repair', models.CharField(blank=True, max_length=1000, null=True)),
                ('spoilt_beyond_repair', models.CharField(blank=True, max_length=1000, null=True)),
                ('call_for_collection', models.ManyToManyField(to='recycleapp.CallForCollection')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='PhysicalChannels',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sn', models.IntegerField(blank=True, null=True)),
                ('name_of_organisation', models.CharField(blank=True, max_length=100, null=True)),
                ('address', models.CharField(blank=True, max_length=1000, null=True)),
                ('blocknumber', models.CharField(blank=True, max_length=10, null=True)),
                ('building_name', models.CharField(blank=True, max_length=100, null=True)),
                ('postcode', models.IntegerField(blank=True, null=True)),
                ('operating_hours', models.CharField(blank=True, max_length=1000, null=True)),
                ('contact', models.IntegerField(blank=True, null=True)),
                ('website', models.SlugField(blank=True, null=True)),
                ('remarks', models.CharField(blank=True, max_length=1000, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='ReuseChannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_of_reuse', models.CharField(blank=True, choices=[('DONATE', 'Donate'), ('RESELL', 'Resell'), ('REPAIR', 'Repair')], max_length=100, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='ItemList',
        ),
        migrations.AddField(
            model_name='physicalchannels',
            name='channel_of_reuse',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.reusechannel'),
        ),
        migrations.AddField(
            model_name='b',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recycleapp.category'),
        ),
    ]
