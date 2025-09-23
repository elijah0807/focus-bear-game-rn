
export const capitalizeFirstLetter = (str: string): string => {
  if (!str || str.length === 0) {
    return str;
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  if (!str || str.length === 0) {
    return str;
  }
  
  return str
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};

export const capitalizeFirstLetterOnly = (str: string): string => {
  if (!str || str.length === 0) {
    return str;
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1);
};
