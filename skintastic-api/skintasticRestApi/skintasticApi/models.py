from django.db import models

# Create your models here.

class cart(models.Model):
    email = models.CharField(max_length=150, blank=False, default='')
    
