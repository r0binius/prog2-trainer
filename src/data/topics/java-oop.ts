import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 07d: overriding, polymorphism, abstract classes, interfaces, object relationships, static. */
export const javaOop = topic({
  id: 'java-oop',
  chapter: '07d',
  title: 'Java: Overriding, Polymorphie, Abstraktion und static',
  summary:
    'Method Overriding und seine Regeln, Dynamic Method Dispatch, abstrakte Klassen, Interfaces, Association–Aggregation–Composition, static.',
  definitions: [
    {
      id: 'overriding',
      title: 'Method Overriding',
      ref: '07d · Method Overriding',
      statement: r`**Method Overriding** liegt vor, wenn eine Subklasse eine **eigene Implementierung** einer Methode liefert, die in der Superklasse bereits definiert ist.

Die **Method Signature** (Name, Rückgabetyp, Parameter) muss exakt der Parent-Methode entsprechen. Die Annotation @@@Override@@ gibt Sicherheit zur Compile-Zeit und Lesbarkeit.`,
      note: r`Beispiel: Jede Shape kann gezeichnet werden (@@draw()@@), aber Circle und Rectangle zeichnen sich verschieden.`,
    },
    {
      id: 'dispatch',
      title: 'Dynamic Method Dispatch',
      ref: '07d · Method Overriding',
      statement: r`Java entscheidet **zur Laufzeit**, welche Version einer überschriebenen Methode läuft – anhand des **tatsächlichen Objekttyps**, nicht anhand des Referenztyps.`,
      note: r`In Java ist das der Normalfall; ein Schlüsselwort wie @@virtual@@ in C++ braucht es nicht.`,
    },
    {
      id: 'polymorphism',
      title: 'Polymorphism („One interface, many forms“)',
      ref: '07d · Polymorphism',
      statement: r`**Polymorphism:** die Fähigkeit verschiedener Objekttypen, auf **denselben Methodenaufruf** auf ihre eigene Weise zu antworten. Eine **Parent-Referenz** kann auf Objekte verschiedener Kindklassen zeigen.

Arten in Java:
- **Compile-time (Static):** Method Overloading.
- **Run-time (Dynamic):** Method Overriding über Parent-Referenzen, etwa @@Person p = new GraduateStudent();@@`,
      note: r`Nutzen: flexibler, erweiterbarer Code; generische Methoden verarbeiten künftige Subklassen ohne Änderung.`,
    },
    {
      id: 'abstract-class',
      title: 'Abstract Class und Abstract Method',
      ref: '07d · Abstract Classes',
      statement: r`Eine **Abstract Class** kann **nicht direkt instanziiert** werden; sie ist ein verallgemeinertes Template, ein „partial blueprint“ für Subklassen. Deklariert mit @@abstract@@.

Sie kann enthalten: **abstrakte Methoden** (ohne Rumpf – Subklassen müssen sie implementieren), **konkrete Methoden**, **Attribute** und **Konstruktoren**.

~~~
public abstract class Employee {
    protected String name;
    public abstract void work();          // was, nicht wie
    public void showName() { System.out.println(name); }
}
~~~`,
    },
    {
      id: 'interface',
      title: 'Interface',
      ref: '07d · Interfaces',
      statement: r`Ein **Interface** ist ein Reference Type, der als **vollständig abstrakter Vertrag** dient: Es legt fest, **was** eine Klasse tun muss, aber nicht **wie**.

- Traditionell nur **public abstract** Methoden und **public static final** Konstanten (modernes Java erlaubt auch default- und static-Methoden mit Rumpf).
- Eine Klasse kann **mehrere Interfaces** implementieren (@@implements@@) – so umgeht man die Beschränkung auf eine Elternklasse.`,
    },
    {
      id: 'static',
      title: 'static',
      ref: '07d · Static Keyword',
      statement: r`Als @@static@@ deklarierte Member gehören zur **Klasse selbst**, nicht zu einer bestimmten Instanz.

- **Class-Level Scope:** von allen Objekten geteilt; der Speicher wird **einmal** angelegt, wenn die Klasse in die JVM geladen wird.
- **Static Variables:** gemeinsame Eigenschaften aller Instanzen (ein Zähler, der Name der Universität).
- **Static Methods:** über den **Klassennamen** aufrufbar, ohne ein Objekt zu erzeugen.`,
      note: r`@@main()@@ ist static, weil Java das Programm starten muss, bevor irgendein Objekt existiert.`,
    },
    {
      id: 'beziehungen',
      title: 'Association, Aggregation, Composition',
      ref: '07d · Object Relationships',
      statement: r`~~~
Beziehung     Bedeutung        Definition                              Lifetime Dependency
Association   Uses             allgemeine Beziehung zwischen           nein
                               unabhängigen Objekten
Aggregation   Has-A (weak)     das Teil kann ohne das Ganze            nein
                               existieren
Composition   Has-A (strong)   das Teil gehört exklusiv zum Ganzen     ja
Inheritance   Is-A             –                                       –
~~~

Beispiele: Ein Student belegt einen Course (Association). Ein Department hat Professoren; wird es gelöscht, existieren sie weiter (Aggregation). Wird das Car zerstört, wird die Engine mit zerstört (Composition).`,
    },
  ],
  theorems: [
    {
      id: 'override-regeln',
      title: 'Regeln für Method Overriding',
      ref: '07d · Rules for Method Overriding',
      statement: r`- **Gleicher Methodenname**
- **Gleiche Parameterliste**
- **Gleicher Rückgabetyp** (oder ein kompatibler)
- **Die Sichtbarkeit darf nicht verringert werden**
- @@@Override@@ verwenden

Sichtbarkeit von restriktiv nach offen: private → protected → public.

~~~
Parent      Child       erlaubt?
public      public      ja
protected   public      ja  (Widening)
protected   protected   ja
public      protected   nein
public      private     nein
protected   private     nein
~~~`,
      note: r`Grund: Jedes Subklassen-Objekt muss überall einsetzbar sein, wo der Parent erwartet wird (IS-A). Könnte Circle die Sichtbarkeit von draw() verringern, würde Code, der mit einer Shape-Referenz arbeitet, plötzlich nicht mehr funktionieren.`,
    },
    {
      id: 'override-overload',
      title: 'Overriding ist nicht Overloading',
      ref: '07d · Method Overriding is not Overloading',
      statement: r`**Overloading:** mehrere Methoden mit **demselben Namen in derselben Klasse**, aber **verschiedenen Parameterlisten** (Anzahl, Typ oder Reihenfolge der Typen). Java wählt anhand der Argumente – zur **Compile-Zeit**.

**Overriding:** Subklasse ersetzt eine geerbte Methode mit **gleicher Signatur** – Auswahl zur **Laufzeit**.

Der **Rückgabetyp allein** reicht für Overloading nicht: Bei identischer Parameterliste kann Java die Methoden nicht unterscheiden – Compile-time Error.`,
    },
    {
      id: 'referenz-objekt',
      title: 'Reference Type vs. Actual Object Type',
      ref: '07d · Polymorphism – Key Idea',
      statement: r`Bei @@Employee e = new Manager();@@ gilt:

- Der **Reference Type** (Employee) bestimmt, **welche Methoden zugreifbar** sind.
- Der **Actual Object Type** (Manager) bestimmt, **welche überschriebene Version** ausgeführt wird.

~~~
Employee[] staff = { new Manager(), new Developer(), new Tester() };
for (Employee e : staff) {
    e.work();      // gleicher Befehl, verschiedenes Verhalten
}
~~~

Die Schleife muss den genauen Typ nicht kennen: One Reference, Many Forms.`,
    },
    {
      id: 'abstract-vs-interface',
      title: 'Abstract Class vs. Interface',
      ref: '07d · Abstract Class vs Interface',
      statement: r`~~~
Abstract Class                Interface
IS-A-Beziehung                CAN-DO-Beziehung
kann Attribute haben          typischerweise Verhaltensvertrag
Single Inheritance            mehrere Interfaces möglich
gemeinsame Implementierung    gemeinsame Fähigkeit
~~~

Beispiele: Dog **IS-A** Animal (abstrakte Klasse). Bird **CAN** Fly, Fish **CAN** Swim (Interfaces).

**Abstrakte Klasse verwenden, wenn** mehrere Klassen gemeinsame Attribute und gemeinsames Verhalten teilen, manche Methoden eine gemeinsame Implementierung haben und andere von den Subklassen verschieden implementiert werden müssen.`,
    },
    {
      id: 'static-regeln',
      title: 'Static vs. Non-Static',
      ref: '07d · Static, cont.',
      statement: r`~~~
Merkmal          Static          Non-Static
gehört zu        der Klasse      dem Objekt
Kopien           eine            eine pro Objekt
Zugriff über     Klassennamen    Objektreferenz
braucht Objekt?  nein            ja
~~~

**Wichtige Regel:** Eine static-Methode kann **nicht direkt** auf non-static Attribute zugreifen und @@this@@ nicht benutzen – das Attribut gehört einem Objekt, die Methode der Klasse.`,
      note: r`Der Zugriff über den Klassennamen ist vorzuziehen: @@Student.university@@ statt @@s1.university@@.`,
    },
    {
      id: 'zaehler',
      title: 'Objekte zählen mit static',
      ref: '07d · A very practical use of static: Counting Objects',
      statement: r`~~~
public class Student {
    private static int count = 0;    // eine Kopie für alle

    public Student() {
        count++;                     // jeder Konstruktoraufruf zählt
    }

    public static int getCount() {
        return count;
    }
}

new Student(); new Student(); new Student();
System.out.println(Student.getCount());   // 3
~~~`,
    },
  ],
  claims: [
    {
      id: 'sichtbarkeit-verringern',
      statement: r`Eine public-Methode darf in der Subklasse als protected überschrieben werden.`,
      holds: false,
      reason: r`Die Sichtbarkeit darf nicht verringert werden. Erlaubt ist nur beibehalten oder erweitern (protected → public).`,
      ref: '07d · Rules for Method Overriding',
    },
    {
      id: 'referenztyp-entscheidet',
      statement: r`Bei @@Employee e = new Manager(); e.work();@@ wird die Methode work() von Employee ausgeführt, weil e vom Typ Employee ist.`,
      holds: false,
      reason: r`Dynamic Method Dispatch: Der tatsächliche Objekttyp (Manager) bestimmt die Version.`,
      ref: '07d · Polymorphism',
    },
    {
      id: 'abstract-new',
      statement: r`Von einer abstrakten Klasse kann man mit @@new@@ kein Objekt erzeugen.`,
      holds: true,
      reason: r`@@new Employee()@@ ist ein Fehler, wenn Employee abstract ist. @@Employee e = new Developer();@@ geht.`,
      ref: '07d · Abstract Classes – Important Restriction',
    },
    {
      id: 'abstract-konkret',
      statement: r`Eine abstrakte Klasse darf nur abstrakte Methoden enthalten.`,
      holds: false,
      reason: r`Sie kann abstrakte und normale Methoden, Attribute und Konstruktoren enthalten.`,
      ref: '07d · Abstract Classes – Rules',
    },
    {
      id: 'mehrere-interfaces',
      statement: r`Eine Java-Klasse kann mehrere Interfaces implementieren.`,
      holds: true,
      reason: r`So erreicht man „Multiple Inheritance of behavior“ trotz der Beschränkung auf eine Elternklasse.`,
      ref: '07d · Interfaces',
    },
    {
      id: 'static-this',
      statement: r`In einer static-Methode kann man @@this@@ verwenden.`,
      holds: false,
      reason: r`Eine static-Methode gehört zur Klasse; es gibt kein aktuelles Objekt.`,
      ref: '07d · Static Keyword',
    },
    {
      id: 'static-kopie',
      statement: r`Von einem static-Attribut gibt es genau eine Kopie, die sich alle Objekte der Klasse teilen.`,
      holds: true,
      reason: r`Ändert ein Objekt den Wert, sehen ihn alle.`,
      ref: '07d · Static',
    },
    {
      id: 'overload-return',
      statement: r`Zwei Methoden derselben Klasse mit gleichem Namen und gleicher Parameterliste, aber verschiedenem Rückgabetyp, sind eine gültige Überladung.`,
      holds: false,
      reason: r`Der Rückgabetyp allein reicht nicht – Compile-time Error.`,
      ref: '07d · Overloading',
    },
    {
      id: 'composition-lifetime',
      statement: r`Bei Composition hängt die Lebensdauer des Teils von der des Ganzen ab.`,
      holds: true,
      reason: r`Has-A (strong): Wird das Car zerstört, wird die Engine mit zerstört. Bei Aggregation existiert das Teil weiter.`,
      ref: '07d · Object Relationships',
    },
    {
      id: 'interface-is-a',
      statement: r`Interfaces modellieren typischerweise eine IS-A-Beziehung, abstrakte Klassen eine CAN-DO-Beziehung.`,
      holds: false,
      reason: r`Umgekehrt: abstrakte Klasse = IS-A (Dog is an Animal), Interface = CAN-DO (Bird can fly).`,
      ref: '07d · Abstract Class vs Interface',
    },
  ],
  problems: [
    {
      id: 'university',
      title: 'University Management System',
      source: 'nach Tutorial 09b · JAVA – OOP 0.3 Concepts',
      points: 10,
      task: r`1. Schreibe das Interface @@Evaluatable@@ mit der Konstanten PASSING_GRADE = 4 und der Methode @@evaluatePerformance()@@.
2. Schreibe die abstrakte Klasse @@UniversityMember@@, die Evaluatable implementiert: privates name, finales id, ein static-Zähler totalMembers (im Konstruktor erhöht), die abstrakte Methode @@performRole()@@.
3. Schreibe die konkrete Klasse @@Student@@ mit currentGrade.
4. Warum ist UniversityMember eine abstrakte Klasse, Evaluatable aber ein Interface?`,
      solution: r`~~~
public interface Evaluatable {
    int PASSING_GRADE = 4;             // implizit public static final
    void evaluatePerformance();        // implizit public abstract
}

public abstract class UniversityMember implements Evaluatable {
    private static int totalMembers = 0;
    private String name;
    private final int id;

    public UniversityMember(String name, int id) {
        this.name = name;
        this.id = id;
        totalMembers++;
    }

    public static int getTotalMembers() { return totalMembers; }
    public String getName() { return name; }

    public abstract void performRole();
}

public class Student extends UniversityMember {
    private double currentGrade;

    public Student(String name, int id, double currentGrade) {
        super(name, id);
        this.currentGrade = currentGrade;
    }

    @Override
    public void performRole() {
        System.out.println(getName() + " is studying.");
    }

    @Override
    public void evaluatePerformance() {
        System.out.println(currentGrade <= PASSING_GRADE ? "passed" : "failed");
    }
}
~~~

4. Student und Professor **sind** UniversityMembers (**IS-A**) und teilen Attribute (name, id) und Implementierung (Zähler, Getter) – das leistet nur eine abstrakte Klasse. „Bewertbar sein“ ist eine **Fähigkeit** (**CAN-DO**), die auch Klassen außerhalb dieser Hierarchie haben könnten – ein reiner Verhaltensvertrag, also ein Interface.

UniversityMember muss evaluatePerformance() nicht selbst implementieren, weil die Klasse abstrakt ist; die Pflicht geht an die konkreten Subklassen. Die Note ist hier nach deutschem System gedacht (4 oder besser besteht).`,
    },
    {
      id: 'dispatch-ausgabe',
      title: 'Polymorphie: Was läuft, was kompiliert?',
      source: 'nach 07d · Polymorphism, Example',
      points: 8,
      task: r`~~~
class Employee {
    public void work() { System.out.println("Employee works"); }
}
class Manager extends Employee {
    @Override
    public void work() { System.out.println("Manager manages"); }
    public void approveBudget() { System.out.println("Approved"); }
}
class Developer extends Employee {
    @Override
    public void work() { System.out.println("Developer codes"); }
}

Employee e1 = new Manager();
Employee e2 = new Developer();
e1.work();              // (1)
e2.work();              // (2)
e1.approveBudget();     // (3)
~~~

Was geben (1) und (2) aus? Kompiliert (3)? Begründe mit Reference Type und Actual Object Type.`,
      solution: r`- (1) **Manager manages** – der tatsächliche Objekttyp ist Manager.
- (2) **Developer codes** – der tatsächliche Objekttyp ist Developer.
- (3) **kompiliert nicht.** Der **Reference Type** Employee bestimmt, welche Methoden zugreifbar sind; Employee kennt @@approveBudget()@@ nicht – obwohl das Objekt ein Manager ist.

Der Reference Type entscheidet, **was man aufrufen darf**; der Actual Object Type entscheidet, **welche überschriebene Version läuft** (Dynamic Method Dispatch). Für (3) bräuchte man einen Downcast: @@((Manager) e1).approveBudget();@@`,
    },
    {
      id: 'static-fehler',
      title: 'static: Fehler finden',
      source: 'nach 07d · Static – Important Rule',
      points: 6,
      task: r`Welche Zeile kompiliert nicht? Korrigiere sie auf zwei Arten. Was gibt @@Student.university@@ aus, nachdem @@s1.university = "TU";@@ ausgeführt wurde und man es über s2 liest?

~~~
public class Student {
    String name;
    static String university = "Provadis";

    static void display() {
        System.out.println(university);    // (1)
        System.out.println(name);          // (2)
    }
}
~~~`,
      solution: r`**(2) kompiliert nicht:** @@name@@ ist non-static und gehört zu einem Objekt; @@display()@@ ist static und gehört zur Klasse – es gibt kein Objekt, dessen name gemeint sein könnte. (1) ist in Ordnung: beide Member gehören der Klasse.

Korrekturen:
1. @@display()@@ non-static machen – dann läuft sie auf einem Objekt und kennt dessen name.
2. Das Objekt als Parameter übergeben: @@static void display(Student s) { System.out.println(s.name); }@@

Es gibt nur **eine** Kopie von university. Nach der Zuweisung über s1 liefert auch @@s2.university@@ und @@Student.university@@ den Wert **TU**. Vorzuziehen ist der Zugriff über den Klassennamen.`,
    },
  ],
});
