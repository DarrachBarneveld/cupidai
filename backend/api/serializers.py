from rest_framework import serializers


class GptSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)