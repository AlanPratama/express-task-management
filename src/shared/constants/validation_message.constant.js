export const VALIDATION_MESSAGE = {
  REQUIRED: (field) => `${field} wajib diisi`,
  STRING: (field) => `${field} harus berupa string`,
  NUMBER: (field) => `${field} harus berupa angka`,
  EMAIL: (field) => `${field} harus berupa email yang valid`,
  MIN_LENGTH: (field, min) => `${field} minimal ${min} karakter`,
  MAX_LENGTH: (field, max) => `${field} maksimal ${max} karakter`,
  MIN_VALUE: (field, min) => `${field} minimal ${min}`,
  MAX_VALUE: (field, max) => `${field} maksimal ${max}`,
  BOOLEAN: (field) => `${field} harus berupa boolean`,
  ARRAY: (field) => `${field} harus berupa array`,
  NOT_FOUND: (field) => `${field} tidak ditemukan`,
  ALREADY_EXISTS: (field) => `${field} sudah digunakan`,
};
