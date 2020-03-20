import through2 from 'through2';

export default function cleanPaths() {
  return through2.obj((chunk, enc, cb) => {
    if (chunk.isBuffer()) {
      const before = chunk.contents.toString(enc);
      const after = before
        .replace(/<clipPath.+?<\/clipPath>/g, '')
        .replace(/clip-path=".+?"/g, '');
      chunk.contents = Buffer.from(after);
      cb(null, chunk);
    } else {
      cb(null, chunk);
    }
  });
}
