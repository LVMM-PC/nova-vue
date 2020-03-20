import through2 from 'through2';
import parseXml from '@rgrove/parse-xml';
import prettier from 'prettier';

function toAbstractNode(node) {
  const { name, attributes, children } = node;

  const currentNode = {
    tag: name,
    attrs: {
      ...attributes
    },
    children: children.map(child => {
      return child.type === 'element' ? toAbstractNode(child) : null;
    })
  };

  if (!(currentNode.children && currentNode.children.length)) {
    delete currentNode.children;
  }

  return currentNode;
}

export default function iconDefinition() {
  return through2.obj((chunk, enc, cb) => {
    if (chunk.isBuffer()) {
      const before = chunk.contents.toString(enc);
      const xmlTree = parseXml(before);
      const xmlRootNode =
        xmlTree.type === 'document' ? xmlTree.children[0] : xmlTree;

      const abstractRootNode = toAbstractNode(xmlRootNode);
      const content = JSON.stringify(abstractRootNode);
      const formattedContent = prettier.format(content, { parser: 'json' });
      chunk.contents = Buffer.from(formattedContent);
      cb(null, chunk);
    } else {
      cb(null, chunk);
    }
  });
}
