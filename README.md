# Start writing frontend (stwr-frontend)
## Cấu Trúc File
    ├──  dist folder
    ├──  src folder 
    │   └──  assets
    │       └──  fonts
    │       └──  images
    │       └──  js
    │       └──  php
    │       └──  scss
    │           └──  components
    │           └──  custom
    │                └──  pages 
    │                └──  plugins                
    │                └──  strucure 
    │           └──  style.scss
    │   │
    │   └──  Partials
    │       └──  All partials Files
    │   │   
    │   └──  All HTML Files
    │
    └──  gulpfile.js
    └──  package.json
    └──  tailwind.config.js
    └──  closure-compiler.js
    └──  javascript-obfuscator.js
    └──  obfhtml.js

## Chức Năng Của Từng File
`gulpfile.js` cấu hình cho những task của gulpfile để thực hiện chức năng : copy file từ src vào dist, mã hóa file js, làm sạch file css

`package.json` lưu chữ những thư viện cần và 1 số lệnh viết tắt để chạy

`tailwind.config.js` cấu hình của tailwind

`closure-compiler.js` nodejs chạy riêng mã hóa file js của closure-compiler có tích hợp sẵn trong gulp, ngoài ra trong gulp còn có dùng `gulp-uglify` nhưng được ẩn đi

`javascript-obfuscator.js` nodejs mã hóa và làm rối javascript, hiện tại chỉ làm sạch và min lại các name function, các biến

`obfhtml.js` nodejs để làm rối class name của css và class name của html. lưu ý : khi chạy sẽ tạo ra thư mục json-obfuscator/main.json là file lưu chữ map làm rối

Nếu đang phát triển thì chạy lệnh `npx gulp`

Nếu xuất file thành phẩm thì chạy `npx gulp build && node obfhtml.js`

## Viết Mã
Sử dụng nhiều các thuộc tính của gulp-file-include [![Gitter][gitter-img]][[gitter-url](https://github.com/haoxins/gulp-file-include/tree/main)]

### Như nhúng file
```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html')
  </body>
</html>
```
### Vòng lặp
```html
<ul>
@@for (var i = 0; i < arr.length; i++) {
  <li>`+arr[i]+`</li>
}
</ul>
```
### Truyền biến
```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>
```
```html
<label>@@name</label>
<label>@@age</label>
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```
### Điều kiện
```
@@include('some.html', { "nav": true })

@@if (name === 'test' && nav === true) {
  @@include('test.html')
}
```
### `loop` statement

* index.html

```html
<body>
  @@loop('loop-article.html', [
    { "title": "My post title", "text": "<p>lorem ipsum...</p>" },
    { "title": "Another post", "text": "<p>lorem ipsum...</p>" },
    { "title": "One more post", "text": "<p>lorem ipsum...</p>" }
  ])
</body>
```

* loop-article.html

```html
<article>
  <h1>@@title</h1>
  @@text
</article>
```

### `loop` statement + data.json

data.json

```js
[
  { "title": "My post title", "text": "<p>lorem ipsum...</p>" },
  { "title": "Another post", "text": "<p>lorem ipsum...</p>" },
  { "title": "One more post", "text": "<p>lorem ipsum...</p>" }
]
```

* loop-article.html
```html
<body>
  @@loop("loop-article.html", "data.json")
</body>
```

### `webRoot` built-in context variable

The `webRoot` field of the context contains the relative path from the source document to
the source root (unless the value is already set in the context options).

### example

support/contact/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <link type=stylesheet src=@@webRoot/css/style.css>
  </head>
  <body>
    <h1>Support Contact Info</h1>
    <footer><a href=@@webRoot>Home</a></footer>
  </body>
  </body>
</html>
```

and the result is:

```html
<!DOCTYPE html>
<html>
  <head>
    <link type=stylesheet src=../../css/style.css>
  </head>
  <body>
    <h1>Support Contact Info</h1>
    <footer><a href=../..>Home</a></footer>
  </body>
  </body>
</html>
```