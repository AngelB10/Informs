const getMonthWeek = (date) => {
    const fecha = new Date(date);
    if (isNaN(fecha)) return 0; // Evita errores si la fecha es inválida
    const dayOfMonth = fecha.getDate();
    return Math.min(Math.ceil(dayOfMonth / 7), 4); // Máximo 4 semanas
  };

  export default getMonthWeek;