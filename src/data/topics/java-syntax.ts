import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 07b: Java syntax, primitive types, flow control, loop control, classes, encapsulation, constructors. */
export const javaSyntax = topic({
  id: 'java-syntax',
  chapter: '07b',
  title: 'Java: Syntax, Kontrollfluss und erste Klassen',
  summary:
    'Grundstruktur, die acht primitiven Typen, vier Schleifenarten, break und continue, Klassen, strikte Kapselung, Konstruktoren.',
  definitions: [
    {
      id: 'grundregeln',
      title: 'Grundregeln der Java-Syntax',
      ref: '07b · Basic Java Syntax',
      statement: r`- Code muss **in einer Klasse** stehen.
- Die Ausführung beginnt in @@main()@@.
- Jedes Statement endet mit @@;@@
- Java ist **case-sensitive**.
- Blöcke stehen in @@{ }@@.

~~~
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
~~~`,
    },
    {
      id: 'for-each',
      title: 'for-each (Enhanced for Loop)',
      ref: '07b · Flow Control – for-each',
      statement: r`Die **for-each-Schleife** läuft über alle Elemente eines Arrays oder einer Collection:

~~~
int[] scores = {90, 75, 60};
for (int s : scores) {
    System.out.println(s);
}
~~~

**Kein Index nötig** – einfacher und sicherer zum Iterieren.`,
    },
    {
      id: 'break-continue',
      title: 'break und continue (Jump Statements)',
      ref: '07b · Loop Control Statements',
      statement: r`Beide heißen **Jump Statements**, weil sie den normalen Ablauf verändern.

- @@break@@: **beendet die Schleife sofort**; die Ausführung springt hinter die Schleife.
- @@continue@@: **überspringt den aktuellen Durchlauf** und macht mit dem nächsten weiter.`,
      note: r`break: früh aufhören. continue: einzelne Werte ignorieren. Schleifen geben Wiederholung; break und continue geben Kontrolle über die Wiederholung.`,
    },
    {
      id: 'kapselung-java',
      title: 'Strict Encapsulation in Java',
      ref: '07b · Java Approach (Strict Encapsulation)',
      statement: r`**Encapsulation** = Daten + Methoden bündeln + den **Zugriff kontrollieren**. Sie verbirgt interne Details und schützt die Daten.

Java **erzwingt** Data Hiding: Ein @@private@@-Attribut ist von außerhalb der Klasse nicht zugreifbar. Python kapselt nur „lose“ (per Konvention).`,
      note: r`Ohne Kapselung wären ungültige Daten möglich, etwa @@student.age = -5;@@.`,
    },
    {
      id: 'konstruktor-java',
      title: 'Constructor in Java',
      ref: '07b · Constructors in Java',
      statement: r`Ein **Constructor** ist eine spezielle Methode, die läuft, wenn ein Objekt erzeugt wird.

- **Gleicher Name** wie die Klasse
- **Kein Rückgabetyp**
- Initialisiert die Daten des Objekts

Bei @@new Student("Alice", 20)@@ passiert: 1. Speicher wird im **Heap** angefordert, 2. der Konstruktor wird aufgerufen, 3. die Werte werden den Variablen zugewiesen.`,
      note: r`Warum Konstruktoren: Das Objekt ist sofort benutzbar, es fehlen keine Daten, das Design ist sauberer.`,
    },
    {
      id: 'getter-setter-java',
      title: 'Getter und Setter in Java',
      ref: '07b · Controlled Access: Getters & Setters',
      statement: r`Private Attribute werden über public-Methoden kontrolliert zugänglich:

~~~
private int age;

public int getAge() { return age; }

public void setAge(int age) {
    if (age >= 0) {
        this.age = age;
    }
}
~~~

Nutzen: ungültige Daten verhindern, Validierung einbauen, Sicherheit erhöhen, Wartung erleichtern.`,
    },
  ],
  theorems: [
    {
      id: 'acht-typen',
      title: 'Die acht primitiven Datentypen',
      ref: '07b · Variables and Data Types',
      statement: r`Java kennt zwei Kategorien: **Primitive Types** (speichern den Wert direkt) und **Reference Types**.

~~~
Kategorie   Typen (Größe in Bytes)                Beispiel
Integer     byte (1), short (2), int (4),         int x = 100000;
            long (8)                              long y = 10000000000L;
Decimal     float (4), double (8)                 float f = 3.14f;
                                                  double pi = 3.14;
Character   char                                  char c = 'A';
Logical     boolean                               boolean isPass = true;
~~~`,
      note: r`Der Typ muss zuerst deklariert werden (Java ist strongly typed) und kann sich danach nicht ändern. Suffixe: @@L@@ für long, @@f@@ für float.`,
    },
    {
      id: 'vier-schleifen',
      title: 'Die vier Schleifenarten',
      ref: '07b · Flow Control – Repetition',
      statement: r`~~~
Schleife   Wann                              Merkmal                      Definit?
for        Anzahl der Durchläufe bekannt     kompakt, Entry-Controlled    ja
while      Anzahl unbekannt                  Bedingung zuerst             nein
                                             (Entry-Controlled)
do-while   muss mindestens einmal laufen     Bedingung danach             nein
                                             (Exit-Controlled)
for-each   Arrays / Collections              einfache Iteration           ja
~~~

Ablauf der for-Schleife: Initialisieren → Bedingung prüfen → Code ausführen → Update → wiederholen.`,
      note: r`while: Ist die Bedingung von Anfang an falsch, läuft die Schleife **nie**. do-while: läuft **mindestens einmal**.`,
    },
    {
      id: 'schleifenfehler',
      title: 'Typische Schleifenfehler',
      ref: '07b · Loops Common Mistakes',
      statement: r`- **Infinite Loop:** Die Bedingung wird nie falsch.
- **Forgetting update:** Der Zähler wird nicht verändert.

~~~
int i = 1;
while (i <= 5) {
    System.out.println(i);
    // i++ fehlt -> Endlosschleife
}
~~~`,
    },
    {
      id: 'namen-java',
      title: 'Naming Conventions in Java',
      ref: '07b · Naming Conventions',
      statement: r`- **Klassen:** PascalCase – @@StudentRecord@@
- **Variablen und Methoden:** camelCase – @@currentGrade@@, @@registerAttendee()@@

Gute Namen verbessern Lesbarkeit, Wartbarkeit und Teamarbeit.`,
    },
    {
      id: 'klasse-muster',
      title: 'Muster einer gekapselten Klasse',
      ref: '07b · Complete Example',
      statement: r`~~~
public class Student {
    private String name;          // Attribute: private
    private int age;

    public Student(String name, int age) {   // Konstruktor
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; } // Getter

    public void setAge(int age) {            // Setter mit Validierung
        if (age >= 0) {
            this.age = age;
        }
    }
}

Student s = new Student("Alice", 20);        // Objekt erzeugen
~~~

Dieselben OOP-Konzepte wie in Python (Klassen, Objekte, Kapselung, Vererbung) – die Prinzipien sind gleich, die Umsetzung ist anders.`,
    },
  ],
  claims: [
    {
      id: 'while-nie',
      statement: r`Eine while-Schleife kann null Mal ausgeführt werden.`,
      holds: true,
      reason: r`Die Bedingung wird vor dem Rumpf geprüft (Entry-Controlled). Ist sie sofort falsch, läuft der Rumpf nie.`,
      ref: '07b · while Loop',
    },
    {
      id: 'do-while-exit',
      statement: r`Die do-while-Schleife ist Entry-Controlled.`,
      holds: false,
      reason: r`Sie ist **Exit-Controlled**: Die Bedingung wird nach dem Rumpf geprüft, deshalb läuft er mindestens einmal.`,
      ref: '07b · Flow Control – Tabelle',
    },
    {
      id: 'continue-beendet',
      statement: r`@@continue@@ beendet die Schleife vollständig.`,
      holds: false,
      reason: r`Das tut @@break@@. continue überspringt nur den aktuellen Durchlauf.`,
      ref: '07b · Loop Control Statements',
    },
    {
      id: 'acht',
      statement: r`Java hat acht primitive Datentypen; @@String@@ gehört nicht dazu.`,
      holds: true,
      reason: r`byte, short, int, long, float, double, char, boolean. String ist ein Reference Type.`,
      ref: '07b · Variables and Data Types',
    },
    {
      id: 'long-groesse',
      statement: r`Ein @@long@@ belegt in Java 4 Bytes.`,
      holds: false,
      reason: r`int belegt 4 Bytes, long 8 Bytes.`,
      ref: '07b · Variables and Data Types',
    },
    {
      id: 'typ-aendern',
      statement: r`Eine als @@int@@ deklarierte Variable kann in Java später einen String aufnehmen.`,
      holds: false,
      reason: r`Einmal deklariert, kann der Typ sich nicht ändern.`,
      ref: '07b · Variables and Data Types',
    },
    {
      id: 'private-aussen',
      statement: r`Auf ein @@private@@-Attribut kann man von einer anderen Klasse aus nicht direkt zugreifen.`,
      holds: true,
      reason: r`Java erzwingt das Data Hiding; der Zugriff geht über Getter und Setter.`,
      ref: '07b · Strict Encapsulation',
    },
    {
      id: 'for-each-index',
      statement: r`In einer for-each-Schleife braucht man eine Indexvariable.`,
      holds: false,
      reason: r`Gerade nicht: Die Schleife liefert die Elemente direkt.`,
      ref: '07b · for-each Loop',
    },
    {
      id: 'ctor-name',
      statement: r`Ein Java-Konstruktor heißt wie seine Klasse und hat keinen Rückgabetyp.`,
      holds: true,
      reason: r`Genau wie in C++.`,
      ref: '07b · Constructors in Java',
    },
  ],
  problems: [
    {
      id: 'schleifen-ausgabe',
      title: 'break und continue verfolgen',
      source: 'nach 07b · Loop Control Statements',
      points: 6,
      task: r`Was geben die beiden Schleifen aus?

~~~
for (int i = 1; i <= 6; i++) {
    if (i == 4) { break; }
    System.out.print(i + " ");
}
System.out.println();

for (int i = 1; i <= 6; i++) {
    if (i % 2 == 0) { continue; }
    System.out.print(i + " ");
}
~~~`,
      solution: r`~~~
1 2 3
1 3 5
~~~

- Erste Schleife: Bei i = 4 beendet @@break@@ die Schleife komplett; 4, 5, 6 erscheinen nie.
- Zweite Schleife: Bei geradem i überspringt @@continue@@ nur diesen Durchlauf; die Schleife läuft bis 6 weiter.`,
    },
    {
      id: 'event',
      title: 'Event Management System',
      source: 'nach Tutorial 09a · JAVA Fundamentals – OOP1',
      points: 10,
      task: r`Schreibe die Klasse @@Event@@ mit den privaten Attributen eventName, maxAttendees und currentRegistrations, einem Konstruktor (Name und Kapazität; Registrierungen starten bei 0), Gettern, einem Setter für maxAttendees (die neue Kapazität darf nicht unter den bestehenden Registrierungen liegen) und @@boolean registerAttendee()@@.

Erzeuge in @@Main@@ ein Event mit Kapazität 2 und versuche drei Registrierungen. Was erscheint?`,
      solution: r`~~~
// Event.java
public class Event {
    private String eventName;
    private int maxAttendees;
    private int currentRegistrations;

    public Event(String eventName, int maxAttendees) {
        this.eventName = eventName;
        this.maxAttendees = maxAttendees;
        this.currentRegistrations = 0;
    }

    public String getEventName() { return eventName; }
    public int getMaxAttendees() { return maxAttendees; }
    public int getCurrentRegistrations() { return currentRegistrations; }

    public void setMaxAttendees(int maxAttendees) {
        if (maxAttendees >= currentRegistrations) {
            this.maxAttendees = maxAttendees;
        } else {
            System.out.println("Warning: capacity below current registrations.");
        }
    }

    public boolean registerAttendee() {
        if (currentRegistrations < maxAttendees) {
            currentRegistrations++;
            return true;
        }
        return false;
    }
}
~~~

~~~
// Main.java
public class Main {
    public static void main(String[] args) {
        Event myEvent = new Event("Java Fundamentals Workshop", 2);
        for (int i = 1; i <= 3; i++) {
            boolean ok = myEvent.registerAttendee();
            System.out.println("Attempt " + i + ": " + (ok ? "success" : "event full"));
        }
    }
}
~~~

Ausgabe: zweimal success, beim dritten Versuch „event full“.`,
    },
    {
      id: 'event-reflexion',
      title: 'Kapselung und Referenzen begründen',
      source: 'nach Tutorial 09a · Self-Evaluation',
      points: 6,
      task: r`Zur Klasse Event aus dem Tutorial:

1. Warum kann man in Main nicht @@myEvent.currentRegistrations += 1;@@ schreiben? Wovor schützt das?
2. Nach @@Event secondaryEvent = myEvent;@@ wird @@secondaryEvent.registerAttendee()@@ aufgerufen. Wie viele Event-Objekte gibt es im Heap? Ist myEvent betroffen?`,
      solution: r`1. @@currentRegistrations@@ ist **private**; der Zugriff von außerhalb der Klasse ist ein Compilerfehler. Das schützt die Regel der Klasse: Über @@registerAttendee()@@ kann die Zahl nie über maxAttendees steigen. Mit direktem Zugriff ließe sich die Kapazitätsprüfung umgehen (ungültiger Zustand).

2. Es gibt weiterhin **ein** Event-Objekt. Die Zuweisung kopiert nur die Referenz; beide Variablen auf dem Stack halten dieselbe Heap-Adresse. Die Registrierung über secondaryEvent erhöht den Zähler desselben Objekts – @@myEvent.getCurrentRegistrations()@@ liefert den erhöhten Wert.`,
    },
  ],
});
