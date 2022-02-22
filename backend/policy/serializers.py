from rest_framework import serializers
from policy.models import PolicyDetail

class PolicyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyDetail
        fields = "__all__"
        
class PolicyRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyDetail
        fields = ["customer_region"]