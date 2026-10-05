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

export const validateFullName = (v) => {
  const name = v?.trim() ?? "";
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (name.length > 50) return "Name must not exceed 50 characters";
  return "";
};

export const validateMobile = (v) => {
  const n = (v ?? "").replace(/\s/g, "");
  if (!n) return "Mobile number is required";
  if (/\D/.test(n))
    return "Please enter a valid Georgian mobile number (9 digits starting with 5)";
  if (!n.startsWith("5")) return "Georgian mobile numbers must start with 5";
  if (n.length !== 9) return "Mobile number must be exactly 9 digits";
  return "";
};

const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const getAge = (iso) => {
  const born = parseISO(iso);
  const today = new Date();
  let age = today.getFullYear() - born.getFullYear();
  const hadBirthday =
    today.getMonth() > born.getMonth() ||
    (today.getMonth() === born.getMonth() && today.getDate() >= born.getDate());
  return hadBirthday ? age : age - 1;
};

export const validateBirthDate = (v) => {
  if (!v) return "Date of birth is required";
  const date = parseISO(v);
  if (isNaN(date) || date > new Date())
    return "Please enter a valid date of birth";
  if (getAge(v) < 12)
    return "You must be at least 12 years old to create an account";
  return "";
};
