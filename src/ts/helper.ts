const parseSvgString = (svgString:string) => {
    const parsedDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml')
    const svgElement = parsedDoc?.querySelector('svg');
    return svgElement
}

export { parseSvgString }