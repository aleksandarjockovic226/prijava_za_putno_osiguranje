# Prijava za putno osiguranje

Projekat kreiran kao rešenje za drugi krug selekcije za poziciju "Junior Full Stack Developer".

## Korišćeni Stack

**Traženi stack za zadatak:** PHP-u 7.4.x, Javascript, MySql, Bootstrap

**Dodatne korišćene tehnologije:** docker, docker-compose

## Pokretanje projekta

Komanda za kloniranje projekta na vaš računar:

```bash
git clone https://github.com/aleksandarjockovic226/prijava_za_putno_osiguranje
```

Komanda za navigaciju do direktorijuma projekta:

```bash
cd prijava_za_putno_osiguranje
```

Najlakši način da pokrenete projekat je da koristite docker-compose.

_Ako nemate instalirane docker i docker-compose na računaru_

- Preporučujem da pratite uputstva za instaliranje docker-a i docker-compose-a sa zvaničnih docker stranica: https://docs.docker.com/engine/install/ .

Komanda za pokretanje projekta pomoću docker-compose:

```bash
docker-compose up --build -d
```

Komande za isključivanje projekta koriste docker-compose:

```bash
docker-compose down
```

Ako ste započeli projekat koristeći docker-compose, i niste modifikovali datoteku docker-compose.yaml, možete posetiti:

- Projekat: http://localhost:8000
- phpMyAdmin: http://localhost:8080

  _Username i Password za phpMyAdmin nalaze se u .env datoteci kao vrednost promenljivih "MYSQL_USER" i "MYSQL_PASSWORD"_
