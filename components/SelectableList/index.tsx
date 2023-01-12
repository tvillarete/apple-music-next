import { useCallback, useRef } from "react";

import ErrorScreen from "components/ErrorScreen";
import { AnimatePresence } from "framer-motion";
import styled, { css } from "styled-components";

import LoadingScreen from "components/LoadingScreen";
import { ViewOption } from "components/views";
import { useAudioPlayer, useViewContext } from "hooks";
import SelectableListItem from "./SelectableListItem";
import { IconProps } from "components/Icon/icons/sharedTypes";
import { IconName } from "components/Icon/Icon";

export const getConditionalOption = (
  condition?: boolean,
  option?: SelectableListOption
) => (option && condition ? [option] : []);

export type SelectableListOptionType =
  | "view"
  | "link"
  | "song"
  | "action"
  | "actionSheet"
  | "popup";

export type ImageProps = {
  url?: string;
  size?: number;
  styles?: React.CSSProperties;
};

type SharedOptionProps = {
  type?: SelectableListOptionType;
  label: string;
  isSelected?: boolean;
  subLabel?: string;
  image?: ImageProps;
  iconLeft?: IconProps & {
    name: IconName;
  };
  longPressOptions?: SelectableListOption[];
};

type ViewOptionProps = {
  type: "view";
  /** A unique identifier for the next screen. */
  viewId: ViewOption["id"];
  /** The component that will be displayed in the next view. */
  component: () => JSX.Element;
  headerTitle?: string;
};

type LinkOptionProps = {
  type: "link";
  url: string;
};

type SongOptionProps = {
  type: "song";
  /** Options that will be used to fetch and play a song. */
  queueOptions: MediaApi.QueueOptions;
  /**
   * Show the Now Playing view after starting the song.
   * @default false
   */
  showNowPlayingView?: boolean;
};

type ActionOptionProps = {
  type: "action";
  onSelect: () => void;
};

export type PopupOptionProps = {
  type: "popup";
  /** A unique identifier for the popup. */
  popupId: string;
  listOptions: SelectableListOption[];
  title: string;
  description?: string;
};

export type ActionSheetOptionProps = {
  type: "actionSheet";
  /** A unique identifier for the action sheet. */
  id: string;
  listOptions: SelectableListOption[];
};

/** Depending on the option type, certain properties will be available. */
export type SelectableListOption = SharedOptionProps &
  (
    | ViewOptionProps
    | LinkOptionProps
    | SongOptionProps
    | ActionOptionProps
    | ActionSheetOptionProps
    | PopupOptionProps
  );

const RootContainer = styled.div<{ $variant: "list" | "grid" }>`
  width: 100%;

  ${({ $variant }) =>
    $variant === "grid"
      ? css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-gap: 30px;
          padding: 16px;
          align-items: stretch;
          justify-items: center;
        `
      : null};
`;

interface Props {
  options: SelectableListOption[];
  loading?: boolean;
  emptyMessage?: string;
  variant?: "list" | "grid";
}

const SelectableList = ({
  options,
  loading,
  emptyMessage = "Nothing to see here",
  variant = "list",
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showView } = useViewContext();
  const { play } = useAudioPlayer();

  const handleShowView = useCallback(
    (option: SharedOptionProps & ViewOptionProps) => {
      showView({
        id: option.viewId,
        type: "screen",
        title: option.headerTitle,
        component: option.component,
      });
    },
    [showView]
  );

  const handleClick = useCallback(
    async (option: SelectableListOption) => {
      switch (option.type) {
        case "song":
          await play(option.queueOptions);
          break;
        case "link":
          window.open(option.url, "_blank");
          break;
        case "view":
          handleShowView(option);
          break;
        case "action":
          option.onSelect();
          break;
      }
    },
    [handleShowView, play]
  );

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingScreen backgroundColor="white" />
      ) : options.length > 0 ? (
        <RootContainer ref={containerRef} $variant={variant}>
          {options.map((option, index) => (
            <SelectableListItem
              key={`option-${option.label}-${index}`}
              option={option}
              onClick={() => handleClick(option)}
              variant={variant}
            />
          ))}
        </RootContainer>
      ) : (
        <ErrorScreen message={emptyMessage} />
      )}
    </AnimatePresence>
  );
};

export default SelectableList;
