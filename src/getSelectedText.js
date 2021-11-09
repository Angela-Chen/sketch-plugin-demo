import SketchDom from 'sketch/dom';
import UI from 'sketch/ui';
const strArray = [];

const getTextValue = (layers) => {
  if (layers.length) {
    layers.forEach(layer => {
      const { type, layers: subLayers = [] } = layer;
      if (type === 'Text') {
        strArray.push(layer.text);
      }
      if (subLayers.length) {
        getTextValue(subLayers);
      }
    });
  }
}

const print = () => {
  UI.message(strArray.toString());
}

export default () => {
  const doc = SketchDom.getSelectedDocument();
  const layers = doc.selectedLayers.layers;
  getTextValue(layers);
  print(strArray);
  console.log(strArray);
};