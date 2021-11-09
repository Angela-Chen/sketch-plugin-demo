import SketchDom from 'sketch/dom';
import UI from 'sketch/ui';
import Mock from 'mockjs';
const Random = Mock.Random;

export default () => {
  const doc = SketchDom.getDocuments(); // 获取已选中文档
  const layers = doc[0].pages[0].layers || []; // 获取已选择图层
  if (layers.length) {
    layers.forEach(layer => {
      const { type, layers: subLayers = [] } = layer;
      if (type === 'Group') { // 矩形色块和文本成组，可通过Group检索到
        subLayers.forEach(subLayer => {
          const randomColor = Random.hex(); // 随机生成RGB色值
          if (subLayer.type === 'ShapePath') {
            subLayer.style.fills[0].color = randomColor; // 更新矩形颜色
          }
          if (subLayer.type === 'Text') {
            subLayer.text = randomColor; // 更新文本内容为RGB色值
          }
        });
      }
    });
  } else {
    UI.message('当前没有元素被选中，请选择');
  }
};

export function onOpenDocument() {

};