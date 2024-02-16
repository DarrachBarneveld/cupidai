from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from requests import request
from .serializers import GptSerializer
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.conf import settings

class AskGptView(APIView):
    
    def post(self, req):
        print(req.data)

        openai_api_key = settings.OPENAI_API_KEY

        req_data = GptSerializer(data=req.data)
        print(req_data)

        if req_data.is_valid():
            data = {
                'model': 'gpt-3.5-turbo',
                "messages": [{"role": "user", "content": req_data.validated_data.get('message')}]
            }
            res = request("POST", 'https://api.openai.com/v1/chat/completions', 
                          headers={'Authorization': 'Bearer ' + openai_api_key}, json=data)

            return Response({'message': res.text})
        else:
            return Response(req_data.errors, status=status.HTTP_400_BAD_REQUEST)

       
    
