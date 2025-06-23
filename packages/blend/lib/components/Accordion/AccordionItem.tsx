import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { styled } from "styled-components";
import { AccordionItemProps, AccordionType, AccordionChevronPosition } from "./types";
import accordionTokens from "./accordion.tokens";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";

const StyledAccordionItem = styled(RadixAccordion.Item)<{
  $accordionType: AccordionType;
  $isDisabled: boolean;
}>((props) => ({
  ...accordionTokens.base.item,
  ...accordionTokens.type[props.$accordionType].item,
  ...(props.$isDisabled && props.$accordionType === AccordionType.BORDER && accordionTokens.states.disabled),
}));

const StyledAccordionHeader = styled(RadixAccordion.Header)({
  display: "flex",
});

const StyledAccordionTrigger = styled(RadixAccordion.Trigger)<{
  $accordionType: AccordionType;
  $isDisabled: boolean;
}>((props) => ({
  ...accordionTokens.base.trigger,
  ...accordionTokens.type[props.$accordionType].trigger,
  ...(props.$isDisabled && {
    ...accordionTokens.states.disabled,
    cursor: "not-allowed",
  }),
  '&[data-state="open"]': {
    ...(props.$accordionType === AccordionType.BORDER && accordionTokens.states.open),
  },
}));

const StyledAccordionContent = styled(RadixAccordion.Content)<{
  $accordionType: AccordionType;
}>((props) => ({
  ...accordionTokens.base.content,
  ...accordionTokens.type[props.$accordionType].content,
}));

const ChevronIcon = styled(Block)<{
  $chevronPosition: AccordionChevronPosition;
}>((props) => ({
  transition: 'transform 200ms ease',
  transformOrigin: 'center',
  
  ...(props.$chevronPosition === AccordionChevronPosition.RIGHT && {
    '[data-state="open"] &': {
      transform: 'rotate(180deg)',
    },
  }),
  
  ...(props.$chevronPosition === AccordionChevronPosition.LEFT && {
    '[data-state="open"] &': {
      transform: 'rotate(90deg)',
    },
  }),
}));

const AccordionItem = forwardRef<
  HTMLDivElement,
  AccordionItemProps & {
    accordionType?: AccordionType;
    chevronPosition?: AccordionChevronPosition;
  }
>(
  (
    {
      value,
      title,
      children,
      subtext,
      leftSlot,
      rightSlot,
      subtextSlot,
      isDisabled = false,
      chevronPosition = AccordionChevronPosition.RIGHT,
      className,
      accordionType = AccordionType.NO_BORDER,
    },
    ref
  ) => {
    const getChevronIcon = () => {
      const iconStyles = {
        width: accordionTokens.layout.chevronIcon.default.width,
        height: accordionTokens.layout.chevronIcon.default.height,
        ...(isDisabled 
          ? accordionTokens.layout.chevronIcon.disabled 
          : accordionTokens.layout.chevronIcon.enabled),
      };

      return (
        <ChevronIcon 
          $chevronPosition={chevronPosition}
          style={iconStyles}
        >
          {chevronPosition === AccordionChevronPosition.RIGHT ? (
            <ChevronDown style={{ width: '100%', height: '100%' }} />
          ) : (
            <ChevronRight style={{ width: '100%', height: '100%' }} />
          )}
        </ChevronIcon>
      );
    };

    return (
      <StyledAccordionItem
        value={value}
        disabled={isDisabled}
        className={className}
        ref={ref}
        data-disabled={isDisabled || undefined}
        $accordionType={accordionType}
        $isDisabled={isDisabled}
      >
        <StyledAccordionHeader>
          <StyledAccordionTrigger
            $accordionType={accordionType}
            $isDisabled={isDisabled}
            disabled={isDisabled}
            data-type={accordionType}
            data-disabled={isDisabled || undefined}
          >
            <Block width="100%" position="relative">
              <Block style={accordionTokens.layout.headerRow}>
                {chevronPosition === AccordionChevronPosition.LEFT && (
                  <Block 
                    style={accordionTokens.layout.chevronLeft}
                    aria-hidden="true"
                  >
                    {getChevronIcon()}
                  </Block>
                )}
                
                {leftSlot && (
                  <Block style={accordionTokens.layout.leftSlot}>
                    {leftSlot}
                  </Block>
                )}
                
                <Block 
                  flexGrow={1}
                  style={{
                    ...accordionTokens.base.title,
                    ...(isDisabled ? accordionTokens.base.titleDisabled : accordionTokens.base.titleEnabled)
                  }}
                >
                  <PrimitiveText
                    fontSize={accordionTokens.base.title.fontSize}
                    fontWeight={accordionTokens.base.title.fontWeight}
                    color={isDisabled 
                      ? accordionTokens.base.titleDisabled.color 
                      : accordionTokens.base.titleEnabled.color
                    }
                  >
                    {title}
                  </PrimitiveText>
                </Block>
                
                {rightSlot && (
                  <Block style={accordionTokens.layout.rightSlot}>
                    {rightSlot}
                  </Block>
                )}
                
                {chevronPosition === AccordionChevronPosition.RIGHT && (
                  <Block 
                    style={accordionTokens.layout.chevronRight}
                    aria-hidden="true"
                  >
                    {getChevronIcon()}
                  </Block>
                )}
              </Block>

              {(subtext || subtextSlot) && (
                <Block 
                  display="flex" 
                  alignItems="center"
                  style={{
                    ...accordionTokens.base.subtext,
                  }}
                >
                  {subtext && (
                    <PrimitiveText
                      fontSize={accordionTokens.base.subtext.fontSize}
                      color={isDisabled 
                        ? accordionTokens.base.subtextDisabled.color 
                        : accordionTokens.base.subtextEnabled.color
                      }
                    >
                      {subtext}
                    </PrimitiveText>
                  )}
                  {subtextSlot && (
                    <Block marginLeft="8px" flexShrink={0}>
                      {subtextSlot}
                    </Block>
                  )}
                </Block>
              )}
            </Block>
          </StyledAccordionTrigger>
        </StyledAccordionHeader>
        
        <StyledAccordionContent $accordionType={accordionType}>
          <Block style={{
            ...accordionTokens.base.contentWrapper,
            ...accordionTokens.type[accordionType].contentWrapper
          }}>
            {children}
          </Block>
        </StyledAccordionContent>
      </StyledAccordionItem>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export default AccordionItem; 