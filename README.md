# aspnet-e06 &mdash; Programmation d’une application Web (CRUD)

## Création des fichiers ASP.NET Web API
À partir du dossier `aspnet-e06`, exécuter les commandes suivantes :
```sh
cd aspnet-e06
dotnet new webapi -n aspnet06
cd aspnet06
dotnet new gitignore
```

## Création des fichiers Angular 20
À partir du dossier `aspnet-e06`, exécuter les commandes suivantes :
```sh
npx @angular/cli@20 new angular06
```
Au cours de la création des fichiers, sélectionner les options par défaut.

## Fichiers Angular générés pour réaliser l’exercice
```sh
ng generate service services/articles --type=service
ng generate component components/articles --type=component
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

## Port réservé à l’application aspnet-e07
> 5971

## Sous-répertoires et fichiers supplémentaires générés pour programmer l’application
```
/aspnet06/Controllers/ArticlesControllers.cs
/aspnet06/Data/ApplicationDbContext.cs
/aspnet06/Models/Article.cs
```

## Sous-répertoires reliés à l’application
Voici les sous-répertoires reliées à l’application :
```
~/Documents/XD01/aspnet-e06/
/etc/apache2/sites-available/
/etc/systemd/system/
/var/www/aspnet06/
/var/www/html/d003/aspnet-e06/
```

## Commandes MySQL
Création de la base de données.
```sh
sudo mysql -u root -p
CREATE DATABASE aspnet06;
```
Exportation de la base de données.
```sh
sudo mysqldump -u root -p --routines --triggers --events aspnet06 > aspnet06.sql
```
Création de la procédure `reset_database()` dans la base de données `aspnet06`.
```sql
USE aspnet06;
DELIMITER $$
CREATE PROCEDURE reset_database()
BEGIN
    TRUNCATE TABLE Articles;
    INSERT INTO Articles (title, content, pubdate) VALUES
        ('Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis sapien, efficitur et pharetra eu, vestibulum quis urna.', '2026-07-06'),
        ('Integer ullamcorper nisi sit', 'Integer ullamcorper nisi sit amet posuere vestibulum. Etiam tempus, nisl non aliquet scelerisque.', '2026-07-06');
END $$
DELIMITER ;
```
Importation de la procédure `reset_database()`.
```sh
sudo mysql -u root -p < procedure06.01.sql
```
Appel de la procédure `reset_database()`.
```sql
sudo mysql -u root -p
USE aspnet06;
CALL reset_database();
```

## Création des variables d’environnement temporaires
À utiliser pour tester l’application `aspnet-e06`. Les variables d’environnement temporaires sont accessibles uniquement à partir du terminal où elles ont été créées.
```sh
export database31=aspnet06
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
dotnet run --urls="http://localhost:5000"
```
L’application est disponible à partir de l’adresse URL suivante :
http://localhost:5000/api/articles

## Accès à l’application ASP.NET à partir de Apache
Il ne faut pas que le serveur Web Kestrel (celui qui est intégré à ASP.NET Core) soit accessible directement depuis l’extérieur, comme un serveur Web public. Les fichiers doivent être localisés dans le sous-répertoire `/var/www/aspnet06`, et non dans le sous-répertoire `/var/www/html/aspnet06`.

## Configuration du serveur Apache
Dans le fichier `/etc/apache2/sites-available/default-ssl.conf`, ajouter les directives `ProxyPass` et `ProxyPassReverse`.
```conf
<VirtualHost *:443>
    ServerName 192.168.56.164

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key

    ProxyPreserveHost On
    # Application aspnet-e06
    ProxyPass /api/articles http://127.0.0.1:5971/api/articles
    ProxyPassReverse /api/articles http://127.0.0.1:5971/api/articles

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Publication de l’application ASP.NET sur un serveur Web
À partir du terminal, saisir la commande suivante :
```sh
cd aspnet-e06/aspnet06
dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true
```
Les fichiers de publication sont générés dans le sous-répertoire suivant :
```sh
/aspnet-e06/aspnet06/bin/Release/net8.0/linux-x64/publish
```
Copier les fichiers dans le dossier suivant :
```sh
/var/www/aspnet06/
```
Appliquer les permissions suivantes :
```sh
sudo chown -R www-data:www-data /var/www/aspnet06
```
Tester l’activation de l’application :
```sh
cd /var/www/aspnet
./aspnet06
```
L’application est disponible à partir de l’adresse URL suivante :
```
http://localhost:5971/api/articles
```

## Publication de l’application sur un serveur Web en tant que service
Les fichiers compilés `ASP.NET` doivent être localisés dans le sous-répertoire suivant :
```sh
/var/www/aspnet06/
```
À partir du terminal, saisir la commande suivante :
```sh
sudo nano /etc/systemd/system/aspnet06.service
```
Dans le fichier `aspnet06.service`, intégrer le code suivant :
```conf
[Unit]
Description=ASP.NET 8.0 -- aspnet-e06
After=network.target

[Service]
WorkingDirectory=/var/www/aspnet06
ExecStart=/var/www/aspnet06/aspnet06
Restart=always
RestartSec=10
SyslogIdentifier=aspnet06
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Development
Environment=ASPNETCORE_URLS=http://localhost:5971
Environment="database31=aspnet06"
Environment="user31=myusername"
Environment="password31=mypassword"

[Install]
WantedBy=multi-user.target
```
À partir du terminal, saisir les commandes suivantes :
```sh
sudo systemctl daemon-reload
sudo systemctl enable aspnet06
sudo systemctl start aspnet06
sudo systemctl status aspnet06
```

## Commandes _curl_ à utiliser pour tester la base de données
Lire tous les enregistrements :
```sh
curl -X 'GET' 'http://localhost:5000/api/articles' -H 'accept: application/json'
```
Créer un nouvel enregistrement :
```sh
curl -X 'POST' 'http://localhost:5000/api/articles' -H 'Content-Type: application/json' -d "{\"title\":\"Test\",\"content\":\"Ceci est un test\",\"pubdate\":\"$(date +%Y-%m-%d)\"}"
```
Supprimer un enregistrement :
```sh
curl -X 'DELETE' 'http://localhost:5000/api/articles/1' -H 'accept: */*'
```
