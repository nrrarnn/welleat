import { baseApi } from "./baseAxios";

export async function getComments() {
  const response = await baseApi.get("/commentlist", {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function getComment(id) {
  const response = await baseApi.get(`/commentbyresepId/${id}`, {
    request: { signal: new AbortController().signal },
  });
  return response.data;
}

export async function postComment(newComment) {
  try {
    const responseComment = await baseApi.post(
      `/comment`,
      {
        recipesId: newComment.recipesId,
        content: newComment.content,
        userId: newComment.userId,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseComment.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

export async function deleteComment(id) {
  const response = await baseApi.delete(`/comment/${id}`, {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}
