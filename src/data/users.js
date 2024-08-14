import { baseApi } from "./baseAxios";

export async function getUsers() {
  const response = await baseApi.get("/userlist", {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function getUserById(id) {
  const response = await baseApi.get(`/user/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}
