import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 04, polymorphism in C++: static and dynamic binding, virtual functions, abstract classes, the V-Table. */
export const polymorphie = topic({
  id: 'polymorphie',
  chapter: '04',
  title: 'Polymorphie in C++',
  summary:
    'Static und Dynamic Polymorphism, virtual und override, Pure Virtual Functions, abstrakte Klassen, V-Table und V-Pointer.',
  definitions: [
    {
      id: 'polymorphism',
      title: 'Polymorphism',
      ref: '04 · What is Polymorphism? (Many Forms)',
      statement: r`**Polymorphism** (griechisch poly = viele, morph = Form): die Fähigkeit, Objekte **verschiedener Klassen** über **dasselbe Interface** als Instanzen derselben Basisklasse zu behandeln.

Grundlage in C++: Ein **Base-Class-Pointer** kann auf ein **Derived-Class-Objekt** zeigen.`,
    },
    {
      id: 'static-binding',
      title: 'Static Binding und Dynamic Binding',
      ref: '04 · What is Polymorphism? / Virtual Functions',
      statement: r`**Static Binding** (Standard in C++): Welche Funktion aufgerufen wird, entscheidet der Compiler anhand des **Pointer-Typs**. @@myVehicle->drive()@@ ruft ohne @@virtual@@ die Version der Basisklasse auf – auch wenn das Objekt ein ElectricCar ist.

**Dynamic Binding:** Ist die Funktion @@virtual@@, schaut C++ nicht mehr auf den Pointer-Typ, sondern zur **Laufzeit** auf den **tatsächlichen Objekttyp**.`,
    },
    {
      id: 'virtual',
      title: 'Virtual Function',
      ref: '04 · C++ Virtual Function',
      statement: r`Eine **Virtual Function** ist eine Member-Funktion, die in der **Basisklasse** mit dem Schlüsselwort @@virtual@@ deklariert und in der abgeleiteten Klasse neu definiert (überschrieben) wird.

Virtual Functions ermöglichen **Runtime Polymorphism**: Über einen Pointer oder eine Referenz der Basisklasse wird die richtige Funktion aufgerufen.`,
    },
    {
      id: 'override',
      title: 'override (C++11)',
      ref: '04 · Dynamic Polymorphism – Virtual Functions',
      statement: r`@@override@@ steht in der **Child-Klasse** und sagt dem Compiler: „Ich ersetze absichtlich die virtuelle Funktion des Parents.“

~~~
void startEngine() override { ... }
~~~

Es ist eine Sicherheitsprüfung: Gibt es in der Basisklasse keine passende virtuelle Funktion (Tippfehler, andere Signatur), meldet der Compiler einen **Fehler**.`,
    },
    {
      id: 'abstrakt',
      title: 'Pure Virtual Function und Abstract Class',
      ref: '04 · Abstract Class',
      statement: r`Eine **Pure Virtual Function** hat keine Implementierung: @@virtual double calculatePay() = 0;@@

Eine Klasse ist **abstrakt**, sobald sie **mindestens eine** Pure Virtual Function enthält. Dann gilt:

- **No Instantiation:** Man kann kein Objekt der Klasse erzeugen. @@Shape s;@@ ist ein Compilerfehler.
- **Mandatory Overriding:** Jede Kindklasse muss die Funktion implementieren – sonst ist sie **selbst abstrakt**.`,
    },
    {
      id: 'vtable',
      title: 'V-Table und V-Pointer',
      ref: '04 · How C++ actually does it "under the hood"',
      statement: r`- **V-Table (Virtual Method Table):** Für jede Klasse mit virtuellen Funktionen legt C++ eine versteckte **Tabelle von Funktionspointern** an.
- **V-Pointer (vptr):** Jedes Objekt einer solchen Klasse enthält einen versteckten Pointer auf die V-Table **seiner** Klasse.`,
      note: r`Kosten: ein wenig Speicher pro Objekt (der vptr) und eine Pointer-Dereferenzierung pro Aufruf – für die Flexibilität lohnt es sich.`,
    },
    {
      id: 'operator-overloading',
      title: 'Operator Overloading',
      ref: '04 · Polymorphism (Many Forms)',
      statement: r`**Operator Overloading** bringt C++ bei, einen Operator auf eigene Objekte anzuwenden – etwa @@ObjA + ObjB@@ für zwei Car-Objekte.

Es ist eine Form von **Compile-time (Static) Polymorphism**, genau wie Function Overloading.`,
    },
  ],
  theorems: [
    {
      id: 'zwei-arten',
      title: 'Die zwei Arten von Polymorphie',
      ref: '04 · Polymorphism (Many Forms)',
      statement: r`**1. Compile-time (Static)**
- **Function Overloading:** gleicher Name, verschiedene Parameter.
- **Operator Overloading**
- Templates

**2. Runtime (Dynamic)**
- **Virtual Functions:** das Schlüsselwort virtual und die V-Table.
- **Function Overriding:** eine Methode der Basisklasse im Kind neu definieren.`,
    },
    {
      id: 'vergleich',
      title: 'Static vs. Dynamic Polymorphism',
      ref: '04 · Polymorphism – Short Summary',
      statement: r`~~~
Merkmal        Static (Compile-time)            Dynamic (Runtime)
Mechanismus    Function/Operator Overloading,   Virtual Functions
               Templates                        (Method Overriding)
Aufgelöst      beim Kompilieren                 bei der Ausführung
Keyword        keines (Signaturen)              virtual in der Basisklasse
Unter der      Name Mangling (der Compiler      V-Table- und
Haube          benennt Funktionen um)           V-Pointer-Lookup
Performance    schneller, kein Overhead         etwas langsamer
Flexibilität   Typen müssen beim Bauen          unbekannte abgeleitete Typen
               bekannt sein                     über Base-Pointer
~~~`,
    },
    {
      id: 'vtable-ablauf',
      title: 'Ablauf eines virtuellen Aufrufs',
      ref: '04 · The Process (Car Example)',
      statement: r`Für @@Car* ptr = new ElectricCar(...); ptr->drive();@@ mit virtuellem drive():

1. Der Code ruft @@ptr->drive()@@ auf.
2. Das Programm schaut auf den **vptr** des Objekts.
3. Der vptr führt zur **V-Table von ElectricCar**.
4. Das Programm führt den Code von @@ElectricCar::drive()@@ aus.`,
    },
    {
      id: 'wann-was',
      title: 'Wann welche Polymorphie?',
      ref: '04 · Checklist',
      statement: r`- **Static Polymorphism**, wenn hohe Performance gefragt ist und die Varianten einer Funktion schon zur Entwurfszeit bekannt sind.
- **Dynamic Polymorphism**, wenn Vererbung im Spiel ist und ein **Base-Class-Pointer** spezifisches Verhalten einer abgeleiteten Klasse auslösen soll.`,
    },
    {
      id: 'muster',
      title: 'Das Muster: Vector von Base-Pointern',
      ref: 'Tutorial 06b · Full Implementation Walkthrough',
      statement: r`~~~
std::vector<Vehicle*> fleet;
fleet.push_back(new Vehicle("Ford", 2010));
fleet.push_back(new ElectricCar("Tesla", "Model X", 2023));   // Upcasting

for (Vehicle* v : fleet) {
    v->startEngine();     // Dynamic Binding über den vptr
}

for (Vehicle* v : fleet) {
    delete v;             // braucht virtual ~Vehicle()
}
~~~

Die Schleife muss den genauen Typ nicht kennen. Voraussetzungen: @@startEngine()@@ ist virtual, der Destruktor der Basisklasse ebenfalls.`,
    },
  ],
  claims: [
    {
      id: 'ohne-virtual',
      statement: r`Ohne @@virtual@@ entscheidet der Typ des Pointers, welche Version einer überschriebenen Methode aufgerufen wird.`,
      holds: true,
      reason: r`Das ist Static Binding, der Standard in C++.`,
      ref: '04 · What is Polymorphism?',
    },
    {
      id: 'virtual-wo',
      statement: r`Das Schlüsselwort @@virtual@@ gehört an die Funktion in der abgeleiteten Klasse; in der Basisklasse ist es überflüssig.`,
      holds: false,
      reason: r`Umgekehrt: virtual steht in der **Basisklasse**. In der Child-Klasse verwendet man @@override@@.`,
      ref: '04 · Virtual Functions',
    },
    {
      id: 'abstrakt-objekt',
      statement: r`Von einer Klasse mit einer Pure Virtual Function kann man kein Objekt erzeugen.`,
      holds: true,
      reason: r`Sie ist abstrakt. Pointer und Referenzen auf sie sind aber erlaubt – darauf beruht die Polymorphie.`,
      ref: '04 · Abstract Class',
    },
    {
      id: 'kind-abstrakt',
      statement: r`Eine Kindklasse, die eine geerbte Pure Virtual Function nicht implementiert, ist selbst abstrakt.`,
      holds: true,
      reason: r`Mandatory Overriding: Wer nicht implementiert, bleibt abstrakt und kann nicht instanziiert werden.`,
      ref: '04 · Abstract Class',
    },
    {
      id: 'overloading-runtime',
      statement: r`Function Overloading wird zur Laufzeit über die V-Table aufgelöst.`,
      holds: false,
      reason: r`Overloading ist Static Polymorphism: Der Compiler wählt anhand der Signatur (Name Mangling). Die V-Table gehört zu virtuellen Funktionen.`,
      ref: '04 · Polymorphism – Short Summary',
    },
    {
      id: 'vptr-objekt',
      statement: r`Jedes Objekt einer Klasse mit virtuellen Funktionen enthält einen versteckten Pointer auf die V-Table seiner Klasse.`,
      holds: true,
      reason: r`Das ist der vptr. Die V-Table gibt es einmal pro Klasse, den vptr einmal pro Objekt.`,
      ref: '04 · V-Table / V-Pointer',
    },
    {
      id: 'override-pflicht',
      statement: r`Ohne das Schlüsselwort @@override@@ wird eine virtuelle Funktion nicht überschrieben.`,
      holds: false,
      reason: r`Überschrieben wird auch ohne. @@override@@ ist eine Sicherheitsprüfung, die Tippfehler und falsche Signaturen zur Compile-Zeit aufdeckt.`,
      ref: '04 · Virtual Functions',
    },
    {
      id: 'dynamic-kosten',
      statement: r`Dynamic Polymorphism ist geringfügig langsamer als Static Polymorphism.`,
      holds: true,
      reason: r`Zur Laufzeit ist eine Pointer-Dereferenzierung über vptr und V-Table nötig; Static Polymorphism hat keinen Laufzeit-Overhead.`,
      ref: '04 · Polymorphism – Short Summary',
    },
    {
      id: 'base-pointer',
      statement: r`Ein Pointer vom Typ @@Vehicle*@@ darf auf ein ElectricCar-Objekt zeigen, wenn ElectricCar von Vehicle erbt.`,
      holds: true,
      reason: r`Das ist Upcasting – die Grundlage der Polymorphie in C++.`,
      ref: '04 · The Power of the Base Pointer',
    },
  ],
  problems: [
    {
      id: 'binding-ausgabe',
      title: 'Static oder Dynamic Binding?',
      source: 'nach 04 · What is Polymorphism? / Tutorial 06b',
      points: 8,
      task: r`Was gibt das Programm aus? Was ändert sich, wenn man @@virtual@@ vor @@void honk()@@ in Vehicle ergänzt?

~~~
class Vehicle {
public:
    virtual void start() { std::cout << "Vehicle start" << std::endl; }
    void honk()          { std::cout << "Vehicle honk" << std::endl; }
    virtual ~Vehicle() {}
};

class ElectricCar : public Vehicle {
public:
    void start() override { std::cout << "Electric start" << std::endl; }
    void honk()           { std::cout << "Electric honk" << std::endl; }
};

int main() {
    Vehicle* v = new ElectricCar();
    v->start();
    v->honk();
    delete v;
    return 0;
}
~~~`,
      solution: r`~~~
Electric start
Vehicle honk
~~~

- @@start()@@ ist virtual: **Dynamic Binding**. Über den vptr des Objekts wird die V-Table von ElectricCar gefunden.
- @@honk()@@ ist nicht virtual: **Static Binding**. Der Compiler sieht nur den Pointer-Typ @@Vehicle*@@ und ruft Vehicle::honk() auf.

Mit @@virtual void honk()@@ in Vehicle wäre die zweite Zeile „Electric honk“.`,
    },
    {
      id: 'employee',
      title: 'Employee Management System',
      source: 'nach Tasks 04 · OOP II',
      points: 10,
      task: r`Schreibe eine abstrakte Basisklasse @@Employee@@ (name, id; pure virtual @@calculatePay()@@; virtueller Destruktor) und die Klassen

- @@SalariedEmployee@@: annualSalary, Pay = annualSalary / 12
- @@HourlyEmployee@@: hourlyRate und hoursWorked, Pay = hourlyRate * hoursWorked

Lege in main beide in einem @@std::vector<Employee*>@@ ab, gib in **einer** Schleife den Pay aus und räume auf.`,
      hint: r`Pure virtual: = 0. In den Kindern override. Am Ende jedes Element löschen.`,
      solution: r`~~~
#include <iostream>
#include <string>
#include <vector>

class Employee {
protected:
    std::string name;
    int id;
public:
    Employee(std::string n, int i) : name(n), id(i) {}
    virtual double calculatePay() = 0;      // pure virtual
    virtual ~Employee() {}
};

class SalariedEmployee : public Employee {
private:
    double annualSalary;
public:
    SalariedEmployee(std::string n, int i, double s)
        : Employee(n, i), annualSalary(s) {}
    double calculatePay() override { return annualSalary / 12; }
};

class HourlyEmployee : public Employee {
private:
    double hourlyRate;
    double hoursWorked;
public:
    HourlyEmployee(std::string n, int i, double r, double h)
        : Employee(n, i), hourlyRate(r), hoursWorked(h) {}
    double calculatePay() override { return hourlyRate * hoursWorked; }
};

int main() {
    std::vector<Employee*> staff;
    staff.push_back(new SalariedEmployee("Ada", 1, 60000));
    staff.push_back(new HourlyEmployee("Linus", 2, 25.0, 120));

    for (Employee* e : staff) {
        std::cout << e->calculatePay() << std::endl;   // 5000, dann 3000
    }
    for (Employee* e : staff) {
        delete e;
    }
    return 0;
}
~~~

Die Schleife ist **Dynamic Polymorphism**: Zur Laufzeit wird über die V-Table die richtige calculatePay()-Version gefunden. Zwei überladene @@updateDetails@@-Funktionen (nur Name; Name und ID) wären dazu das Beispiel für **Static Polymorphism**.`,
    },
    {
      id: 'abstrakt-fehler',
      title: 'Abstrakte Klassen: Was kompiliert?',
      source: 'nach 04 · Abstract Class',
      points: 6,
      task: r`Welche der Zeilen (1) bis (4) kompilieren nicht, und warum?

~~~
class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() override { return 3.14159 * r * r; }
};

class Blob : public Shape { };

Shape s;                      // (1)
Shape* p = new Circle(2.0);   // (2)
Blob b;                       // (3)
Circle c(1.0);                // (4)
~~~`,
      solution: r`- **(1) Fehler:** Shape hat eine Pure Virtual Function, ist also abstrakt – No Instantiation.
- (2) in Ordnung: Ein **Pointer** auf die abstrakte Klasse ist erlaubt, das Objekt ist ein konkreter Circle.
- **(3) Fehler:** Blob implementiert area() nicht und ist deshalb selbst abstrakt (Mandatory Overriding).
- (4) in Ordnung: Circle implementiert area() und ist konkret.`,
    },
  ],
});
