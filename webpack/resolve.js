const path = require('path');

module.exports = {
  // 别名
  alias: {
    '@': path.join(__dirname, '../src'),
    components: path.join(__dirname, '../components'),
    store: path.join(__dirname, '../store'),
    pages: path.join(__dirname, '../src/pages'),
    styles: path.join(__dirname, '../static/styles'),
  },
  // 省略后缀
  extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
};
