import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 01, first part: classification of languages, paradigms, typing, variables and subroutines. */
export const sprachen = topic({
  id: 'sprachen',
  chapter: '01',
  title: 'Programmiersprachen einordnen',
  summary:
    'Grundelemente, Klassifikation nach Level, Zweck, Typisierung und Paradigma, Variablen und ihr Lebenszyklus.',
  definitions: [
    {
      id: 'paradigma',
      title: 'Programming Paradigm',
      ref: '01 · Programming Languages Types – by Paradigm',
      statement: r`Ein **Programmierparadigma** ist ein grundlegender Stil, Programme zu schreiben. Es bestimmt, wie man über Code **denkt** und ihn **strukturiert**.

Die gängigsten: Imperative, Object-Oriented, Functional, Declarative, Logic, Concurrent und Event-Driven Programming.`,
      note: r`Viele Sprachen unterstützen **mehrere** Paradigmen (multi-paradigm): C++ ist prozedural, objektorientiert und generisch; Python ist imperativ, objektorientiert und funktional.`,
    },
    {
      id: 'level',
      title: 'Low-level vs. High-level Language',
      ref: '01 · Programming Languages Types – by Level',
      statement: r`**Low-level:** hardwareabhängig und schwer zu verstehen. Beispiele: Assembly, Maschinensprache (CPU-Instruktionen).

**High-level:** unabhängig von der Hardware; der Code ähnelt englischen Anweisungen und lässt sich leicht lesen, schreiben und debuggen. Beispiele: C++, Java, Python, C#.`,
    },
    {
      id: 'zweck',
      title: 'General-purpose vs. Domain-specific',
      ref: '01 · Programming Languages Types – by Purpose',
      statement: r`**General-purpose:** für ein breites Spektrum von Anwendungen einsetzbar – Python, Java, C++.

**Domain-specific:** für bestimmte Aufgaben oder Domänen entworfen – SQL (Datenbanken), HTML/CSS/JavaScript (Webentwicklung).`,
    },
    {
      id: 'statisch-dynamisch',
      title: 'Statically Typed vs. Dynamically Typed',
      ref: '01 · Dynamically Typed vs. Static Typed Languages',
      statement: r`**Statically typed:** Der Datentyp einer Variablen muss vor der Benutzung deklariert sein; der **Compiler** prüft Typfehler zur **Compile-Zeit**. Beispiele: C++, Java.

**Dynamically typed:** Der Typ einer Variablen wird erst zur **Laufzeit** bestimmt und geprüft, ohne vorherige Deklaration; die Typinformation steckt im Objekt selbst. Beispiele: Python, JavaScript, Ruby, PHP.`,
      note: r`Die Frage ist **wann** geprüft wird (Compile-Zeit oder Laufzeit) – nicht **wie streng**. Wie streng, beantwortet strong vs. weak typing.`,
    },
    {
      id: 'stark-schwach',
      title: 'Strongly Typed vs. Weakly Typed',
      ref: '01 · Strongly Typed vs. Weakly Typed Language',
      statement: r`**Strongly typed:** Die Typregeln werden strikt durchgesetzt (zur Compile-Zeit oder zur Laufzeit). Operationen auf nicht zusammenpassenden Typen sind ohne **explizite Konvertierung** nicht erlaubt, etwa String + Integer. Beispiele: Python, C++, Java, C#, Haskell.

**Weakly typed:** Die Typregeln sind lockerer; die Sprache konvertiert **implizit** (implicit type conversion). Beispiele: JavaScript, PHP, Perl.`,
      note: r`Weak typing ist „flexible but risky“: bequem, aber Werte können unbemerkt in einen ungewollten Typ umgewandelt werden. Python ist **strongly und dynamically** typed – die beiden Achsen sind unabhängig.`,
    },
    {
      id: 'variable',
      title: 'Variable und Datentyp',
      ref: '01 · Variable Lifecycle & Concepts',
      statement: r`Eine **Variable** ist ein Platzhalter: Sie steht für einen Speicherort, an dem ein Wert liegt. Ihre vier Eigenschaften:

- Name
- Typ
- Wert
- Speicheradresse

Der **Datentyp** legt fest, wie viel Speicher belegt wird und welche Operationen erlaubt sind.`,
    },
    {
      id: 'subroutinen',
      title: 'Function, Procedure, Method',
      ref: '01 · Functions / Procedures / Methods',
      statement: r`**Subroutines** sind wiederverwendbare Codeblöcke für eine bestimmte Aufgabe; sie organisieren den Code.

- Eine **Function** liefert auf Basis ihrer Eingaben einen Wert zurück.
- Eine **Procedure** führt Aktionen aus, ohne einen Wert zurückzugeben.
- Eine **Method** ist eine Function oder Procedure, die in einer Klasse definiert ist und auf Objekten arbeitet.`,
      note: r`Functions stehen eher für Berechnung, Procedures für Seiteneffekte (I/O, Mutation). Viele moderne Sprachen unterscheiden nicht mehr: In C++ ist eine Procedure einfach eine Funktion mit Rückgabetyp @@void@@.`,
    },
  ],
  theorems: [
    {
      id: 'grundelemente',
      title: 'Die fünf Grundelemente der Programmierung',
      ref: '01 · Basic elements or operations of programming',
      statement: r`- **Input:** Daten kommen ins Programm (Tastatur, Touchscreen, Datei).
- **Output:** das gewünschte Ergebnis des Programms.
- **Arithmetic:** mathematische Berechnungen und weitere Operationen.
- **Conditional:** prüfen, ob eine Bedingung erfüllt ist, und abhängig davon Code ausführen oder nicht.
- **Looping:** eine Aufgabe wiederholen, solange die Bedingung gilt.`,
      note: r`Beispiel der Folien (Kursanmeldung): persönliche Daten eingeben, Bestätigung ausgeben, Teilnehmer zählen, „wenn der Raum frei ist, zuweisen“, „für alle Kurse wiederholen“.`,
    },
    {
      id: 'lebenszyklus',
      title: 'Lebenszyklus einer Variablen',
      ref: '01 · Variable Lifecycle & Concepts',
      statement: r`1. **Declaration:** dem Compiler/Interpreter mitteilen, dass ein Name existiert und (meist) welche Art Daten er hält. In Java/C++ explizit, in Python implizit bei der ersten Zuweisung.
2. **Initialization:** die **erste** Zuweisung eines Wertes an die deklarierte Variable.
3. **Assignment:** mit dem Zuweisungsoperator @@=@@ einen Wert im Speicherort ablegen. Erst wird die **rechte** Seite ausgewertet, dann das Ergebnis links gespeichert.
4. **Overwriting (Mutation):** Eine neue Zuweisung ersetzt den alten Wert an dieser Adresse.`,
      note: r`Benutzung vor der Initialisierung: in C++ **Undefined Behavior**, in Python ein **NameError**. Überschriebene Werte, auf die nichts mehr verweist, räumt in Python/Java irgendwann der Garbage Collector weg.`,
    },
    {
      id: 'paradigmen-tabelle',
      title: 'Die Paradigmen im Überblick',
      ref: '01 · Paradigms of Programming',
      statement: r`- **Imperative:** dem Computer Schritt für Schritt sagen, **wie** etwas zu tun ist – Variablen, Schleifen, Bedingungen, Funktionen (C, C++, Java, Python).
- **Object-Oriented:** reale Dinge als Objekte mit Eigenschaften und Verhalten – Klassen, Vererbung, Polymorphie, Kapselung (Java, C++, Python, C#).
- **Functional:** Berechnung als Auswertung mathematischer Funktionen – pure functions, higher-order functions, Rekursion, Immutability (Haskell, Lisp, Clojure).
- **Declarative:** angeben, **was** berechnet werden soll, nicht wie (SQL, Prolog).
- **Logic:** Probleme über logische Regeln lösen – Wissensbasis, Inferenzregeln (Prolog).
- **Concurrent:** mehrere Aufgaben gleichzeitig – Threads, Prozesse, Synchronisation (Java, C++, Python).
- **Event-Driven:** auf Ereignisse reagieren – Event Handler, Callbacks, Event Loop (JavaScript, Python).`,
    },
    {
      id: 'statisch-pro-contra',
      title: 'Static vs. Dynamic Typing: Vor- und Nachteile',
      ref: '01 · Dynamically Typed vs. Static Typed Languages',
      statement: r`**Static typing**
- Pro: Early Error Detection (Typfehler schon beim Kompilieren), oft bessere Performance (optimierter Maschinencode), sichereres Refactoring.
- Contra: mehr Schreibaufwand (verbosity), weniger Flexibilität (der Typ einer Variablen steht fest), steilere Lernkurve.

**Dynamic typing**
- Pro: Flexibilität, knapper Code, schnelle Entwicklung (rapid development).
- Contra: Typfehler zeigen sich erst zur **Laufzeit**, mögliche Performance-Einbußen, schwierigeres Debugging.`,
    },
    {
      id: 'namensregeln',
      title: 'Namensregeln und Schreibweisen',
      ref: '01 · Variables – Naming Conventions',
      statement: r`**Nicht erlaubt** sind Namen, die

- mit einer Ziffer beginnen (@@1_test@@),
- Leerzeichen enthalten (@@my variable@@),
- Sonderzeichen wie +, -, % enthalten,
- ein reserviertes Schlüsselwort sind (@@if@@, @@while@@).

**Schreibweisen für mehrere Wörter:**
- **Camel Case:** jedes Wort außer dem ersten beginnt groß – @@myVariableName@@
- **Pascal Case:** jedes Wort beginnt groß – @@MyVariableName@@
- **Snake Case:** Wörter durch Unterstrich getrennt – @@my_variable_name@@`,
      note: r`In Java gilt per Konvention: Klassen in PascalCase, Variablen und Methoden in camelCase.`,
    },
  ],
  claims: [
    {
      id: 'python-aelter',
      statement: r`Python ist älter als Java.`,
      holds: true,
      reason: r`Python erschien 1991, Java 1995.`,
      ref: '01 · A short timeline',
    },
    {
      id: 'python-schwach',
      statement: r`Python ist dynamisch typisiert und deshalb eine schwach typisierte Sprache.`,
      holds: false,
      reason: r`Python ist dynamically **und strongly** typed: @@"3" + 4@@ ist ein Fehler, es wird nicht implizit konvertiert. Dynamic/static sagt nur, **wann** Typen geprüft werden.`,
      ref: '01 · Strongly Typed vs. Weakly Typed',
    },
    {
      id: 'statisch-compile',
      statement: r`In einer statisch typisierten Sprache werden Typfehler bereits zur Compile-Zeit gefunden.`,
      holds: true,
      reason: r`Der Typ jeder Variablen ist deklariert, der Compiler prüft die Typen vor der Ausführung (Early Error Detection). C++ und Java arbeiten so.`,
      ref: '01 · Static Typed',
    },
    {
      id: 'ein-paradigma',
      statement: r`Jede Programmiersprache gehört zu genau einem Paradigma.`,
      holds: false,
      reason: r`Viele Sprachen unterstützen mehrere Paradigmen. C++, Java und Python stehen in der Tabelle der Folien bei Imperative, Object-Oriented und Concurrent.`,
      ref: '01 · by Paradigm',
    },
    {
      id: 'sql-general',
      statement: r`SQL ist eine General-purpose-Sprache.`,
      holds: false,
      reason: r`SQL ist domain-specific (Datenbanken) und zudem deklarativ: Man beschreibt, **was** man haben will, nicht wie es berechnet wird.`,
      ref: '01 · by Purpose',
    },
    {
      id: 'schwach-implizit',
      statement: r`Schwach typisierte Sprachen wie JavaScript wandeln Datentypen bei Operationen oft automatisch um.`,
      holds: true,
      reason: r`Das ist die implicit type conversion: bequem, kann aber zu unerwarteten Ergebnissen und subtilen Bugs führen.`,
      ref: '01 · Weakly Typed',
    },
    {
      id: 'rechte-seite',
      statement: r`Bei einer Zuweisung @@x = x + 1@@ wird zuerst die linke Seite ausgewertet.`,
      holds: false,
      reason: r`Erst wird die **rechte** Seite ausgewertet (alter Wert von x plus 1), dann wird das Ergebnis im Speicherort der linken Seite abgelegt.`,
      ref: '01 · Assignment Statement',
    },
    {
      id: 'procedure-wert',
      statement: r`Eine Procedure liefert einen Wert zurück, eine Function nicht.`,
      holds: false,
      reason: r`Umgekehrt: Die Function liefert einen Wert, die Procedure führt nur Aktionen aus (Seiteneffekte).`,
      ref: '01 · Functions / Procedures / Methods',
    },
    {
      id: 'uninit-cpp',
      statement: r`Eine Variable vor ihrer Initialisierung zu lesen, führt in C++ zu Undefined Behavior.`,
      holds: true,
      reason: r`C++ belegt lokale Variablen nicht automatisch vor; man liest einen zufälligen „Garbage“-Wert. Python meldet in derselben Lage einen NameError.`,
      ref: '01 · Initialization',
    },
  ],
  problems: [
    {
      id: 'einordnen',
      title: 'Sprachen einordnen',
      source: 'nach 01 · Programming Languages Classification',
      points: 6,
      task: r`Ordne C++, Java, Python, JavaScript und SQL ein:

- statically oder dynamically typed? (für die ersten vier)
- strongly oder weakly typed? (für die ersten vier)
- general-purpose oder domain-specific?`,
      hint: r`Zwei unabhängige Achsen: **wann** wird geprüft, und **wie streng**.`,
      solution: r`~~~
             Prüfzeitpunkt   Strenge   Zweck
C++          static          strong    general-purpose
Java         static          strong    general-purpose
Python       dynamic         strong    general-purpose
JavaScript   dynamic         weak      domain-specific (Web)
SQL          –               –         domain-specific (Datenbanken)
~~~

Die Folien nennen C++ und Java als statically typed, Python und JavaScript als dynamically typed; strongly typed sind Python, C++, Java, weakly typed JavaScript, PHP, Perl.`,
    },
    {
      id: 'lebenszyklus-benennen',
      title: 'Lebenszyklus am Code benennen',
      source: 'nach 01 · Variable Lifecycle & Concepts',
      points: 5,
      task: r`Benenne für jede Zeile, welcher Schritt im Lebenszyklus der Variablen stattfindet, und gib den Wert von @@x@@ am Ende an.

~~~
int x;        // (1)
x = 5;        // (2)
x = x * 2;    // (3)
int y = x;    // (4)
~~~

Was wäre passiert, wenn Zeile (2) fehlte?`,
      solution: r`1. **Declaration** – Speicher für einen int wird reserviert, noch kein definierter Wert.
2. **Initialization** – die erste Zuweisung.
3. **Assignment / Overwriting** – rechte Seite zuerst: 5 · 2 = 10, dann ersetzt 10 die 5.
4. **Declaration mit Initialization** von y – der Wert 10 wird **kopiert**.

Am Ende ist x = 10.

Ohne Zeile (2) würde Zeile (3) eine nicht initialisierte Variable lesen: in C++ **Undefined Behavior** (ein zufälliger Garbage-Wert).`,
    },
    {
      id: 'namen-pruefen',
      title: 'Bezeichner prüfen',
      source: 'nach 01 · Naming Conventions',
      points: 4,
      task: r`Welche Namen sind unzulässig, und warum? Welche Schreibweise haben die zulässigen?

~~~
studentCount   2ndTry   total_sum   my var   while   MaxSpeed   rate%
~~~`,
      solution: r`- @@studentCount@@ – zulässig, **Camel Case**
- @@2ndTry@@ – unzulässig: beginnt mit einer Ziffer
- @@total_sum@@ – zulässig, **Snake Case**
- @@my var@@ – unzulässig: Leerzeichen
- @@while@@ – unzulässig: reserviertes Schlüsselwort
- @@MaxSpeed@@ – zulässig, **Pascal Case**
- @@rate%@@ – unzulässig: Sonderzeichen`,
    },
  ],
});
