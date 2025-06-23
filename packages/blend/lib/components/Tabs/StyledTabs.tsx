import styled, { css } from "styled-components";
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { TabsVariant, TabsSize } from "./types";
import { useComponentToken } from "../../context/useComponentToken";
import { TabsTokensType } from "./tabs.token"; // Removed TabsInteractionState as it's not used here
// tabsUtils are mostly replaced by direct token access, but keep for now if any complex logic is needed.
// import { getIconContainerStyles } from "./tabsUtils"; 

export const StyledTabs = styled(TabsPrimitive.Root)`
  ${() => { // Removed theme
    const tokens = useComponentToken("TABS") as TabsTokensType;
    return css`
      width: ${tokens.rootLayout?.width || "100%"};
    `;
  }}
`;

export const StyledTabsContent = styled(TabsPrimitive.Content)`
  ${() => { // Removed theme
    const tokens = useComponentToken("TABS") as TabsTokensType;
    return css`
      width: 100%;
      outline: none;
      position: relative;
      padding: ${tokens.content?.padding};
      margin-top: ${tokens.content?.marginTop};
      animation-duration: ${tokens.content?.animation?.duration};
      animation-timing-function: ${tokens.content?.animation?.timingFunction};
    `;
  }}
`;

export const StyledTabsList = styled(TabsPrimitive.List)<{
  $variant: TabsVariant;
  $size: TabsSize; // Keep $size if list styling depends on it, e.g. height
  $expanded: boolean;
}>`
  ${({ $variant, $size, $expanded }) => { // Removed theme
    const tokens = useComponentToken("TABS") as TabsTokensType;
    const listLayout = tokens.list.layout[$variant];
    return css`
      display: ${listLayout?.display || "flex"};
      width: ${listLayout?.width || "100%"};
      align-items: ${listLayout?.alignItems || "center"};
      gap: ${listLayout?.gap};
      border: none;
      position: relative;
      padding: ${listLayout?.padding};
      background-color: ${listLayout?.backgroundColor};
      border-radius: ${listLayout?.borderRadius};
      border-bottom-width: ${listLayout?.borderBottomWidth};
      border-bottom-color: ${listLayout?.borderBottomColor};
      height: ${tokens.list.size?.[$size]?.height};

      ${$expanded && css`
        justify-content: ${tokens.list.expandedLayout?.justifyContent || "space-between"};
        & > * {
          flex: 1;
          text-align: center;
        }
      `}
    `;
  }}
`;

export const StyledTabsTrigger = styled(TabsPrimitive.Trigger)<{
  $variant: TabsVariant;
  $size: TabsSize;
}>`
  ${({ $variant, $size }) => { // Removed theme
    const tokens = useComponentToken("TABS") as TabsTokensType;
    const sizeStyles = tokens.trigger.size[$size];
    const fontDefault = tokens.trigger.font[$variant]?.default;
    const fontActive = tokens.trigger.font[$variant]?.active;
    const colorDefault = tokens.trigger.color[$variant]?.default;
    const colorHover = tokens.trigger.color[$variant]?.hover;
    const colorActive = tokens.trigger.color[$variant]?.active;
    const colorDisabled = tokens.trigger.color[$variant]?.disabled;
    const bgDefault = tokens.trigger.background[$variant]?.default;
    const bgHover = tokens.trigger.background[$variant]?.hover;
    const bgActive = tokens.trigger.background[$variant]?.active;
    const borderStyles = tokens.trigger.border[$variant];
    // Correctly access shadow only for 'boxed' variant
    const shadowActive = ($variant === TabsVariant.BOXED) ? tokens.trigger.shadow?.boxed?.active : undefined;
    const focusStyles = tokens.trigger.focus;

    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      padding: 0 ${sizeStyles?.paddingX || '0px'};
      font-size: ${sizeStyles?.fontSize};
      font-weight: ${fontDefault?.fontWeight};
      color: ${colorDefault};
      background-color: ${bgDefault || 'transparent'};
      border-radius: ${borderStyles?.radius};
      border: none; // Base, specific borders applied below or via ::after
      transition: all ${tokens.transition?.duration || '0.2s'} ${tokens.transition?.easing || 'ease-in-out'};
      outline: none;
      position: relative;
      cursor: pointer;
      height: ${sizeStyles?.height};

      &:hover:not([data-state="active"]):not(:disabled) {
        color: ${colorHover};
        background-color: ${bgHover};
      }

      &[data-state="active"] {
        color: ${colorActive};
        background-color: ${bgActive};
        font-weight: ${fontActive?.fontWeight};
        box-shadow: ${$variant === TabsVariant.BOXED ? shadowActive : 'none'};
        z-index: 1; // For underline variant to sit above list border

        ${$variant === TabsVariant.UNDERLINE && css`
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px; // Adjust to align with list's border if list has border-bottom
            height: ${borderStyles?.underlineHeight};
            background-color: ${borderStyles?.underlineColor};
            z-index: 2;
          }
        `}
      }

      &:focus-visible:not(:disabled) {
        outline: none;
        box-shadow: ${`0 0 0 ${focusStyles?.ringWidth || '2px'} ${focusStyles?.ringColor}`};
        /* Consider outline for non-ring focus if preferred */
        /* outline: ${focusStyles?.outlineWidth} solid ${focusStyles?.outlineColor}; */
        /* outline-offset: ${focusStyles?.outlineOffset}; */
      }

      &:disabled {
        color: ${colorDisabled};
        opacity: ${tokens.trigger.disabledOpacity};
        pointer-events: none;
        cursor: not-allowed;
      }
    `;
  }}
`;

export const IconContainer = styled.span`
  ${() => { // Removed theme, and tokens as it's unused
    // const tokens = useComponentToken("TABS") as TabsTokensType; // tokens not used here
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      // Gap is applied by TabsTrigger.tsx using tokens.trigger.iconSpacing.gap for margin
    `;
  }}
`;
