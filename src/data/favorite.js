import { baseApi } from "./baseAxios";

export async function getFavByUserId(id) {
  const responseFavorit = await baseApi.get(`/userFavorites/${id}`, {
    request: { signal: new AbortController().signal },
  });
  return responseFavorit.data;
}

export async function createFavorite(recipesId, userId) {
  try {
    const responseFavorite = await baseApi.post(
      `/addFavorite`,
      {
        recipesId: recipesId,
        userId: userId,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseFavorite.data;
  } catch (error) {
    console.error("Error posting Favorite:", error);
    throw error;
  }
}

export async function deleteFavorite(recipesId, userId) {
  const response = await baseApi.delete(`/removeFavorite`, {
    data: {
      userId: userId,
      recipesId: recipesId,
    },
    signal: new AbortController().signal,
  });

  return response.data;
}
