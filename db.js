const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = (title) => {

  const filter = {
    $or:[{'title': {$regex : title}},
         {'plot': {$regex : title}},
         {'cast': {$regex : title}}
        ]
  };
  const projection = {
    'title': 1,
    'year':1,
    '_id': 0,
    'imdb':1,
    'tomatoes':1,
    'poster':1
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}

const getPeliEspecifica = () => {

  const filter = {
    'cast': {
      '$in': [
        'Bruce Willis', 'Sylvester Stallone'
      ]
    },
    'imdb.rating': {
      '$gt': 5
    },
    '$or': [
      {
        'fullplot': {
          '$regex': 'police'
        }
      }, {
        'plot': {
          '$regex': 'police'
        }
      }
    ]
  };

  const projection = {
    'title': 1,
    'year':1,
    '_id': 0,
    'imdb':1,
    'tomatoes':1,
    'poster':1
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


const getRandomFive = () => {
  const pipeline = [
    {
      '$sample': {
        'size': 5
      }
    }, {
      '$project': {
        'title': 1,
        'year': 1,
        '_id': 0,
        'imdb': 1,
        'tomatoes': 1,
        'fullplot':1,
        'cast':1,
        'poster':1
      }
    }
  ];


  const coll = db.collection('movies');
  const cursor = coll.aggregate(pipeline);
  const result = cursor.toArray();
  return result;
}

module.exports = { init, insertItem, getPelis,getPeliEspecifica,getRandomFive}
