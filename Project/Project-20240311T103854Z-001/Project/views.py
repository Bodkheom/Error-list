from flask import Blueprint, render_template, request, redirect, url_for, flash
from . import db
from .models import Images, Folder, Contact

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("indexminiproject.html")   


@views.route('/folder/<int:id>', methods=['GET', 'POST'])
def images(id):
    return render_template("new.html", id=id) 

@views.route('/gallary', methods=['GET', 'POST'])
def gallery():
    print("hello")
    f_list = []
    all_folders = Folder.query.all() 
    for i in all_folders:
        f_list.append(i)
    print(f_list[1].f_id)
    for i in f_list:
        print(i.f_id)
    return render_template("gallary.html", flist = f_list)

@views.route('/contact')
def contact():
    return render_template("contact.html")  

@views.route('/save_contact', methods=['GET', 'POST'])
def save_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        new_msg = Contact(c_name = name, c_email = email, c_message = message)
        db.session.add(new_msg)
        db.session.commit()

        return redirect(url_for('views.contact'))
    
@views.route('/events')
def events():
    return render_template("events.html")

@views.route('/feedback')
def feedback():
    return render_template("feedback.html") 
@views.route('/store')
def store():
    return render_template("store.html")    
   
