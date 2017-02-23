from django.shortcuts import render
from django.http import HttpResponse
from .forms import EmailForm
from django.core.mail import send_mail


def index(request):
	return render(request,'tvShows/home.html')

def details(request):
    return render(request,'tvShows/details.html')








