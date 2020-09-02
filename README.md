# Appli-Editeur-Test-ES6
Web App to create presentation test / Presentation Editor

Video demonstration of the application : https://youtu.be/W_pTS_aqc3U

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
  
Design :

Some components being common to the different applications and in order to develop "cleanly". 
I respected the development structure in M.V.C. layer (model, view, controller).
Usually used in the context of applications developed using object-oriented languages, 
Layer-based development has become possible in JavaScript in recent years.
JavaScript being a prototype language, whose notion of prototype (an object allowing to create new objects) 
does not allow class writing.

![alt text](https://github.com/DavidLiger/Appli-Editeur-Test-ES6/blob/master/images/diapo-14.png)

However, since the ECMAScript 2015 standard, classes have been introduced in JavaScript. 
This allows, via this syntactic sugar (rewriting facilitating comprehension without changing the way the language works) 
to write classes in JS.
