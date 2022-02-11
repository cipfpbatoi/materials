# UD5 - PRÀCTICA 1: Diagrama de Casos d’Ús

## 1. Venda de Productes on-line

> Realització del diagrama de casos d'ús comprar.

![Venda de Productes On-Line diagrama](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/cipfpbatoi/materials/master/daw/ed/UD5/VendaDeProductesOnLine.puml)

[PlantUML src per a Venda de Productes On-Line](VendaDeProductesOnLine.puml)

> L'administratiu, una vegada autenticat, interactua amb el sistema per a inserir nous productes. El sistema demanarà les dades del producte i validarà si son correctes abans d'inserir el nou producte. En cas contrari indicarà que son errònies.

## 2. GESTIÓ D’UN VIDEOCLUB

El gerent de **l'únic** videoclub de la nostra ciutat vol que li desenvolupem una aplicació que li permeta gestionar-lo eficientment.  Hem parlat amb ell i hem pres nota dels requeriments:

"El videoclub té, al menys una còpia en DVD de cada pel·lícula que té registrada. Només lloga pel·lícules a les persones que siguen sòcies o les autoritzades pel soci. Es vol portar registre  de  totes  les  pel·lícules  que  lloga  cada  soci.  Es  poden  llogar  diverses  pel·lícules alhora, però sempre amb una data límit per a la seva devolució. Es sancionarà amb 1€ per cada dia de retard en la devolució d'una pel·lícula. Interessa poder consultar les sancions que tinga cada soci. També, es vol poder consultar els DVD que hagen estat llogats més vegades per tenir l'opció de donar-los de baixa si presenten danys que poden afectar la seua visualització." Després analitzar el sistema, s’ha decidit implementar una aplicació que acompleixa amb els següents objectius.

S’han identificat els següents subsistemes *(cada subsistema serà un diagrama de casos d’ús 
independent)*:  

* Gestió de Pel·lícules,  
* Gestió de Socis i  
* Gestió de Lloguers

> Gestió de Pel·lícules

```plantuml
@startuml

:Gerent: 
rectangle "Gestió de Pel·lícules" {

}

@enduml
```

> Gestió de Socis

```plantuml
@startuml

rectangle "Gestió de Socis" {

}

@enduml
```

> Gestió de Lloguers

```plantuml
@startuml

rectangle "Gestió de Lloguers" {

}

@enduml
```

### 2.1. Treball a realitzar

Elabora els diagrames de casos d'ús que modelen l'anàlisi de requisits per a cadascun dels 
subsistemes identificats.

## 3. ESCOLA INFANTIL

Es vol crear una aplicació per portar la gestió d'una escola infantil:  

"Per a la inscripció dels xiquets, el supervisor docent rep els documents sol·licitats per a la seva incorporació a l'escola per part de tutor o representant i posteriorment els  analitza  per  aprovar-los  o  rebutjar-los.  Si  són  aprovats,  els  documents  són lliurats a el cap d'estudis perquè realitze l'alta de l'expedient del nou alumne. En cas de ser rebutjat, el supervisor docent elabora un informe de rebuig que serà lliurat al tutor o al representant i al director de l'escola. L'escola també contracta nous docents. Per a això, el supervisor de docents sol·licita el currículum i després realitza una entrevista. En el cas de superar l'entrevista, el docent  haurà  de  realitzar  una  prova  pràctica  i  una  prova  escrita,  que  en  cas d'aprovar totes dues el docent serà contractat i es crearà un expedient per al docent. En cas de no superar l'entrevista, se li informarà per escrit la no acceptació explicant el motiu de la mateixa."

1. Per als requisits d’abans, és sol·licita:  
   * **Diagrama** de **casos d'ús** del sistema de gestió de l’escola infantil (on es reflexe la interacció amb tots els actors del sistema
   * **Diagrama** de **casos d'ús** per als **subsistemes** Gestionar Inscripcions i Contractar Docents.
2. Usa les següents plantilles per a la **descripció d'actors** i dels **casos d'ús**:
   * Especificació dels actors: ( En un format taula)  
     * **Nom** `<nom de l’actor>`
     * **Descripció** `<descripció del rol>`
     * **Anotacions** `<altres dades addicionals>`
   * Especificació dels casos d’ús:
     * **Nom** `<nom del caso de uso>`
     * **Descripció** `<descripció general>`
     * **Flux Normal** `<seqüència de passos/events>` 
     * **Flux Alternatius/Excepcions** `<passos/events alternatius>`