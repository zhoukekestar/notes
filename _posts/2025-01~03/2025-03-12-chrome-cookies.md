---
layout: post
title:  "Unlock the Chrome Cookies"
date:  2025-03-12
tags: [tool]
---

    You can't read anything from Chrome's Profile Folder. Everything is owned by yourself, but you just can't.

# User Data Directory

    check this document: https://chromium.googlesource.com/chromium/src/+/main/docs/user_data_dir.md

```sh
$ cd ~/Library/Application\ Support/Google/Chrome/Default

# can't read current directory's files
$  ls
ls: fts_read: Operation not permitted

# check current user role
$ whoami
zhoukeke

# check file owner
$ ll ./Cookies
-rw-r--r--@ 4 zhoukeke  staff   168K Mar 12 14:34 ./Cookies


# show file content
$ cat ./Cookies
cat: ./Cookies: Operation not permitted

# can't do it even by root
$ sudo cat ./Cookies
Password:
cat: ./Cookies: Operation not permitted
```


# Lock Profile Cookie Database

    check this: https://stackoverflow.com/questions/76440733/unable-to-open-cookie-file

    All profile's files is locked by Chrome, even it's closed!

# A method to steal the Running Cookies

    This is found by myself, it works on MacOS. Copy it by `ln`

```sh
$ cd ~/Library/Application\ Support/Google/Chrome

# can't show content
$ cat ./Default/Cookies
cat: ./Default/Cookies: Operation not permitted

# can't copy use cp
$ cp ./Default/Cookies ./Cookies
cp: ./Default/Cookies: Operation not permitted

# copy by ln
$ ln ./Default/Cookies ./Cookies
$ cat ./Cookies
...xxx...

```


# One more thing

    This fellowing command can't works on Mac & Chrome 134
    
```
$ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-features=LockProfileCookieDatabase
```

