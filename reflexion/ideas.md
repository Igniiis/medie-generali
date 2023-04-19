# Idées

## Base du projet
Pour ce qui est de ma vision du site, je suis sur de partie sur quelque chose de simple visuellement qui permettra de faire tout ce qu'il veut pour n'importe qui
, sans avoir à doué en Info. Voici un exemple sans l'UI d'une moyenne qu'un utilisateur pourra créer pour ensuite partager à ses amis qui n'auront qu'à mettre leurs 
notes, le reste étant calculé autaumatiquement par le site.
```
UE Literrature | 2
 - histoire-géo | 2
 - francais | 2
 - philo | 1

UE Sciences | 2
 - proba | 2
 - stat | 3
 
UE Langues | 1
 - allemand | 1
 - anglais | 2
 - chinois | 0.5

Stage | 2

EPS | 0.5
```


## Idée 1 : le lien comme seul donnée
Ma première vision du site était de faire ce projet sans aucune bdd. On créer une structure à notre bon vouloir sur le site avec l'UI, comme dans l'exemple, et 
nous obtenions une url qui contenait toutes les informations nécessaires à la recréation de la moyenne par le site **lui-même** automatique en lisant simplement l'url.
Pour l'exemple, on aurait pu penser à une url du type :

https://medie-generali.fr/^^Literraire2/histoire2&francais2&philo1/^^Sciences2/proba2&stat3/^^langues1/allemand1&anglais2&chinois0,5/^^Stage2/^^EPS0,5

Ce n'est qu'un exemple avec des règles inventés sur le tas qui ne sont pas définitives mais je compte en effet générer une url en fonction de ce que l'utilisateur à mis
mais qui est compréhensible d'après mes propres règles du genre :
- si "/^^" alors c'est une ligne directe (note ou UE)
- le nom et le coef sont géré ainsi "xxxY,Y" où "xxx" est le nom de la matière en minuscule et "Y,Y" est le coef (à virgule ou non)
- "&" symbolise différentes notes dans un même UE
- si après "/^^xxxY" (où "xxxY" est le nom et le coef) il y a un autre "/^^", alors cela signifit que ce n'est pas un UE mais une note


## Idée 2 : une base de donnée 
Je pense que ca sera trop compliqué de faire l'idée 1 car l'url a un nombre de caractères qui est certe grand mais fini (2048). Si des personnes veulent calculer de longues moyennes avec énormément de matières différentes et/ou avec des noms à ralonges, on pourra facielement arriver au bout. <br>
De plus, un autre problème m'est apparu : dans le cas de plusieurs groupes (UE) les uns dans les autres, l'url ne pourra pas gérer cette sous liaison car la complexité est trop elevé.

Je pense donc partir sur une base de donnée très simple (3 ou 4 tables), avec comme clé ultime une url unique et généré aléatoirement. La table ``lien`` sera comme la figure de proue, avec derrière 2 tables ou peut-être plus qui représenteront les matières et les UE avec chacun un nom et un coefficient associé. <br>
Une matière pourra être directement lié au lien, ce qui signifit qu'elle ne fait partie d'aucun UE. Elle pourra aussi avoir l'id de l'UE dans lequelle elle se trouve.
Un UE pourra être directement lié au lien ou être elle-même lié à un autre UE, ce qui signifirait que cette UE est un sous-groupe. Un UE pourra possédé un noubre infini de matière et/ou de groupes(UE) mais devra forcément possédé au moins une matière.

## Idée 3 : une fusion des 2 idées

**J'ai décidé finalement de faire les 2 idées précédentes**.
En effet le problème de l'idée 2 est sa gestion, la première idée permettait de ne faire qu'un simple site alors que l'idée 2 demande de faire une base de donnée accessible à tous pour que chacun puisse créer son propre calcul de moyenne.<br>
Je pense donc faire un site avec url et une "version premium" de ce site, où il faudra s'inscrire cette fois, avec la présence de la bdd.
Pour séparer les 2 offres, nous fairons une vérification lors de la création du calculateur de moyenne que l'url créé fait moins de 2048 caractères et qu'il n'y a pas de sous-groupes. Si c'est le cas, un message d'erreur apparaitra pour l'utilisateur lui-disant qu'il doit s'inscrire pour pouvoir utiliser les fonctionnalités des sous-groupes et/ou des longs calculs.

Cette inscription permettra la vérification du caractère humain de l'utilisateur pour éviter tous DDOS ou attaque par spam. Il faudra, pour les mêmes raisons, limiter à un nombre donnés le nombre de calculateur généré par heure et/ou jour et/ou par semaine.

**Bonus**: un utilisateur inscrit pourra par la même occasion modifié ses calculateurs et/ou les supprimer à son bon vouloir.



# Plan
1. Je commence par créer l'html du site, permettant de manipuler le tout 🔨
2. Création de la partie sans utilisateur, avec les liens (cf : idée 1) 🟥
3. Mise en rout du site sans bdd sur le serveur 🟥
4. Recherche d'offre intéressante d'hébergement pour un site web **avec une bdd** 🟥
5. Mise en place de la base de donnée de l'idée 2 🟥
6. Création de la partie utilisateur dans la bdd et sur le site web 🟥
7. Mise en route du **site final** sur le serveur 🟥

<!---
to do 🟥
in progress 🔨
done ✅
--->
