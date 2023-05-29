---
layout: post
title:  "postgresql quick start"
date:  2023-05-29
tags: [note]
---


# install psql

```sh
$ brew install libpq
```

# connect

```sh
$ psql -h  xxx.com -p 5432 -U lighthouse

```

# create db

```sh

lighthouse-> \l
                                                    List of databases
    Name    |   Owner    | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |     Access privileges
------------+------------+----------+------------+------------+------------+-----------------+---------------------------
 adbpgadmin | adbpgadmin | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
(6 rows)


CREATE TABLE pipe_test_table (
first integer not null default 0,
second text);
```

# insert

```sh
lighthouse=> INSERT INTO pipe_test_table VALUES (1,'content');
lighthouse=> INSERT INTO pipe_test_table VALUES (2,'pipe_test');
INSERT 0 1
lighthouse=> select * from pipe_test_table;
 first |  second
-------+-----------
     1 | content
     2 | pipe_test
(2 rows)
```

# References

* [https://www.postgresql.org/docs/current/app-psql.html](https://www.postgresql.org/docs/current/app-psql.html)
* [https://www.tutorialspoint.com/postgresql/postgresql_java.htm](https://www.tutorialspoint.com/postgresql/postgresql_java.htm)
