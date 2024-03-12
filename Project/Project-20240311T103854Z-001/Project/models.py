from . import db
from flask_login import UserMixin

class Folder(db.Model, UserMixin):
    f_id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(150))
    imgs = db.relationship('Images', backref = 'folder')

class Images(db.Model, UserMixin):
    i_id = db.Column(db.Integer, primary_key=True)
    i_name = db.Column(db.String(150))
    i_img = db.Column(db.Text)
    f_fk = db.Column(db.Integer, db.ForeignKey('folder.f_id'))

class Contact(db.Model, UserMixin):
    c_id = db.Column(db.Integer, primary_key=True)
    c_name = db.Column(db.String(150))
    c_email = db.Column(db.String(150))
    c_message = db.Column(db.Text)
