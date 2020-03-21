import through2 from 'through2';
import exportIcons from '../templates/export-icons';
import { paramCaseToCamelCase } from '../../utils';

export default function getIndex() {
  return through2.obj((chunk, enc, cb) => {
    const fileName = chunk.stem;
    const identifier = paramCaseToCamelCase(fileName);
    const path = `./entities/${fileName}`;
    const result = exportIcons(identifier, path);
    chunk.contents = Buffer.from(result);
    cb(null, chunk);
  });
}
