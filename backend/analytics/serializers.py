from rest_framework import serializers
from policy.models import PolicyDetail

class PolicyDetailSerializer(serializers.ModelSerializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField()
    count = serializers.IntegerField()
    class Meta:
        model = PolicyDetail
        fields = ["year","month","count"]