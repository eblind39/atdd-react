import ElegibleType from "../types/ElegibleType";

export const getElegibleTypeDescr = (elegibleType: ElegibleType | undefined) => {
    if (typeof elegibleType === 'undefined') return 'No value given';
    switch (elegibleType) {
      case ElegibleType.EQUALORUNDER_25: return 'Equal or under 25';
      case ElegibleType.OVER_25: return 'Over 25';
    }
  }