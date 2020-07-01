
// @ts-ignore
import sass from "node-sass";

export default function renderScssFile(filePath: string) {
  return new Promise((resolve, reject) => {
    sass.render({
      file: filePath,
      outputStyle: 'compressed',
    }, function(err: any, result: any) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
