from django import forms

class EmailForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100, required=True)
    your_subject = forms.CharField(label='Subject', max_length=40, required=True)
    your_email = forms.EmailField(required=True)
    your_message = forms.CharField(widget=forms.Textarea)
