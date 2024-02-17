from rest_framework.views import APIView
from rest_framework.response import Response
from requests import request
from .serializers import GptSerializer, GeolocationSerializer
from rest_framework import status
from django.conf import settings
import json

GPT_MODEL = 'gpt-3.5-turbo'
GPT_URL = 'https://api.openai.com/v1/chat/completions'
GOOGLE_PLACES_URL = 'https://places.googleapis.com/v1/places:searchText'

class AskGptView(APIView):
    
    def post(self, req):
        openai_api_key = settings.OPENAI_API_KEY

        req_data = GptSerializer(data=req.data)

        # Check if request is valid
        if req_data.is_valid():

            # Do the request to open API
            data = {
                'model': GPT_MODEL,
                "messages": [{"role": "user", "content": req_data.validated_data.get('message')}]
            }
            res = request("POST", GPT_URL, 
                          headers={'Authorization': 'Bearer ' + openai_api_key}, json=data)

            # Parse GPT response
            parsed_json = json.loads(res.text)
            choices = parsed_json['choices']

            # Access GPT message
            gpt_message = choices[0]['message']['content']

            # Return GPT message
            return Response({'message': gpt_message})
        else:
            # Return 400 and validation errors
            return Response(req_data.errors, status=status.HTTP_400_BAD_REQUEST)

       
    
class GeolocationView(APIView):
    def post(self, req):

        places_api_key = settings.PLACES_API_KEY

        req_data = GeolocationSerializer(data=req.data)

        # Check if request is valid
        if req_data.is_valid():

            # Do the request to Google Places API
            data = {
                'textQuery': req_data.validated_data.get('text'),
                'locationBias': {
                    'circle': {
                        'center': { 'latitude': req_data.validated_data.get('lat'), 'longitude': req_data.validated_data.get('lng') },
                        'radius': 1000.0,
                    },
                },
            }

            headers = {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": places_api_key,
                "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.primaryType,places.rating,places.internationalPhoneNumber,places.googleMapsUri",
            }

            res = request("POST", GOOGLE_PLACES_URL, headers=headers, json=data)

            # Parse the response
            parsed_json = json.loads(res.text)

            return Response(parsed_json)

        else:  
             # Return 400 and validation errors
            return Response(req_data.errors, status=status.HTTP_400_BAD_REQUEST)
        
