export function sortSprites(a, b) {
  if (a.group < b.group) return 1;
  if (a.group > b.group) return -1;
  if (a.zIndex < b.zIndex) return 1;
  if (a.zIndex > b.zIndex) return -1;
  return 0;
}
