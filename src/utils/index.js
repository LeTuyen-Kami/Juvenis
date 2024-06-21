export const extractImage = (text) => {
    const regex = /(https?:\/\/[^\s]+)/;
    const parts = text.split(regex);
  
    return parts.map((part) => {
      if (regex.test(part)) {
        return { type: "img", value: part };
      } else {
        return { type: "text", value: part };
      }
    });
  };