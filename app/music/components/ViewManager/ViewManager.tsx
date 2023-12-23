import { useViewContext } from "music/hooks";
import { memo } from "react";

import ActionSheetViewManager from "./ActionSheetViewManager";
import ScreenViewManager from "./ScreenViewManager";
import PopupViewManager from "./PopupViewManager";

const ViewManager = () => {
  const { viewStack } = useViewContext();
  const screenViews = viewStack.filter((view) => view.type === "screen");
  const actionSheetViews = viewStack.filter(
    (view) => view.type === "actionSheet"
  );
  const popupViews = viewStack.filter((view) => view.type === "popup");

  return (
    <>
      <ScreenViewManager viewStack={screenViews} />
      <ActionSheetViewManager viewStack={actionSheetViews} />
      <PopupViewManager viewStack={popupViews} />
    </>
  );
};

export default memo(ViewManager);
