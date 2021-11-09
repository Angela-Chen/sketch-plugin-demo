import UI from 'sketch/ui';

export const onSelectionChanged = context => {
  // console.log(context);
};

export const onStartUp = () => {
  UI.message('Sketch-plugin-demo 插件已启动');
}

export const onShutdown = () => {
  UI.message('Sketch-plugin-demo 插件已被禁用');
}
