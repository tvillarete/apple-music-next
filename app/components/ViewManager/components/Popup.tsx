import { useCallback, useMemo } from "react";

import { popupAnimation } from "animation";
import { SelectableListOption } from "components/SelectableList";
import { motion } from "framer-motion";
import { ViewOptions } from "providers/ViewContextProvider";
import styled from "styled-components";
import { Unit } from "utils/constants";
import { useViewContext } from "hooks";

interface RootContainerProps {
  index: number;
}

/** Responsible for putting the view at the proper z-index. */
export const RootContainer = styled(motion.div)<RootContainerProps>`
  z-index: ${(props) => props.index};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ContentTransitionContainerProps {
  $hidden: boolean;
}

const ContentTransitionContainer = styled.div<ContentTransitionContainerProps>`
  position: relative;
  width: min(300px, 80vw);
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  backdrop-filter: blur(40px);
  border-radius: 14px;
  overflow: clip;
`;

const TitleContainer = styled.div`
  padding: ${Unit.MD} ${Unit.SM} ${Unit.SM};
  text-align: center;
`;

const TitleText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.content.primary};
`;

const DescriptionText = styled.p`
  margin: ${Unit.XS} 0 ${Unit.XS};
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.content.primary};
`;

const OptionsContainer = styled.div`
  display: grid;
`;

const OptionButton = styled.button`
  color: ${({ theme }) => theme.colors.blue};
  appearance: none;
  border: none;
  padding: ${Unit.SM} 0;
  font-size: 1rem;
  border-top: 0.33px solid ${({ theme }) => theme.colors.border.opaque};
  background-color: transparent;
  cursor: pointer;

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface Props {
  viewStack: ViewOptions[];
  index: number;
  isHidden: boolean;
}

const Popup = ({ viewStack, index, isHidden }: Props) => {
  const viewOptions = viewStack[index];
  const { hideView } = useViewContext();

  if (viewOptions.type !== "popup") {
    throw new Error("Popup option not supplied");
  }

  const listOptions: SelectableListOption[] = useMemo(() => {
    const listOptions =
      viewOptions.type === "popup" ? viewOptions.listOptions : [];

    return listOptions.length
      ? listOptions
      : [
          {
            type: "action",
            label: "Done",
            onSelect: () => {},
          },
        ];
  }, [viewOptions.listOptions, viewOptions.type]);

  const handleSelect = useCallback(
    (option: SelectableListOption) => {
      if (option.type === "action") {
        option.onSelect();
        hideView();
      }
    },
    [hideView]
  );

  return (
    <RootContainer
      data-view-id={viewOptions.id}
      index={index}
      {...popupAnimation}
    >
      <ContentTransitionContainer $hidden={isHidden}>
        <TitleContainer>
          <TitleText>{viewOptions.title}</TitleText>
          <DescriptionText>{viewOptions.description}</DescriptionText>
        </TitleContainer>
        <OptionsContainer>
          {listOptions.map((option, index) => (
            <OptionButton
              key={`popup-option-${option.label}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionsContainer>
      </ContentTransitionContainer>
    </RootContainer>
  );
};

export default Popup;
