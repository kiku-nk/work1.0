// make-index.js
/**
 * make-index.js
 *
 * 📦 SCSSの各ディレクトリにあるパーシャル（_◯◯.scss）を自動的に列挙し、
 *    @forward を使った _index.scss を生成する補助スクリプト。
 *
 * 🛠 使用方法：
 *   プロジェクトルートで以下を実行：
 *     $ node tools/make-index.js
 *
 * 📁 対象ディレクトリ例：
 *   - src/scss/foundation/
 *   - src/scss/component/
 *   - src/scss/layout/
 *   - src/scss/page/
 *
 * 📌 注意：
 *   - _index.scss 自体は無視されます（上書きされるため）
 *   - サブディレクトリ対応はしていません（必要なら拡張可能）
 *
 * 🧑‍💻 管理用スクリプトです。クライアント側で使用するJSではありません。
 */

const fs = require('fs');
const path = require('path');

const targetDirs = [
  './src/scss/component',
  './src/scss/foundation',
  './src/scss/layout',
  './src/scss/page'
];

targetDirs.forEach(targetDir => {
  const indexFile = path.join(targetDir, '_index.scss');

  const files = fs.readdirSync(targetDir)
    .filter(file => file.endsWith('.scss') && file !== '_index.scss')
    .map(file => `@forward "${path.basename(file, '.scss')}";`)
    .join('\n');

  fs.writeFileSync(indexFile, files);
  console.log(`✅ _index.scss generated in ${targetDir}`);
});
