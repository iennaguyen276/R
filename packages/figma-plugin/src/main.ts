// Figma plugin main
function ensurePage(name: string): PageNode {
  const existing = figma.root.children.find((p) => p.name === name) as PageNode | undefined;
  if (existing) return existing;
  const page = figma.createPage();
  page.name = name;
  return page;
}

function createPaintStyle(name: string, color: string): PaintStyle {
  const style = figma.createPaintStyle();
  style.name = name;
  const rgb = hexToRgb(color);
  style.paints = [
    {
      type: 'SOLID',
      color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 },
    },
  ];
  return style;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

figma.on('run', () => {
  const tokensPage = ensurePage('00 - Design Tokens');
  figma.currentPage = tokensPage;
  // Minimal demo: create a couple of brand color styles
  createPaintStyle('Color/Primary/1', '#1D4ED8');
  createPaintStyle('Color/Primary/2', '#6D28D9');
  createPaintStyle('Color/Primary/3', '#06B6D4');
  figma.notify('ВЫЗОВ: стили цветов созданы');
  figma.closePlugin();
});
