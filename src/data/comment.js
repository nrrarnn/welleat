import { baseApi } from "./baseAxios";

export async function getComments() {
  const response = await baseApi.get("/comments", {
    request: { signal: new AbortController().signal },
  });

  return response.data;
}

export async function getComment(id) {
  const response = await baseApi.get(`/comments/${id}`, {
    request: { signal: new AbortController().signal },
  });
  return response.data;
}

export async function getCommentByRecipeId(idRecipe) {
  const responseComment = await baseApi.get(`/comments`, {
    request: { signal: new AbortController().signal },
  });

  const result = responseComment.data.filter(
    (item) => item.recipeId === idRecipe
  );
  return result;
}

export async function postComment(newComment) {
  try {
    const data = await getComments();
    console.log("🚀 ~ postComment ~ data:", data);
    const maxId = Math.max(...data.map((comment) => Number(comment.id)));
    console.log("🚀 ~ postComment ~ maxId:", maxId);

    const responseComment = await baseApi.post(
      `/comments`,
      {
        recipeId: newComment.recipeId,
        content: newComment.content,
        userId: newComment.useerId,
        createdAt: new Date().toISOString(),
      },
      {
        signal: new AbortController().signal,
      }
    );

    console.log("🚀 ~ postComment ~ responseComment:", responseComment.data);
    return responseComment.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}