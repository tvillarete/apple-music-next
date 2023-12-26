import Icon from "components/Icon/Icon";
import { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { Unit } from "utils/constants";

import { SelectableListOption } from ".";

type ListItemVariant = "list" | "grid";

const BACKGROUND_COLOR = "rgb(199, 199, 204)";

const RootButtonContainer = styled.button<{
  $hasImage: boolean;
  $variant: ListItemVariant;
  $height?: number;
}>`
  width: 100%;
  border: none;
  background-color: white;
  padding-left: ${({ $hasImage }) => ($hasImage ? 0 : "16px")};
  margin: 0;
  appearance: none;
  display: flex;
  align-items: center;
  height: ${({ $height }) => ($height ? `${$height + 16}px` : "3rem")};
  min-height: 57px;
  cursor: pointer;
  user-select: none;

  &:active {
    background-color: ${({ $variant }) =>
      $variant === "list" ? BACKGROUND_COLOR : null};
  }

  ${({ $variant }) =>
    $variant === "grid"
      ? css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-left: 0;
          height: unset;
          width: 100%;
          max-width: 250px;

          :active {
            background-color: unset;

            img {
              filter: brightness(0.8);
            }
          }
        `
      : null};
`;

const IconContainer = styled.div<{ $variant: ListItemVariant }>`
  margin: ${({ $variant }) => ($variant === "list" ? "0 8px 0 16px" : "0")};
`;

const ContentContainer = styled.div<{ $variant: ListItemVariant }>`
  flex: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 0.2fr;
  height: 100%;
  border-bottom: 0.5px solid ${BACKGROUND_COLOR};
  text-align: left;

  ${({ $variant }) =>
    $variant === "grid"
      ? css`
          grid-template-columns: unset;
          border-bottom: none;
          width: 100%;
        `
      : null};
`;

const LeftContentContainer = styled.div<{ $variant: ListItemVariant }>`
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubLabel = styled(Label)<{ $variant: ListItemVariant }>`
  font-weight: normal;
  font-size: ${({ $variant }) => ($variant === "grid" ? "15px" : "14px")};
  color: #3c3c4399;
`;

const Image = styled.img<{ $variant: ListItemVariant; $size?: number }>`
  height: ${({ $size }) => ($size ? `${$size}px` : "3rem")};
  width: ${({ $size }) => ($size ? `${$size}px` : "3rem")};
  margin-right: ${Unit.XXS};
  pointer-events: none;

  ${({ $variant }) =>
    $variant === "grid"
      ? css`
          height: auto;
          max-height: 250px;
          width: 100%;
          max-width: 250px;
          border-radius: 8px;
        `
      : null}
`;

const StyledArrowRight = styled(Icon)`
  margin-left: auto;
`;

interface Props {
  option: SelectableListOption;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant: ListItemVariant;
}

const SelectableListItem = ({ option, onClick, variant = "list" }: Props) => {
  const hasImage = !!option.image;
  const hasIconLeft = !!option.iconLeft && variant === "list";
  const hasIconRight = variant === "list";
  const hasImageOrIconLeft = hasImage || hasIconLeft;

  return (
    <RootButtonContainer
      onClick={onClick}
      $hasImage={hasImageOrIconLeft}
      $variant={variant}
      $height={option.image?.size}
    >
      {hasImageOrIconLeft && (
        <IconContainer $variant={variant}>
          {hasImage && (
            <Image
              $variant={variant}
              src={option.image?.url}
              $size={option.image?.size}
              style={option.image?.styles}
              alt="Option image"
            />
          )}
          {hasIconLeft && <Icon {...option.iconLeft!} />}
        </IconContainer>
      )}

      <ContentContainer $variant={variant}>
        <LeftContentContainer $variant={variant}>
          <Label>{option.label}</Label>
          {option.subLabel && (
            <SubLabel $variant={variant}>{option.subLabel}</SubLabel>
          )}
        </LeftContentContainer>
        {hasIconRight && (
          <RightContentContainer>
            <StyledArrowRight size="xsmall" color="#C5C5C6" name="arrowRight" />
          </RightContentContainer>
        )}
      </ContentContainer>
    </RootButtonContainer>
  );
};

export default SelectableListItem;
