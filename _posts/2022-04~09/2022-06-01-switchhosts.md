---
layout: post
title:  "Switch Hosts for Chrome"
date:  2022-06-01
tags: [note]
---

How to Switch Hosts Quickly!

## Switch Hosts Hook

Use SwitchHosts' Custom commands, we can hook it after hosts changed.

![](https://img.alicdn.com/imgextra/i3/O1CN01zeitEm1Gs6tcifV8Y_!!6000000000677-2-tps-1620-1124.png)

## DNS Flush for Chrome

We always switch hosts for Chrome, but Chrome Extension like [Flush DNS & close sockets](https://chrome.google.com/webstore/detail/flush-dns-close-sockets/mlmlfmdmhdplgecgmiihhfjodokajeel) need launch Chrome with args `--enable-net-benchmarking` which cause a little complex.

So I google it and find a [interesting solution](https://superuser.com/a/949882/1106425) through AppleScript.


## Steps

1. Chrome -> View -> Developer -> Allow Javascript from Apple Events
2. Edit a AplleScript like this:

```
#!/usr/bin/osascript

--This script is to resolve the problem that Chrome can't use the correct hosts after modifying hosts file  because of  Chrome using socket pools.
--This script just simulates the click event on the button of "Flush socket pool"  on chrome://net-internals/#sockets page.
--created by Boreas320 on 2015-3-28
tell application "Google Chrome"
	tell front window

		--record current active tab and its index.
		set origTab to active tab
		set origTabIndex to active tab index

		set theTab to make new tab with properties {URL:"chrome://net-internals"}

        -- wait for loading
		set isLoadDone to not loading of theTab
		repeat until isLoadDone
			set isLoadDone to not loading of theTab
		end repeat

        -- DO clear actions
		execute theTab javascript "console.log('clear');document.getElementById('sockets-view-close-idle-button').click();document.getElementById('sockets-view-flush-button').click();document.getElementById('dns-view-clear-cache').click()"

		close theTab

		--reactive the previous tab
		set active tab index to origTabIndex

		--reload the previous tab
		reload origTab

	end tell
end tell
```

3. Add `yourscript.applescript` to your SwitchHosts' Custom Command

