import { baseApi } from "./baseAxios";

export async function getRecipes() {
  const res = await baseApi.get("/recipe", {
    request: { signal: new AbortController().signal },
  });

  return res.data;
}

export async function getRecipe(recipeId, option) {
  const res = await baseApi.get(`/recipe/${recipeId}`, option);
  return res.data;
}

// export function loaderRecipes({ request: { signal } }) {
//   return getRecipes({ signal });
// }

// export function loaderRecipe({ request: { signal }, params: { id } }) {
//   console.log("🚀 ~ loaderRecipe ~ id:", id);

//   return getRecipe(id, { signal });
// }
