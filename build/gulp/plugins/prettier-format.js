import through2 from 'through2';
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';

const fsPromises = fs.promises;
const prettierConfigPath = '../../../.prettierrc';

export default function prettierFormat(userOptions) {
  return through2.obj(async (chunk, enc, cb) => {
    if (chunk.isBuffer()) {
      const before = chunk.contents.toString(enc);
      const defaultOptionBuffer = await fsPromises.readFile(
        path.resolve(__dirname, prettierConfigPath)
      );
      const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
      const options = Object.assign({}, defaultOptions, userOptions);
      const formattedContent = prettier.format(before, options);
      chunk.contents = Buffer.from(formattedContent);
      cb(null, chunk);
    } else {
      cb(null, chunk);
    }
  });
}
