import Icon, { IconName } from "components/Icon/Icon";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const RootContainer = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.p`
  color: #d34c4b;
`;

export interface ScreenViewHeaderActionProps {
  iconName?: IconName;
  title?: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ScreenViewHeaderAction = ({
  iconName,
  onClick,
  title,
  ...props
}: ScreenViewHeaderActionProps) => {
  return (
    <RootContainer onClick={onClick} {...props}>
      {iconName ? <Icon size="medium" name={iconName} color="#D34C4B" /> : null}
      {title ? <Text>{title}</Text> : null}
    </RootContainer>
  );
};

export default ScreenViewHeaderAction;
