const parseSvgString = (svgString) => {
    const parsedDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml')
    const svgElement = parsedDoc?.querySelector('svg');
    return svgElement
}

const SVG_NS = "http://www.w3.org/2000/svg";
function createSVGWithUse(iconId, viewBox = "0 0 48 48") {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttributeNS(null, "href", iconId);
  svg.appendChild(use);
  return { svg, use };
}
function injectSVG(targetElement, iconId) {
  if (!targetElement) return null;
  targetElement.classList.add('vjs-svg-icon');
  const { svg, use } = createSVGWithUse(iconId);
  targetElement.appendChild(svg);
  return use;
}

export { parseSvgString , injectSVG , createSVGWithUse}