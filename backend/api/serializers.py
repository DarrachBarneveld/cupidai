from rest_framework import serializers


class GptSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)

class GeolocationSerializer(serializers.Serializer):
    lat = serializers.FloatField(required=True)
    lng = serializers.FloatField(required=True)
    text = serializers.CharField(required=True)