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

export async function createRecipe(newRecipe) {
  try {
    const responseRecipe = await baseApi.post(
      `/resep`,
      {
        recipeName: newRecipe.recipeName,
        ingredient: newRecipe.ingredient,
        step: newRecipe.step,
        image: newRecipe.image,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseRecipe.data;
  } catch (error) {
    console.error("Error posting Recipe:", error);
    throw error;
  }
}

export async function editRecipe(newRecipe, id) {
  try {
    const responseRecipe = await baseApi.put(
      `/resep/${id}`,
      {
        recipeName: newRecipe.recipeName,
        ingredient: newRecipe.ingredient,
        step: newRecipe.step,
        image: newRecipe.image,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseRecipe.data;
  } catch (error) {
    console.error("Error edit Recipe:", error);
    throw error;
  }
}

export async function deleteRecipe(id) {
  const response = await baseApi.delete(`/resep/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}
