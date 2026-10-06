import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 03 (end) and 04, first part: classes, access control, the object lifecycle, encapsulation, this, RAII. */
export const klassen = topic({
  id: 'klassen',
  chapter: '04',
  title: 'Klassen, Object Lifecycle und RAII',
  summary:
    'Access Specifiers, Konstruktoren und Destruktor, Objekte auf Stack und Heap, Getter und Setter, this-Pointer, RAII.',
  definitions: [
    {
      id: 'access-specifier',
      title: 'Access Specifiers: public, private, protected',
      ref: '04 · Defining Classes',
      statement: r`- **public:** von überall außerhalb der Klasse zugreifbar – das Interface.
- **private:** nur für Member der Klasse selbst zugreifbar. **Default bei @@class@@**; das Herz der Encapsulation.
- **protected:** für die Klasse **und ihre Kinder** (Vererbung) zugreifbar.`,
      note: r`Eine Klasse bündelt Daten (Attributes) und Verhalten (Methods). Die Klasse ist der Bauplan, das Objekt das Haus.`,
    },
    {
      id: 'konstruktor',
      title: 'Constructor',
      ref: '04 · Constructors and Destructors',
      statement: r`Ein **Constructor** ist eine spezielle Member-Funktion, die **automatisch** aufgerufen wird, wenn ein Objekt erzeugt wird. Er initialisiert das Objekt.

- Er hat **denselben Namen** wie die Klasse.
- Er hat **keinen Rückgabetyp** (auch nicht void).`,
      note: r`Arten: **Default Constructor** (ohne Parameter, setzt Standardwerte), **Parameterized Constructor** (eigene Werte bei der Erzeugung), **Copy Constructor** (erzeugt ein Objekt als Kopie eines anderen).`,
    },
    {
      id: 'destruktor',
      title: 'Destructor',
      ref: '04 · Constructors and Destructors',
      statement: r`Der **Destructor** wird **automatisch** aufgerufen, wenn ein Objekt seinen Scope verlässt oder mit @@delete@@ gelöscht wird. Er ist die „Cleanup“-Funktion.

- Name der Klasse mit vorangestellter **Tilde**: @@~Car()@@
- keine Parameter, kein Rückgabetyp`,
      note: r`**Stack:** Der Destruktor läuft automatisch am Ende des Scopes. **Heap:** Der Programmierer muss @@delete@@ aufrufen; das löst den Destruktor aus.`,
    },
    {
      id: 'lifecycle',
      title: 'Object Lifecycle / Object Lifetime',
      ref: '04 · Constructors and Destructors (Object Lifecycle)',
      statement: r`Der **Object Lifecycle** ist der Weg eines Objekts von der „Geburt“ (Speicheranforderung, Konstruktor) bis zum „Tod“ (Destruktor, Speicherfreigabe).

Die **Object Lifetime** ist die Zeit, in der das Objekt im Speicher existiert. C++ gibt darüber feine Kontrolle – entscheidend für Performance und Ressourcenverwaltung.`,
    },
    {
      id: 'kapselung',
      title: 'Encapsulation („Black Box“)',
      ref: '04 · Encapsulation – The "Black Box" Principle',
      statement: r`**Encapsulation:** Daten und Methoden bündeln und dabei den **direkten Zugriff einschränken**.

Problem ohne sie: In prozeduralem Code kann jede Funktion jede Variable ändern – „Spaghetti Code“ und versehentliche Bugs. Lösung: Access Specifiers als Schutzschild.`,
      note: r`Analogie: die Kaffeemaschine. Wir bedienen die öffentlichen Knöpfe (Interface); Wassertemperatur und Mahlwerk sind privat.`,
    },
    {
      id: 'getter-setter',
      title: 'Getter (Accessor) und Setter (Mutator)',
      ref: '04 · Controlled Access (Getters & Setters)',
      statement: r`- **Accessor (Getter):** gibt den Wert einer privaten Variablen zurück.
- **Mutator (Setter):** ändert den Wert nur, wenn er bestimmte **Regeln** erfüllt (Validierung).

Statt @@car.year = -500;@@ zuzulassen, prüft @@setYear(int y)@@ den Wert.`,
      note: r`Zweiter Nutzen: Die interne Darstellung kann sich ändern (etwa @@int year@@ zu @@string year@@), ohne dass Code bricht, der die Klasse benutzt.`,
    },
    {
      id: 'this',
      title: 'Der this-Pointer',
      ref: '04 · The this Pointer – Self-Reference',
      statement: r`@@this@@ ist ein versteckter, konstanter Pointer, der in **jeder nicht-statischen Member-Funktion** verfügbar ist. Er zeigt auf die Adresse des Objekts, das gerade bearbeitet wird.

Verwendung:
- **Name Conflicts (Shadowing) auflösen:** @@this->year = year;@@
- **Method Chaining:** @@return *this;@@ erlaubt @@myCar.setBrand("Ford").setYear(2023).drive();@@
- **Identity:** das Objekt kann einen Pointer auf sich selbst weitergeben.`,
    },
    {
      id: 'raii',
      title: 'RAII (Resource Acquisition Is Initialization)',
      ref: '04 · RAII – Concept',
      statement: r`**RAII** bindet die Lebensdauer einer **Ressource** (Speicher, File Handle, Socket) an die Lebensdauer eines **lokalen (Stack-)Objekts**.

**Die Regel:** Wer eine Ressource im **Konstruktor** anfordert, muss sie im **Destruktor** freigeben.`,
      note: r`Verlässt ein Stack-Objekt seinen Scope, läuft sein Destruktor **garantiert** – egal, wie die Funktion endet: per return, am Ende oder durch eine Exception.`,
    },
  ],
  theorems: [
    {
      id: 'stack-heap-objekt',
      title: 'Objekte auf Stack und Heap',
      ref: '03 · Constructors & Destructors / Tutorial 04',
      statement: r`~~~
{
    Book stackBook("C++ Primer", "Lippman");   // Stack
    stackBook.displayDetails();                // Zugriff mit .
}   // Destruktor läuft hier automatisch

Book* heapBook = new Book("Gatsby", "Fitzgerald");   // Heap
heapBook->displayDetails();                    // Zugriff mit ->
delete heapBook;                               // Destruktor läuft erst hier
~~~

- Stack-Objekt: Member mit @@.@@, Zerstörung am Ende des Blocks.
- Heap-Objekt: Member mit @@->@@, lebt bis @@delete@@.`,
    },
    {
      id: 'scope-resolution',
      title: 'Klasse in Header und .cpp: der Operator ::',
      ref: 'Tutorial 04 · Modular OOP',
      statement: r`Der Header enthält die Klassendefinition mit den **Deklarationen** der Methoden; die .cpp-Datei definiert sie mit dem **Scope Resolution Operator** @@::@@.

~~~
// Book.h
class Book {
private:
    std::string title;
public:
    Book(std::string t);
    void displayDetails();
};

// Book.cpp
#include "Book.h"
Book::Book(std::string t) { title = t; }
void Book::displayDetails() { std::cout << title << std::endl; }
~~~

@@Book::@@ sagt dem Compiler, dass die Funktion zur Klasse Book gehört.`,
    },
    {
      id: 'initializer-list',
      title: 'Member Initializer List',
      ref: 'Tutorial 05b · RAII',
      statement: r`Der Konstruktor kann Member direkt hinter dem Doppelpunkt initialisieren:

~~~
Car(std::string m, int y, int s) : model(m), year(y) {
    serialNumber = new int(s);
}
~~~

@@model(m), year(y)@@ ist die **Member Initializer List**. Über sie ruft eine abgeleitete Klasse auch den Konstruktor der Basisklasse auf.`,
    },
    {
      id: 'raii-warum',
      title: 'Warum RAII unverzichtbar ist',
      ref: '04 · Why RAII is Essential',
      statement: r`- **Exception Safety:** Bei einer Exception macht C++ **Stack Unwinding** und zerstört alle bisher erzeugten lokalen Objekte. RAII-Objekte geben dabei ihre Ressourcen frei.
- **No More „Forgetfulness“:** Man muss nicht jedes @@return@@ absuchen, um sicher zu sein, dass etwas geschlossen wurde.
- **Locality:** Der Code zum Öffnen und Schließen steht in **derselben Klasse**, nicht über das Projekt verstreut.

RAII in der Standard Library: @@std::string@@ (verwaltet ein char-Array), @@std::vector@@ (dynamischer Speicher), @@std::unique_ptr@@ (ein einzelner Pointer).`,
    },
    {
      id: 'raii-muster',
      title: 'RAII-Muster: new im Konstruktor, delete im Destruktor',
      ref: '04 · RAII – The Solution / Tutorial 05b',
      statement: r`~~~
class SmartArray {
private:
    int* data;
public:
    SmartArray(int size) { data = new int[size]; }   // Acquisition
    ~SmartArray()        { delete[] data; }          // Release
};

void work() {
    SmartArray arr(100);
    if (problem) return;    // Destruktor läuft
    // ...
}                           // Destruktor läuft
~~~

Der „manuelle“ Ansatz davor – an jedem Ausgang selbst aufräumen – ist fehleranfällig, sobald eine Funktion mehrere Ausgänge hat.`,
    },
  ],
  claims: [
    {
      id: 'default-private',
      statement: r`Ohne Access Specifier sind die Member einer @@class@@ in C++ private.`,
      holds: true,
      reason: r`private ist der Default für class.`,
      ref: '04 · Defining Classes',
    },
    {
      id: 'ctor-void',
      statement: r`Ein Konstruktor hat den Rückgabetyp @@void@@.`,
      holds: false,
      reason: r`Ein Konstruktor hat **keinen** Rückgabetyp – auch nicht void.`,
      ref: '04 · Constructors and Destructors',
    },
    {
      id: 'dtor-stack',
      statement: r`Für ein Stack-Objekt wird der Destruktor automatisch aufgerufen, wenn es seinen Scope verlässt.`,
      holds: true,
      reason: r`An der schließenden Klammer des Blocks. Kein delete nötig (und keines erlaubt).`,
      ref: '03 · Constructors & Destructors',
    },
    {
      id: 'dtor-heap',
      statement: r`Für ein mit @@new@@ erzeugtes Objekt läuft der Destruktor automatisch am Ende der Funktion.`,
      holds: false,
      reason: r`Erst @@delete@@ löst den Destruktor aus. Ohne delete: kein Destruktor, Memory Leak.`,
      ref: '03 · Constructors & Destructors',
    },
    {
      id: 'pfeil',
      statement: r`Auf die Member eines Objekts hinter einem Pointer greift man mit @@->@@ zu.`,
      holds: true,
      reason: r`@@ptr->method()@@ für Pointer, @@obj.method()@@ für Objekte.`,
      ref: 'Tutorial 04 · Key Takeaways',
    },
    {
      id: 'this-static',
      statement: r`Der this-Pointer steht auch in statischen Member-Funktionen zur Verfügung.`,
      holds: false,
      reason: r`Nur in **nicht-statischen** Member-Funktionen – eine statische Funktion gehört zu keinem bestimmten Objekt.`,
      ref: '04 · The this Pointer',
    },
    {
      id: 'raii-exception',
      statement: r`Bei RAII wird die Ressource auch dann freigegeben, wenn die Funktion durch eine Exception verlassen wird.`,
      holds: true,
      reason: r`Beim Stack Unwinding werden alle lokalen Objekte zerstört; ihre Destruktoren geben die Ressourcen frei.`,
      ref: '04 · Why RAII is Essential',
    },
    {
      id: 'raii-nur-speicher',
      statement: r`RAII ist ausschließlich für Heap-Speicher gedacht.`,
      holds: false,
      reason: r`RAII gilt für jede Ressource: Speicher, File Handles, Sockets, Mutexe, Datenbankverbindungen.`,
      ref: '04 · RAII – Concept',
    },
    {
      id: 'setter-zweck',
      statement: r`Ein Setter kann ungültige Werte abweisen, die bei einem public-Attribut ungeprüft gesetzt würden.`,
      holds: true,
      reason: r`Der Mutator ändert den Wert nur, wenn er die Regeln erfüllt. @@car.year = -500;@@ wäre bei einem public-Attribut möglich.`,
      ref: '04 · Controlled Access',
    },
  ],
  problems: [
    {
      id: 'rectangle',
      title: 'Klasse Rectangle auf Stack und Heap',
      source: 'nach Tasks 03 · Part 4',
      points: 8,
      task: r`Entwirf eine Klasse @@Rectangle@@ mit den privaten Attributen width und height (double), einem public Konstruktor und der Methode @@double getArea()@@.

Erzeuge in main ein Rectangle auf dem Stack und eines auf dem Heap, rufe für beide getArea() auf und räume den Heap auf.`,
      solution: r`~~~
#include <iostream>

class Rectangle {
private:
    double width;
    double height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double getArea() { return width * height; }
};

int main() {
    Rectangle a(3.0, 4.0);                      // Stack
    std::cout << a.getArea() << std::endl;      // Zugriff mit .

    Rectangle* b = new Rectangle(2.0, 5.0);     // Heap
    std::cout << b->getArea() << std::endl;     // Zugriff mit ->
    delete b;                                   // manuell aufräumen

    return 0;
}   // a wird automatisch zerstört
~~~`,
    },
    {
      id: 'lifecycle-ausgabe',
      title: 'Ausgabe des Object Lifecycle',
      source: 'nach Tutorial 05a · Full Implementation',
      points: 8,
      task: r`Jeder Konstruktor gibt [Param] bzw. [Copy] mit dem Markennamen aus, der Destruktor [Destruct] mit dem Markennamen. Was erscheint in welcher Reihenfolge?

~~~
int main() {
    {
        Car myCar("Ford");
        Car* heapCar = new Car("Tesla");
        Car* clone = new Car(*heapCar);
        delete heapCar;
        delete clone;
        std::cout << "--- inner scope ends ---" << std::endl;
    }
    std::cout << "--- end ---" << std::endl;
    return 0;
}
~~~`,
      hint: r`Welches Objekt stirbt durch delete, welches an der schließenden Klammer?`,
      solution: r`~~~
[Param] Ford
[Param] Tesla
[Copy] Tesla
[Destruct] Tesla          (delete heapCar)
[Destruct] Tesla          (delete clone)
--- inner scope ends ---
[Destruct] Ford           (myCar verlässt den Scope)
--- end ---
~~~

Die Heap-Objekte sterben genau bei ihrem @@delete@@. Das Stack-Objekt myCar stirbt automatisch an der schließenden Klammer des inneren Blocks – also **nach** der Zeile „inner scope ends“ und **vor** „end“.`,
    },
    {
      id: 'file-wrapper',
      title: 'RAII statt manuellem Aufräumen',
      source: 'nach 04 · RAII – The Problem / The Solution',
      points: 7,
      task: r`Die Funktion hat ein Ressourcenproblem. Benenne es und skizziere eine RAII-Lösung.

~~~
void report(bool error) {
    int* buffer = new int[500];
    if (error) {
        return;
    }
    // ... arbeiten ...
    delete[] buffer;
}
~~~`,
      solution: r`Beim frühen @@return@@ (und ebenso bei einer Exception) wird @@delete[]@@ übersprungen: **Memory Leak**. Das ist der „manuelle“ Ansatz – fehleranfällig bei mehreren Ausgängen.

RAII: die Ressource in eine Klasse wickeln.

~~~
class Buffer {
private:
    int* data;
public:
    Buffer(int size) { data = new int[size]; }   // Acquisition
    ~Buffer()        { delete[] data; }          // Release
};

void report(bool error) {
    Buffer buffer(500);     // Stack-Objekt
    if (error) {
        return;             // Destruktor läuft
    }
    // ... arbeiten ...
}                           // Destruktor läuft
~~~

Der Destruktor läuft garantiert, egal wie die Funktion endet. In der Praxis nimmt man gleich @@std::vector<int>@@, das genau so gebaut ist.`,
    },
  ],
});
