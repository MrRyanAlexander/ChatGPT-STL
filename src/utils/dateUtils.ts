
export const formatTimeStamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDateStamp = (date: Date): string => {
  return date.toLocaleDateString();
};

export const formatFullDateTime = (date: Date): string => {
  return `${formatDateStamp(date)} ${formatTimeStamp(date)}`;
};
