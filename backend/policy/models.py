from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class PolicyDetail(models.Model):
    policy_id = models.IntegerField(unique=True)
    date_of_purchase = models.DateField()
    customer_id = models.IntegerField()
    fuel = models.CharField(max_length=20)
    vehicle_segment = models.CharField(max_length=10)
    premium = models.IntegerField(validators=[MaxValueValidator(1000000),
                                              MinValueValidator(1)])
    bodily_injury_liability = models.BooleanField(default=False)
    personal_injury_protection = models.BooleanField(default=False)
    property_damage_liability = models.BooleanField(default=False)
    collision = models.BooleanField(default=False)
    comprehensive = models.BooleanField(default=False)
    customer_gender = models.CharField(max_length=10)
    customer_income_group = models.CharField(max_length=10)
    customer_region = models.CharField(max_length=20)
    customer_marital_status = models.BooleanField(default=False)

    def __str__(self):
        return str(self.customer_id)