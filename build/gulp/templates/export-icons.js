export default function exportIcons(identifier, path) {
  return `export { default as ${identifier} } from '${path}';`;
}
