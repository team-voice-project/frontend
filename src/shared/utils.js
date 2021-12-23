export const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

export const autoHeightArea = (e) => {
  e.currentTarget.style.height = "0";
  e.currentTarget.style.height = 12 + e.currentTarget.scrollHeight + "px";
  window.scrollTo(0, document.documentElement.clientHeight);
};
