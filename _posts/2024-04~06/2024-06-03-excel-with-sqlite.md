---
layout: post
title:  "使用 sqlite 处理 excel"
date:  2024-06-03
tags: [js]
---

  使用 sqlite 处理 excel 数据。

# 安装

* [sqlite3](https://www.sqlite.org/download.html)
* [xlite](https://github.com/x2bool/xlite)

 下载后解压到 `/Users/your-user-name/bin/sqlite3/`

# 配置环境变量


```sh
export PATH="/Users/your-user-name/bin/sqlite3/:$PATH"
```

# 新建 sql 处理脚本

```sh
function sql() {
  echo "CREATE VIRTUAL TABLE t USING xlite ( FILENAME '$1', WORKSHEET 'Sheet1' );"
  echo "EXAMPLE: select A from t limit 2;"
  echo ".excel to output excel format for a Single QUERY"
  echo "Control + C to quit sqlite"

 /Users/your-user-name/bin/sqlite3/sqlite3 -cmd ".mode table" -cmd ".load /Users/your-user-name/bin/sqlite3/libxlite" -cmd "CREATE VIRTUAL TABLE t USING xlite ( FILENAME '$1', WORKSHEET 'Sheet1' );"
}
```

# 执行

```sh
sql ./test.xlsx
```

# 测试

```sh
$ sql Book4.xlsx
CREATE VIRTUAL TABLE t USING xlite ( FILENAME 'Book4.xlsx', WORKSHEET 'Sheet1' );
.excel to output excel format
SQLite version 3.46.0 2024-05-23 13:25:27
Enter ".help" for usage hints.
sqlite>
sqlite>
sqlite> select * from t;
+---+-----+
| A |  B  |
+---+-----+
| a | 姓名a |
| b | 姓名b |
| a | 姓名a |
+---+-----+
sqlite> select distinct * from t;
+---+-----+
| A |  B  |
+---+-----+
| a | 姓名a |
| b | 姓名b |
+---+-----+
sqlite> .excel
sqlite> select distinct * from t;
sqlite>
```

# References

* [.excel 导出为 excel](https://sqlite.org/forum/info/89003be02636d9d8fb763c0e662334deb3fc4a4c4f04146a66ebf7704cad02e8)
* [使用 cmd 执行默认命令](https://unix.stackexchange.com/questions/397806/how-to-pass-multiple-commands-to-sqlite3-in-a-one-liner-shell-command)


