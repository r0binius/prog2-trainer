import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 01b: regular languages and regular expressions, in theory and in Java and Python. */
export const regulaer = topic({
  id: 'regulaer',
  chapter: '01b',
  title: 'Reguläre Sprachen und reguläre Ausdrücke',
  summary:
    'Induktive Definition, Kleene-Stern, Quantoren, Symbolmengen, Kurzformen, Java und Python.',
  definitions: [
    {
      id: 'regulaere-sprache',
      title: 'Reguläre Sprache (induktive Definition)',
      ref: '01b · Reguläre Sprachen',
      statement: r`Reguläre Sprachen über einem Alphabet $\Sigma$ sind **induktiv** definiert.

**1. Reguläre Sprachen sind**

- $\emptyset$ – die leere Sprache
- $\{\epsilon\}$ – die Sprache, die nur das leere Wort enthält
- $\{a\}$ für jedes $a \in \Sigma$

**2. Sind $\cL$ und $\mathcal{M}$ bereits regulär, dann auch**

- $\cL \mid \mathcal{M}$ – Vereinigung $\cL \cup \mathcal{M}$ (manchmal $\cL + \mathcal{M}$ geschrieben)
- $\cL\mathcal{M}$ – Konkatenation $\cL \circ \mathcal{M}$ (erst ein Wort aus $\cL$, danach eines aus $\mathcal{M}$)
- $\cL^*$ – beliebige Aneinanderreihung von Worten aus $\cL$, auch kein Mal`,
      note: r`Drei Basisfälle, drei Operationen: Vereinigung, Konkatenation, Kleene-Stern. Komplement und Schnitt stehen **nicht** in der Definition – dass reguläre Sprachen darunter abgeschlossen sind, zeigt man mit Automaten.`,
    },
    {
      id: 'abkuerzungen',
      title: 'Abgeleitete Operationen: Lⁿ, L⁺, L?, L{m,n}',
      ref: '01b · Reguläre Sprachen',
      statement: r`Falls $\cL$ regulär ist, dann auch

- $\cL^n = \cL\cL \dots \cL$ ($n$-mal) für jedes $n > 0$
- $\cL^+ = \cL\cL^*$ (mindestens einmal)
- $\cL? = \cL \mid \{\epsilon\}$ (einmal oder keinmal)
- $\cL^{\{m,n\}}$ – mindestens $m$-mal, höchstens $n$-mal
- $\cL^{\{m,*\}} = \cL^m \cL^*$ – mindestens $m$-mal`,
      note: r`Alles nur Abkürzungen: Jede lässt sich mit Vereinigung, Konkatenation und Stern ausschreiben.`,
    },
    {
      id: 'regulaerer-ausdruck',
      title: 'Regulärer Ausdruck: Konstanten und Kombinationen',
      ref: '01b · Syntax regulärer Ausdrücke',
      statement: r`Reguläre Sprachen sind ein **formales Konstrukt**, reguläre Ausdrücke eine **Deklarationssprache** dafür.

**Konstanten** – Symbole sind für sich bereits reguläre Ausdrücke:

- $\epsilon$ ↔ @@""@@
- $a \in \Sigma$ ↔ @@"a"@@

**Kombinationen** – sind @@a@@ und @@b@@ reguläre Ausdrücke, dann auch:

- @@a|b@@ – Alternativen
- @@ab@@ – Konkatenation
- @@a*@@ – Kleene-Stern: beliebig oft, auch gar nicht
- @@(a)@@ – Klammerung (in Programmiersprachen zusätzlich: Groups)`,
      note: r`In Details weichen Programmiersprachen voneinander ab. Reguläre Ausdrücke sind Strings.`,
    },
    {
      id: 'quantoren',
      title: 'Quantoren',
      ref: '01b · Erweiterte reguläre Ausdrücke',
      statement: r`Ist @@a@@ ein regulärer Ausdruck, dann auch:

- @@a?@@ – einmal oder keinmal, $a? := (a \mid \epsilon)$
- @@a+@@ – mindestens einmal, $a^+ := aa^*$
- @@a*@@ – beliebig oft, auch gar nicht
- @@a{3}@@ – exakt dreimal
- @@a{3,}@@ – mindestens dreimal
- @@a{3,6}@@ – drei- bis sechsmal`,
    },
    {
      id: 'symbolmengen',
      title: 'Symbolmengen',
      ref: '01b · Erweiterte reguläre Ausdrücke',
      statement: r`Nur bei regulären Ausdrücken in Programmiersprachen:

- @@[abcef]@@ – eines der Symbole in den eckigen Klammern, also @@a|b|c|e|f@@
- @@[a-z]@@ – eines der Symbole von a bis z
- @@[^a]@@ – Negation: eines von allen Symbolen des Alphabets außer a
- @@[a-zABC]@@ – Kombination: a bis z oder A, B, C`,
      note: r`Achtung: Alphabete sind Mengen **ohne Reihenfolge**. „von a bis z“ gibt es nur, weil Programmiersprachen den Zeichen eine Ordnung geben.`,
    },
    {
      id: 'kurzformen',
      title: 'Kurzformen und Sonderzeichen',
      ref: '01b · Kurzformen und Sonderzeichen',
      statement: r`Nicht in allen Programmiersprachen einheitlich:

- @@.@@ – beliebiges Zeichen des Alphabets
- @@\s@@ / @@\S@@ – Whitespace / Nicht-Whitespace
- @@\d@@ / @@\D@@ – Ziffer @@[0-9]@@ / Nicht-Ziffer
- @@\w@@ / @@\W@@ – @@[a-zA-Z0-9_]@@ / dessen Negation
- @@^@@ – Beginn des Strings; das Dollarzeichen – Ende des Strings
- @@\n@@ Unix-Zeilenumbruch, @@\r\n@@ Windows, @@\t@@ Tabulator
- @@\@@ – **Escape-Zeichen**: hebt die Sonderbedeutung des folgenden Zeichens auf, z. B. @@\.@@ für den Punkt, @@\[@@, @@\)@@, @@\\@@`,
      note: r`@@^@@ hat zwei Bedeutungen: außerhalb eckiger Klammern „Beginn des Strings“, als erstes Zeichen innerhalb „Negation“.`,
    },
  ],
  theorems: [
    {
      id: 'folgerungen',
      title: 'Folgerungen: Σ, Σ* und endliche Sprachen sind regulär',
      ref: '01b · Reguläre Sprachen',
      statement: r`Sei $\Sigma = \{a_1, a_2, \dots, a_n\}$. Dann sind regulär:

- $\Sigma$, denn $\Sigma = \{a_1\} \cup \{a_2\} \cup \dots \cup \{a_n\}$
- $\Sigma^*$, weil jedes $w \in \Sigma^*$ eine Konkatenation von Symbolen ist
- **jede endliche** Teilmenge $\cL \subseteq \Sigma^*$ (endliche Vereinigung von Konkatenationen einzelner Symbole)`,
      note: r`Beispiele regulärer Sprachen über $\{a, b\}$: $\{a, b, abba, \epsilon\}$, $\{ba^n b \mid n \in \N\}$, $\{a^n b a \mid n \text{ gerade}\}$, $\{a^n b^m \mid n, m \in \N\}$. **Nicht** regulär: $\{a^n b^n\}$ – gleiche Anzahl erfordert Zählen.`,
    },
    {
      id: 'java',
      title: 'Wortproblem für reguläre Sprachen in Java',
      ref: '01b · Reguläre Ausdrücke in Java',
      statement: r`Das Wortproblem ist in der Klasse String implementiert:

~~~
String sprache = "a|b|abba|";      // L = {a, b, abba, ε}
String wort = "abba";
if (wort.matches(sprache)) { ... }  // true
~~~

- @@str.matches(regex)@@ – ist @@str@@ ein Wort der Sprache? → true/false
- @@str.split(regex)@@ – nutzt Worte der Sprache als Trenner → Array von Strings
- @@str.replaceFirst(regex, r)@@ / @@str.replaceAll(regex, r)@@ – ersetzt das erste / alle Worte der Sprache
- @@Pattern.compile(regex)@@ und @@Matcher@@ (@@find()@@, @@start()@@, @@end()@@) – mehrere Worte der Sprache in einem String finden`,
      note: r`Der leere Zweig am Ende von @@a|b|abba|@@ steht für $\epsilon$.`,
    },
    {
      id: 'python',
      title: 'Wortproblem für reguläre Sprachen in Python',
      ref: '01b · Reguläre Ausdrücke in Python',
      statement: r`Das Wortproblem ist im Modul @@re@@ implementiert:

~~~
import re
if re.fullmatch("a|b|abba|", "abba"): ...
~~~

- @@re.fullmatch(regex, str)@@ – ist @@str@@ ein Wort der Sprache?
- @@re.findall(regex, str)@@ – alle Worte der Sprache, die in @@str@@ vorkommen → Liste
- @@re.split(regex, str)@@ – Worte der Sprache als Trenner → Liste
- @@re.sub(regex, replacement, str)@@ – ersetzt alle Worte der Sprache
- @@re.compile(regex)@@ und @@re.finditer@@ – analog zu Pattern und Matcher in Java`,
      note: r`Für das Wortproblem ist @@fullmatch@@ nötig: Das **ganze** Wort muss passen, nicht nur ein Teil.`,
    },
    {
      id: 'grenzen-vorschau',
      title: 'Was reguläre Ausdrücke können – und was nicht',
      ref: '01b · Sind folgende Sprachen durch reguläre Ausdrücke beschreibbar?',
      statement: r`**Beschreibbar:**

- alle Worte der Länge 5: @@.{5}@@
- Worte, die mit „(“ beginnen und mit „)“ enden: @@\(.*\)@@
- Worte mit mindestens drei „f“: @@.*f.*f.*f.*@@

**Nicht beschreibbar** (erfordern unbeschränktes Zählen):

- mehr „A“ als „B“
- gleich viele „A“ wie „B“
- Klammern „(“ und „)“ immer paarweise (Dyck-Sprache)`,
      note: r`Wie man das **beweist**, liefern Nerode-Lemma und Pumping-Lemma (Foliensatz 02a).`,
    },
  ],
  claims: [
    {
      id: 'leere-sprache-regulaer',
      statement: r`Die leere Sprache $\emptyset$ ist regulär.`,
      holds: true,
      reason: r`Sie ist einer der drei Basisfälle der induktiven Definition.`,
    },
    {
      id: 'endlich-regulaer',
      statement: r`Jede endliche Sprache ist regulär.`,
      holds: true,
      reason: r`Jedes Wort ist eine Konkatenation einzelner Symbole, die Sprache eine endliche Vereinigung solcher Worte.`,
    },
    {
      id: 'unendlich-nicht-regulaer',
      statement: r`Jede unendliche Sprache ist nicht regulär.`,
      holds: false,
      reason: r`$\Sigma^*$ oder $\{a^n \mid n \in \N_0\}$ (@@a*@@) sind unendlich und regulär.`,
    },
    {
      id: 'plus-stern',
      statement: r`@@a+@@ und @@aa*@@ beschreiben dieselbe Sprache.`,
      holds: true,
      reason: r`$a^+ := aa^*$ ist genau die Definition des Quantors „mindestens einmal“.`,
    },
    {
      id: 'stern-leer',
      statement: r`Das leere Wort liegt in der Sprache von @@(ab)*@@.`,
      holds: true,
      reason: r`Der Kleene-Stern erlaubt null Wiederholungen.`,
    },
    {
      id: 'anbn-ausdruck',
      statement: r`Der Ausdruck @@a*b*@@ beschreibt die Sprache $\{a^n b^n \mid n \ge 0\}$.`,
      holds: false,
      reason: r`@@a*b*@@ beschreibt $\{a^x b^y\}$ mit **unabhängigen** Anzahlen, z. B. auch $aab$. $\{a^n b^n\}$ ist gar nicht regulär.`,
    },
    {
      id: 'negation-klammer',
      statement: r`@@[^a]@@ passt auf das leere Wort.`,
      holds: false,
      reason: r`Eine Symbolmenge steht immer für **genau ein** Symbol – hier eines außer a.`,
    },
    {
      id: 'punkt-escape',
      statement: r`Um in einem regulären Ausdruck den Punkt als Zeichen zu meinen, schreibt man @@\.@@`,
      holds: true,
      reason: r`Der Backslash hebt die Sonderbedeutung (beliebiges Zeichen) auf.`,
    },
    {
      id: 'ziffern-fuehrende-null',
      statement: r`@@[0-9]+@@ beschreibt die natürlichen Zahlen ohne führende Nullen.`,
      holds: false,
      reason: r`@@007@@ passt auch. Richtig ist @@0|[1-9][0-9]*@@.`,
      ref: 'Übung 1 · Hausaufgabe 2',
    },
    {
      id: 'regulaer-formales-konstrukt',
      statement: r`Reguläre Sprachen sind ein formales Konstrukt, reguläre Ausdrücke eine Deklarationssprache, mit der man sie beschreibt.`,
      holds: true,
      reason: r`So trennen es die Folien. Dieselbe Sprache lässt sich auch durch DFA, NFA oder reguläre Grammatik beschreiben.`,
    },
  ],
  problems: [
    {
      id: 'abc-ausdruecke',
      title: 'Reguläre Ausdrücke über {a, b, c}',
      source: 'nach Übung 1 · Hausaufgabe 2',
      points: 4,
      task: r`Gib je einen regulären Ausdruck an.

- (a) Alle Worte über $\{a, b, c\}$, die mit $c$ beginnen.
- (b) Alle Worte über $\{a, b, c\}$, die das Teilwort $ac$ enthalten.
- (c) Alle Worte über $\{a, b, c\}$, die mit $a$ beginnen und auf $b$ enden.
- (d) Die natürlichen Zahlen (inkl. 0) ohne führende Nullen über $\{0, \dots, 9\}$.`,
      solution: r`- **(a)** @@c[abc]*@@ bzw. abgekürzt @@c.*@@
- **(b)** @@[abc]*ac[abc]*@@ bzw. @@.*ac.*@@
- **(c)** @@a[abc]*b@@ bzw. @@a.*b@@
- **(d)** @@0|[1-9][0-9]*@@`,
    },
    {
      id: 'binaer-knobeln',
      title: 'Knobelaufgabe über {0, 1}',
      source: 'nach Übung 1 · Aufgabe 4',
      points: 8,
      task: r`Sei $\Sigma = \{0, 1\}$. Finde je einen regulären Ausdruck.

- (a) $L_1$: Worte, in denen $010$ als Teilwort vorkommt.
- (b) $L_2$: Worte mit ungerader Anzahl von 0en.
- (c) $L_3 = \Sigma^* \setminus L_1$: Worte, in denen $010$ **nicht** vorkommt.`,
      hint: r`(b) Erst genau eine 0 mit beliebig vielen 1en drumherum, dann immer **zwei** weitere 0en. (c) Zwischen zwei 0en darf nie genau eine 1 stehen: entweder keine oder mindestens zwei.`,
      solution: r`- **(a)** @@[01]*010[01]*@@
- **(b)** @@1*01*(1*01*01*)*@@ – eine 0, danach beliebig oft ein Paar weiterer 0en; 1en sind überall erlaubt.
- **(c)** @@1*(0|111*)*1*@@ – Blöcke aus einer 0 oder aus mindestens zwei 1en; einzelne 1en sind nur ganz am Anfang oder Ende möglich, wo sie nicht zwischen zwei 0en stehen.

Probe für (c): @@0110@@ ✓ (0, 11, 0), @@01@@ ✓ (0, dann 1 am Ende), @@010@@ ✗ (die einzelne 1 in der Mitte ist nicht erzeugbar).`,
    },
    {
      id: 'java-integer',
      title: 'Java-Integer-Literale',
      source: 'nach 01a · Lösung mit regulärem Ausdruck',
      points: 6,
      task: r`Positive Integerzahlen in Java-Code: dezimal (nicht mit 0 beginnend, außer die 0 selbst), oktal (beginnt mit 0, nur Ziffern 0–7), hexadezimal (beginnt mit @@0x@@, Ziffern und a–f/A–F). Zwischen je zwei Ziffern dürfen beliebig viele Unterstriche stehen.

Gib einen regulären Ausdruck an und erkläre seine vier Alternativen.`,
      solution: r`~~~
0|[1-9](_*[0-9])*|0[0-7]?(_*[0-7])*|0x[0-9a-fA-F](_*[0-9a-fA-F])*
~~~

- @@0@@ – die Null
- @@[1-9](_*[0-9])*@@ – dezimal: erste Ziffer nicht 0, danach beliebig oft „beliebig viele Unterstriche, dann eine Ziffer“
- @@0[0-7]?(_*[0-7])*@@ – oktal: führende 0, dann Oktalziffern, Unterstriche nur vor einer Ziffer
- @@0x[0-9a-fA-F](_*[0-9a-fA-F])*@@ – hexadezimal: nach @@0x@@ muss direkt eine Ziffer kommen

Der Baustein @@(_*[0-9])*@@ erzwingt, dass nach Unterstrichen immer eine Ziffer folgt – so steht ein Unterstrich nie am Ende und nie am Anfang.`,
    },
    {
      id: 'anwendungen',
      title: 'Suchen und Ersetzen',
      source: 'nach 01b · Anwendungsbeispiele',
      points: 5,
      task: r`Gib jeweils den regulären Ausdruck an.

- (a) Alle (vierstelligen) Jahreszahlen in einem Text finden.
- (b) Alle großgeschriebenen Worte finden.
- (c) Alle Überschriften vom Typ h3 in einer Webseite finden.
- (d) Eine Tabulator-getrennte Datei in eine Semikolon-getrennte CSV-Datei umwandeln.
- (e) Dateinamen der Form @@12-31-2025 Name@@ (US-Datum) sortierbar umbenennen: Wonach suchst du, und wie nutzt du Groups?`,
      solution: r`- **(a)** @@\d{4}@@
- **(b)** @@[A-Z]\w*@@
- **(c)** @@<h3>.*</h3>@@
- **(d)** Suche nach @@\t@@, ersetze durch @@;@@
- **(e)** Suche nach @@(\d{2})-(\d{2})-(\d{4}) (.*)@@. Die geklammerten Teile sind **Catch-Groups**; im neuen Namen werden sie umsortiert: Gruppe 3 (Jahr), Gruppe 1 (Monat), Gruppe 2 (Tag), dann Gruppe 4 (Rest) – also Jahr-Monat-Tag Name.`,
    },
    {
      id: 'split',
      title: 'split mit regulärem Ausdruck',
      source: 'nach 01b · Reguläre Ausdrücke in Java 1/2',
      points: 3,
      task: r`Was liefert in Java der folgende Aufruf?

~~~
"Dieser;Text soll;in,Worte,aufgetrennt werden.".split(";|,| ")
~~~`,
      solution: r`Die Worte der Sprache – Semikolon, Komma oder Leerzeichen – dienen als Trenner. Ergebnis ist ein Array mit sieben Strings:

~~~
Dieser
Text
soll
in
Worte
aufgetrennt
werden.
~~~`,
    },
  ],
});
