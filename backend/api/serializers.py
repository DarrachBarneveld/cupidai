from rest_framework import serializers


class GptSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)

class GeolocationSerializer(serializers.Serializer):
    lat = serializers.FloatField(required=True)
    lng = serializers.FloatField(required=True)
    drink = serializers.CharField(required=False, allow_blank=True)
    food = serializers.CharField(required=False, allow_blank=True)
    activity = serializers.CharField(required=False, allow_blank=True)
