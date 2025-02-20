import { createContext, useState } from "react";

import { SelectableListOption } from "components/SelectableList";
import { LibraryView, ViewOption, views } from "components/views";
import { ScreenViewHeaderActionProps } from "components/ScreenViewHeader/ScreenViewHeaderAction";

type SharedOptionProps = {
  id: ViewOption["id"];
  type: ViewOption["type"];
  /** Fire an event when the view closes. */
  onClose?: (..._args: any[]) => void;
  /** Any extra styles you want to pass to the view. */
  styles?: Record<string, any>;
};

export type ScreenViewOptionProps<
  TComponent extends React.ComponentType<any> = any
> = {
  /** These view types allow you to pass in a custom component to render. */
  type: "screen";
  /** The React component that will be rendered in the view. */
  component: TComponent;
  /** Props that will be passed to the component. */
  props?: Omit<React.ComponentProps<TComponent>, "id">;
  /** Fire an event when the view closes. */
  onClose?: (..._args: any[]) => void;
  title?: string;
  headerRightActions?: ScreenViewHeaderActionProps[];
};

type ActionSheetViewOptionProps = {
  type: "actionSheet";
  listOptions: SelectableListOption[];
};

type PopupViewOptionProps = {
  type: "popup";
  title: string;
  description?: string;
  listOptions: SelectableListOption[];
};

export type ViewOptions<TComponent extends React.ComponentType<any> = any> =
  SharedOptionProps &
    (
      | ScreenViewOptionProps<TComponent>
      | ActionSheetViewOptionProps
      | PopupViewOptionProps
    );

interface ViewContextState {
  viewStack: ViewOptions[];
  headerTitle?: string;
  isAudioControlsDrawerOpen: boolean;
}

type ViewContextStateType = [
  ViewContextState,
  React.Dispatch<React.SetStateAction<ViewContextState>>
];

export const ViewContext = createContext<ViewContextStateType>([
  {
    viewStack: [],
    headerTitle: "Library",
    isAudioControlsDrawerOpen: false,
  },
  () => {},
]);

interface Props {
  children: React.ReactNode;
}

const ViewContextProvider = ({ children }: Props) => {
  const viewStack: ViewOptions[] = [
    {
      id: "library",
      type: "screen",
      component: LibraryView,
    },
  ];
  const [viewContextState, setViewContextState] = useState<ViewContextState>({
    viewStack,
    headerTitle: views.library.title,
    isAudioControlsDrawerOpen: false,
  });

  return (
    <ViewContext.Provider value={[viewContextState, setViewContextState]}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
