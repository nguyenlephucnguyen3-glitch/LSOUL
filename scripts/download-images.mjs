// Tải toàn bộ ảnh từ Google Drive về public/images rồi chuyển web sang dùng ảnh local.
// Chạy: npm run images
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { IMAGES } = await import(pathToFileURL(join(root, 'src/data/images.js')).href);
const outDir = join(root, 'public/images');
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [key, { id, file }] of Object.entries(IMAGES)) {
  const url = `https://lh3.googleusercontent.com/d/${id}=w1800`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(join(outDir, file), Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log(`✓ ${key} → public/images/${file}`);
  } catch (err) {
    console.error(`✗ ${key}: ${err.message}`);
  }
}

const total = Object.keys(IMAGES).length;
if (ok === total) {
  await writeFile(
    join(root, 'src/data/image-source.js'),
    "// 'drive' = tải ảnh từ Google Drive | 'local' = dùng ảnh trong public/images\nexport default 'local';\n",
  );
  console.log(`\nĐã tải ${ok}/${total} ảnh. Web giờ dùng ảnh local trong public/images.`);
} else {
  console.log(`\nTải được ${ok}/${total} ảnh. Web vẫn dùng ảnh từ Drive; chạy lại lệnh để thử tiếp.`);
}
