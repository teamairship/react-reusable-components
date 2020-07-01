
// @ts-ignore
import sass from "node-sass";

export default function generateScssFile(data: string, outFile: string) {
  return new Promise((resolve, reject) => {
    sass.render({
      data,
      outFile,
      outputStyle: 'compressed',
      sourceComments: true,
    }, function(err: any, result: any) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
