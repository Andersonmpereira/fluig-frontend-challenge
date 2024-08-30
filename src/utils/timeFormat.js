export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  
  const days = Math.floor(diffInSeconds / secondsInDay);
  
  if (diffInMilliseconds > 0) {
    if (days > 0) {
      return `${days} dias expirados`;
    } else if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} segundos expirados`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minutos expirados`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} horas expirados`;
    }
  } else {
    const absDays = Math.abs(days);
    if (absDays > 0) {
      return `${absDays} dias restantes`;
    } else if (Math.abs(diffInSeconds) < secondsInMinute) {
      return `${Math.abs(diffInSeconds)} segundos restantes`;
    } else if (Math.abs(diffInSeconds) < secondsInHour) {
      const minutes = Math.floor(Math.abs(diffInSeconds) / secondsInMinute);
      return `${minutes} minutos restantes`;
    } else if (Math.abs(diffInSeconds) < secondsInDay) {
      const hours = Math.floor(Math.abs(diffInSeconds) / secondsInHour);
      return `${hours} horas restantes`;
    }
  }
};
