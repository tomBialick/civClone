async function mapWrapper(height, width) {
  const { default: MapGen } = await import('./map_gen.mjs');
  return MapGen(height, width);
};

module.exports.mapWrapper = mapWrapper;
