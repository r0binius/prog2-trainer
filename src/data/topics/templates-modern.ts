import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 05 (templates) and 06: generic code, smart pointers, modern syntax, mutexes and lock_guard. */
export const templatesModern = topic({
  id: 'templates-modern',
  chapter: '05–06',
  title: 'Templates und Modern C++',
  summary:
    'Function Templates, Instantiation, generische Validierung, Rule of Zero, Smart Pointers, auto, Lambdas, optional, Mutex und lock_guard.',
  definitions: [
    {
      id: 'template',
      title: 'Template',
      ref: '05 · The Anatomy of a Template',
      statement: r`Ein **Template** ist ein Bauplan für Code, der mit **beliebigen Typen** arbeitet. @@T@@ ist ein Platzhalter, eine „Typvariable“.

~~~
template <typename T>
void swapValues(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}
~~~

- @@template@@ leitet die Deklaration ein.
- @@<typename T>@@ definiert den Template-Parameter; @@<class T>@@ ist hier gleichbedeutend.`,
      note: r`Motivation: dieselbe Logik nicht für int, double und string dreimal kopieren (Overloading per Copy-Paste) – ein Bug müsste sonst dreimal behoben werden.`,
    },
    {
      id: 'instantiation',
      title: 'Template Instantiation',
      ref: '05 · How the Compiler Works',
      statement: r`Der Compiler erzeugt für ein Template **erst dann** Maschinencode, wenn es **benutzt** wird. Für jeden verwendeten Typ generiert er eine eigene Version, in der jedes T ersetzt ist:

- @@swapValues(5, 10)@@ → „das sind ints“ → Version für int
- @@swapValues(3.14, 2.71)@@ → weitere Version für double`,
      note: r`Templates machen das Programm zur **Laufzeit nicht langsamer**. Allenfalls dauert das Kompilieren etwas länger.`,
    },
    {
      id: 'unique-ptr',
      title: 'std::unique_ptr',
      ref: '06 · Smart Pointers & Ownership',
      statement: r`@@std::unique_ptr@@ steht für **alleinigen Besitz** (sole ownership) eines Heap-Objekts.

- Die Ressource wird **automatisch gelöscht**, wenn der unique_ptr seinen Scope verlässt.
- Er kann **nicht kopiert**, nur **verschoben** (moved) werden.`,
    },
    {
      id: 'shared-ptr',
      title: 'std::shared_ptr',
      ref: '06 · Smart Pointers & Ownership',
      statement: r`@@std::shared_ptr@@ erlaubt mehreren Pointern, sich den **Besitz** desselben Objekts zu **teilen**.

Er benutzt **Reference Counting**: Das Objekt wird erst gelöscht, wenn der **letzte** Pointer darauf zerstört ist.`,
      note: r`Smart Pointer machen aus manueller Heap-Verwaltung eine automatische, stack-artige – die goldene Regel „Don't Leak Memory“ wird von selbst eingehalten.`,
    },
    {
      id: 'rule-of-zero',
      title: 'Rule of Zero',
      ref: '06 · The Modern C++ Philosophy',
      statement: r`Die **Rule of Zero** ist ein modernes Designprinzip: Klassen sollen Ressourcen (wie rohe Pointer) **nicht selbst** verwalten. Stattdessen verlässt man sich auf die Standard Library (@@std::vector@@, @@std::string@@, Smart Pointer).

Dann muss man weder Destruktor noch Copy Constructor noch Copy Assignment Operator schreiben.`,
    },
    {
      id: 'mutex',
      title: 'Mutex und Race Condition',
      ref: '06 · Introduction to Mutexes',
      statement: r`Eine **Race Condition** entsteht, wenn zwei oder mehr Threads **gleichzeitig** dieselbe Variable verändern wollen; das Ergebnis ist unvorhersehbar.

Ein **Mutex** (Mutual Exclusion Object) ist ein Synchronisationsprimitiv, das geteilte Daten davor schützt, von mehreren Threads gleichzeitig benutzt zu werden.`,
      note: r`Analogie: ein einziger Schlüssel zu einem Raum. Nur wer ihn hält, darf hinein; alle anderen warten, bis er zurückgegeben ist.`,
    },
    {
      id: 'lock-guard',
      title: 'std::lock_guard',
      ref: '06 · Modern C++ Mutexes & RAII',
      statement: r`@@std::lock_guard<std::mutex>@@ verwaltet einen Mutex per **RAII**:

- **Acquisition:** Im Konstruktor wird der Mutex gesperrt.
- **Automatic Release:** Im Destruktor wird er entsperrt, sobald der lock_guard seinen Scope verlässt.

Auch bei einer Exception oder einem frühen return wird der Mutex sicher freigegeben.`,
    },
    {
      id: 'optional',
      title: 'std::optional und std::expected',
      ref: '06 · Expressive Syntax & Functional Patterns',
      statement: r`- @@std::optional@@: ein Container, der einen Wert enthalten **kann oder nicht**. Er ersetzt „Magic Numbers“ (wie -1) und Null-Pointer als Fehlersignal.
- @@std::expected@@ (C++23): gibt **entweder einen Wert oder ein detailliertes Fehlerobjekt** zurück, ohne teure Exceptions zu werfen.`,
    },
  ],
  theorems: [
    {
      id: 'philosophie',
      title: 'Modern C++: der Stilwechsel',
      ref: '06 · Summary – The Philosophy Shift',
      statement: r`Keine neue Sprache – ein neuer **Stil** (C++11 und später: C++11, C++17, C++20).

~~~
Old C++               Modern C++
Manual control        Express intent
Raw pointers          Smart ownership
Implicit behaviour    Explicit semantics
Error-prone           Compiler-assisted safety
~~~

Prinzipien: Ressourcenbesitz muss **explizit** sein, Lebensdauern sollen offensichtlich sein, der Compiler soll helfen. **Prefer values over raw ownership.**`,
    },
    {
      id: 'syntax',
      title: 'auto, Range-based for, Lambdas',
      ref: '06 · Expressive Syntax & Functional Patterns',
      statement: r`- **Type Inference (@@auto@@):** Der Compiler bestimmt den Datentyp selbst – weniger Schreibarbeit, weniger Type-Mismatch-Fehler.
- **Range-Based for Loop:** vereinfachtes Iterieren über Collections: @@for (auto& item : container) { ... }@@
- **Lambdas:** anonyme Funktionen, die inline definiert werden – nützlich für eigene Logik in Algorithmen (Sortieren, Filtern).`,
    },
    {
      id: 'manuell-mutex',
      title: 'Risiken von lock() und unlock()',
      ref: '06 · Manual Mutex Management',
      statement: r`Manuell ruft ein Thread @@lock()@@ auf, um den Mutex zu bekommen, und @@unlock()@@, um ihn freizugeben.

- **Forgotten Unlock:** Vergisst ein Thread unlock(), warten alle anderen für immer – **Deadlock**.
- **Exception Danger:** Tritt zwischen lock() und unlock() eine Exception auf, bleibt der Mutex gesperrt.

Wie new/delete ist dieser Ansatz fehleranfällig und in Modern C++ nicht empfohlen.`,
    },
    {
      id: 'template-contract',
      title: 'Der implizite Vertrag eines Templates',
      ref: 'Tutorial 08 · The Generic Blueprint',
      statement: r`~~~
template <typename T>
void validateValue(T value, T min, T max) {
    if (value < min || value > max) {
        throw std::out_of_range("Value is outside the allowed range!");
    }
}
~~~

Damit das Template für einen Typ T funktioniert, muss T die verwendeten Operationen unterstützen – hier die Vergleichsoperatoren @@<@@ und @@>@@. Das ist ein **impliziter Vertrag**.

Alle drei Parameter haben **denselben** Typ T: @@validateValue(5, 1.0, 10.0)@@ kompiliert nicht, weil T nicht gleichzeitig int und double sein kann.`,
    },
    {
      id: 'templates-werkzeug',
      title: 'Templates als Compile-Time Tools',
      ref: '06 · Templates as Compile-Time Tools',
      statement: r`Templates sind keine „fortgeschrittene Syntax“, sondern:

- **Type-safe reuse** – einmal schreiben, für viele Typen typsicher verwenden.
- **Compile-time polymorphism** – die Auswahl geschieht beim Übersetzen.
- **Zero-runtime overhead** – keine Kosten zur Laufzeit.`,
    },
    {
      id: 'raii-lifestyle',
      title: 'RAII as a Lifestyle',
      ref: '06 · RAII as a Lifestyle',
      statement: r`RAII ist nicht nur für Speicher da, sondern auch für

- **Mutexe:** Daten im Multi-Threading sperren und entsperren,
- **Database Connections:** Sessions öffnen und schließen,
- **Graphics:** Texturen in der GPU anfordern und freigeben.

**The Golden Rule:** Muss eine Ressource geschlossen oder freigegeben werden, wickle sie in eine Klasse. Der Destruktor ist das Sicherheitsnetz.`,
    },
  ],
  claims: [
    {
      id: 'template-laufzeit',
      statement: r`Templates verlangsamen das Programm zur Laufzeit, weil der Typ erst dann bestimmt wird.`,
      holds: false,
      reason: r`Der Compiler erzeugt die konkreten Versionen beim Übersetzen. Zero-runtime overhead; nur die Compile-Zeit kann steigen.`,
      ref: '05 · How the Compiler Works',
    },
    {
      id: 'typename-class',
      statement: r`@@template <typename T>@@ und @@template <class T>@@ bedeuten in diesem Zusammenhang dasselbe.`,
      holds: true,
      reason: r`Beide definieren einen Typ-Parameter.`,
      ref: '05 · The Anatomy of a Template',
    },
    {
      id: 'gemischte-typen',
      statement: r`Für @@template <typename T> void swapValues(T& a, T& b)@@ kompiliert der Aufruf mit einem int und einem double problemlos.`,
      holds: false,
      reason: r`Beide Parameter haben denselben Typ T. Der Compiler kann T nicht gleichzeitig als int und als double ableiten.`,
      ref: '05 · What is in here?',
    },
    {
      id: 'unique-kopie',
      statement: r`Ein @@std::unique_ptr@@ kann kopiert werden, sodass zwei Pointer dasselbe Objekt besitzen.`,
      holds: false,
      reason: r`unique_ptr bedeutet alleiniger Besitz: nicht kopierbar, nur verschiebbar. Geteilten Besitz bietet shared_ptr.`,
      ref: '06 · Smart Pointers & Ownership',
    },
    {
      id: 'shared-count',
      statement: r`Bei @@std::shared_ptr@@ wird das Objekt gelöscht, wenn der letzte besitzende Pointer zerstört wird.`,
      holds: true,
      reason: r`Reference Counting: Der Zähler fällt auf null, das Objekt wird freigegeben.`,
      ref: '06 · Smart Pointers & Ownership',
    },
    {
      id: 'lock-guard-exception',
      statement: r`Mit @@std::lock_guard@@ wird der Mutex auch dann freigegeben, wenn im geschützten Abschnitt eine Exception fliegt.`,
      holds: true,
      reason: r`RAII: Der Destruktor des lock_guard läuft beim Stack Unwinding und entsperrt den Mutex.`,
      ref: '06 · Modern C++ Mutexes & RAII',
    },
    {
      id: 'deadlock',
      statement: r`Ein vergessenes @@unlock()@@ kann dazu führen, dass andere Threads für immer warten.`,
      holds: true,
      reason: r`Das ist ein Deadlock.`,
      ref: '06 · Manual Mutex Management',
    },
    {
      id: 'rule-zero-drei',
      statement: r`Nach der Rule of Zero soll jede Klasse Destruktor, Copy Constructor und Copy Assignment Operator selbst definieren.`,
      holds: false,
      reason: r`Das Gegenteil: Die Klasse verwaltet keine Ressourcen selbst und braucht deshalb **keine** der drei. Die Rule of Three gilt für Klassen mit rohem new/delete.`,
      ref: '06 · The Modern C++ Philosophy',
    },
    {
      id: 'optional-magic',
      statement: r`@@std::optional@@ ersetzt Rückgabewerte wie -1 als Zeichen für „kein Ergebnis“.`,
      holds: true,
      reason: r`Ein optional enthält einen Wert oder eben keinen – ohne Magic Numbers und ohne Null-Pointer.`,
      ref: '06 · Modern Error Handling',
    },
  ],
  problems: [
    {
      id: 'sensor',
      title: 'Generic Sensor Validator',
      source: 'nach Tasks 06 · GenericErrorHandling',
      points: 10,
      task: r`1. Definiere @@SensorAlarmException@@ (erbt von std::runtime_error; der Konstruktor nimmt einen String).
2. Schreibe die Template-Funktion @@validateSensor(T reading, T lowLimit, T highLimit, std::string sensorName)@@: außerhalb der Grenzen wirft sie die Exception mit dem Sensornamen, sonst gibt sie „[Name] Reading OK: [Wert]“ aus.
3. Teste: Temperature 95.5 (0.0–100.0), Pressure 150 (50–120), Humidity 45.0f (30.0f–60.0f). Was erscheint?`,
      solution: r`~~~
#include <iostream>
#include <stdexcept>
#include <string>

class SensorAlarmException : public std::runtime_error {
public:
    SensorAlarmException(const std::string& sensor)
        : std::runtime_error("Unsafe reading from sensor: " + sensor) {}
};

template <typename T>
void validateSensor(T reading, T lowLimit, T highLimit, std::string sensorName) {
    if (reading < lowLimit || reading > highLimit) {
        throw SensorAlarmException(sensorName);
    }
    std::cout << sensorName << " Reading OK: " << reading << std::endl;
}

int main() {
    try {
        validateSensor(95.5, 0.0, 100.0, "Temperature");    // T = double
        validateSensor(150, 50, 120, "Pressure");           // T = int, wirft
        validateSensor(45.0f, 30.0f, 60.0f, "Humidity");    // nicht erreicht
    }
    catch (const std::exception& e) {
        std::cerr << "ALARM TRIGGERED: " << e.what() << std::endl;
    }
    return 0;
}
~~~

Ausgabe: „Temperature Reading OK: 95.5“, dann „ALARM TRIGGERED: Unsafe reading from sensor: Pressure“. Die Humidity-Zeile läuft nicht mehr, weil das throw den try-Block verlässt. Soll jeder Sensor geprüft werden, bekommt jeder Aufruf seinen eigenen try-catch-Block.

Der Compiler erzeugt drei Versionen von validateSensor: für double, int und float.`,
    },
    {
      id: 'energy-grid',
      title: 'Smart Energy Grid: checkGridStability',
      source: 'nach Tasks 07 · UseCase – Foundations',
      points: 9,
      task: r`1. Schreibe @@template <typename T> void checkGridStability(T value, T limit)@@: bei value > limit ein std::runtime_error („Grid Overload Detected!“), bei value < 0 ein std::invalid_argument („Negative Energy Flow detected: Potential Hardware Failure!“).
2. Die Basisklasse @@EnergySource@@ hat eine pure virtual Funktion calculateEfficiency() und einen virtuellen Destruktor. In main liegen ein SolarPanel und eine WindTurbine in einem Array von @@EnergySource*@@. Skizziere Schleife, Prüfung und Aufräumen.
3. Warum ist der virtuelle Destruktor hier „crucial“?`,
      solution: r`~~~
template <typename T>
void checkGridStability(T value, T limit) {
    if (value > limit) {
        throw std::runtime_error("Grid Overload Detected!");
    }
    if (value < 0) {
        throw std::invalid_argument(
            "Negative Energy Flow detected: Potential Hardware Failure!");
    }
}

int main() {
    EnergySource* grid[2];
    grid[0] = new SolarPanel("Solar-Alpha", 0.855);
    grid[1] = new WindTurbine("Wind-Beta", 48.0);

    for (int i = 0; i < 2; i++) {
        grid[i]->calculateEfficiency();     // Dynamic Polymorphism
        grid[i]->displayStatus();
    }

    try {
        checkGridStability(-12.5, 500.0);   // T = double
        checkGridStability(7, 5);           // T = int
    }
    catch (const std::exception& e) {
        std::cerr << "[ALERT] Caught Exception: " << e.what() << std::endl;
    }

    for (int i = 0; i < 2; i++) {
        delete grid[i];                     // löst die Destruktoren aus
    }
    return 0;
}
~~~

3. Gelöscht wird über einen **Base-Pointer**. Nur mit @@virtual ~EnergySource()@@ läuft zuerst der Destruktor von SolarPanel bzw. WindTurbine und danach der der Basisklasse. Ohne virtual würde nur der Base-Teil aufgeräumt.

Das Template überwacht mit derselben Logik int (Anzahl Verbindungen) und double (MW).`,
    },
    {
      id: 'modernisieren',
      title: 'Alten Code modernisieren',
      source: 'nach 06 · Smart Pointers / Mutexes & RAII',
      points: 7,
      task: r`Nenne die zwei Risiken des Codes und schreibe ihn im Stil von Modern C++ um.

~~~
std::mutex m;

void update() {
    m.lock();
    Report* r = new Report();
    r->write();          // kann eine Exception werfen
    delete r;
    m.unlock();
}
~~~`,
      solution: r`Risiken, wenn @@write()@@ wirft:

1. @@delete r@@ wird übersprungen – **Memory Leak**.
2. @@m.unlock()@@ wird übersprungen – der Mutex bleibt gesperrt, andere Threads warten ewig (**Deadlock**).

~~~
std::mutex m;

void update() {
    std::lock_guard<std::mutex> lock(m);        // sperrt im Konstruktor
    auto r = std::make_unique<Report>();        // std::unique_ptr<Report>
    r->write();
}   // Destruktoren: Report wird gelöscht, Mutex entsperrt
~~~

Beide Ressourcen hängen jetzt an Stack-Objekten (RAII). Beim Stack Unwinding laufen die Destruktoren von selbst. Noch einfacher: @@Report r;@@ direkt auf dem Stack – „prefer values over raw ownership“.`,
    },
  ],
});
