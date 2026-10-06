import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 03, first part: multi-file programs, the compilation model, value semantics, references, data types. */
export const cppStruktur = topic({
  id: 'cpp-struktur',
  chapter: '03',
  title: 'Mehrere Dateien, Referenzen und Datentypen',
  summary:
    'Header und Implementierung, Preprocessing–Compilation–Linking, Header Guard, Value Semantics, Referenzen, Core und Derived Types.',
  definitions: [
    {
      id: 'header-impl',
      title: 'Header File und Implementation File',
      ref: '03 · Header Files vs. Implementation Files',
      statement: r`**Header File** (@@.h@@ oder @@.hpp@@): enthält **Declarations** – Funktionsprototypen und Klassendefinitionen. Es sagt dem Compiler, **was existiert**. Analogie: die Speisekarte.

**Implementation File** (@@.cpp@@): enthält die **Definitions** – die eigentliche Logik, **wie** die Funktionen arbeiten. Analogie: die Küche.`,
      note: r`Das ist **Separation of Concerns**: Teile eines großen Projekts kennen die Funktionen der anderen, ohne jedes Mal den ganzen Quelltext zu lesen.`,
    },
    {
      id: 'header-guard',
      title: 'Header Guard (Include Guard)',
      ref: '03 · Structure of a C++ Program',
      statement: r`Ein **Header Guard** ist ein eindeutiges Label, das verhindert, dass ein Header in demselben Übersetzungsvorgang **mehr als einmal** eingebunden wird.

~~~
#ifndef BOOK_H     // if not defined
#define BOOK_H

class Book { ... };

#endif
~~~`,
      note: r`Ohne Guard würde ein doppeltes Einbinden die Klasse zweimal definieren – ein Compilerfehler.`,
    },
    {
      id: 'value-semantics',
      title: 'Value Semantics',
      ref: '03 · Variables & Value Semantics',
      statement: r`Variablen sind benannte Speicherorte mit **eigener Identität**. Bei der Zuweisung @@b = a@@ **kopiert** C++ die Bits von a nach b. Danach führen beide ein getrenntes Leben.

~~~
int a = 5;    // Slot a enthält 5
int b = a;    // Slot b bekommt eine Kopie
b = 10;       // nur b ändert sich, a bleibt 5
~~~`,
    },
    {
      id: 'referenz',
      title: 'Reference (Alias)',
      ref: '03 · References – The Alias',
      statement: r`Eine **Referenz** ist ein weiterer Name für dieselbe „Box“. Syntax: @@int &ref = original;@@

Regeln:
- Sie **muss** bei der Erzeugung initialisiert werden.
- Sie kann später **nicht** auf etwas anderes umgesetzt werden (kein „re-seating“).
- @@ref@@ und @@original@@ teilen dieselbe Speicheradresse.`,
    },
    {
      id: 'nullptr',
      title: 'Pointer und nullptr',
      ref: '03 · Pointers & Dereferencing',
      statement: r`Ein **Pointer** speichert die Speicheradresse einer anderen Variablen. @@&@@ fragt „Wo liegt diese Variable?“, @@*@@ sagt „Geh zu der gespeicherten Adresse und hol den Wert“.

Ein **Null Pointer** (@@nullptr@@) zeigt auf nichts. Ihn zu dereferenzieren ist ein Laufzeitfehler.`,
      note: r`Unterschied zur Referenz: Ein Pointer darf leer sein (nullptr) und später umgesetzt werden; eine Referenz ist immer gebunden und bleibt es.`,
    },
    {
      id: 'datentyp',
      title: 'Data Type und Static Typing',
      ref: '03 · What Are Data Types?',
      statement: r`Ein **Datentyp** sagt dem Compiler, **wie viel Speicher** für eine Information zu reservieren ist und **wie sie zu interpretieren** ist (wie aus Nullen und Einsen wieder Zahlen, Buchstaben oder Wahrheitswerte werden).

**Static Typing:** Der Typ einer Variablen muss zur **Compile-Zeit** bekannt sein und kann sich später nicht ändern.`,
      note: r`C++ kennt zwei Gruppen: Core (Primitive) Data Types und Derived Data Types.`,
    },
    {
      id: 'derived',
      title: 'Derived Data Types',
      ref: '03 · Derived Data Types',
      statement: r`Zusammengesetzte Typen, aufgebaut auf den primitiven:

- **String** @@std::string@@ – flexible Zeichenfolge für Text.
- **Array (C-Style)** @@int myArray[size]@@ – Folge **fester Größe** von Elementen desselben Typs.
- **Vector** @@std::vector<type>@@ – Array **dynamischer Größe**, kann wachsen und schrumpfen.
- **Pointer** @@int* ptr = &x;@@ – speichert eine Adresse.`,
      note: r`@@std::string@@ und @@std::vector@@ kommen aus der Standard Library (Präfix @@std::@@) und bringen Funktionen mit: @@.push_back()@@, @@.size()@@.`,
    },
  ],
  theorems: [
    {
      id: 'kompilationsmodell',
      title: 'The Compilation Model: drei Stufen',
      ref: '03 · The Compilation Model: From Code to App',
      statement: r`1. **Preprocessing:** verarbeitet die @@#@@-Befehle – Header werden hineinkopiert, Makros ersetzt.
2. **Compilation:** übersetzt den C++-Code in Assembly bzw. **Object Code** (@@.o@@ / @@.obj@@): maschinenlesbar, aber unvollständige Fragmente.
3. **Linking:** die „Glue“-Phase. Object Files und externe Bibliotheken (wie iostream) werden zu **einem Executable** verbunden.`,
      note: r`Typischer Linker-Fehler: main.cpp bindet math_utils.h ein und ruft @@multiply()@@ auf, aber math_utils.cpp wird nicht mit gelinkt. Die Compilation gelingt (die Deklaration reicht), das **Linking** scheitert an der fehlenden Definition.`,
    },
    {
      id: 'core-types',
      title: 'Core (Primitive) Data Types und ihre Größen',
      ref: '03 · Core (Primitive) Data Types',
      statement: r`~~~
Typ         Zweck                               Beispiel        sizeof
int         ganze Zahlen                        42, -7          4 Bytes
long long   sehr große ganze Zahlen             92233720368LL   8 Bytes
float       Dezimalzahlen, weniger genau        3.14f           4 Bytes
double      Dezimalzahlen, genauer (Standard)   3.14159265      8 Bytes
bool        Wahrheitswert                       true, false     1 Byte
char        ein Zeichen (ASCII)                 'A', '%'        1 Byte
void        „kein Typ“, für Funktionen ohne Rückgabe
~~~`,
      note: r`@@sizeof(...)@@ liefert die Größe in Bytes. Literale: @@f@@ für float, @@LL@@ für long long. @@double@@ bietet etwa 15 Stellen Genauigkeit.`,
    },
    {
      id: 'brace-init',
      title: 'Brace Initialization',
      ref: 'Tutorial 01 · Modern Initialization',
      statement: r`@@int health{100};@@ heißt **Brace Initialization** (Uniform Initialization).

Sie verhindert **Narrowing**: @@int x = 3.14;@@ schneidet die Nachkommastellen stillschweigend ab; @@int x{3.14};@@ ist ein **Compilerfehler**.`,
    },
    {
      id: 'referenz-vs-kopie',
      title: 'Kopie, Referenz, Pointer: drei Wege zu einem Wert',
      ref: '03 · Value Semantics / References / Pointers',
      statement: r`~~~
int a = 5;
int  b = a;    // Kopie: eigene Box
int& r = a;    // Referenz: zweiter Name für die Box von a
int* p = &a;   // Pointer: eigene Box, die die Adresse von a hält

b  = 1;        // a bleibt 5
r  = 2;        // a ist 2
*p = 3;        // a ist 3
~~~`,
      note: r`Das @@&@@ hat zwei Bedeutungen: in einer Deklaration (@@int& r@@) „Referenz“, in einem Ausdruck (@@&a@@) „Adresse von“.`,
    },
  ],
  claims: [
    {
      id: 'header-inhalt',
      statement: r`Header-Dateien enthalten üblicherweise Deklarationen, .cpp-Dateien die Definitionen.`,
      holds: true,
      reason: r`Der Header ist die „Speisekarte“ (was existiert), die Implementierungsdatei die „Küche“ (wie es funktioniert).`,
      ref: '03 · Header Files vs. Implementation Files',
    },
    {
      id: 'preprocessing-zuletzt',
      statement: r`Das Preprocessing findet nach dem Linking statt.`,
      holds: false,
      reason: r`Reihenfolge: Preprocessing → Compilation → Linking.`,
      ref: '03 · The Compilation Model',
    },
    {
      id: 'ref-umsetzen',
      statement: r`Eine Referenz kann nach ihrer Initialisierung auf eine andere Variable umgesetzt werden.`,
      holds: false,
      reason: r`Kein re-seating. @@ref = other;@@ kopiert den **Wert** von other in die ursprüngliche Variable.`,
      ref: '03 · References – The Alias',
    },
    {
      id: 'ref-init',
      statement: r`@@int &ref;@@ ohne Initialisierung ist ein Compilerfehler.`,
      holds: true,
      reason: r`Eine Referenz muss bei der Erzeugung an eine Variable gebunden werden.`,
      ref: '03 · References – The Alias',
    },
    {
      id: 'kopie-unabhaengig',
      statement: r`Nach @@int a = 5; int b = a; b = 10;@@ hat a den Wert 10.`,
      holds: false,
      reason: r`Value Semantics: b ist eine Kopie mit eigener Box. a bleibt 5.`,
      ref: '03 · Variables & Value Semantics',
    },
    {
      id: 'sizeof-double',
      statement: r`@@sizeof(double)@@ ist typischerweise doppelt so groß wie @@sizeof(float)@@.`,
      holds: true,
      reason: r`float belegt 4 Bytes, double 8 Bytes.`,
      ref: '03 · Core Data Types – Example',
    },
    {
      id: 'vector-fest',
      statement: r`Ein @@std::vector@@ hat wie ein C-Array eine feste Größe.`,
      holds: false,
      reason: r`Der Vector ist ein Array dynamischer Größe (@@push_back@@); fest ist das C-Style-Array.`,
      ref: '03 · Derived Data Types',
    },
    {
      id: 'guard-zweck',
      statement: r`Ein Header Guard verhindert, dass derselbe Header in einer Übersetzung mehrfach eingebunden wird.`,
      holds: true,
      reason: r`@@#ifndef@@ / @@#define@@ / @@#endif@@: Beim zweiten Einbinden ist das Label schon definiert, der Inhalt wird übersprungen.`,
      ref: '03 · Structure of a C++ Program',
    },
    {
      id: 'brace-narrowing',
      statement: r`@@int x{3.14};@@ kompiliert und setzt x auf 3.`,
      holds: false,
      reason: r`Brace Initialization verbietet Narrowing – Compilerfehler. Stillschweigend abgeschnitten wird bei @@int x = 3.14;@@.`,
      ref: 'Tutorial 01 · Modern Initialization',
    },
  ],
  problems: [
    {
      id: 'math-utils',
      title: 'Projekt in drei Dateien',
      source: 'nach Tasks 03 · Part 1',
      points: 8,
      task: r`Teile ein Programm mit der Funktion @@int multiply(int a, int b)@@ auf die Dateien math_utils.h, math_utils.cpp und main.cpp auf.

Was passiert, wenn man nur main.cpp übersetzt und math_utils.cpp nicht mit linkt? Welche Stufe scheitert?`,
      solution: r`~~~
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int multiply(int a, int b);     // Deklaration

#endif
~~~

~~~
// math_utils.cpp
#include "math_utils.h"

int multiply(int a, int b) {    // Definition
    return a * b;
}
~~~

~~~
// main.cpp
#include <iostream>
#include "math_utils.h"

int main() {
    std::cout << multiply(3, 4) << std::endl;
    return 0;
}
~~~

Nur main.cpp: Preprocessing und Compilation gelingen, denn durch den Header kennt der Compiler die Deklaration. Es scheitert das **Linking** (etwa „undefined reference to multiply“): Der Linker findet in keinem Object File die Definition.`,
    },
    {
      id: 'trace',
      title: 'Kopie, Referenz und Pointer verfolgen',
      source: 'nach 03 · Variables & Value Semantics / References',
      points: 6,
      task: r`Was gibt das Programm aus?

~~~
int a = 1;
int b = a;
int& r = a;
int* p = &b;

r = 7;
*p = 9;
b = b + 1;

std::cout << a << " " << b << " " << r << " " << *p << std::endl;
~~~`,
      solution: r`- @@b@@ ist eine Kopie von a (eigene Box, Wert 1).
- @@r@@ ist ein Alias für a; @@r = 7@@ setzt a auf 7.
- @@p@@ zeigt auf b; @@*p = 9@@ setzt b auf 9.
- @@b = b + 1@@ ergibt 10; @@*p@@ liest dieselbe Box.

Ausgabe: @@7 10 7 10@@`,
    },
    {
      id: 'typ-waehlen',
      title: 'Den passenden Typ wählen',
      source: 'nach Tutorial 01 und 02',
      points: 5,
      task: r`Welchen Typ nimmst du jeweils, und warum?

1. die Entfernung zu einem Stern in Kilometern (ganzzahlig, weit über 2 Milliarden)
2. eine Schulnote als Buchstabe
3. eine Liste von Messwerten, deren Anzahl erst zur Laufzeit feststeht
4. den Namen einer Person
5. den Kreisumfang mit hoher Genauigkeit`,
      solution: r`1. @@long long@@ – ein @@int@@ (4 Bytes) reicht nur bis etwa 2 Milliarden. Literal mit @@LL@@.
2. @@char@@ – genau ein Zeichen, in einfachen Anführungszeichen.
3. @@std::vector<double>@@ – wächst mit @@push_back@@; ein C-Array hat feste Größe.
4. @@std::string@@ – verwaltet seinen Speicher selbst, Länge beliebig.
5. @@double@@ – 8 Bytes, etwa 15 Stellen; der Standard für Dezimalzahlen.`,
    },
  ],
});
