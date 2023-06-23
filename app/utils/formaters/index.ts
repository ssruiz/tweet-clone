import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from 'date-fns';

export const tweetTimeElapsed = (createdAt: string) => {
  const now = new Date();
  const dateUpdate = new Date(createdAt);
  const segundosTranscurridos = differenceInSeconds(now, dateUpdate);
  const minutosTranscurridos = differenceInMinutes(now, dateUpdate);
  const horasTranscurridas = differenceInHours(now, dateUpdate);

  if (segundosTranscurridos < 59) return `${segundosTranscurridos}s`;
  if (minutosTranscurridos < 59) return `${minutosTranscurridos}m`;
  if (horasTranscurridas < 24) return `${horasTranscurridas}h`;

  return parseDate(createdAt, 'MMM. d');
};

export const parseDate = (createdAt: string, formato: string) => {
  try {
    return format(parseISO(createdAt), formato);
  } catch (error) {
    return '';
  }
};
