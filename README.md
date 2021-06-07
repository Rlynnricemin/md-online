# md-online: a command-line md server

`md-online` is a simple, zero-configuration command-line markdown file server. It's simple and hackable enough to be used for reading.

## Installation:

#### Globally via `npm`

    npm install --global md-online
     
#### As a dependency in your `npm` package:

    npm install md-online

## Usage:

     md-online [options]

`[path]` defaults to `./`.

*Now you can visit http://localhost:8080 to view your server*


### Available Options:

`-p` or `--port` Port to use (defaults to 8080).

`-h` or `--help` Print this list and exit.

`-f` or `--file` Open a markdown file.

`-l` or `--list` Generate with list.(defaults  without the list of file)

`-v` or `--version` Print the version and exit.


## Example

Open terminal in a folder, and then try

```sh
$ md-online -p 8080 -l
```

![image](https://note.youdao.com/yws/api/personal/file/WEB576a01e812d794a63745a5c7828334e0?method=download&shareKey=8d18887f50e2938b1facf15c1989956d)

or 
```sh
$ md-online -f xxx.md
```

![image](https://note.youdao.com/yws/api/personal/file/WEBf745500188d12f9ad146736c027f1d1c?method=download&shareKey=34b2711e3e01921af63066286451bb07)



*Now you can visit http://localhost:8080 to view markdown file in your folder*


## Personalisation
> Now , it's supported on Linux and Mac platform, and will fix it on Windows platform no soon

## References
+ [marked](https://www.npmjs.com/package/marked)


