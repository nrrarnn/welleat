import { baseApi } from "./baseAxios";

export async function getRecipes() {
  const response = await baseApi.get("/reseplist", {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function getRecipe(id) {
  const response = await baseApi.get(`/resep/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function createRecipe(formData) {
  try {
    const responseRecipe = await baseApi.post(`/resep`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: new AbortController().signal,
    });

    return responseRecipe.data;
  } catch (error) {
    console.error("Error posting Recipe:", error);
    throw error;
  }
}

export async function editRecipe(id, formData) {
  try {
    const responseRecipe = await baseApi.put(`/resep/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: new AbortController().signal,
    });

    return responseRecipe.data;
  } catch (error) {
    console.error("Error updating Recipe:", error);
    throw error;
  }
}

export async function deleteRecipe(id) {
  const response = await baseApi.delete(`/resep/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}
