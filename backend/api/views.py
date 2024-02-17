from rest_framework.views import APIView
from rest_framework.response import Response
from requests import request
from .serializers import GptSerializer, GeolocationSerializer
from rest_framework import status
from django.conf import settings
import json
from openai import OpenAI
from django.http import StreamingHttpResponse

GPT_MODEL = 'gpt-3.5-turbo'
GOOGLE_PLACES_URL = 'https://places.googleapis.com/v1/places:searchText' 

def stream_response(completion_stream):
    """ Read chunks from stream """
    
    for chunk in completion_stream:
        content = chunk.choices[0].delta.content
        if content is None:
            return
        yield content

class AskGptView(APIView):

    def post(self, req):

        req_data = GptSerializer(data=req.data)

        # Check if request is valid
        if req_data.is_valid():

            # Do the request to open API
            messages = [{"role": "user", "content": req_data.validated_data.get('message')}]

            # Create the OpenAi client
            client = OpenAI()

            # Request GPT stream
            res = client.chat.completions.create(model=GPT_MODEL, messages=messages, stream=True, max_tokens=500)

            # Return a streaming response
            return StreamingHttpResponse(stream_response(res), content_type='text/plain')

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
                "X-Goog-FieldMask": "*",
            }

            # places.displayName,places.formattedAddress,places.primaryType,places.rating,places.internationalPhoneNumber,places.googleMapsUri

            res = request("POST", GOOGLE_PLACES_URL, headers=headers, json=data)

            # Parse the response
            parsed_json = json.loads(res.text)

            return Response(parsed_json)

        else:  
             # Return 400 and validation errors
            return Response(req_data.errors, status=status.HTTP_400_BAD_REQUEST)
        
