from rest_framework.serializers import ModelSerializer
from .models import notes

class NoteSerializer(ModelSerializer):
    class Meta:
        model = notes
        fields = '__all__'