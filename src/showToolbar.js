export default (context) => {
  const contentView = context.document.documentWindow().contentView();
  const stageView = contentView.subviews().objectAtIndex(0);

  // 1.创建 toolbar
  const toolbar = NSStackView.alloc().initWithFrame(NSMakeRect(0, 0, 57, 520));
  toolbar.setBackgroundColor(NSColor.windowBackgroundColor());
  toolbar.setFlipped(true)
  toolbar.setSpacing(8)
  toolbar.orientation = 1;

  // 2.创建 Button
  const button = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 20, 10))
  button.setBackgroundColor(NSColor.whiteColor())
  button.setTitle("数据填充")
  button.setFont(NSFont.fontWithName_size('Arial', 11))

  // 3.将 Button 加入 toolbar
  toolbar.addView_inGravity(button, 2);

  // 4.将 toolbar 加入 SketchWindow
  const views = stageView.subviews()
  const finalViews = []
  for (let i = 0; i < views.count(); i++) {
    finalViews.push(views[i])
    if (views[i].identifier() === 'view_canvas') {
      finalViews.push(toolbar)
    }
    stageView.subviews = finalViews
    stageView.adjustSubviews()
  }
}