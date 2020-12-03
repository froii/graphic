export const randomNumber = () => Math.ceil(Math.random() * 8);

export const randomType = () => {
  const number = randomNumber();
  if (number <= 3) return "triangle";
  if (number > 3 && number <= 6) return "circle";
  if (number > 6) return "rectangle";
};

export const checkWeight = (sum, cur) => sum + (cur.weight / cur.x) * 6;
