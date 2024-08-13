import { baseApi } from "./baseAxios";

export async function getFavorite() {
  const response = await baseApi.get(`/favorite`, {
    request: { signal: new AbortController().signal },
  });
  return response.data;
}

export async function getFavByUserId(id) {
  const responseFavorit = await baseApi.get(`/favorite`, {
    request: { signal: new AbortController().signal },
  });
  const responseRecipe = await baseApi.get(`/recipes`, {
    request: { signal: new AbortController().signal },
  });

  const result = responseRecipe.data.filter((recipe) =>
    responseFavorit.data.some(
      (favorite) => favorite.recipeId === recipe.id && favorite.userId === id
    )
  );

  return result;
}
