export const getRunningTime = (time: number | undefined) => {
  if (!time) return;
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return `${hour}시간 ${minute}분`;
};
