export const parseDate = (dateString) => {
  return new Date(dateString);
};

export const formatDate = (date) => {
  const year = Math.abs(date.getFullYear());
  const era = date.getFullYear() < 0 ? 'BCE' : 'CE';
  
  if (year < 1000) {
    return `${year} ${era}`;
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateDuration = (startDate, endDate) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365.25);
  
  return {
    days: diffDays,
    years: diffYears
  };
};

export const getDateDifference = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = diffDays / 365.25;
  
  return {
    days: diffDays,
    years: diffYears
  };
};

export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};