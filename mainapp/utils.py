from rest_framework.response import Response
from .models import notes
from .serializers import NoteSerializer


def getNotesList(request):
    note = notes.objects.all().order_by('-updated')
    serializer = NoteSerializer(note, many=True)
    return Response(serializer.data)


def getNoteDetail(request, pk):
    note = notes.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = notes.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def updateNote(request, pk):
    data = request.data
    note = notes.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(f'Updtaed the Entry : {str(pk)}')


def deleteNote(request, pk):
    note = notes.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')