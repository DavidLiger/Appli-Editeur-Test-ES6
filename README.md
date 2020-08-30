# Appli-Editeur-Test-ES6
Web App to create presentation test / Presentation Editor

EN :

With the aim of preventing and limiting the risk of accidents during the temporary assignments it entrusts to its employees,
the « Actual Group » has decided to set up recruitment tests. The main purpose of these tests is to inform candidates.
Preceded by a home page and a general presentation of the company's safety and hygiene instructions, 
it consists of a presentation of the instructions specific to the activity of the company in which the assignment 
is being carried out and a test of several questions to assess the understanding of the concepts presented. 
If the candidate does not obtain a satisfactory result, the Actual agent who registered him/her has the possibility of having him/her 
retake this test.
To meet these needs, I had to develop three distinct web applications : a candidate registration form, 
a presentation editor and a presentation reader.
These applications allow any user with no development knowledge to register candidates for exams and 
to automatically notify them by email by sending them back to the presentation reader application through a link. 
Once the test is completed, the results are recorded and communicated to the prescribing agent.
The test editor allows any authenticated user to create, modify or delete a presentation.
I have chosen to present you more precisely the work done to produce this presentation editor.

FR :

Dans le but de prévenir et de limiter les risques d'accidents lors des missions temporaires qu'il confie à ses salariés, 
le Groupe Actual a décidé de mettre en place des tests de recrutement. L'objectif principal de ces tests est d'informer les candidats.
Précédée d'une page d'accueil et d'une présentation générale des consignes de sécurité et d'hygiène de l'entreprise, 
elle consiste en une présentation des consignes spécifiques à l'activité de l'entreprise dans laquelle la mission est effectuée 
et en un test de plusieurs questions permettant d'évaluer la compréhension des concepts présentés. 
Si le candidat n'obtient pas un résultat satisfaisant, l'agent qui l'a inscrit a la possibilité de lui faire repasser ce test.
Pour répondre à ces besoins, j'ai dû développer trois applications web distinctes : un formulaire d'inscription du candidat, 
un éditeur de présentation et un lecteur de présentation.
Ces applications permettent à tout utilisateur n'ayant aucune connaissance en matière de développement d'inscrire des candidats aux examens 
et de les avertir automatiquement par courrier électronique en les renvoyant à l'application du lecteur de présentation par un lien. 
Une fois l'examen terminé, les résultats sont enregistrés et communiqués à l'agent prescripteur.
	L'éditeur de test permet à tout utilisateur authentifié de créer, modifier ou supprimer une présentation.
  
Conception :

Certains composants étant communs aux différentes applications et dans un souci de développer « proprement » 
j’ai respecté la structure de développement en couche M.V.C (modèle, Vue, Contrôleur).
Habituellement utilisé dans le contexte d’applications développés au moyen de langages orienté objet, 
le développement en couche est devenu possible en JavaScript depuis quelques années.
JavaScript étant un langage prototype, dont la notion de prototype (un objet permettant de créer de nouveaux objet) 
n’autorise pas l’écriture de classe.

Cependant depuis la norme ECMAScript 2015, les classes ont été introduites en JavaScript. 
Ce qui permet, via ce sucre syntaxique (réécriture facilitant la compréhension sans changer le fonctionnement du langage) 
d’écrire des classes en JS.
