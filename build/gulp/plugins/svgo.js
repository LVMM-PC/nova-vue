import SVGO from 'svgo';
import through2 from 'through2';

export default function svgo(options) {
  const optimizer = new SVGO(options);
  return through2.obj((chunk, enc, cb) => {
    if (chunk.isBuffer()) {
      const before = chunk.contents.toString(enc);
      optimizer.optimize(before).then(result => {
        const after = result.data;
        chunk.contents = Buffer.from(after);
        cb(null, chunk);
      });
    } else {
      cb(null, chunk);
    }
  });
}
