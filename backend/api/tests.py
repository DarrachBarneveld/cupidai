"""API Tests"""

import json
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from unittest.mock import patch


class GeolocationViewTestCase(TestCase):
    """
    Tests the GeolocationView.

    Checks the response status code and data for a POST request with mock data.
    """


    def setUp(self):
        self.client = Client()
        self.url = reverse('places')

    def test_post(self):
        """
        Tests the POST method of the GeolocationView.

        Sends a POST request with mock data and checks the response status code and data.
        """
        data = {
            'lat': 40.7128,
            'lng': -74.0060,
            'drink': 'coffee',
            'food': 'pizza',
            'activity': 'museum'
        }
        response = self.client.post(self.url, data, format='json')

        # Check status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        response_data = json.loads(response.content)
        self.assertIsInstance(response_data, list)
        self.assertGreater(len(response_data), 0)


    def test_post_with_no_lat_lng(self):
        """
        Tests the POST method of the GeolocationView with no latitude or longitude.

        Sends a POST request with data missing latitude and longitude and checks the response
        status code.
        """

        # Data with no latitude or longitude
        data = {
            'drink': 'coffee',
            'food': 'pizza',
            'activity': 'museum'
        }

        response = self.client.post(self.url, data, format='json')

        # Check status code
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
