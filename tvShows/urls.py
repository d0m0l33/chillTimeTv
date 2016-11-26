from django.conf.urls import url
from . import views


urlpatterns = [  
url(r'^$', views.index, name='index'),
#url(r'^contact/', views.contact, name='contact'),
url(r'^details/.*', views.details, name='details'),
url(r'^form/',views.get_name, name='get_name'),

]

    