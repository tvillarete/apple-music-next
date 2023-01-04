import { useMemo } from "react";

import { slideUpAnimation } from "animation";
import { motion } from "framer-motion";
import { useEventListener, useViewContext } from "hooks";
import { ViewOptions } from "providers/ViewContextProvider";
import styled from "styled-components";
import { Unit } from "utils/constants";
import { IpodEvent } from "utils/events";
import { SelectableListOption } from "components/SelectableList";

interface RootContainerProps {
  index: number;
}

/** Responsible for putting the view at the proper z-index. */
export const RootContainer = styled(motion.div)<RootContainerProps>`
  z-index: ${(props) => props.index};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface ContentTransitionContainerProps {
  isHidden: boolean;
}

/** Slides the view in from the bottom if it is at the top of the stack. */
const ContentTransitionContainer = styled.div<ContentTransitionContainerProps>`
  position: relative;
  width: 100%;
  padding: ${Unit.XS} 0;
  background: linear-gradient(180deg, #bbbcbf 0%, #626770 11.69%, #626770 100%);
  box-shadow: 0 0px 4px black;
`;

const OptionText = styled.h3`
  margin: 0;
  padding: ${Unit.XS} ${Unit.XXS};
  font-size: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #cbccce 48.44%, #dfdfdf 100%);
  border: 3px solid #3e4249;
  border-radius: 12px;
  text-shadow: 0px 0px 1px #505050;
`;

const OptionContainer = styled.div`
  padding: ${Unit.XXS} ${Unit.MD};
  text-align: center;
  border: 3px solid transparent;

  :last-of-type {
    margin-top: ${Unit.XXS};

    ${OptionText} {
      background: linear-gradient(
        180deg,
        #707379 0%,
        #3b3f46 48.44%,
        #363c44 100%
      );
      color: white;
    }
  }
`;

interface Props {
  viewStack: ViewOptions[];
  index: number;
  isHidden: boolean;
}

const ActionSheet = ({ viewStack, index, isHidden }: Props) => {
  const { hideView } = useViewContext();
  const viewOptions = viewStack[index];

  const options: SelectableListOption[] = useMemo(() => {
    const listOptions =
      viewOptions.type === "actionSheet" ? viewOptions.listOptions : [];

    return [
      ...listOptions,
      {
        type: "action",
        label: "Cancel",
        onSelect: () => {},
      },
    ];
  }, [viewOptions]);

  useEventListener<IpodEvent>("centerclick", () => {
    hideView();
  });

  return (
    <RootContainer
      data-view-id={viewOptions.id}
      index={index}
      {...slideUpAnimation}
    >
      <ContentTransitionContainer isHidden={isHidden}>
        {options.map((option, i) => (
          <OptionContainer key={`popup-option-${option.label}`}>
            <OptionText>{option.label}</OptionText>
          </OptionContainer>
        ))}
      </ContentTransitionContainer>
    </RootContainer>
  );
};

export default ActionSheet;
