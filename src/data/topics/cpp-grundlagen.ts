import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02, first part: what C++ is, the anatomy of a program, types, I/O, control flow, building. */
export const cppGrundlagen = topic({
  id: 'cpp-grundlagen',
  chapter: '02',
  title: 'C++: Einstieg und Programmaufbau',
  summary:
    'Eigenschaften von C++, Anatomie eines Programms, Datentypen, cin und cout, Kontrollfluss, Compiler und Linker, typische Fehler.',
  definitions: [
    {
      id: 'cpp',
      title: 'C++ (Eigenschaften und Ziel)',
      ref: '02 · Key aspects / Quick – about C++',
      statement: r`C++ ist eine **performante General-purpose-Sprache**, bekannt für Effizienz und Kontrolle über die Hardware. Sie bietet **Low-level Memory Control** und damit effiziente Systemprogrammierung.

**Ziel:** die Effizienz von C mit höheren Konzepten wie objektorientierter Programmierung verbinden. Designphilosophie: Performance, Flexibilität, Kontrolle über die Hardware.`,
      note: r`Gegenüberstellung der Folien – Python: simplicity, dynamic typing, automatic memory management, fast development. C++: performance, static typing, manual memory control, fast execution.`,
    },
    {
      id: 'multi-paradigma',
      title: 'C++ als Multi-Paradigm Language',
      ref: '02 · Programming Paradigms in C++',
      statement: r`- **Procedural Programming:** Programme aus Prozeduren und Funktionen, etwa @@calculateSalary()@@.
- **Object-Oriented Programming:** Programme aus Klassen und Objekten – Encapsulation, Inheritance, Polymorphism.
- **Generic Programming:** **Templates** lassen Code mit verschiedenen Datentypen arbeiten (@@template <typename T>@@) – wiederverwendbare Algorithmen und Datenstrukturen.`,
    },
    {
      id: 'main',
      title: 'main() und return 0',
      ref: '02 · The Anatomy of a C++ Program',
      statement: r`@@int main()@@ ist der **Entry Point**: der Startpunkt jedes C++-Programms. Fehlt sie, weiß der Computer nicht, wo er beginnen soll.

@@return 0;@@ meldet dem Betriebssystem die erfolgreiche Ausführung.`,
    },
    {
      id: 'direktive',
      title: 'Preprocessor Directive',
      ref: '02 · The Anatomy of a C++ Program',
      statement: r`Zeilen, die mit @@#@@ beginnen, etwa @@#include <iostream>@@. Sie weisen den Compiler an, **vor** der eigentlichen Übersetzung die nötigen Werkzeuge zu holen – hier die Ein-/Ausgabe-Bibliothek.`,
    },
    {
      id: 'cout-cin',
      title: 'std::cout, std::cin, std::endl',
      ref: '02 · Input and Output (I/O)',
      statement: r`Aus der Bibliothek @@iostream@@:

- @@std::cout@@ (Character Output) gibt auf dem Bildschirm aus, mit dem **Insertion Operator** @@<<@@.
- @@std::cin@@ (Character Input) liest von der Tastatur, mit dem **Extraction Operator** @@>>@@.
- @@std::endl@@ beginnt eine neue Zeile; alternativ @@"\n"@@.`,
      note: r`Die Operatoren zeigen wie Pfeile die Flussrichtung der Daten: @@cout << x@@ (x fließt zur Ausgabe), @@cin >> x@@ (Eingabe fließt nach x).`,
    },
    {
      id: 'kommentar',
      title: 'Kommentare',
      ref: '02 · Comments',
      statement: r`Kommentare sind für Menschen; der Compiler **ignoriert** sie vollständig.

- Einzeilig: @@// ...@@
- Mehrzeilig: @@/* ... */@@

Sie erklären, **warum** Code so geschrieben ist – für Lesbarkeit, Review und Wartbarkeit.`,
    },
    {
      id: 'linker',
      title: 'Compiler und Linker',
      ref: '02 · The Compilation Process',
      statement: r`- **Source Code:** die Datei @@.cpp@@.
- **Compiler:** übersetzt sie in Maschinencode (Object Code), Datei @@.o@@.
- **Linker:** verbindet den Object Code mit Bibliothekscode zur ausführbaren Datei (@@.exe@@).`,
      note: r`C++ ist eine kompilierte Sprache: Was wir schreiben, ist nicht das, was der Computer ausführt.`,
    },
  ],
  theorems: [
    {
      id: 'anatomie',
      title: 'Anatomie eines C++-Programms',
      ref: '02 · The Anatomy of a C++ Program',
      statement: r`~~~
#include <iostream>        // Preprocessor Directive: I/O-Bibliothek
using namespace std;       // Namen der Standardbibliothek ohne Präfix

int main() {               // Entry Point
    cout << "Hello" << endl;   // Statement, endet mit ;
    return 0;              // erfolgreiche Ausführung
}                          // { } gruppieren den Code
~~~

Vier Bausteine: **Preprocessor Directives**, die Funktion **main()**, **Braces** als Container, **Statements** mit Semikolon.`,
    },
    {
      id: 'datentypen',
      title: 'Grundlegende Datentypen',
      ref: '02 · Variables and Data Types',
      statement: r`C++ ist **statisch typisiert**: Man muss genau sagen, welche Art Daten in der „Box“ liegt.

~~~
int     ganze Zahlen           int age = 21;
double  Dezimalzahlen          double price = 19.99;
char    ein einzelnes Zeichen  char grade = 'A';
string  Text                   string name = "C++";
bool    wahr oder falsch       bool isCoding = true;
~~~

**Declaration:** @@int age;@@ – **Initialization:** @@int age = 21;@@ – **Assignment:** @@age = 22;@@`,
      note: r`C++ ist **case sensitive**: value, Value und VALUE sind drei verschiedene Bezeichner. @@char@@ steht in einfachen, @@string@@ in doppelten Anführungszeichen.`,
    },
    {
      id: 'schleifen',
      title: 'Kontrollfluss: if und die drei Schleifen',
      ref: '02 · Control Flow',
      statement: r`- **if / if...else:** Entscheidungen.
- **for:** wenn die Anzahl der Durchläufe **bekannt** ist.
- **while:** wenn die Wiederholung von einer **Bedingung** abhängt.
- **do-while:** der Rumpf läuft **mindestens einmal**, die Bedingung wird danach geprüft.

~~~
for (int i = 0; i < 5; i++) { ... }
while (x > 0) { ... }
do { ... } while (x > 0);
~~~`,
    },
    {
      id: 'pay-for-use',
      title: '„You only pay for what you use“',
      ref: '02 · Key Design Principle',
      statement: r`Das Designprinzip von C++ bedeutet:

- **keine versteckten Performance-Kosten**
- der Programmierer **kontrolliert** den Ressourcenverbrauch

Stärken, die daraus folgen: High Performance (kompiliert, effizient), Memory Control (Pointer, manuelle Verwaltung), Scalability (kleine Programme bis sehr große Systeme), Standard Library (Container, Algorithmen, I/O).`,
      note: r`Einsatzgebiete: Systems Software (Betriebssysteme, Compiler, Datenbanken), Game Engines, Embedded Systems, High-Performance Computing, Finanzsysteme mit sehr niedriger Latenz.`,
    },
    {
      id: 'pitfalls',
      title: 'Die fünf häufigsten Fehler („Oops“)',
      ref: '02 · Common Pitfalls',
      statement: r`- **Missing Semicolon:** Jedes Statement endet mit @@;@@.
- **Case Sensitivity:** Main, main und MAIN sind verschieden; Keywords klein schreiben.
- **Uninitialized Variables:** @@int x;@@ ohne Wert auszugeben liefert eine zufällige „Garbage“-Zahl.
- **Header Forgetfulness:** @@cout@@ ohne @@#include <iostream>@@ kennt der Compiler nicht.
- **Namespace Confusion:** ohne @@using namespace std;@@ muss man @@std::cout@@ schreiben.`,
    },
  ],
  claims: [
    {
      id: 'case',
      statement: r`In C++ bezeichnen @@total@@ und @@Total@@ dieselbe Variable.`,
      holds: false,
      reason: r`C++ ist case sensitive; es sind zwei verschiedene Bezeichner.`,
      ref: '02 · Variables and Data Types',
    },
    {
      id: 'cin-operator',
      statement: r`@@std::cin@@ benutzt den Operator @@<<@@.`,
      holds: false,
      reason: r`@@cin@@ benutzt den Extraction Operator @@>>@@; @@<<@@ ist der Insertion Operator von @@cout@@.`,
      ref: '02 · Input and Output',
    },
    {
      id: 'do-while-einmal',
      statement: r`Der Rumpf einer do-while-Schleife wird mindestens einmal ausgeführt.`,
      holds: true,
      reason: r`Die Bedingung wird erst **nach** dem Rumpf geprüft. Bei while und for kann der Rumpf null Mal laufen.`,
      ref: '02 · Control Flow – Do-While Loop',
    },
    {
      id: 'kommentar-kompiliert',
      statement: r`Kommentare werden vom Compiler in Maschinencode übersetzt.`,
      holds: false,
      reason: r`Der Compiler ignoriert Kommentare vollständig; sie sind nur für Menschen.`,
      ref: '02 · Comments',
    },
    {
      id: 'linker-rolle',
      statement: r`Der Linker verbindet den Object Code mit Bibliothekscode zu einer ausführbaren Datei.`,
      holds: true,
      reason: r`Der Compiler erzeugt aus der .cpp-Datei nur Object Code (.o); erst der Linker macht daraus das lauffähige Programm.`,
      ref: '02 · The Compilation Process',
    },
    {
      id: 'std-praefix',
      statement: r`Ohne @@using namespace std;@@ kann man @@cout@@ überhaupt nicht benutzen.`,
      holds: false,
      reason: r`Man schreibt dann den Präfix dazu: @@std::cout@@.`,
      ref: '02 · Common Pitfalls',
    },
    {
      id: 'nur-oop',
      statement: r`C++ ist eine rein objektorientierte Sprache.`,
      holds: false,
      reason: r`C++ ist multi-paradigm: prozedural, objektorientiert und generisch (Templates).`,
      ref: '02 · Programming Paradigms in C++',
    },
    {
      id: 'char-quotes',
      statement: r`@@char c = 'A';@@ ist korrektes C++.`,
      holds: true,
      reason: r`Ein @@char@@ speichert genau ein Zeichen und steht in **einfachen** Anführungszeichen. @@"A"@@ wäre ein String.`,
      ref: '02 · Variables and Data Types',
    },
  ],
  problems: [
    {
      id: 'fehler-finden',
      title: 'Fehler im ersten Programm finden',
      source: 'nach 02 · Common Pitfalls',
      points: 6,
      task: r`Das Programm soll eine Zahl einlesen und verdoppelt ausgeben. Finde alle Fehler und korrigiere sie.

~~~
int Main() {
    int x
    cout >> "Zahl: ";
    cin << x;
    cout << x * 2 << endl;
    return 0;
}
~~~`,
      hint: r`Geh die fünf Pitfalls der Reihe nach durch – vier davon kommen vor, dazu die Operatoren.`,
      solution: r`1. @@#include <iostream>@@ fehlt (Header Forgetfulness).
2. @@Main@@ statt @@main@@ (Case Sensitivity) – es gibt keinen Entry Point.
3. Semikolon nach @@int x@@ fehlt.
4. @@cout@@ braucht @@<<@@, @@cin@@ braucht @@>>@@.
5. Ohne @@using namespace std;@@ muss es @@std::cout@@, @@std::cin@@, @@std::endl@@ heißen.

~~~
#include <iostream>

int main() {
    int x;
    std::cout << "Zahl: ";
    std::cin >> x;
    std::cout << x * 2 << std::endl;
    return 0;
}
~~~`,
    },
    {
      id: 'dreieck',
      title: 'Right Triangle Pattern',
      source: 'nach Tasks 01 · Exercise 1',
      points: 6,
      task: r`Schreibe ein C++-Programm, das eine Höhe einliest und ein rechtwinkliges Dreieck aus Sternen ausgibt. Für die Höhe 4:

~~~
*
**
***
****
~~~`,
      hint: r`Zwei Schleifen: außen die Zeilen, innen so viele Sterne wie die Zeilennummer.`,
      solution: r`~~~
#include <iostream>

int main() {
    int height;
    std::cout << "Enter height: ";
    std::cin >> height;

    for (int row = 1; row <= height; row++) {
        for (int star = 1; star <= row; star++) {
            std::cout << "*";
        }
        std::cout << std::endl;
    }
    return 0;
}
~~~

Für die zentrierte Pyramide (Exercise 2) kommen vor den Sternen @@height - row@@ Leerzeichen, und es werden @@2 * row - 1@@ Sterne: Leerzeichen nehmen ab, Sterne nehmen zu.`,
    },
    {
      id: 'lineare-gleichung',
      title: 'Lineare Gleichung lösen',
      source: 'nach Tasks 01 · Task 2',
      points: 5,
      task: r`Schreibe ein C++-Programm, das a und b einliest und die Gleichung ax + b = 0 löst. Für a = 0 soll „No unique solution.“ erscheinen.

Warum müssen a und b vom Typ @@double@@ sein?`,
      solution: r`~~~
#include <iostream>

int main() {
    double a, b;
    std::cout << "Enter a: ";
    std::cin >> a;
    std::cout << "Enter b: ";
    std::cin >> b;

    if (a == 0) {
        std::cout << "No unique solution." << std::endl;
    } else {
        double x = -b / a;
        std::cout << "Solution:\nx=" << x << std::endl;
    }
    return 0;
}
~~~

Mit @@int@@ wäre @@-b / a@@ eine Ganzzahldivision: Für a = 2, b = -5 käme 2 statt 2.5 heraus. Der Fall a = 0 muss **vor** der Division abgefangen werden.`,
    },
  ],
});
