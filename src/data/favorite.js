import { baseApi } from "./baseAxios";

export async function getFavByUserId(id) {
  const responseFavorit = await baseApi.get(`/userFavorites/${id}`, {
    request: { signal: new AbortController().signal },
  });
  return responseFavorit.data;
}

export async function createFavorite(newFavorite) {
  try {
    const responseFavorite = await baseApi.post(
      `/addFavorite`,
      {
        recipesId: newFavorite.recipesId,
        userId: newFavorite.userId,
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

export async function deleteFavorite(id) {
  const response = await baseApi.delete(`/removeFavorite/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}
