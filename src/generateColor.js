import SketchDom from 'sketch/dom';
import UI from 'sketch/ui';
import Mock from 'mockjs';
const Random = Mock.Random;

export default () => {
  const doc = SketchDom.getSelectedDocument();
  const layers = doc.selectedLayers.layers;
  if (layers.length) {
    layers.forEach(layer => {
      const { type, layers: subLayers = [] } = layer;
      if (type === 'Group') {
        subLayers.forEach(subLayer => {
          const randomColor = Random.hex();
          if (subLayer.type === 'ShapePath') {
            subLayer.style.fills[0].color = randomColor;
          }
          if (subLayer.type === 'Text') {
            subLayer.text = randomColor;
          }
        });
      }
    });
  } else {
    UI.message('当前没有元素被选中，请选择');
  }
};