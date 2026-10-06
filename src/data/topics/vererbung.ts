import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 04, inheritance in C++: is-a, protected, construction order, kinds of inheritance, overriding. */
export const vererbung = topic({
  id: 'vererbung',
  chapter: '04',
  title: 'Vererbung in C++',
  summary:
    'Is-A-Beziehung, Base und Derived Class, protected, Reihenfolge von Konstruktoren und Destruktoren, Arten der Vererbung, Overriding.',
  definitions: [
    {
      id: 'inheritance',
      title: 'Inheritance (Is-A)',
      ref: '04 · What is Inheritance?',
      statement: r`**Inheritance:** eine neue Klasse auf Grundlage einer bestehenden erzeugen.

- **Base Class (Parent):** die allgemeine Klasse, etwa @@Vehicle@@.
- **Derived Class (Child):** die spezielle Klasse, etwa @@Car@@, @@Truck@@.

Syntax: @@class Car : public Vehicle { ... };@@

**Ziel:** Don't repeat yourself (DRY). Haben alle Fahrzeuge brand und fuelLevel, stehen sie **einmal** in der Basisklasse.`,
    },
    {
      id: 'is-a-regel',
      title: 'Die Is-A-Regel',
      ref: '04 · What is Inheritance?',
      statement: r`Vererbung nur verwenden, wenn man sagen kann: „Ein [Child] **ist ein** [Parent].“

- Richtig: A Car **is a** Vehicle.
- Falsch: A Car is a Steering Wheel – das ist **Composition** (Has-A), keine Vererbung.`,
    },
    {
      id: 'protected',
      title: 'protected',
      ref: '04 · Syntax and Access Specifiers',
      statement: r`- **private:** vor allen verborgen – **auch vor der Child-Klasse**.
- **public:** für alle sichtbar.
- **protected:** vor der Außenwelt verborgen, aber für die **Child-Klasse zugreifbar**.

@@protected@@ nimmt man für Daten, die die Kindklassen benutzen sollen, die aber vor @@main()@@ verborgen bleiben.`,
    },
    {
      id: 'overriding',
      title: 'Method Overriding (Specialization)',
      ref: '04 · Overriding Methods',
      statement: r`Beim **Overriding** stellt die Child-Klasse eine **neue Version** einer Funktion bereit, die es in der Parent-Klasse schon gibt.

Beispiel: @@Car::drive()@@ gibt „The car is burning fuel.“ aus, @@ElectricCar::drive()@@ gibt „The car is humming silently.“ aus.`,
      note: r`Die Parent-Version bleibt erreichbar: @@Car::drive();@@ innerhalb von @@ElectricCar::drive()@@ führt erst das Verhalten des Parents aus, danach das eigene.`,
    },
    {
      id: 'diamond',
      title: 'Diamond Problem',
      ref: '04 · Types of Inheritance',
      statement: r`Das **Diamond Problem** tritt bei **Multiple Inheritance** auf: Ein Kind erbt **dieselbe Basisklasse zweimal** über zwei verschiedene Eltern.

Beispiel: @@FlyingCar@@ erbt von @@Car@@ **und** @@Airplane@@; beide erben von @@Vehicle@@. FlyingCar enthält Vehicle dann doppelt – welches brand ist gemeint?`,
    },
    {
      id: 'virtueller-destruktor',
      title: 'Virtual Destructor',
      ref: 'Tutorial 06a / 06b',
      statement: r`Eine Basisklasse, von der geerbt wird, bekommt einen **virtuellen Destruktor**: @@virtual ~Car() { ... }@@

Er stellt sicher, dass bei @@delete@@ über einen **Base-Pointer** zuerst der Destruktor des Kindes und danach der des Parents läuft.`,
      note: r`Ohne @@virtual@@ liefe bei @@Vehicle* v = new ElectricCar(...); delete v;@@ nur der Vehicle-Destruktor – der Child-Teil würde nicht aufgeräumt.`,
    },
  ],
  theorems: [
    {
      id: 'reihenfolge',
      title: 'Reihenfolge: Konstruktoren und Destruktoren',
      ref: '04 · Constructor/Destructor Order',
      statement: r`**Die Regel:** Der Parent muss existieren, bevor das Kind geboren werden kann.

**Construction (Top → Bottom):**
1. Konstruktor der Base Class
2. Konstruktor der Derived Class

**Destruction (Bottom → Top, umgekehrt):**
1. Destruktor der Derived Class
2. Destruktor der Base Class`,
      note: r`Bei Multilevel (Vehicle → Car → ElectricCar) entsprechend: Konstruktion Vehicle, Car, ElectricCar; Zerstörung ElectricCar, Car, Vehicle.`,
    },
    {
      id: 'ctor-chaining',
      title: 'Argumente an den Parent-Konstruktor weitergeben',
      ref: '04 · Constructor/Destructor Order – Passing Arguments',
      statement: r`Das Kind gibt Daten über die **Initializer List** an den Konstruktor des Parents weiter (Constructor Chaining):

~~~
class ElectricCar : public Car {
private:
    int batteryLevel;
public:
    ElectricCar(std::string b, std::string m, int y, int battery)
        : Car(b, m, y), batteryLevel(battery) {
        // Car ist hier bereits fertig gebaut
    }
};
~~~`,
    },
    {
      id: 'arten',
      title: 'Arten der Vererbung in C++',
      ref: '04 · Types of Inheritance',
      statement: r`- **Single:** ein Parent → ein Child.
- **Multilevel:** Grandparent → Parent → Child, etwa Vehicle → Car → ElectricCar.
- **Multiple:** zwei Parents → ein Child, etwa FlyingCar erbt von Car **und** Airplane. Achtung: Diamond Problem.
- **Hierarchical:** ein Parent → mehrere Children, etwa Vehicle → Car, Bus, Bike.`,
      note: r`C++ erlaubt Multiple Inheritance von Klassen; Java nicht (dort nur über Interfaces).`,
    },
    {
      id: 'zugriff-tabelle',
      title: 'Wer darf worauf zugreifen?',
      ref: '04 · Syntax and Access Specifiers',
      statement: r`~~~
Member ist ...   Klasse selbst   Child-Klasse   von außen (main)
private          ja              nein           nein
protected        ja              ja             nein
public           ja              ja             ja
~~~`,
    },
  ],
  claims: [
    {
      id: 'private-kind',
      statement: r`Eine abgeleitete Klasse kann direkt auf die private-Member ihrer Basisklasse zugreifen.`,
      holds: false,
      reason: r`private ist auch vor dem Kind verborgen. Dafür gibt es protected (oder public Getter).`,
      ref: '04 · Syntax and Access Specifiers',
    },
    {
      id: 'protected-main',
      statement: r`Auf ein protected-Member kann man aus @@main()@@ über ein Objekt zugreifen.`,
      holds: false,
      reason: r`protected ist vor der Außenwelt verborgen; nur die Klasse und ihre Kinder kommen heran.`,
      ref: '04 · Syntax and Access Specifiers',
    },
    {
      id: 'base-zuerst',
      statement: r`Beim Erzeugen eines ElectricCar läuft der Konstruktor von Car vor dem von ElectricCar.`,
      holds: true,
      reason: r`Konstruktoren laufen Top → Bottom: erst der Parent, dann das Kind.`,
      ref: '04 · Constructor/Destructor Order',
    },
    {
      id: 'dtor-reihenfolge',
      statement: r`Beim Zerstören eines abgeleiteten Objekts läuft der Destruktor der Basisklasse zuerst.`,
      holds: false,
      reason: r`Destruktoren laufen Bottom → Top: erst das Kind, zuletzt der Parent.`,
      ref: '04 · Constructor/Destructor Order',
    },
    {
      id: 'lenkrad',
      statement: r`„Ein Auto hat ein Lenkrad“ modelliert man durch Vererbung von SteeringWheel.`,
      holds: false,
      reason: r`Das ist eine Has-A-Beziehung, also Composition. Vererbung nur bei Is-A.`,
      ref: '04 · What is Inheritance?',
    },
    {
      id: 'multiple-cpp',
      statement: r`C++ erlaubt, dass eine Klasse von zwei Klassen gleichzeitig erbt.`,
      holds: true,
      reason: r`Multiple Inheritance, etwa FlyingCar von Car und Airplane – mit dem Risiko des Diamond Problems.`,
      ref: '04 · Types of Inheritance',
    },
    {
      id: 'multilevel',
      statement: r`Vehicle → Car → ElectricCar ist ein Beispiel für Multiple Inheritance.`,
      holds: false,
      reason: r`Das ist **Multilevel** Inheritance (eine Kette). Multiple heißt: zwei Parents für ein Kind.`,
      ref: '04 · Types of Inheritance',
    },
    {
      id: 'parent-aufruf',
      statement: r`In einer überschreibenden Methode kann man die Version der Basisklasse mit @@Car::drive();@@ aufrufen.`,
      holds: true,
      reason: r`Mit dem Scope Resolution Operator wählt man ausdrücklich die Parent-Version.`,
      ref: '04 · Overriding Methods',
    },
  ],
  problems: [
    {
      id: 'reihenfolge-ausgabe',
      title: 'Ausgabe von Konstruktoren und Destruktoren',
      source: 'nach Tutorial 06a · Full Implementation',
      points: 8,
      task: r`Car gibt im Konstruktor „[Base Ctor]“ und im (virtuellen) Destruktor „[Base Dtor]“ aus; ElectricCar entsprechend „[Child Ctor]“ und „[Child Dtor]“. Was gibt das Programm aus?

~~~
int main() {
    ElectricCar myTesla("Tesla", "Model 3", 2024, 85);
    ElectricCar* leaf = new ElectricCar("Nissan", "Leaf", 2023, 40);
    std::cout << "--- usage ---" << std::endl;
    delete leaf;
    std::cout << "--- end of main ---" << std::endl;
    return 0;
}
~~~`,
      solution: r`~~~
[Base Ctor]              myTesla: erst Parent ...
[Child Ctor]             ... dann Child
[Base Ctor]              leaf
[Child Ctor]
--- usage ---
[Child Dtor]             delete leaf: erst Child ...
[Base Dtor]              ... dann Parent
--- end of main ---
[Child Dtor]             myTesla verlässt den Scope
[Base Dtor]
~~~

Konstruktoren Top → Bottom, Destruktoren Bottom → Top. Das Heap-Objekt stirbt bei delete, das Stack-Objekt am Ende von main.`,
    },
    {
      id: 'electric-car',
      title: 'Abgeleitete Klasse schreiben',
      source: 'nach Tutorial 06a',
      points: 9,
      task: r`Gegeben ist die Basisklasse. Schreibe @@ElectricCar@@ mit dem zusätzlichen Attribut batteryLevel, einem passenden Konstruktor, einer überschriebenen Methode drive() und einer Methode charge().

~~~
class Car {
protected:
    std::string brand;
    int year;
public:
    Car(std::string b, int y) : brand(b), year(y) {}
    virtual ~Car() {}
    void drive() { std::cout << brand << " is moving." << std::endl; }
};
~~~

Warum sind brand und year protected und nicht private?`,
      solution: r`~~~
class ElectricCar : public Car {
private:
    int batteryLevel;
public:
    ElectricCar(std::string b, int y, int battery)
        : Car(b, y), batteryLevel(battery) {}

    void drive() {
        std::cout << brand << " is gliding silently." << std::endl;
    }

    void charge() {
        batteryLevel = 100;
    }
};
~~~

- @@: public Car@@ stellt die Is-A-Beziehung her.
- Der Konstruktor reicht b und y über die Initializer List an @@Car(b, y)@@ weiter; der Parent wird zuerst gebaut.
- @@drive()@@ überschreibt die Version des Parents.

**protected:** ElectricCar::drive() benutzt @@brand@@ direkt. Wäre brand private, käme auch das Kind nicht heran. Vor main() bleibt es trotzdem verborgen.`,
    },
    {
      id: 'modellieren',
      title: 'Is-A oder Has-A?',
      source: 'nach 04 · What is Inheritance? / Types of Inheritance',
      points: 5,
      task: r`Entscheide jeweils: Vererbung oder Composition? Benenne bei Vererbung die Art.

1. Truck und Vehicle
2. Car und Engine
3. Vehicle → Car → ElectricCar
4. FlyingCar, Car und Airplane
5. Vehicle mit Car, Bus und Bike`,
      solution: r`1. **Vererbung (Single):** A Truck is a Vehicle.
2. **Composition:** A Car **has an** Engine – kein Is-A.
3. **Vererbung (Multilevel):** eine Kette über drei Ebenen.
4. **Vererbung (Multiple):** zwei Parents; Vorsicht Diamond Problem, falls Car und Airplane beide von Vehicle erben.
5. **Vererbung (Hierarchical):** ein Parent, mehrere Children.`,
    },
  ],
});
