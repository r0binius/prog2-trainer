import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 01, second part: compilation and interpretation, syntax, semantics, memory management, OOP basics. */
export const ausfuehrung = topic({
  id: 'ausfuehrung',
  chapter: '01',
  title: 'Ausführungsmodelle, Syntax, Semantik und OOP-Grundbegriffe',
  summary:
    'Compilation vs. Interpretation, Phasen des Compilers, Syntax, Semantik, Memory Management und die vier OOP-Konzepte.',
  definitions: [
    {
      id: 'compilation',
      title: 'Compilation',
      ref: '01 · Compilation vs Interpretation',
      statement: r`Das **gesamte Programm** wird **vor der Ausführung** von einem **Compiler** in Maschinencode übersetzt. Das Ergebnis ist eine ausführbare Datei, die direkt auf dem Betriebssystem läuft.

Eigenschaften: schnellere Ausführung, Fehler werden erkannt, **bevor** das Programm läuft, es entsteht ein eigenständiges Executable. Beispiele: C, C++, Java, Go.`,
    },
    {
      id: 'interpretation',
      title: 'Interpretation',
      ref: '01 · Compilation vs Interpretation',
      statement: r`Das Programm wird von einem **Interpreter Zeile für Zeile** ausgeführt; es entsteht **keine** separate ausführbare Datei.

Eigenschaften: langsamere Ausführung, einfacheres Debugging, sofortige Rückmeldung beim Entwickeln. Beispiele: Python, JavaScript, MATLAB.`,
      note: r`Compiler und Interpreter sind selbst Programme.`,
    },
    {
      id: 'syntax',
      title: 'Syntax',
      ref: '01 · Key aspects – Syntax',
      statement: r`Die **Syntax** betrifft die **Form** des Codes: die Regeln für Struktur und Reihenfolge der Elemente einer Sprache – ohne Blick auf die Bedeutung. Sie ist die Grammatik der Sprache.

Ein **Syntax Error** entsteht, wenn diese Regeln verletzt werden.`,
      note: r`Bestandteile: Keywords (@@if@@, @@while@@), Identifiers (Namen), Operators, Data Types und Punctuators (Klammern, Semikolon).`,
    },
    {
      id: 'semantik',
      title: 'Semantik',
      ref: '01 · Key aspects – Semantics',
      statement: r`Die **Semantik** betrifft die **Bedeutung** des Codes: wie Anweisungen ausgeführt werden und was sie bewirken.

Bei einem **Semantic Error** ist der Code syntaktisch korrekt, aber logisch falsch.`,
      note: r`Aspekte: Type Checking, Scope Rules (Sichtbarkeit und Lebensdauer von Variablen), Control Flow, Operational Semantics (schrittweise Ausführung).`,
    },
    {
      id: 'memory-management',
      title: 'Memory Management und seine Fehlerbilder',
      ref: '01 · Key aspects – Memory Management',
      statement: r`**Memory Management** ist das Anfordern, Benutzen und Freigeben von Speicher während der Programmausführung.

- **Allocation:** einer Variablen oder Datenstruktur einen Speicherblock zuweisen.
- **Deallocation:** den Speicher freigeben, wenn er nicht mehr gebraucht wird.
- **Memory Leak:** nicht freigegebener Speicher, auf den das Programm nicht mehr zugreifen kann.
- **Fragmentation:** Der Speicher zerfällt in kleine, nicht zusammenhängende Blöcke; große Blöcke lassen sich schwer anfordern.
- **Access Violation:** Zugriff auf Speicher, der nicht angefordert oder schon freigegeben wurde.`,
    },
    {
      id: 'klasse-objekt',
      title: 'Class und Object',
      ref: '01 · Object-Oriented Programming (OOP)',
      statement: r`Eine **Class** ist ein Template, ein „Blueprint“ für Objekte. Sie legt fest, welche Daten ein Objekt hält (**Attributes**) und was es tun kann (**Methods**). Eine Klasse existiert nicht als „Ding“ im Speicher; sie ist nur der Plan.

Ein **Object** ist eine konkrete **Instanz**, die nach diesem Plan erzeugt wurde, mit tatsächlichen Werten in den Attributen.`,
    },
    {
      id: 'kapselung-abstraktion',
      title: 'Encapsulation und Abstraction',
      ref: '01 · Object-Oriented Programming (OOP)',
      statement: r`**Encapsulation:** das Bündeln von Daten (Attributes) und den Methoden, die auf diesen Daten arbeiten, in einer Einheit (dem Objekt).

**Abstraction:** die Implementierungsdetails einer Klasse verbergen und nur das nötige Interface nach außen zeigen.`,
    },
    {
      id: 'vererbung-polymorphie',
      title: 'Inheritance und Polymorphism',
      ref: '01 · Key Concepts of OOP',
      statement: r`**Inheritance:** Aus einer bestehenden Klasse (Parent, Base Class) entsteht eine neue (Child, Derived Class); das Kind erbt Attribute und Methoden der Elternklasse.

**Polymorphism** („many forms“): Objekte verschiedener Klassen können so behandelt werden, als wären sie Objekte derselben Klasse; derselbe Methodenname lässt sich auf viele Objekte oder Klassen anwenden.`,
      note: r`Beispiel der Folien: @@Vehicle@@ (color, max_speed, start(), stop()) als Parent von @@Car@@ und @@Bus@@; @@make_sound()@@ ergibt je nach Tier „Meow“ oder „Buzz“.`,
    },
  ],
  theorems: [
    {
      id: 'compiler-phasen',
      title: 'Was ein Compiler tut: die fünf Phasen',
      ref: '01 · What a Compiler Actually Does',
      statement: r`1. **Lexical Analysis (Tokenization):** Der Quelltext wird in Tokens zerlegt. @@int x = 5;@@ wird zu [int] [x] [=] [5] [;].
2. **Syntax Analysis (Parsing):** Prüfung gegen die Grammatik. @@int x 5;@@ ist ein Syntax Error.
3. **Semantic Analysis:** Prüfung von Bedeutung und Korrektheit. @@int x = "hello";@@ ist ein Semantic Error (type mismatch).
4. **Code Generation:** Übersetzung in Maschineninstruktionen, vereinfacht @@MOV x, 5@@.
5. **Linking:** Der Linker verbindet den kompilierten Code mit Bibliotheken; es entsteht die ausführbare Datei.`,
      note: r`Merkhilfe: Zeichen → Wörter (Tokens) → Satzbau (Syntax) → Sinn (Semantik) → Übersetzung → Zusammenbinden.`,
    },
    {
      id: 'drei-schritte',
      title: 'Wie Programmiersprachen arbeiten',
      ref: '01 · How Programming Languages Work',
      statement: r`1. **Code:** Im Texteditor wird Code in einer bestimmten Sprache geschrieben (Syntax und Grammatik).
2. **Compilation oder Interpretation:** Der Code wird von einem Compiler in Maschinencode (Binary) übersetzt und als Executable abgelegt – **oder** von einem Interpreter Zeile für Zeile ausgeführt, ohne Executable.
3. **Execution:** Der Prozessor führt die Instruktionen aus.`,
    },
    {
      id: 'manuell-automatisch',
      title: 'Manual vs. Automatic Memory Management',
      ref: '01 · Types of Memory Management',
      statement: r`**Manual:** Der Programmierer fordert Speicher explizit an und gibt ihn explizit frei. Sprachen: C, C++.
- Pro: mehr Kontrolle über den Speicherverbrauch.
- Contra: Risiko von Memory Leaks und Overflows.

**Automatic (Garbage Collection):** Die Laufzeitumgebung übernimmt Anforderung und Freigabe. Sprachen: Java, Python, JavaScript.
- Pro: geringeres Risiko von Speicherfehlern.
- Contra: möglicher Performance-Overhead, vor allem bei Echtzeitanwendungen.`,
    },
    {
      id: 'speicher-strategien',
      title: 'Strategien für effizientes Memory Management',
      ref: '01 · Strategies for Efficient Memory Management',
      statement: r`- **Minimize Memory Usage:** speichereffiziente Datenstrukturen und Algorithmen wählen.
- **Release Unused Memory:** Speicher freigeben, sobald er nicht mehr gebraucht wird.
- **Avoid Unnecessary Object Creation:** Objekte nur bei Bedarf erzeugen, wenn möglich wiederverwenden.
- **Optimize Data Structures:** passende Datenstrukturen mit wenig Overhead.
- **Use Profiling Tools:** Speicherengpässe finden und gezielt optimieren.`,
      note: r`Gilt für C++ **und** Java – auch mit Garbage Collector kostet jedes unnötige Objekt Speicher und Zeit.`,
    },
    {
      id: 'vererbungsarten',
      title: 'Arten der Vererbung',
      ref: '01 · Types of Inheritance',
      statement: r`- **Single:** Eine Klasse erbt von genau einer Elternklasse.
- **Multiple:** Eine Klasse erbt von mehreren Elternklassen.
- **Multilevel:** Eine Klasse erbt von einer bereits abgeleiteten Klasse.
- **Hierarchical:** Mehrere Klassen erben von derselben Basisklasse.
- **Hybrid:** eine Kombination mehrerer Arten.`,
      note: r`Nutzen der Vererbung: Code Reusability, Modularity, Extensibility. Nutzen von OOP insgesamt: Modularity, Reusability, Maintainability, Flexibility.`,
    },
  ],
  claims: [
    {
      id: 'interpreter-exe',
      statement: r`Ein Interpreter erzeugt vor der Ausführung eine eigenständige ausführbare Datei.`,
      holds: false,
      reason: r`Das tut der Compiler. Der Interpreter führt das Programm Zeile für Zeile aus, ohne ein Executable zu erzeugen.`,
      ref: '01 · Interpretation',
    },
    {
      id: 'kompiliert-schneller',
      statement: r`Kompilierte Programme laufen in der Regel schneller als interpretierte.`,
      holds: true,
      reason: r`Die Übersetzung in Maschinencode ist vor dem Start abgeschlossen; der Interpreter muss sie während der Ausführung leisten.`,
      ref: '01 · Compilation',
    },
    {
      id: 'int-x-5',
      statement: r`@@int x 5;@@ wird in der semantischen Analyse zurückgewiesen.`,
      holds: false,
      reason: r`Schon früher: Es fehlt das @@=@@, die Anweisung verletzt die Grammatik – ein **Syntax Error** aus der Syntax Analysis (Parsing).`,
      ref: '01 · What a Compiler Actually Does',
    },
    {
      id: 'int-hello',
      statement: r`@@int x = "hello";@@ ist syntaktisch korrekt aufgebaut, aber ein Semantic Error.`,
      holds: true,
      reason: r`Die Form „Typ Name = Wert;“ stimmt; die Bedeutung nicht: Ein String passt nicht in einen int (type mismatch). Das findet die Semantic Analysis.`,
      ref: '01 · What a Compiler Actually Does',
    },
    {
      id: 'klasse-im-speicher',
      statement: r`Eine Klasse belegt als „Ding“ Speicher für ihre Attributwerte, sobald sie definiert ist.`,
      holds: false,
      reason: r`Die Klasse ist nur der Plan. Erst ein **Objekt** (eine Instanz) hat tatsächliche Werte in den Attributen.`,
      ref: '01 · The Class (The Blueprint)',
    },
    {
      id: 'gc-nachteil',
      statement: r`Garbage Collection kann bei Echtzeitanwendungen ein Nachteil sein.`,
      holds: true,
      reason: r`Die automatische Speicherverwaltung kostet Laufzeit (Performance-Overhead), und zwar zu Zeitpunkten, die das Programm nicht bestimmt.`,
      ref: '01 · Types of Memory Management',
    },
    {
      id: 'leak-definition',
      statement: r`Ein Memory Leak ist ein Zugriff auf bereits freigegebenen Speicher.`,
      holds: false,
      reason: r`Das ist eine **Access Violation**. Ein Memory Leak ist Speicher, der **nicht** freigegeben wurde und auf den das Programm nicht mehr zugreifen kann.`,
      ref: '01 · Memory Management – Key Concepts',
    },
    {
      id: 'hierarchical',
      statement: r`Erben @@Car@@ und @@Bus@@ beide von @@Vehicle@@, ist das Hierarchical Inheritance.`,
      holds: true,
      reason: r`Mehrere Klassen erben von einer gemeinsamen Basisklasse. Multilevel wäre eine Kette: Vehicle → Car → ElectricCar.`,
      ref: '01 · Types of Inheritance',
    },
    {
      id: 'abstraktion-kapselung',
      statement: r`Abstraction bedeutet, Daten und Methoden in einer Einheit zu bündeln.`,
      holds: false,
      reason: r`Das ist **Encapsulation**. Abstraction verbirgt die Implementierungsdetails und zeigt nur das nötige Interface.`,
      ref: '01 · Object-Oriented Programming (OOP)',
    },
  ],
  problems: [
    {
      id: 'phase-zuordnen',
      title: 'Fehler der Compiler-Phase zuordnen',
      source: 'nach 01 · What a Compiler Actually Does',
      points: 6,
      task: r`Nenne die fünf Phasen eines Compilers in der richtigen Reihenfolge. In welcher Phase fällt jeweils der Fehler auf?

~~~
(a) int count = "zehn";
(b) int count 10;
(c) Der Aufruf einer Funktion, die deklariert, aber in keiner
    übersetzten Datei definiert ist.
~~~`,
      solution: r`Phasen: Lexical Analysis → Syntax Analysis → Semantic Analysis → Code Generation → Linking.

- (a) **Semantic Analysis:** Form korrekt, aber type mismatch (String in int).
- (b) **Syntax Analysis:** Das @@=@@ fehlt, die Grammatik ist verletzt.
- (c) **Linking:** Jede Datei für sich ist korrekt; erst der Linker merkt, dass die Definition fehlt.`,
    },
    {
      id: 'vergleich-modelle',
      title: 'Compilation und Interpretation vergleichen',
      source: 'nach 01 · Two Execute Models for Programs',
      points: 5,
      task: r`Stelle Compilation und Interpretation gegenüber: Wann wird übersetzt, was entsteht, je drei Eigenschaften und je zwei Beispielsprachen.`,
      solution: r`~~~
               Compilation                    Interpretation
Übersetzung    ganzes Programm, vorher        Zeile für Zeile, beim Ausführen
Ergebnis       ausführbare Datei              keine separate Datei
Eigenschaften  schnellere Ausführung          langsamere Ausführung
               Fehler vor dem Programmlauf    einfacheres Debugging
               eigenständiges Executable      sofortige Rückmeldung
Beispiele      C, C++ (auch Java, Go)         Python, JavaScript (MATLAB)
~~~`,
    },
    {
      id: 'oop-fahrzeuge',
      title: 'OOP-Begriffe am Fahrzeugbeispiel',
      source: 'nach 01 · Key Concepts of OOP: Inheritance',
      points: 6,
      task: r`@@Vehicle@@ hat die Attribute color und max_speed und die Methoden start() und stop(). @@Car@@ und @@Bus@@ erben von Vehicle; Car hat zusätzlich num_doors und open_door().

1. Welche Klasse ist Base Class, welche sind Derived Classes?
2. Welche Attribute und Methoden hat ein Car-Objekt insgesamt?
3. Welche Art der Vererbung liegt vor?
4. Nenne zwei Vorteile der Vererbung.`,
      solution: r`1. @@Vehicle@@ ist Base Class (Parent); @@Car@@ und @@Bus@@ sind Derived Classes (Children).
2. Geerbt: color, max_speed, start(), stop(). Eigen: num_doors, open_door().
3. **Hierarchical Inheritance** – mehrere Klassen erben von einer Basisklasse (jede einzelne Beziehung ist Single Inheritance).
4. Zwei aus: Code Reusability (keine doppelten Attribute und Methoden), Modularity, Extensibility (Spezialisierung durch neue oder überschriebene Features).`,
    },
  ],
});
