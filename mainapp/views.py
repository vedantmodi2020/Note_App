from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@csrf_exempt
@api_view(['GET', 'POST'])
def getNotes(request):
    methods = {
        'GET': getNotesList,
        'POST': createNote,
    }
    return methods[request.method](request)


@csrf_exempt
@api_view(['GET', 'PUT', 'POST'])
def getNote(request, pk):
    methods = {
        'GET': lambda request, pk: getNoteDetail(request, pk),
        'PUT': lambda request, pk: updateNote(request, pk),
        'POST': lambda request, pk: deleteNote(request, pk),
    }
    return methods[request.method](request, pk)
