Simple thing I made to check if a site has changed or not. It uses `libnotify` to send notifications, which is a Linux thing. If you're on something else, you'll want to switch to something like `node-notifier`.

The `.env` file contains the following arguments:

* SITEURL: The URL to check
* TYPE: PNG diff or TXT diff
* SELECTOR: optional selector for text, otherwise it grabs the whole HTML file

The first time it runs, it'll get a file called `baseline` in either the img or txt folder. Subsequent runs it'll make a new file called `compare` in the respective folder, then compare the two files. For an image check, it creates a `diff.png` file to illustrate the difference.