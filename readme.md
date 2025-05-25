## :ledger: Index

- [About](#beginner-about)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)

##  :beginner: About
A minimal api that syncs location data from various public APIs, stores this data and retrieves it upon user requests. 

This application utilises a relation database, namely PostgreSql. Location based data is stored only after normalising it. 

We use Redis to store timestamps - when was data regarding a particular location last synced with the data store. 

The app intelligently fetches the data from the database if it's present or synced within the 10 minute timeframe. Otherwise the location data is synced from the public APIs.

There could be a number of improvements that can be made on this base solution. Like at the moment whenever a location's data is synced with our data store, we basically add a new record. An upsert statement can make sure we don't have duplicate records for a particular location. 

More robust error handling can be introduced as well. 

## :zap: Usage
Right after you've setup docker and have successfully built the images, try hitting the following endpoint on your local machine:

```
GET http://localhost:3000/aggregate?location=Canada
```


###  :electric_plug: Installation
Simply install docker and build the node app virtualised image on your local machine.

To run the app in a multi container environment use docker compose as follows:

```
docker-compose build
```

To start the containers:

```
docker-compose up
```
