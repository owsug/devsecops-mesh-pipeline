from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"message": "Django Backend API is running!"})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .authentication import JWTAuthentication

class ProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {
            'message': 'This is a protected message from your Django backend!',
            'user_payload': request.user.payload
        }
        return Response(content)