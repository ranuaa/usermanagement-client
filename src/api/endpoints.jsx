export const endpoints = {
  auth: {
    login: "/api/auth/login",
  },
  user: {
    list: "/api/user",
    detail: (id) => `/api/user/${id}`,
    register: "/api/user/register",
  },
  employee: {
    create: "/api/employee/createEmployee",
    update: (id) => `/api/employee/updateEmployee/${id}`,
    delete: (id) => `/api/employee/deleteEmployee/${id}`,
    uploadPhoto: (id) => `/api/employee/uploadPhoto/${id}`,
  },
};
