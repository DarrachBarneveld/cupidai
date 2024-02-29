from rest_framework import serializers


class GptSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)

class GeolocationSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    lng = serializers.FloatField()
    drink = serializers.CharField()
    food = serializers.CharField()
    activity = serializers.CharField()
