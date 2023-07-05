from flask import Flask



def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='adsgfdsfasfsd'
    from .views import views
    # from .auth import  auth

    app.register_blueprint(views,url_prefix='/')
    # app.register_blueprint(auth, url_prefix='/')



    # login_manager = LoginManager()
    # login_manager.login_view = 'auth.login'
    # login_manager.init_app(app)

    # @login_manager.user_loader
    # def load_user(id):
    #     return models.User.query.get(int(id))
    return app

# def create_database(app):
#     if not path.exists('website/'+DB_NAME):
#         db.create_all(app=app)
#         print('Created database!')
