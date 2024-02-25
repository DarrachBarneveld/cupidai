from rest_framework import serializers


class GptSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)

class GeolocationSerializer(serializers.Serializer):
    lat = serializers.FloatField(required=True)
    lng = serializers.FloatField(required=True)
    drink = serializers.CharField(required=True)
    food = serializers.CharField(required=True)
    activity = serializers.CharField(required=True)
