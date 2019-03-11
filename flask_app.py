from flask import Flask, jsonify, request, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin


app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'teste_db'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/teste_db'
cors = CORS(app, resources={r"/foo": {"origins": "*"}})

mongo = PyMongo(app)

#GET data:
@app.route('/get_records', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_records():
  db = mongo.db.catalogo
  output = []
  for i in db.find():
    output.append(
        {
        'nome' : i['nome'],
        'email' : i['email'],
        'telefone' : i['telefone'],
        'url_avatar' : i['url_avatar']
        })
  return jsonify(output)

#POST data:
@app.route('/insert_record', methods=['POST'])
def insert_record():
    db = mongo.db.catalogo

    data = request.get_json(force=True)
    email = data['email']
    nome = data['nome']
    telefone = data['telefone']
    url_avatar = data['url_avatar']

    user_id = db.insert(
      {'nome': nome,
       'email': email,
       'telefone': telefone,
       'url_avatar': url_avatar
       })

    #Verificando o request:
    new_user = db.find_one({'_id': user_id })
    output = {
              'nome' : new_user['nome'],
              'email' : new_user['email'],
              'telefone' : new_user['telefone'],
              'url_avatar' : new_user['url_avatar']
              }
    return jsonify({'result' : output})


if __name__ == '__main__':
    app.run(debug=True)
