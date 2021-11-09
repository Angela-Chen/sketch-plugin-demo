import SketchDom from 'sketch/dom';
import UI from 'sketch/ui';
const strArray = [];
// 递归获取每个层级图层中的文本内容，并存储到strArray数组中
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
// 用message提示信息的方式展示获取到的文本内容
const print = () => {
  UI.message('已选择的文本内容：' + strArray.toString()});
}

export default () => {
  const doc = SketchDom.getSelectedDocument(); // 获取已选中的文档
  const layers = doc.selectedLayers.layers; // 获取已选中的图层
  getTextValue(layers);
  print(strArray);
};

export function onOpenDocument() {

};