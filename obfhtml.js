const fs = require('fs');
const postcss = require("postcss");
const obfuscator = require("postcss-obfuscator");
const autoprefixer = require("autoprefixer");

const cssFilePath = 'dist/assets/css/style.css';
const outputFilePath = 'dist/assets/css/style.css';

fs.readFile(cssFilePath, (err, css) => {
    postcss([autoprefixer, 
        obfuscator({
            enable: true,
            length: 3,
            srcPath: 'dist',
            desPath: 'dist',
            jsonsPath: "json-obfuscator",
            extensions: ['.html','.php','.css']
        })])
    .process(css, { from: cssFilePath, to: outputFilePath })
    .then(result => {
        fs.writeFile(outputFilePath, result.css, () => true)
        if ( result.map ) {
            fs.writeFile('app.css.map', result.map.toString(), () => true)
        }
        //chạy đổi tên class cho html
        let jsonContent = null;
        try {
            const directoryPath = './dist/';
            jsonContent = fs.readFileSync('json-obfuscator/main.json', 'utf8');
            const jsonMap = JSON.parse(jsonContent);
            const newObj = Object.fromEntries(
                Object.entries(jsonMap).map(([key, value]) => [
                key.replace(/\./g, ''),
                value.replace(/\./g, ''),
                ])
            );            
            //scan thư mục và đổi class css
            readFilesFromDirectory(directoryPath,newObj);

        } catch (err) {
            if (err.code === 'ENOENT') {
            console.error('Lỗi: File json-obfuscator/main.json không tồn tại');
            } else {
            console.error('Lỗi khi đọc file:', err);
            }
            process.exit();
        }
    })
})

// Hàm đệ quy để duyệt qua tất cả các file trong thư mục
function readFilesFromDirectory(directory,newObj) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = directory + file;
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    // Nếu là thư mục, tiếp tục đệ quy vào thư mục con
                    readFilesFromDirectory(filePath + '/');
                } else if (stats.isFile() && file.endsWith('.html')) {
                    // Nếu là file HTML, thực hiện thay thế các class
                    replaceClassesInHtml(filePath,newObj);
                }
            });
        });
    });
}

// Hàm thay thế các class trong file HTML
function replaceClassesInHtml(filePath,newObj) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return;
        }

        let htmlContent = data;
        Object.keys(newObj).forEach(oldClass => {
            const newClass = newObj[oldClass];        
            const regex = new RegExp(oldClass, 'g');
            htmlContent = htmlContent.replace(regex, newClass);
        });

        // Ghi lại file HTML sau khi đã thay thế các class
        fs.writeFile(filePath, htmlContent, 'utf8', err => {
            if (err) {
                console.error('Error writing HTML file:', err);
                return;
            }
            console.log(`Classes replaced in ${filePath}`);
        });
    });
}