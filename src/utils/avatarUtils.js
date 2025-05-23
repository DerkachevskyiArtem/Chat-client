export const getInitials = (name) => {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const getColorFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

const generateInitialsImage = (name) => {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect fill="${bgColor}" width="100" height="100"/>
      <text x="50%" y="50%" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif">${initials}</text>
    </svg>
  `;

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
};

export default generateInitialsImage;
