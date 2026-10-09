# Fortgeschrittene Programmierung – Prüfungstrainer

Ein Lerntrainer für die Vorlesung Fortgeschrittene Programmierung (FPROG/PROG2, Foliensätze 01 bis
08a): Grundlagen und Einordnung von Programmiersprachen, C++ von Stack und Heap über Klassen, RAII,
Copy Semantics, Vererbung und Polymorphie bis zu Exceptions, Templates und Modern C++, danach Java
von der JVM über Methoden, Vererbung, abstrakte Klassen, Interfaces und static bis zu Wrapper
Classes, Enums, Casting und Strings. Definitionen, Regeln und Konzepte, Wahr-oder-falsch-Aussagen
und klausurnahe Aufgaben mit Musterlösung, dazu Wiederholung in wachsenden Abständen, Nachschlagen
und eine Prüfungssimulation auf Zeit.

Entstanden aus dem Theoretische-Informatik-Trainer: Lernablauf (erst zeigen, dann abfragen, bis es
zweimal sitzt), Wiederholungsplanung (FSRS), Architektur und Aussehen sind übernommen. Neu sind die
Inhalte: 17 Kapitel mit 416 Karten, den Folien, den Tasks 01 bis 07, den Tutorials 01 bis 09b und der
Coding Practice zu 08a nachgebaut. Die Erklärungen sind auf Deutsch; die Fachbegriffe stehen wie auf
den Folien auf Englisch (Pass by Reference, Stack Unwinding, Dynamic Method Dispatch). Code steht in
Code-Blöcken, Speicherbilder und Vergleichstabellen ebenso. Der Trainer ist eine Web-App, die als
eine einzige HTML-Datei gebaut wird und auch auf dem Handy läuft.

## Was drin ist

| Bereich          | Was er tut                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Lernen           | Pro Kapitel vier Decks. Neue Definitionen und Regeln werden gezeigt, dann abgefragt.       |
| Wiederholen      | Was gewusst wurde, kommt nach FSRS wieder: kurz vor dem Vergessen.                         |
| Wahr oder falsch | Aussagen beurteilen, mit Begründung oder Gegenbeispiel. Wird automatisch bewertet.         |
| Aufgaben         | Code schreiben, Ausgaben verfolgen, Fehler finden, Speicherbilder – mit Tipp und Lösung.   |
| Nachschlagen     | Volltextsuche über alles, mit Filter nach Kapitel und Art.                                 |
| Prüfung          | Zufällige Aufgaben auf Zeit, danach Selbstkorrektur mit Punkten und Auswertung je Kapitel. |
| Tutor (optional) | Als veröffentlichtes Claude-Artifact: eigene Antwort prüfen oder etwas erklären lassen.    |

Alles lässt sich mit der Tastatur bedienen (Leertaste, 1–4, W/F, T, S, Esc); die Tasten stehen an den
Knöpfen und in den Einstellungen.

## Kapitel

| Foliensatz | Kapitel                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| 01         | Programmiersprachen einordnen · Ausführungsmodelle, Syntax, Semantik, OOP      |
| 02         | C++: Einstieg und Programmaufbau · Speicher: Stack, Heap und Pointer           |
| 03         | Mehrere Dateien, Referenzen und Datentypen · Funktionen, Overloading, Übergabe |
| 04         | Klassen, Object Lifecycle und RAII · Copy Semantics · Vererbung · Polymorphie  |
| 05         | Error Handling und Exceptions                                                  |
| 05–06      | Templates und Modern C++                                                       |
| 07a        | Java: Mental Model, JVM und Speicher                                           |
| 07b        | Java: Syntax, Kontrollfluss und erste Klassen                                  |
| 07c        | Java: Methoden, Pass-by-Value und Vererbung                                    |
| 07d        | Java: Overriding, Polymorphie, Abstraktion und static                          |
| 08a        | Java Language Features                                                         |

## Inhalte ergänzen

Ein Kapitel ist eine Datei in `src/data/topics/`. Texte sind Rich Text: Absätze durch Leerzeilen,
Listen mit `- `, `**fett**`, kurzer Code zwischen `@@…@@` und Code-Blöcke zwischen zwei Zeilen `~~~`
(Einrückung und Leerzeilen bleiben erhalten), Formeln als TeX zwischen `$…$` oder `$$…$$`. Die Texte
stehen in `String.raw`, damit Backslashes nicht verdoppelt werden müssen (`"\n"` in C++-Code bleibt,
wie es ist) – deshalb darf im Text nie `${` und nie ein Backtick stehen. Ein Dollarzeichen ist immer
ein Formelbegrenzer, kann also nicht als Zeichen im Text oder im Code stehen. Fett wird auch
innerhalb von `@@…@@` ausgewertet: zwei Sterne hintereinander (etwa ein Pointer auf einen Pointer)
gehören in einen Code-Block.

Die Codebeispiele der Folien sind größtenteils Bilder und lagen beim Erstellen nicht als Text vor;
der Code im Trainer folgt den Tutorials, den Starter-Codes der Tasks und den Folientexten. Für einen
späteren Foliensatz (etwa 08b) eine neue Datei anlegen und in `src/data/topics.ts` eintragen.

`pnpm test` rendert jeden Text einmal und schlägt fehl, wenn eine Formel nicht lesbar ist, ein
Code-Block nicht geschlossen wurde oder eine ID doppelt vorkommt. IDs nicht nachträglich ändern: der
Fortschritt hängt an ihnen.

## Aufbau

```
src/
├─ domain/      rein funktional, ohne Vue: content (Typen, Suche, Rich Text), practice (Sitzung als
│               Elm-Modell, Lern- und Wiederholstrategie), scheduling (FSRS), progress, exam
├─ data/        die Kapitel
├─ platform/    MathJax, Speicher (localStorage, im Artifact zusätzlich pro Konto), Tutor
├─ stores/      Pinia: Fortschritt
├─ composables/ useProgram (Elm-Laufzeit), usePracticeSession, useHotkeys
├─ features/    library, practice, lookup, exam, settings
└─ components/  Bausteine ohne eigene Logik
```

## Befehle

| Befehl       | Zweck                                       |
| ------------ | ------------------------------------------- |
| `pnpm dev`   | Entwicklungsserver                          |
| `pnpm build` | baut `dist/index.html`, eine einzelne Datei |
| `pnpm test`  | Tests, darunter: jeder Text ist lesbar      |
| `pnpm lint`  | ESLint                                      |

## Mitarbeiten

Fehler im Material oder Ideen? [CONTRIBUTING.md](CONTRIBUTING.md) erklärt den Weg über Fork und Pull
Request. Wie der Trainer lokal läuft, veröffentlicht wird und was man beim Fortschritt und beim Sync
nicht kaputtmachen darf, steht in [docs/entwicklung.md](docs/entwicklung.md).

## Lizenz

[GPL-3.0-or-later](LICENSE). Die Inhalte folgen den Foliensätzen, Tasks und Tutorials von Prof. Dr.
Lamya Abdullah (Sommersemester 2026); Formulierungen, Aufgaben und Lösungen sind eigene und ohne
Gewähr.
