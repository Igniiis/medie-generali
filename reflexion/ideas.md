# Idées


### Idée 1 : le lien comme seul donnée
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


###Idée 2 : une base de donnée 



### Idée 3 : une fusion des 2 idées

**J'ai décidé finalement de faire les 2 idées précédentes**.
