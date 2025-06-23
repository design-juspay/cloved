import { RadioSize } from './types';
import { FOUNDATION_THEME } from '../../tokens';

export const getRadioDataState = (checked: boolean): string => {
  return checked ? 'checked' : 'unchecked';
};

export const extractPixelValue = (tokenValue: string): number => {
  const match = tokenValue.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 16;
};

export const getSpacingBySize = (size: RadioSize): { marginLeft: string; marginTop: string } => {
  // Use foundation tokens for consistent spacing
  const sizeMap = {
    [RadioSize.SMALL]: { 
      marginLeft: String(FOUNDATION_THEME.unit[20]), 
      marginTop: String(FOUNDATION_THEME.unit[4]) 
    },
    [RadioSize.MEDIUM]: { 
      marginLeft: String(FOUNDATION_THEME.unit[24]), 
      marginTop: String(FOUNDATION_THEME.unit[4]) 
    }
  };
  
  return sizeMap[size];
};
