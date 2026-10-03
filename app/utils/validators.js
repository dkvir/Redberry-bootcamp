export const MIN_PASSWORD = 3;

export const required = (msg) => (v) => (v?.trim() ? "" : msg);

export const validateEmail = (v) => {
  if (!v?.trim()) return "Email is required";
  return /^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email";
};

export const validatePassword = (v) => {
  if (!v) return "Password is required";
  return v.length >= MIN_PASSWORD ? "" : `At least ${MIN_PASSWORD} characters`;
};
