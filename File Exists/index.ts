/*
1- bin section in package.json
"bin": { binary (executable)
  "exists": "index.js"
}

// not required in windows
2- comment to be treated like executable
#!/usr/bin/env node

3- link the project (npm link)
*/

import fs from 'fs/promises';

const exists = (file: string) =>
  new Promise<{ file: string; exists: boolean }>(async (resolve, reject) => {
    try {
      await fs.access(file);
      resolve({ file, exists: true });
    } catch (err) {
      if (err.code !== 'ENOENT') reject(err);

      resolve({
        file,
        exists: false,
      });
    }
  });

(async () => {
  try {
    const res = await exists(process.argv[2]);
    console.log(`${res.file} does${res.exists ? '' : ' not'} exist`);
  } catch (err) {
    console.error(err);
  }
})();
