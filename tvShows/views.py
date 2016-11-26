from django.shortcuts import render
from django.http import HttpResponse
from .forms import EmailForm
from django.core.mail import send_mail

# Global variable convention -> begin with 2 underscores
__myEmail = "dominic.lee876@gmail.com"





def index(request):
	return render(request,'tvShows/home.html')

def contact(request):
	return render(request,'tvShows/basic.html',{'content' : ['If you would like to contact me :','email  - dominic.lee876@gmail.com']})



def details(request):
    return render(request,'tvShows/details.html')


def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = EmailForm(request.POST or None)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            print "Name processed", form.cleaned_data['your_name']
            username = form.cleaned_data['your_name']
            email = form.cleaned_data['your_email']
            message = form.cleaned_data['your_message']
            subject = form.cleaned_data['your_subject']

            thankYouMssg = 'Thank you '+username+' !'
            regMssg = 'You are now registered. Sending details to '+email+'...'
            userMssg = '.."'+message+'"'

            #send_mail(subject, message, email,
            #[__myEmail], fail_silently=False)

            return render(request,'tvShows/confirm.html',{'content' : [thankYouMssg,regMssg,userMssg]})

            #return HttpResponseRedirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = EmailForm()

    return render(request, 'tvShows/name.html', {'form': form})





