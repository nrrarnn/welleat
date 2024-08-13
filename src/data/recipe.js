import { baseApi } from "./baseAxios";

export async function getRecipes() {
  const response = await baseApi.get("/recipes", {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function getRecipe(id) {
  const response = await baseApi.get(`/recipes/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

// export function loaderRecipes({ request: { signal } }) {
//   return getRecipes({ signal });
// }

// export function loaderRecipe({ request: { signal }, params: { id } }) {
//   console.log("🚀 ~ loaderRecipe ~ id:", id);

//   return getRecipe(id, { signal });
// }
//
