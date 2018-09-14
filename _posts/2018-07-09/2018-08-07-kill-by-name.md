



## Kill Process

```sh
$ ps -ej | grep " ping " | awk '{print $2}' | xargs kill -s SIGINT
```



Add it to your `.bash_profile` 

```bash
function killname() {
  if [ "$1" = "" ]; then
     echo "Nothing to do"
  else
    ps -ej | grep "$1"
    ps -ej | grep "$1" | awk '{print $2}' | xargs kill -s SIGINT
  fi
}
```

