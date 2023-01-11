# FeastFrenzy v.1.0.0

## A feladat

A feladat elkészítése során egy üzemi étkezde néhány felületét kell elkészíteni.
Az üzem vezetősége nem tudta eldönteni, hogy milyen eszközt biztosít az étkezdéseknek, ezért webes alkalmazást kell készíteni. Az alkalmazás használata során keletkezett adatokat adatbázisban tároljuk.
Az üzemben a dolgozó a munkakörülmények miatt, nem tarthat magánál kézpénzt, ezért az étkezdében a fogyasztásukat rögzítik, majd fizetéskor a „tartozásuk" egy összegben levonásra kerül.
Az üzemi dolgozókat karbantartani nem szükséges — karbantartása egy másik modulban kerül majd megvalósításra.
A termékeket —menü, kávé, üdítő... - szintén nem szükséges karbantartani. Minden terméknek fix ára van, amely a termék rögzítésével együtt kerül bevitelre. Természetesen a későbbiekben a karbantartó felületen az árak tetszőleges időpontban megváltoztathatók lesznek.

### A feladat során elkészítendő felületek

1. Értékesítési felület, amelyen meg kell tudni adni, hogy mely dolgozó fogyasztása kerül rögzítésre. Tételeket termék és mennyiség megadásával kell tudni megadni, törölni, módosítani. Egy értékesítéshez több különböző termék tartozhat. Egy értékesítés vagy törlésre kerül vagy lezárásra, ami után már nem módosítható.
2. A dolgozói fogyasztásriport azt mutatja meg, hogy dolgozóinkén mennyi értékben volt fogyasztás abban a hónapban, amely hónapban a lekérdezés történik.
3. A termékek fogyásának riportja azt mutatja meg, hogy a termékekből mennyi fogyott az adott hónapban - rendezve a fogyás mennyiségére fordítottan.

### Amit várunk

- Forráskód.
- A db és a kiindulási adatok létrehozásához szükséges SQL szkript.
- A futtató környezet rövid leírása.

## A futtató környezet rövid leírása

A futtató környezet a következő elemekből áll:
-Operációs rendszer: Windows/macOS/Linux
-Web-kiszolgáló: Node.js
-Programozási nyelv: TypeScript
-Adatbázis-kezelő rendszer: MySQL
-Szükséges könyvtárak: Angular, Express, MySQL, npm

A projekt futtatásához szükséges Node.js verzió : min 12.18.0
-A projekt futtatásához szükséges Angular CLI verzió : min 12.0.0
-A projekt futtatásához szükséges MySQL verzió: min 8.0.0
Az alkalmazást el lehet indítani a parancssorból, az Angular CLI segítségével futtatva a ng serve parancsot a projekt gyökérkönyvtárában. A futtató környezet beállítása után az alkalmazás elérhető lesz a http: // localhost: 4200 / címen a böngészőben.
