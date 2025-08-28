# FeastFrenzy - Senior Refactor

This project is a senior-level refactoring of an initial homework assignment. The original goal was to create a simple web application for a factory canteen. This version elevates the codebase to modern, professional standards with a focus on maintainability, testability, and a clean architecture.

## About This Refactoring

The original project was a functional but basic implementation. The goal of this refactoring was to apply senior-level engineering practices to improve the codebase significantly.

### Key Improvements:

- **Backend Architecture:**
  - **Modular Structure:** The backend was restructured into a more modular and maintainable architecture. Database logic, routes, and services are now clearly separated.
  - **Database & Models:** Refactored the Sequelize models to use a centralized loading mechanism, eliminating circular dependencies and improving organization.
  - **API Design:** Implemented proper error handling (404, 500) and a health check endpoint (`/health`).
  - **Code Quality:** Replaced outdated dependencies (e.g., `body-parser`) with modern Express.js equivalents.

- **Testing:**
  - **Test Suite:** Introduced a complete testing suite for the backend using Mocha, Chai, and Supertest.
  - **Test Database:** Configured the test environment to use an in-memory SQLite database, ensuring tests are fast and isolated.
  - **Test Coverage:** Added tests for API endpoints and business logic, ensuring the backend is reliable.

- **Frontend UI/UX:**
  - **Dependency Management:** Corrected version conflicts in `package.json` to ensure a stable frontend build.
  - **UI Enhancement:** Replaced the default Bootstrap styles with a modern theme from Bootswatch ("Vapor") to create a more polished and "fancy" user interface.
  - **Code Cleanup:** Fixed minor issues in the navigation and branding.

- **Development Experience:**
  - **Clear Setup:** Provided clear, step-by-step instructions for setting up and running the project.
  - **Professional Documentation:** This `README.md` file was created to provide a comprehensive overview of the project.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v12.18.0 or higher)
- npm (v6 or higher)
- MySQL (v8.0.0 or higher)

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create a `.env` file:**
    Create a new `.env` file with the following content:

    ```
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=feastfrenzy
    PORT=3000
    ```

    _Note: You will need to create the `feastfrenzy` database in your MySQL server._

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

    The backend server will be running at `http://localhost:3000`.

5.  **Run tests:**
    ```bash
    npm test
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    _Note: This project has some dependency resolution issues. Use the `--legacy-peer-deps` flag if you encounter `ERESOLVE` errors._

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Run the development server:**
    ```bash
    npm start
    ```
    The frontend development server will be running at `http://localhost:4200`.

---

## Original Task Description (Hungarian)

> # FeastFrenzy v.1.0.0
>
> ## A feladat
>
> A feladat elkészítése során egy üzemi étkezde néhány felületét kell elkészíteni.
> Az üzem vezetősége nem tudta eldönteni, hogy milyen eszközt biztosít az étkezdéseknek, ezért webes alkalmazást kell készíteni. Az alkalmazás használata során keletkezett adatokat adatbázisban tároljuk.
> Az üzemben a dolgozó a munkakörülmények miatt, nem tarthat magánál kézpénzt, ezért az étkezdében a fogyasztásukat rögzítik, majd fizetéskor a „tartozásuk" egy összegben levonásra kerül.
> Az üzemi dolgozókat karbantartani nem szükséges — karbantartása egy másik modulban kerül majd megvalósításra.
> A termékeket —menü, kávé, üdítő... - szintén nem szükséges karbantartani. Minden terméknek fix ára van, amely a termék rögzítésével együtt kerül bevitelre. Természetesen a későbbiekben a karbantartó felületen az árak tetszőleges időpontban megváltoztathatók lesznek.
>
> ### A feladat során elkészítendő felületek
>
> 1.  Értékesítési felület, amelyen meg kell tudni adni, hogy mely dolgozó fogyasztása kerül rögzítésre. Tételeket termék és mennyiség megadásával kell tudni megadni, törölni, módosítani. Egy értékesítéshez több különböző termék tartozhat. Egy értékesítés vagy törlésre kerül vagy lezárásra, ami után már nem módosítható.
> 2.  A dolgozói fogyasztásriport azt mutatja meg, hogy dolgozóinkén mennyi értékben volt fogyasztás abban a hónapban, amely hónapban a lekérdezés történik.
> 3.  A termékek fogyásának riportja azt mutatja meg, hogy a termékekből mennyi fogyott az adott hónapban - rendezve a fogyás mennyiségére fordítottan.
>
> ### Amit várunk
>
> - Forráskód.
> - A db és a kiindulási adatok létrehozásához szükséges SQL szkript.
> - A futtató környezet rövid leírása.
>
> ## A futtató környezet rövid leírása
>
> A futtató környezet a következő elemekből áll:
> -Operációs rendszer: Windows/macOS/Linux
> -Web-kiszolgáló: Node.js
> -Programozási nyelv: TypeScript
> -Adatbázis-kezelő rendszer: MySQL
> -Szükséges könyvtárak: Angular, Express, MySQL, npm
>
> A projekt futtatásához szükséges Node.js verzió : min 12.18.0
> -A projekt futtatásához szükséges Angular CLI verzió : min 12.0.0
> -A projekt futtatásához szükséges MySQL verzió: min 8.0.0
> Az alkalmazást el lehet indítani a parancssorból, az Angular CLI segítségével futtatva a ng serve parancsot a projekt gyökérkönyvtárában. A futtató környezet beállítása után az alkalmazás elérhető lesz a http: // localhost: 4200 / címen a böngészőben.
>
> ### Amit várunk
>
> - Forráskód.
> - A db és a kiindulási adatok létrehozásához szükséges SQL szkript.
> - A futtató környezet rövid leírása.
