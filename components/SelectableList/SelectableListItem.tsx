import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Unit } from "utils/constants";

import { SelectableListOption } from ".";

const RootButtonContainer = styled.button`
  width: 100%;
  border: none;
  background-color: white;
  padding: 0;
  margin: 0;
  appearance: none;
  display: flex;
  align-items: center;
  height: 57px;
  cursor: pointer;

  :active {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

const IconContainer = styled.div`
  margin-left: 16px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 0.2fr;
  height: 100%;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.36);
  text-align: left;
`;

const LeftContentContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const Label = styled.p`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
`;

const SubLabel = styled(Label)`
  font-weight: normal;
  font-size: 12px;
  color: #3c3c4399;
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  margin-right: ${Unit.XXS};
`;

const Icon = styled.img`
  margin-left: auto;
`;

interface Props {
  option: SelectableListOption;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const SelectableListItem = ({ option, onClick }: Props) => {
  return (
    <RootButtonContainer onClick={onClick}>
      {option.imageUrl && (
        <IconContainer>
          <Image src={option.imageUrl} alt="Option image" />
        </IconContainer>
      )}

      <ContentContainer>
        <LeftContentContainer>
          <Label>{option.label}</Label>
          {option.subLabel && <SubLabel>{option.subLabel}</SubLabel>}
        </LeftContentContainer>
        <RightContentContainer>
          <Icon src="chevron-right.svg" />
        </RightContentContainer>
      </ContentContainer>
    </RootButtonContainer>
  );
};

export default SelectableListItem;
