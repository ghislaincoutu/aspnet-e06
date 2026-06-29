# aspnet-e06 &mdash; Programmation d’une application ASP.NET CRUD

## Création des fichiers ASP.NET
À partir du dossier `aspnet-e06`, exécuter les commandes suivantes :
```sh
cd aspnet-e06
dotnet new webapi -n aspnet06
cd aspnet06
dotnet new gitignore
```

## Port réservé à l’application aspnet-e07
> 5971

## Sous-répertoires et fichiers supplémentaires générés pour réaliser l’excerice
```
/aspnet06/Controllers/ArticlesControllers.cs
/aspnet06/Data/ApplicationDbContext.cs
/aspnet06/Models/Article.cs
```

## Création des fichiers Angular 20
À partir du dossier `aspnet-e06`, exécuter les commandes suivantes :
```sh
npx @angular/cli@20 new angular06
```
Au cours de l’installation des fichiers, sélectionner les options par défaut.


## Commandes MySQL
Création de la base de données.
```sh
sudo mysql -u root -p
CREATE DATABASE aspnet06;
```
Exportation de la base de données.
```sh
sudo mysqldump -u root -p aspnet06 > aspnet06.sql
```

## Installation des dépendances requises
À partir du dossier `aspnet-e06/aspnet06`, exécuter les commandes suivantes :
```sh
cd aspnet06
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
```

## Installation de l’application dotnet-ef
```sh
dotnet tool install --global dotnet-ef
```

## Création des variables d’environnement temporaires
À utiliser pour tester l’exercice aspnet-e06. Les variables d’environnement temporaires sont accessibles uniquement à partir du terminal où elles ont été créées.
```sh
export database31=mydatabase
echo $database31
export user31=myusername
echo $user31
export password31=mypassword
echo $password31
```

## Création d’une nouvelle migration _Entity Framework Core_
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```
S’il faut modifier la structure de la base de données, dans ce cas supprimer la base de données existante et le dossier aspnet06/Migrations. Créer une nouvelle base de données et répéter la création d’une nouvelle migration _Entity Framework Core_.

## Activation de l’application
À partir du terminal, saisir la commande suivante
```sh
cd aspnet-e06/aspnet06
dotnet run --urls="http://localhost:5971"
```
L’application est disponible à partir de l’adresse URL suivante :
http://localhost:5971/api/articles

## Commandes curl (Client URL)
Créer un nouvel enregistrement :
```sh
curl -X 'POST' 'http://localhost:5971/api/articles' -H 'Content-Type: application/json' -d '{\"title\":\"Test\",\"content\":\"Ceci est un test\",\"publishedDate\":\"$(date +%Y-%m-%d)\"}'
```
Lire tous les enregistrements :
```sh
curl -X 'GET' 'http://localhost:5971/api/articles' -H 'accept: application/json'
```
Supprimer un enregistrement :
```sh
curl -X 'DELETE' 'http://localhost:5971/api/articles/1' -H 'accept: */*'
```
