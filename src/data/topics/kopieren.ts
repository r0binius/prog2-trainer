import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 04, copy semantics: shallow and deep copies, the copy constructor, copy assignment, the Rule of Three. */
export const kopieren = topic({
  id: 'kopieren',
  chapter: '04',
  title: 'Copy Semantics: Shallow Copy, Deep Copy, Rule of Three',
  summary:
    'Wann C++ Objekte kopiert, warum die Standardkopie bei rohen Pointern gefährlich ist, Copy Constructor und Copy Assignment Operator.',
  definitions: [
    {
      id: 'shallow',
      title: 'Shallow Copy',
      ref: '04 · Copy Semantics: Shallow Copy',
      statement: r`Eine **Shallow Copy** kopiert alle Member-Variablen **Bit für Bit** – bei Pointern also die **Adresse**, nicht den Speicher, auf den sie zeigen.

Sie ist das **Standardverhalten** von C++, wenn kein eigener Copy Constructor definiert ist.`,
      note: r`Folgen bei rohen Pointern: Zwei Objekte teilen denselben Speicher, eine Änderung wirkt auf beide, und beide Destruktoren wollen denselben Speicher freigeben.`,
    },
    {
      id: 'deep',
      title: 'Deep Copy',
      ref: '04 · Copy Semantics: Deep Copy',
      statement: r`Eine **Deep Copy**

- fordert **neuen Speicher** an,
- kopiert die **eigentlichen Daten** hinein,
- sodass **jedes Objekt seine eigene Ressource besitzt**.

Eigenschaften: sicher, unabhängige Objekte, kein geteilter Speicher, kein doppeltes Löschen.`,
    },
    {
      id: 'double-free',
      title: 'Double Free (Double Deletion)',
      ref: '04 · Copy Semantics: Shallow Copy',
      statement: r`Ein **Double Free** entsteht, wenn derselbe Heap-Speicher **zweimal** mit @@delete@@ freigegeben wird. Das ist **Undefined Behavior** und führt typischerweise zum Absturz.

Beispiel der Folien: @@myCar.serialNumber@@ zeigt auf 0xAAA; die Shallow Copy @@borrowedCar@@ ebenfalls. Der Destruktor von borrowedCar löscht 0xAAA (gelingt), der von myCar versucht es **noch einmal** – Crash.`,
    },
    {
      id: 'copy-ctor',
      title: 'Copy Constructor',
      ref: '04 · The Solution: Deep Copy / Tutorial 05b',
      statement: r`Der **Copy Constructor** erzeugt ein **neues** Objekt als Kopie eines bestehenden. Er nimmt eine **const-Referenz** auf das Original:

~~~
Car(const Car& other) {
    model = other.model;
    year = other.year;
    serialNumber = new int(*other.serialNumber);   // Deep Copy
}
~~~`,
      note: r`@@new int(*other.serialNumber)@@ fordert eine frische Adresse an und kopiert den **Wert** – nicht die Pointer-Adresse.`,
    },
    {
      id: 'copy-assignment',
      title: 'Copy Assignment Operator',
      ref: '04 · The Rule of Three / Tutorial 05b',
      statement: r`Der **Copy Assignment Operator** behandelt @@carA = carB@@ für Objekte, die **bereits existieren**.

~~~
Car& operator=(const Car& other) {
    if (this == &other) return *this;   // Self-Assignment Guard
    delete serialNumber;                // alte Ressource freigeben
    model = other.model;
    year = other.year;
    serialNumber = new int(*other.serialNumber);   // Deep Copy
    return *this;
}
~~~`,
      note: r`Zwei Unterschiede zum Copy Constructor: Das Zielobjekt hat schon eine Ressource (erst freigeben, sonst Leak), und es könnte dasselbe Objekt sein (Self-Assignment Check, sonst löscht man den eigenen Speicher vor dem Kopieren).`,
    },
    {
      id: 'rule-of-three',
      title: 'Rule of Three',
      ref: '04 · The Rule of Three',
      statement: r`Verwaltet eine Klasse ihren Speicher selbst (mit @@new@@), **muss** sie alle drei bereitstellen:

- **Copy Constructor** – baut einen Zwilling.
- **Copy Assignment Operator** – ersetzt ein bestehendes Objekt durch einen Zwilling.
- **Destructor** – räumt den Speicher auf.`,
      note: r`Faustregel: Wer eines der drei schreiben muss, braucht fast immer alle drei.`,
    },
  ],
  theorems: [
    {
      id: 'wann-kopiert',
      title: 'Wann C++ ein Objekt kopiert',
      ref: '04 · Why Copying Matters in C++',
      statement: r`C++ ist eine **wertorientierte** Sprache. Ein Objekt wird kopiert beim

- **Übergeben by value** an eine Funktion,
- **Zurückgeben by value** aus einer Funktion,
- **Zuweisen** eines Objekts an ein anderes,
- **Initialisieren** eines Objekts aus einem anderen.

Enthält die Klasse **rohe Pointer** oder verwaltet sie Ressourcen von Hand, ist das Kopieren gefährlich – außer man definiert selbst, wie kopiert wird.`,
    },
    {
      id: 'init-vs-zuweisung',
      title: 'Initialisierung oder Zuweisung?',
      ref: 'Tutorial 05b · Full Implementation Example',
      statement: r`~~~
Car twinCar = myCar;    // INITIALIZATION -> Copy Constructor
Car other(myCar);       // ebenfalls Copy Constructor

Car workTruck("Chevy", 2015, 445566);
workTruck = myCar;      // ASSIGNMENT -> Copy Assignment Operator
~~~

Entscheidend ist nicht das Zeichen @@=@@, sondern ob das linke Objekt **gerade erst entsteht** (Copy Constructor) oder **schon existiert** (Copy Assignment Operator).`,
    },
    {
      id: 'shallow-ablauf',
      title: 'Was bei der Shallow Copy schiefgeht',
      ref: '04 · Copy Semantics: Shallow Copy',
      statement: r`Klasse mit @@int* serialNumber@@, Destruktor mit @@delete serialNumber@@, **kein** eigener Copy Constructor:

~~~
Car myCar(...);              // myCar.serialNumber -> 0xAAA
Car borrowedCar = myCar;     // borrowedCar.serialNumber -> 0xAAA
~~~

1. Beide Objekte teilen den Speicher 0xAAA; eine Änderung über das eine ist im anderen sichtbar.
2. borrowedCar wird zerstört: @@delete 0xAAA@@ gelingt.
3. myCar wird zerstört: @@delete 0xAAA@@ **noch einmal** – Double Free, Undefined Behavior.`,
    },
    {
      id: 'checkliste',
      title: 'Checkliste für eine Klasse mit Heap-Ressource',
      ref: '04 · Summary Checklist – Car Class Example',
      statement: r`- **Encapsulation:** Sind die Attribute private?
- **RAII:** Gibt der Destruktor frei, was der Konstruktor mit new angefordert hat?
- **Deep Copy:** Fordert der Copy Constructor frischen Speicher an?
- **Assignment:** Behandelt @@operator=@@ die alte Ressource, damit bei der Neuzuweisung kein Leak entsteht?`,
    },
  ],
  claims: [
    {
      id: 'default-shallow',
      statement: r`Ohne eigenen Copy Constructor kopiert C++ ein Objekt memberweise, bei Pointern also nur die Adresse.`,
      holds: true,
      reason: r`Das ist die Shallow Copy, das Standardverhalten.`,
      ref: '04 · Copy Semantics: Shallow Copy',
    },
    {
      id: 'shallow-unabhaengig',
      statement: r`Nach einer Shallow Copy besitzen beide Objekte unabhängige Kopien der Heap-Daten.`,
      holds: false,
      reason: r`Sie teilen denselben Speicher. Unabhängig sind sie erst nach einer Deep Copy.`,
      ref: '04 · Copy Semantics',
    },
    {
      id: 'twin-init',
      statement: r`@@Car twinCar = myCar;@@ ruft den Copy Assignment Operator auf.`,
      holds: false,
      reason: r`twinCar entsteht in dieser Zeile erst – das ist Initialisierung, also der **Copy Constructor**, trotz des Gleichheitszeichens.`,
      ref: 'Tutorial 05b',
    },
    {
      id: 'self-assignment',
      statement: r`Ohne Self-Assignment Check kann @@a = a;@@ in einem Copy Assignment Operator, der erst löscht und dann kopiert, die eigenen Daten zerstören.`,
      holds: true,
      reason: r`Das Objekt gibt seinen Speicher frei und versucht danach, aus genau diesem freigegebenen Speicher zu kopieren. Deshalb @@if (this == &other) return *this;@@.`,
      ref: 'Tutorial 05b · Copy Assignment Operator',
    },
    {
      id: 'assignment-delete',
      statement: r`Im Copy Assignment Operator muss die alte Ressource des Zielobjekts freigegeben werden, sonst entsteht ein Memory Leak.`,
      holds: true,
      reason: r`Das Zielobjekt existiert bereits und hält Speicher. Überschreibt man nur den Pointer, ist der alte Speicher nicht mehr erreichbar.`,
      ref: 'Tutorial 05b · Copy Assignment Operator',
    },
    {
      id: 'rule-of-three-inhalt',
      statement: r`Die Rule of Three umfasst Default Constructor, Copy Constructor und Destructor.`,
      holds: false,
      reason: r`Es sind Copy Constructor, **Copy Assignment Operator** und Destructor.`,
      ref: '04 · The Rule of Three',
    },
    {
      id: 'by-value-kopie',
      statement: r`Übergibt man ein Objekt by value an eine Funktion, wird der Copy Constructor aufgerufen.`,
      holds: true,
      reason: r`Der Parameter ist ein neues Objekt, das aus dem Argument initialisiert wird. Am Funktionsende läuft für die Kopie der Destruktor – bei einer Shallow Copy mit Heap-Ressource der erste Schritt zum Double Free.`,
      ref: '04 · Why Copying Matters in C++',
    },
    {
      id: 'string-member',
      statement: r`Eine Klasse, die nur @@std::string@@- und @@int@@-Member hat, braucht einen selbst geschriebenen Copy Constructor.`,
      holds: false,
      reason: r`@@std::string@@ verwaltet seinen Speicher selbst (RAII) und kopiert sich korrekt. Die Rule of Three betrifft Klassen, die selbst mit new/delete arbeiten.`,
      ref: '04 · Real-World RAII in C++',
    },
  ],
  problems: [
    {
      id: 'shallow-diagnose',
      title: 'Den Absturz erklären',
      source: 'nach 04 · Copy Semantics: Shallow Copy',
      points: 8,
      task: r`Das Programm stürzt am Ende ab. Erkläre Schritt für Schritt, warum, und was die Ausgabe vor dem Absturz ist.

~~~
class Car {
public:
    int* serialNumber;
    Car(int s) { serialNumber = new int(s); }
    ~Car() { delete serialNumber; }
};

int main() {
    Car myCar(111);
    Car borrowedCar = myCar;
    *borrowedCar.serialNumber = 999;
    std::cout << *myCar.serialNumber << std::endl;
    return 0;
}
~~~`,
      solution: r`1. @@myCar@@ fordert im Konstruktor einen int im Heap an (sagen wir 0xAAA, Wert 111).
2. @@Car borrowedCar = myCar;@@ – es gibt keinen eigenen Copy Constructor, also **Shallow Copy**: Auch borrowedCar.serialNumber ist 0xAAA.
3. Die Zuweisung über borrowedCar ändert den **gemeinsamen** Speicher. Ausgabe: **999**.
4. Am Ende von main werden die Objekte in umgekehrter Reihenfolge zerstört: borrowedCar löscht 0xAAA (gelingt), myCar löscht 0xAAA **noch einmal** – **Double Free**, Undefined Behavior, typischerweise ein Crash.

Abhilfe: Rule of Three – Copy Constructor und Copy Assignment Operator mit Deep Copy ergänzen.`,
    },
    {
      id: 'rule-of-three-schreiben',
      title: 'Rule of Three implementieren',
      source: 'nach Tutorial 05b · The Rule of Three',
      points: 10,
      task: r`Ergänze die Klasse um Destruktor, Copy Constructor und Copy Assignment Operator, sodass sie speichersicher ist.

~~~
class Car {
private:
    std::string model;
    int* serialNumber;
public:
    Car(std::string m, int s) : model(m) {
        serialNumber = new int(s);
    }
};
~~~`,
      hint: r`Der Assignment Operator hat vier Schritte: Selbstzuweisung prüfen, alte Ressource löschen, tief kopieren, *this zurückgeben.`,
      solution: r`~~~
class Car {
private:
    std::string model;
    int* serialNumber;
public:
    Car(std::string m, int s) : model(m) {
        serialNumber = new int(s);
    }

    // Destructor
    ~Car() {
        delete serialNumber;
    }

    // Copy Constructor
    Car(const Car& other) {
        model = other.model;
        serialNumber = new int(*other.serialNumber);
    }

    // Copy Assignment Operator
    Car& operator=(const Car& other) {
        if (this == &other) return *this;
        delete serialNumber;
        model = other.model;
        serialNumber = new int(*other.serialNumber);
        return *this;
    }
};
~~~

Jedes Car besitzt jetzt seinen eigenen int im Heap; jeder Destruktor gibt genau seinen eigenen Speicher frei.`,
    },
    {
      id: 'welche-funktion',
      title: 'Welche Funktion läuft?',
      source: 'nach Tutorial 05b · Full Implementation Example',
      points: 6,
      task: r`Gib für jede nummerierte Zeile an, welche spezielle Member-Funktion von Car aufgerufen wird.

~~~
Car a("Toyota", 1);       // (1)
Car b = a;                // (2)
Car c("Chevy", 2);        // (3)
c = a;                    // (4)
{
    Car d("Ford", 3);     // (5)
}                         // (6)
~~~`,
      solution: r`1. Parameterized Constructor
2. **Copy Constructor** – b entsteht gerade (Initialisierung).
3. Parameterized Constructor
4. **Copy Assignment Operator** – c existiert bereits.
5. Parameterized Constructor
6. **Destructor** von d – Ende des Scopes (RAII).

Am Ende des umgebenden Blocks laufen noch die Destruktoren von c, b und a, in umgekehrter Reihenfolge ihrer Erzeugung.`,
    },
  ],
});
