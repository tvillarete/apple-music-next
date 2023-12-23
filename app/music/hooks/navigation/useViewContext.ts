import { useCallback, useContext } from "react";

import {
  ScreenViewOptionProps,
  ViewContext,
  ViewOptions,
} from "music/providers/ViewContextProvider";

export interface ViewContextHook {
  /** Push an instance of ViewOptions to the viewStack. */
  showView: (view: ViewOptions) => void;
  /** Given an id, remove the view from the stack (otherwise, pop the top view). */
  hideView: (id?: string) => void;
  /** Removes all views except the first from the viewStack. */
  resetViews: () => void;
  /** Returns an array of ViewOptions. */
  viewStack: ViewOptions[];
  /** Checks if the current view's id matches the given id.
   * Useful for enabling/disabling scrolling if a view is hidden.
   */
  isViewActive: (id: string) => boolean;
  setScreenViewOptions: (
    viewId: ViewOptions["id"],
    options: Partial<Omit<ScreenViewOptionProps, "id">>
  ) => void;
  toggleAudioControlsDrawer: (value?: boolean) => void;
  isAudioControlsDrawerOpen: boolean;
}

/**
 * This hook allows any component to access three parameters:
 *   1. showView
 *   2. hideView
 *   3. viewStack
 *
 *   Use it whenever you want to open a new view (@type ViewOptions).
 *
 *    @example
 *    `const {showView, hideView, viewStack} = useViewContext();`
 */
export const useViewContext = (): ViewContextHook => {
  const [viewContextState, setViewContextState] = useContext(ViewContext);

  const toggleAudioControlsDrawer = useCallback(
    (value?: boolean) => {
      setViewContextState((prevState) => ({
        ...prevState,
        isAudioControlsDrawerOpen:
          value ?? !prevState.isAudioControlsDrawerOpen,
      }));
    },
    [setViewContextState]
  );

  const showView = useCallback(
    (view: ViewOptions) => {
      setViewContextState((prevViewState) => ({
        ...prevViewState,
        viewStack: [...prevViewState.viewStack, view],
      }));
    },
    [setViewContextState]
  );

  const hideView = useCallback(
    (id?: string) => {
      if (viewContextState.viewStack.length === 1) return;
      setViewContextState((prevViewState) => {
        const newViewStack = id
          ? prevViewState.viewStack.filter(
              (view: ViewOptions) => view.id !== id
            )
          : prevViewState.viewStack.slice(0, -1);

        const activeView = newViewStack[newViewStack.length - 1];

        return {
          ...prevViewState,
          viewStack: newViewStack,
        };
      });
    },
    [setViewContextState, viewContextState.viewStack.length]
  );

  const resetViews = useCallback(() => {
    setViewContextState((prevState) => ({
      ...prevState,
      viewStack: prevState.viewStack.slice(0, 1),
    }));
  }, [setViewContextState]);

  const isViewActive = useCallback(
    (id: string) => {
      const { viewStack: viewStack } = viewContextState;
      const curView = viewStack[viewStack.length - 1];
      return curView.id === id;
    },
    [viewContextState]
  );

  const setScreenViewOptions = useCallback(
    (
      viewId: ViewOptions["id"],
      options: Partial<Omit<ScreenViewOptionProps, "id">>
    ) => {
      setViewContextState((prevState) => {
        const viewIndex = prevState.viewStack.findIndex(
          ({ id }) => id === viewId
        );

        if (viewIndex === -1) {
          console.error("View not found: ", viewId);
          return prevState;
        }

        const view = prevState.viewStack[viewIndex];

        if (view?.type !== "screen") {
          console.error("View is not a screen: ", view);
          return prevState;
        }

        const updatedView = { ...view, ...options };
        const newViewStack = [...prevState.viewStack];
        newViewStack[viewIndex] = updatedView;

        return {
          ...prevState,
          viewStack: newViewStack,
        };
      });
    },
    [setViewContextState]
  );

  return {
    showView: showView,
    hideView: hideView,
    resetViews: resetViews,
    isViewActive: isViewActive,
    viewStack: viewContextState.viewStack,
    setScreenViewOptions,
    isAudioControlsDrawerOpen: viewContextState.isAudioControlsDrawerOpen,
    toggleAudioControlsDrawer,
  };
};

export default useViewContext;
