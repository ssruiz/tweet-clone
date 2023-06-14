import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

export const tweetTimeElapsed = (createdAt: number | Date) => {
  const now = new Date();

  const segundosTranscurridos = differenceInSeconds(now, createdAt);
  const minutosTranscurridos = differenceInMinutes(now, createdAt);
  const horasTranscurridas = differenceInHours(now, createdAt);

  if (segundosTranscurridos < 59) return `${segundosTranscurridos}s`;
  if (minutosTranscurridos < 59) return `${minutosTranscurridos}m`;
  if (horasTranscurridas < 24) return `${horasTranscurridas}h`;

  return parseDate(createdAt, 'MMM. d');
};

export const parseDate = (createdAt: number | Date, formato: string) => {
  return format(createdAt, formato);
};
