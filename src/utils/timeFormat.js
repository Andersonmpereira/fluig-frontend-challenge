export const formatTimeAgo = (dateString) =>{
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  
  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} segundos`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutos`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} horas`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} dias`;
  }
}
