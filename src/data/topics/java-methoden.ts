import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 07c: methods, access modifiers, void, pass-by-value, this, inheritance with extends and super. */
export const javaMethoden = topic({
  id: 'java-methoden',
  chapter: '07c',
  title: 'Java: Methoden, Pass-by-Value und Vererbung',
  summary:
    'Aufbau einer Methode, Access Modifiers, void und return, Java ist immer pass-by-value, this, extends, super, Konstruktor-Reihenfolge.',
  definitions: [
    {
      id: 'methode',
      title: 'Method',
      ref: '07c · Java Methods',
      statement: r`Eine **Methode** ist ein benannter Codeblock für eine bestimmte Aufgabe, der zu einer **Klasse oder einem Objekt** gehört (Objekte haben Daten und Verhalten).

Sie läuft nur, wenn sie **aufgerufen** wird (aus main oder aus einer anderen Methode).

Wozu: Code wiederverwenden, Lesbarkeit erhöhen, Duplikate vermeiden, Logik organisieren.`,
      note: r`Java hat keine frei stehenden Funktionen außerhalb von Klassen. Ein Methodenaufruf ist „Jump + Return“.`,
    },
    {
      id: 'aufbau',
      title: 'Aufbau einer Methode',
      ref: '07c · Basic Method Structure',
      statement: r`~~~
[Access Modifier] [Return Type] [Method Name]([Parameters]) {
    // Method Body
    return value;   // wenn der Return Type nicht void ist
}

public int add(int a, int b) {
    return a + b;
}
~~~

- **Access Modifier:** Wer darf sie aufrufen?
- **Return Type:** Welcher Typ kommt zurück?
- **Method Name:** camelCase
- **Parameters:** Eingaben (optional)
- **return:** schickt den Wert an den Aufrufer; er muss zum Return Type passen.`,
    },
    {
      id: 'void',
      title: 'void',
      ref: '07c · The void Keyword',
      statement: r`@@void@@ steht für eine Methode, die eine Aktion ausführt (ausgeben, internen Zustand ändern), aber **keinen Wert zurückgibt**.

Ein void-Aufruf ist ein Statement; sein „Ergebnis“ ist

- **nicht zuweisbar:** @@int x = printHello();@@ ist ein Fehler,
- **nicht druckbar:** @@System.out.println(printHello());@@ ist ein Fehler.`,
      note: r`void heißt **nicht** „tut nichts“: Die Methode kann ausgeben und den Objektzustand ändern. Ein @@return;@@ ohne Wert ist erlaubt und beendet die Methode. Python gibt in dem Fall implizit None zurück – Java prüft strikt.`,
    },
    {
      id: 'return',
      title: 'return',
      ref: '07c · Core Anatomy of a Method',
      statement: r`Das Schlüsselwort @@return@@

- **beendet** die Ausführung der Methode und gibt die Kontrolle an den Aufrufer zurück,
- **schickt einen Wert** an den Aufrufer.

Ohne return-Statement kann kein Wert zurückgegeben werden.`,
    },
    {
      id: 'this-java',
      title: 'this in Java',
      ref: '07c · The this Keyword',
      statement: r`@@this@@ bezieht sich auf das **aktuelle Objekt**. Damit greift ein Objekt auf seine eigenen Attribute und Methoden zu.

Nötig, wenn ein Parameter **denselben Namen** hat wie ein Attribut: @@this.name = name;@@ – links das Attribut des Objekts, rechts der Parameter.

Zweite Verwendung: @@this(...)@@ ruft einen **anderen Konstruktor derselben Klasse** auf.`,
    },
    {
      id: 'extends',
      title: 'Inheritance mit extends',
      ref: '07c · Inheritance / Inheritance Syntax',
      statement: r`**Inheritance** lässt eine Klasse Eigenschaften und Methoden einer anderen übernehmen. Sie steht für eine **IS-A**-Beziehung.

~~~
public class Student { ... }                          // Superclass / Parent
public class GraduateStudent extends Student { ... }  // Subclass / Child
~~~

GraduateStudent erbt die **zugreifbaren** Attribute und Methoden von Student, ohne sie neu zu schreiben.`,
      note: r`„Engine is-a Car?“ Nein – Car **has an** Engine: keine Vererbung, sondern Composition. Vererbung ist mehr als „Code nicht doppelt schreiben“.`,
    },
    {
      id: 'super',
      title: 'super',
      ref: '07c · The super Keyword',
      statement: r`@@super@@ greift auf Member der **Parent-Klasse** zu.

- @@super(...)@@ ruft den **Konstruktor** der Parent-Klasse auf – es muss die **erste Zeile** im Konstruktor der Subklasse sein.
- @@super.method()@@ ruft eine **Methode** der Parent-Klasse auf.`,
    },
  ],
  theorems: [
    {
      id: 'access-modifier',
      title: 'Access Modifiers',
      ref: '07c · Core Anatomy of a Method – Access Modifiers',
      statement: r`Access Modifiers legen Sichtbarkeit und Zugriff fest – für Methoden **und** Attribute. Sie sind die „Türsteher“ der Kapselung.

~~~
Modifier     Klasse   Package   Subklassen              überall   Typischer Einsatz
private      ja       nein      nein                    nein      interne Hilfsmethoden
(default)    ja       ja        nur im selben Package   nein      package-private Logik
protected    ja       ja        ja (auch andere         nein      zum Erweitern gedacht
                                Packages)
public       ja       ja        ja                      ja        externe API, Entry Points
~~~`,
      note: r`Encapsulation Rule: Felder private halten, Verhalten über public- oder protected-Methoden anbieten, komplexe Logik in private Hilfsmethoden zerlegen.`,
    },
    {
      id: 'pass-by-value',
      title: 'Java ist IMMER Pass-by-Value',
      ref: '07c · Crucial Rule',
      statement: r`Eine Methode bekommt immer eine **Kopie des Wertes der Variablen**. Es gibt in Java **kein** Pass-by-Reference (anders als die Referenzen @@&var@@ in C++).

- **Primitive Typen:** Der Wert wird kopiert. Das Original bleibt unverändert.
- **Objekte:** Der kopierte Wert **ist die Referenz**. Beide Variablen zeigen auf dasselbe Objekt; Änderungen am **Zustand** des Objekts sind außen sichtbar.`,
      note: r`Nicht sagen: „Objekte werden by reference übergeben“ – eine verbreitete Kurzform, aber technisch falsch.`,
    },
    {
      id: 'reassign',
      title: 'Zustand ändern vs. Referenz neu zuweisen',
      ref: '07c · Reassigning the Reference',
      statement: r`~~~
static void rename(Student s) {
    s.name = "Alice";            // ändert das Objekt -> außen sichtbar
}

static void replace(Student s) {
    s = new Student("Bob");      // ändert nur die lokale Kopie der Referenz
}
~~~

@@replace@@ lässt die Variable des Aufrufers unberührt: s hat eine **Kopie der Referenz** bekommen. Wohin s danach zeigt, ändert nicht, wohin die äußere Variable zeigt.`,
      note: r`Gleiches bei Strings: @@text = "Changed";@@ in einer Methode lässt die lokale Variable auf ein anderes Objekt zeigen; der String des Aufrufers bleibt, wie er war.`,
    },
    {
      id: 'ctor-reihenfolge',
      title: 'Konstruktoren und Vererbung',
      ref: '07c · Constructors and Inheritance',
      statement: r`Ein Kind-Objekt wird immer **vom Parent her** aufgebaut:

1. Der Konstruktor des **Parents** läuft zuerst.
2. Der Konstruktor des **Kindes** läuft danach.

Java führt den Parent-Konstruktor **automatisch** aus, bevor der Kind-Konstruktor läuft.`,
    },
    {
      id: 'nicht-geerbt',
      title: 'Was nicht vererbt wird – und Multiple Inheritance',
      ref: '07c · Remarks',
      statement: r`- **private** Felder und Methoden sind in der Subklasse **nicht direkt zugreifbar** – man nutzt public/protected Getter und Setter.
- **Konstruktoren** der Parent-Klasse werden **nicht vererbt**; sie werden mit @@super()@@ aufgerufen.
- Java erlaubt **nicht**, dass eine Klasse von mehreren Klassen erbt (Multiple Inheritance von Klassen). Erreichbar ist es über **Interfaces**.`,
      note: r`Erlaubt sind in Java: Single, Multilevel (Person → Student → GraduateStudent) und Hierarchical Inheritance (mehrere Kinder eines Parents).`,
    },
    {
      id: 'ctor-overloading',
      title: 'Constructor Overloading',
      ref: '07c · Constructor Overloading',
      statement: r`Eine Klasse kann mehrere Konstruktoren mit verschiedenen Parameterlisten haben:

~~~
public Student() {                       // Default Constructor
    this("Unknown", 0);
}
public Student(String name) {            // nur Name
    this(name, 0);
}
public Student(String name, int age) {   // Full Constructor
    this.name = name;
    this.age = age;
}
~~~`,
    },
  ],
  claims: [
    {
      id: 'by-reference',
      statement: r`In Java werden Objekte by reference übergeben.`,
      holds: false,
      reason: r`Java ist immer pass-by-value. Bei Objekten ist der kopierte Wert die Referenz – daher die Verwechslung.`,
      ref: '07c · Crucial Rule',
    },
    {
      id: 'primitive-kopie',
      statement: r`Ändert eine Methode ihren int-Parameter, bleibt die Variable des Aufrufers unverändert.`,
      holds: true,
      reason: r`Bei Primitives wird der Wert kopiert.`,
      ref: '07c · Passing Arguments to Methods',
    },
    {
      id: 'objekt-zustand',
      statement: r`Ändert eine Methode über ihren Parameter ein Attribut des übergebenen Objekts, sieht der Aufrufer die Änderung.`,
      holds: true,
      reason: r`Parameter und Variable des Aufrufers halten dieselbe Referenz – dasselbe Objekt im Heap.`,
      ref: '07c · Passing Arguments to Methods',
    },
    {
      id: 'neu-zuweisen',
      statement: r`Weist eine Methode ihrem Objektparameter ein neues Objekt zu (@@s = new Student(...)@@), zeigt danach auch die Variable des Aufrufers auf das neue Objekt.`,
      holds: false,
      reason: r`Nur die lokale Kopie der Referenz wird umgesetzt.`,
      ref: '07c · Reassigning the Reference',
    },
    {
      id: 'void-print',
      statement: r`Das Ergebnis einer void-Methode kann man mit @@System.out.println(...)@@ ausgeben.`,
      holds: false,
      reason: r`Eine void-Methode liefert keinen Wert: nicht zuweisbar, nicht druckbar – Compilerfehler.`,
      ref: '07c · The void Keyword',
    },
    {
      id: 'void-return',
      statement: r`Eine void-Methode darf @@return;@@ ohne Wert enthalten.`,
      holds: true,
      reason: r`Das beendet die Methode vorzeitig.`,
      ref: '07c · Remarks',
    },
    {
      id: 'super-erste',
      statement: r`@@super(...)@@ muss die erste Anweisung im Konstruktor der Subklasse sein.`,
      holds: true,
      reason: r`Der Parent-Teil muss fertig sein, bevor das Kind seine eigenen Teile initialisiert.`,
      ref: '07c · The super Keyword',
    },
    {
      id: 'zwei-extends',
      statement: r`@@class C extends A, B@@ ist in Java gültig.`,
      holds: false,
      reason: r`Eine Klasse kann nur von **einer** Klasse erben. Mehrere Interfaces zu implementieren ist dagegen möglich.`,
      ref: '07c · Remarks',
    },
    {
      id: 'protected-package',
      statement: r`Ein @@protected@@-Member ist in Subklassen zugreifbar, auch wenn sie in einem anderen Package liegen.`,
      holds: true,
      reason: r`Das unterscheidet protected vom Default (package-private), der Subklassen nur im selben Package einschließt.`,
      ref: '07c · Access Modifiers',
    },
    {
      id: 'ctor-vererbt',
      statement: r`Die Konstruktoren der Parent-Klasse werden an die Subklasse vererbt.`,
      holds: false,
      reason: r`Konstruktoren werden nicht vererbt; die Subklasse ruft sie mit @@super(...)@@ auf.`,
      ref: '07c · Remarks',
    },
  ],
  problems: [
    {
      id: 'pass-trace',
      title: 'Pass-by-Value durchspielen',
      source: 'nach 07c · Passing Arguments / Reassigning the Reference',
      points: 9,
      task: r`Was gibt das Programm aus? Begründe jede Zeile.

~~~
public class Demo {
    static void change(int x)       { x = 100; }
    static void rename(Student s)   { s.name = "Alice"; }
    static void replace(Student s)  { s = new Student("Bob"); }
    static void edit(String text)   { text = "Changed"; }

    public static void main(String[] args) {
        int number = 10;
        Student student = new Student("Max");
        String name = "Original";

        change(number);
        rename(student);
        replace(student);
        edit(name);

        System.out.println(number);
        System.out.println(student.name);
        System.out.println(name);
    }
}
~~~`,
      hint: r`Frage bei jeder Methode: Wird das **Objekt** verändert oder nur die **lokale Variable** umgesetzt?`,
      solution: r`~~~
10
Alice
Original
~~~

- @@change@@: x ist eine Kopie des Wertes 10. number bleibt **10**.
- @@rename@@: s ist eine Kopie der Referenz und zeigt auf dasselbe Objekt; dessen Zustand wird geändert → **Alice**.
- @@replace@@: Nur die lokale Referenz s wird auf ein neues Objekt gesetzt. student zeigt weiter auf das alte Objekt → bleibt **Alice**. Das Bob-Objekt ist nach der Methode unerreichbar.
- @@edit@@: text wird auf ein anderes String-Objekt umgesetzt; name zeigt weiter auf „Original“.

Java ist immer pass-by-value; bei Objekten ist der kopierte Wert die Referenz.`,
    },
    {
      id: 'graduate',
      title: 'GraduateStudent mit extends und super',
      source: 'nach 07c · Inheritance Syntax / The super Keyword',
      points: 8,
      task: r`Gegeben:

~~~
public class Student {
    private String name;
    private int studentId;

    public Student(String name, int studentId) {
        this.name = name;
        this.studentId = studentId;
        System.out.println("Student constructor");
    }

    public String getName() { return name; }

    public void displayInfo() {
        System.out.println(name + " (" + studentId + ")");
    }
}
~~~

Schreibe @@GraduateStudent@@ mit dem zusätzlichen Attribut thesisTitle und einer Methode @@displayThesis()@@, die Name und Thesis ausgibt. Was erscheint bei @@new GraduateStudent("Eva", 7, "RAII")@@, wenn auch der Kind-Konstruktor eine Zeile ausgibt?`,
      solution: r`~~~
public class GraduateStudent extends Student {
    private String thesisTitle;

    public GraduateStudent(String name, int studentId, String thesisTitle) {
        super(name, studentId);            // erste Zeile: Parent-Konstruktor
        this.thesisTitle = thesisTitle;
        System.out.println("GraduateStudent constructor");
    }

    public void displayThesis() {
        System.out.println(getName() + ": " + thesisTitle);
    }
}
~~~

Ausgabe beim Erzeugen:

~~~
Student constructor
GraduateStudent constructor
~~~

Der Parent-Konstruktor läuft zuerst. @@name@@ ist in Student **private**, also in GraduateStudent nicht direkt zugreifbar – deshalb @@getName()@@. @@displayInfo()@@ ist geerbt und ohne Neuschreiben aufrufbar.`,
    },
    {
      id: 'void-fehler',
      title: 'Fehler rund um void und return',
      source: 'nach 07c · The void Keyword / Quick Check',
      points: 5,
      task: r`Welche Zeilen in main kompilieren nicht, und warum?

~~~
static void greet() { System.out.println("Hi"); }
static int square(int n) { return n * n; }

public static void main(String[] args) {
    greet();                          // (1)
    int a = square(4);                // (2)
    int b = greet();                  // (3)
    System.out.println(square(3));    // (4)
    System.out.println(greet());      // (5)
}
~~~`,
      solution: r`- (1) in Ordnung: void-Aufruf als Statement.
- (2) in Ordnung: square liefert einen int.
- **(3) Fehler:** greet() liefert keinen Wert – **nicht zuweisbar**.
- (4) in Ordnung: gibt 9 aus.
- **(5) Fehler:** ein void-Aufruf ist **nicht druckbar**, er ist kein Ausdruck mit Wert.`,
    },
  ],
});
