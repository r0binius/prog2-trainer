import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 05, first part: kinds of errors, legacy error handling, exceptions, stack unwinding, the standard hierarchy. */
export const fehler = topic({
  id: 'fehler',
  chapter: '05',
  title: 'Error Handling und Exceptions in C++',
  summary:
    'Fehlerarten, Return Codes und Global Flags, throw/try/catch, Stack Unwinding, Catch by Reference, Standard-Hierarchie, eigene Exceptions.',
  definitions: [
    {
      id: 'syntax-error',
      title: 'Syntax Error',
      ref: '05 · Syntax Errors',
      statement: r`Ein **Syntax Error** verletzt die **Grammatik** der Sprache – der Compiler kann den Code nicht parsen. Syntax Errors sind **immer Compile-time Errors**.

Beispiele: fehlendes Semikolon, nicht zusammenpassende Klammern, falsch verwendetes Keyword.`,
      note: r`Wie ein Grammatikfehler: Der Compiler kann den Satz nicht einmal lesen.`,
    },
    {
      id: 'semantic-error',
      title: 'Semantic Error (drei Unterarten)',
      ref: '05 · Semantic Errors',
      statement: r`Der Code ist syntaktisch gültig, aber die **Bedeutung** ist falsch.

- **A. Compile-time Semantic Error:** Der Compiler versteht die Struktur, lehnt die Bedeutung ab – falsche Argumentanzahl, nicht deklarierte Variable, Verletzung des Typsystems, ungültige Konvertierung.
- **B. Run-time Semantic Error:** Das Programm kompiliert, scheitert aber bei der Ausführung – Division durch null, Null-Pointer dereferenzieren, Vector-Index außerhalb, Datei existiert nicht.
- **C. Logic Error:** Das Programm läuft, liefert aber das **falsche Ergebnis** – falsche Formel, falsche Schleifenbedingung, Off-by-one. Kein Absturz.`,
      note: r`Syntax = Struktur, Semantik = Bedeutung. „Compile-time vs. Run-time“ sagt, **wann** der Fehler entdeckt wird.`,
    },
    {
      id: 'throw-try-catch',
      title: 'throw, try, catch',
      ref: '05 · The Three Pillars of Exceptions',
      statement: r`- **throw (The Signal):** Erkennt eine Funktion einen Fehler, den sie nicht behandeln kann, „wirft“ sie ein Exception-Objekt. Die laufende Funktion wird **sofort** abgebrochen.
- **try (The Watcher):** Ein Block @@try { ... }@@ sagt: „Überwache diesen Abschnitt auf Exceptions.“
- **catch (The Responder):** Der Block nach try fängt das geworfene Objekt ab. Mehrere catch-Blöcke für verschiedene Fehlertypen sind möglich.`,
    },
    {
      id: 'stack-unwinding',
      title: 'Stack Unwinding',
      ref: '05 · Stack Unwinding',
      statement: r`Nach einem throw geht die Laufzeit die Aufrufkette **rückwärts** durch, bis ein passender catch-Block gefunden ist. Dabei werden die **Destruktoren aller lokalen Objekte** der verlassenen Funktionen aufgerufen.

**Crucial:** Destructors still run!`,
      note: r`Wird nirgends ein catch gefunden, ruft das Programm @@std::terminate()@@ auf und stürzt ab. Exceptions müssen irgendwann gefangen werden.`,
    },
    {
      id: 'std-exception',
      title: 'std::exception und what()',
      ref: '05 · The Standard Exception Hierarchy',
      statement: r`C++ bietet einen Baum von Exception-Klassen; **alle** leiten von @@std::exception@@ ab (Header @@<exception>@@).

Jede Standard-Exception hat die virtuelle Methode @@const char* what() const noexcept;@@, die die Fehlerbeschreibung liefert.`,
      note: r`Nutzen: @@catch (const std::exception& e)@@ fängt **jede** Standard-Exception, und @@e.what()@@ liefert trotzdem die konkrete Meldung.`,
    },
    {
      id: 'zombie',
      title: 'Zombie Object (The Constructor Problem)',
      ref: '05 · The Constructor Problem',
      statement: r`Konstruktoren haben **keinen Rückgabewert**. Scheitert ein Konstruktor ohne Exceptions, entsteht ein **Zombie Object**: Es existiert im Speicher, ist aber in einem ungültigen Zustand.

Mit Exceptions: Der Konstruktor wirft, das Objekt wird **nie vollständig erzeugt**, der Speicher wird aufgeräumt.`,
      note: r`Exceptions sind der einzige saubere Weg, ein Scheitern während der Objektinitialisierung zu behandeln.`,
    },
    {
      id: 'slicing',
      title: 'Slicing',
      ref: '05 · Why "Catch by Reference"?',
      statement: r`Fängt man **by value** (@@catch (std::exception e)@@) und wurde ein @@std::runtime_error@@ geworfen, wird beim Kopieren in die Basisklasse der „zusätzliche“ Teil **abgeschnitten** (sliced). Die konkreten Fehlerdetails gehen verloren.`,
    },
  ],
  theorems: [
    {
      id: 'fehlertabelle',
      title: 'Fehlerarten im Überblick',
      ref: '05 · Error Types Mental Model',
      statement: r`~~~
Kategorie                    Beschreibung                   Entdeckt      Beispiel
Syntax Error                 verletzt Grammatikregeln       Compile-time  fehlendes ;
Semantic Error (compile)     Bedeutung ungültig             Compile-time  falsche Argumenttypen
Semantic Error (run-time)    Bedeutung scheitert bei        Run-time      Division durch null
                             der Ausführung
Logic Error                  Bedeutung falsch, Programm     Run-time      falsche Formel
                             läuft                          (beobachtet)
~~~`,
    },
    {
      id: 'legacy',
      title: 'Legacy: Return Codes und Global Flags',
      ref: '05 · Legacy Approach',
      statement: r`**1. Return Codes** – Funktionen geben einen int zurück (0 Erfolg, -1 Fehler …). Schwächen:
- **Easily Ignored:** Man kann vergessen, den Rückgabewert zu prüfen.
- **Inflexible:** Was, wenn die Funktion schon einen berechneten Wert zurückgeben muss?
- **Pollution:** Die Geschäftslogik wird alle zwei Zeilen von Fehlerprüfungen unterbrochen.

**2. Global Flags** – die Funktion setzt bei Fehlern eine versteckte globale Variable (@@errno@@). Risiken:
- **Race Conditions:** Ein anderer Thread überschreibt das Flag, bevor man es liest.
- **State Confusion:** Man sieht einen Fehler, der von einem früheren Aufruf übrig geblieben ist.`,
    },
    {
      id: 'lebenszyklus',
      title: 'The Exception Life Cycle',
      ref: '05 · The Exception Life Cycle',
      statement: r`1. **Hit a Problem:** Ein Fehler tritt auf.
2. **Create Object:** Ein Exception-Objekt wird erzeugt, etwa @@std::runtime_error@@.
3. **The Search:** Die Laufzeit sucht den nächsten catch-Block, der zum geworfenen Typ passt.
4. **Stack Unwinding:** Rückwärts durch die Funktionsaufrufe; alle lokalen Objekte werden zerstört.
5. **Execution Resumes:** Der Code im catch-Block läuft, danach geht das Programm **hinter** dem catch-Block weiter.`,
    },
    {
      id: 'goldene-regeln',
      title: 'The Golden Rules of C++ Exceptions',
      ref: '05 · Summary',
      statement: r`- **Throw by value, catch by reference.** Immer @@catch (const std::exception& e)@@: keine Kopie (Effizienz), kein Slicing (Polymorphie), und const, weil man das Fehlerobjekt nicht ändern soll.
- **Never throw in a destructor.** Wirft ein Destruktor während des Stack Unwinding, ruft das Programm sofort @@std::terminate@@ auf.
- **Use RAII.** Keine rohen Pointer oder File Handles verwalten; „smarte“ Objekte übernehmen die finally-Logik.`,
      note: r`Faustregel dazu: Exceptions für **außergewöhnliche** Umstände, nicht für Routinelogik.`,
    },
    {
      id: 'finally',
      title: 'Wo ist finally?',
      ref: '05 · Where is finally?',
      statement: r`In Java und Python schließt @@finally@@ Dateien oder gibt Speicher frei, ob ein Fehler auftrat oder nicht. C++ hat **kein** finally – es benutzt **RAII**:

**In C++ ist der Destruktor eines Objekts sein finally-Block.**

Einen finally-Block muss man jedes Mal schreiben; mit RAII geschieht das Aufräumen automatisch beim Stack Unwinding. Dafür die Ressource in ein Objekt wickeln:
- Speicher: @@std::unique_ptr@@ oder @@std::vector@@
- Dateien: @@std::fstream@@
- Mutexe: @@std::lock_guard@@`,
    },
    {
      id: 'hierarchie',
      title: 'Die Standard-Exceptions und wann man sie nimmt',
      ref: '05 · Category 1–3 / Summary Table',
      statement: r`**Logic Errors** – „This is the programmer's fault“, vermeidbar durch Prüfen (Header @@<stdexcept>@@):
- @@std::invalid_argument@@ – ein Argument ist „falsch“ (negatives Alter, nullptr übergeben).
- @@std::out_of_range@@ – Index außerhalb der Grenzen (@@vector.at(10)@@).
- @@std::length_error@@, @@std::domain_error@@ (mathematischer Definitionsbereich, etwa Division durch null).

**Runtime Errors** – „This is the environment's fault“ (Dateisystem, Netzwerk, Hardware):
- @@std::runtime_error@@ – allgemein „beim Laufen ging etwas schief“ (Konfigurationsdatei fehlt).
- @@std::range_error@@, @@std::overflow_error@@, @@std::underflow_error@@.

**Language/System Errors:**
- @@std::bad_alloc@@ – von new, wenn der RAM ausgeht.
- @@std::bad_cast@@ – von dynamic_cast bei inkompatiblem Typ.
- @@std::bad_typeid@@ – typeid auf einem Null-Pointer.`,
    },
    {
      id: 'custom',
      title: 'Eigene Exceptions',
      ref: '05 · Creating Custom Exceptions',
      statement: r`Ist @@std::runtime_error@@ nicht spezifisch genug, leitet man von einer **Standardklasse** ab:

~~~
class DatabaseConnectionError : public std::runtime_error {
public:
    DatabaseConnectionError(const std::string& msg)
        : std::runtime_error(msg) {}
};
~~~

Weil die Klasse von std::runtime_error erbt, wird sie weiterhin von @@catch (const std::exception& e)@@ gefangen – der Code bleibt mit fremden Error Handlern kompatibel.`,
    },
  ],
  claims: [
    {
      id: 'syntax-runtime',
      statement: r`Syntax Errors können erst zur Laufzeit auftreten.`,
      holds: false,
      reason: r`Syntax Errors sind immer Compile-time Errors: Der Compiler kann den Code nicht parsen.`,
      ref: '05 · Syntax Errors',
    },
    {
      id: 'logic-crash',
      statement: r`Ein Logic Error wie ein Off-by-one bringt das Programm nicht unbedingt zum Absturz, liefert aber falsche Ergebnisse.`,
      holds: true,
      reason: r`Logic Errors sind semantische Fehler, die das Programm nicht crashen.`,
      ref: '05 · Semantic Errors',
    },
    {
      id: 'unwinding-dtor',
      statement: r`Beim Stack Unwinding werden die Destruktoren der lokalen Objekte aufgerufen.`,
      holds: true,
      reason: r`„Destructors still run“ – darauf baut RAII auf.`,
      ref: '05 · Stack Unwinding',
    },
    {
      id: 'kein-catch',
      statement: r`Wird eine Exception nirgends gefangen, läuft das Programm nach der Funktion weiter, die geworfen hat.`,
      holds: false,
      reason: r`Ohne passenden catch wird @@std::terminate()@@ aufgerufen; das Programm stürzt ab.`,
      ref: '05 · Stack Unwinding',
    },
    {
      id: 'finally-cpp',
      statement: r`C++ hat wie Java ein Schlüsselwort @@finally@@.`,
      holds: false,
      reason: r`C++ braucht es nicht: Der Destruktor (RAII) übernimmt das Aufräumen.`,
      ref: '05 · Where is finally?',
    },
    {
      id: 'dtor-throw',
      statement: r`Aus einem Destruktor eine Exception zu werfen, ist gute Praxis, um Aufräumfehler zu melden.`,
      holds: false,
      reason: r`Never throw in a destructor: Wirft er während des Stack Unwinding, folgt sofort @@std::terminate@@.`,
      ref: '05 · The Golden Rules',
    },
    {
      id: 'catch-reihenfolge',
      statement: r`Wirft der Code ein @@std::out_of_range@@ und es gibt nur @@catch (const std::invalid_argument& e)@@ und danach @@catch (const std::exception& e)@@, greift der zweite Block.`,
      holds: true,
      reason: r`out_of_range ist kein invalid_argument, aber ein std::exception. Der erste Block passt nicht, der allgemeine fängt.`,
      ref: 'Tutorial 07 · Challenge',
    },
    {
      id: 'nach-throw',
      statement: r`Nach einem @@throw@@ wird der Rest der Funktion noch ausgeführt, bevor der catch-Block läuft.`,
      holds: false,
      reason: r`throw bricht die laufende Funktion sofort ab.`,
      ref: '05 · The Three Pillars',
    },
    {
      id: 'ctor-exception',
      statement: r`Wirft ein Konstruktor eine Exception, wird das Objekt nie vollständig erzeugt.`,
      holds: true,
      reason: r`So vermeidet man Zombie Objects; Konstruktoren haben keinen Rückgabewert, über den sie ein Scheitern melden könnten.`,
      ref: '05 · The Constructor Problem',
    },
    {
      id: 'bad-alloc',
      statement: r`@@std::bad_alloc@@ wird von @@new@@ geworfen, wenn kein Speicher mehr verfügbar ist.`,
      holds: true,
      reason: r`Ein Language/System Error: Ihn wirft die Sprache selbst, nicht der eigene Code.`,
      ref: '05 · Category 3',
    },
  ],
  problems: [
    {
      id: 'bank-account',
      title: 'Bank Account Validator',
      source: 'nach Tasks 05 · ErrorHandling',
      points: 10,
      task: r`1. Schreibe eine eigene Exception @@InsufficientFundsException@@, die von std::runtime_error erbt und aus gewünschtem Betrag und Kontostand eine Meldung baut.
2. Schreibe @@BankAccount@@ mit privatem balance und @@void withdraw(double amount)@@: bei negativem Betrag std::invalid_argument, bei zu hohem Betrag die eigene Exception.
3. Hebe in main von 100.0 erst 50.0, dann 200.0 ab und fange die Fehler spezifisch.`,
      hint: r`std::to_string(...) macht aus einem double einen String. Die spezifischere Exception gehört in den ersten catch-Block.`,
      solution: r`~~~
#include <iostream>
#include <stdexcept>
#include <string>

class InsufficientFundsException : public std::runtime_error {
public:
    InsufficientFundsException(double amount, double balance)
        : std::runtime_error("Withdrawal of " + std::to_string(amount) +
                             " failed. Balance: " + std::to_string(balance)) {}
};

class BankAccount {
private:
    double balance;
public:
    BankAccount(double initial) : balance(initial) {}

    void withdraw(double amount) {
        if (amount < 0) {
            throw std::invalid_argument("Amount cannot be negative!");
        }
        if (amount > balance) {
            throw InsufficientFundsException(amount, balance);
        }
        balance -= amount;
        std::cout << "New balance: " << balance << std::endl;
    }
};

int main() {
    BankAccount myAccount(100.0);
    try {
        myAccount.withdraw(50.0);     // funktioniert
        myAccount.withdraw(200.0);    // wirft
    }
    catch (const InsufficientFundsException& e) {
        std::cerr << "BANK ERROR: " << e.what() << std::endl;
    }
    catch (const std::exception& e) {
        std::cerr << "GENERAL ERROR: " << e.what() << std::endl;
    }
    return 0;
}
~~~

Ausgabe: erst „New balance: 50“, dann „BANK ERROR: Withdrawal of 200.000000 failed. Balance: 50.000000“. Die Prüfungen stehen **vor** der Buchung; nach dem throw wird @@balance -= amount@@ nicht mehr ausgeführt.`,
    },
    {
      id: 'unwinding-trace',
      title: 'Stack Unwinding verfolgen',
      source: 'nach 05 · Stack Unwinding',
      points: 8,
      task: r`@@Guard@@ gibt im Destruktor „~Guard“ und seinen Namen aus. Was gibt das Programm aus?

~~~
void funcB() {
    Guard g("B");
    throw std::runtime_error("boom");
    std::cout << "after throw" << std::endl;
}

void funcA() {
    Guard g("A");
    funcB();
    std::cout << "after B" << std::endl;
}

int main() {
    try {
        funcA();
    } catch (const std::exception& e) {
        std::cout << "caught: " << e.what() << std::endl;
    }
    std::cout << "continues" << std::endl;
    return 0;
}
~~~`,
      solution: r`~~~
~Guard B
~Guard A
caught: boom
continues
~~~

1. funcB wirft und wird sofort beendet – „after throw“ erscheint nie. Sein lokales Objekt wird zerstört.
2. funcA hat kein try/catch; auch es wird verlassen, sein Guard zerstört – „after B“ erscheint nie.
3. main hat einen passenden catch; dort geht es weiter, danach hinter dem catch-Block.

Die Destruktoren laufen **vor** dem catch-Block: erst unwinding, dann Behandlung.`,
    },
    {
      id: 'age-validator',
      title: 'Age Validator mit Wiederholung',
      source: 'nach Tutorial 07 · Challenge',
      points: 7,
      task: r`Schreibe @@checkAge(int age)@@: negatives Alter wirft std::invalid_argument, sonst „Access Denied.“ unter 18 und „Access Granted!“ ab 18.

Frage in main in einer Schleife so lange nach dem Alter, bis ein gültiger (nicht negativer) Wert eingegeben wurde.`,
      solution: r`~~~
#include <iostream>
#include <stdexcept>

void checkAge(int age) {
    if (age < 0) {
        throw std::invalid_argument("Age cannot be negative!");
    }
    if (age < 18) {
        std::cout << "Access Denied." << std::endl;
    } else {
        std::cout << "Access Granted!" << std::endl;
    }
}

int main() {
    bool valid = false;
    while (!valid) {
        int age;
        std::cout << "Age: ";
        std::cin >> age;
        try {
            checkAge(age);
            valid = true;        // nur erreicht, wenn nichts geworfen wurde
        }
        catch (const std::invalid_argument& e) {
            std::cerr << "Input Error: " << e.what() << std::endl;
        }
    }
    return 0;
}
~~~

Nach dem throw wird der Rest von checkAge und die Zeile @@valid = true@@ übersprungen; die Schleife fragt erneut.`,
    },
  ],
});
