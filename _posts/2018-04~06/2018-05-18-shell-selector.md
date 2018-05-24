---
layout: post
title:  "Shell Selector"
date:   2018-05-24
tags: [tip, vscode]
commentIssueId: 79
---



工作环境换了，想切 npm 源还敲一大堆命令？换个 ssh 秘钥这么麻烦？写个 Shell 实现选择器，一个简单的命令快速切换。
* 测试脚本
* 切换 npm 源





## Test.sh

```shell
#!/usr/bin/env bash

# Renders a text based list of options that can be selected by the
# user using up, down and enter keys and returns the chosen option.
#
#   Arguments   : list of options, maximum of 256
#                 "opt1" "opt2" ...
#   Return value: selected index (0 for opt1, 1 for opt2 ...)
function select_option {

    # little helpers for terminal print control and key input
    ESC=$( printf "\033")
    cursor_blink_on()  { printf "$ESC[?25h"; }
    cursor_blink_off() { printf "$ESC[?25l"; }
    cursor_to()        { printf "$ESC[$1;${2:-1}H"; }
    print_option()     { printf "   $1 "; }
    print_selected()   { printf "  $ESC[7m $1 $ESC[27m"; }
    get_cursor_row()   { IFS=';' read -sdR -p $'\E[6n' ROW COL; echo ${ROW#*[}; }
    key_input()        { read -s -n3 key 2>/dev/null >&2
                         if [[ $key = $ESC[A ]]; then echo up;    fi
                         if [[ $key = $ESC[B ]]; then echo down;  fi
                         if [[ $key = ""     ]]; then echo enter; fi; }

    # initially print empty new lines (scroll down if at bottom of screen)
    for opt; do printf "\n"; done

    # determine current screen position for overwriting the options
    local lastrow=`get_cursor_row`
    local startrow=$(($lastrow - $#))

    # ensure cursor and input echoing back on upon a ctrl+c during read -s
    trap "cursor_blink_on; stty echo; printf '\n'; exit" 2
    cursor_blink_off

    local selected=0
    while true; do
        # print options by overwriting the last lines
        local idx=0
        for opt; do
            cursor_to $(($startrow + $idx))
            if [ $idx -eq $selected ]; then
                print_selected "$opt"
            else
                print_option "$opt"
            fi
            ((idx++))
        done

        # user key control
        case `key_input` in
            enter) break;;
            up)    ((selected--));
                   if [ $selected -lt 0 ]; then selected=$(($# - 1)); fi;;
            down)  ((selected++));
                   if [ $selected -ge $# ]; then selected=0; fi;;
        esac
    done

    # cursor position back to normal
    cursor_to $lastrow
    printf "\n"
    cursor_blink_on

    return $selected
}

echo "Select one option using up/down keys and enter to confirm:"
options=("one" "two" "three")

select_option "${options[@]}"
choice=$?

echo "Choosen index = $choice"
echo "        value = ${options[$choice]}"
```



## Test It

```shell
$ chmod +x ./test.sh
$ ./test.sh

```

![](https://user-images.githubusercontent.com/7157346/40214158-cf533320-5a8b-11e8-9f3e-1ed523e5be8d.png)



## 更换 NPM 源的 Use Case

`.bash_profile` 中简单写调用的 shell 文件

```shell
// .bash_profile
// 因为需要兼容 .zsh 语法，所以，直接 bash 吧。。。

function setssh() {
    bash ".bash_profile_setssh.sh" 
}
```

`.bash_profile_setssh.sh` 中实现更换 npm 源 

```shell
// .bash_profile_setssh.sh 

echo "Select one option using up/down keys and enter to confirm:"

allNPMOptions=("registry.npm.alibaba-inc.com" "npm office registry" "registry.npm.taobao.org")

select_option "${allNPMOptions[@]}"
choice=$?

echo "Your choice: ${allNPMOptions[$choice]}"

if [ "$choice" = "0" ]; then
    echo "set npm to [alibaba]"
    npm config set registry http://registry.npm.alibaba-inc.com
elif [ "$choice" = "1" ]; then
    echo "set npm to [npm]"
    npm config delete registry
else
    echo "set npm to [taobao]"
    npm config set registry https://registry.npm.taobao.org
fi

echo ""
echo "===== Current NPM Config ===="
echo ""

npm config list
```



<script src="https://asciinema.org/a/IIJsqqCpteT1oWROPlJFCdSKc.js" id="asciicast-IIJsqqCpteT1oWROPlJFCdSKc" async></script>



## References

* [arrow-key-enter-menu](https://unix.stackexchange.com/questions/146570/arrow-key-enter-menu)