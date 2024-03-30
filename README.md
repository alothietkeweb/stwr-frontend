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
