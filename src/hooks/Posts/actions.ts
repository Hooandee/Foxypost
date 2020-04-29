import { ActionMap } from "../actionTypesGenerator";

export enum Post {
  fetchingPosts = `postsActions/fetchingPosts`,
  fetchingPostsSuccess = `postsActions/fetchingPostsSuccess`,
  fetchingPostsFail = `postsActions/fetchingFail`,

  fetchingPostDetails = `postsActions/fetchingPostDetails`,
  fetchingPostDetailsSuccess = `postsActions/fetchingPostDetailsSuccess`,
  fetchingPostDetailsFail = `postsActions/fetchingPostDetailsFail`,
}

export type PostType = {
  content: string;
  title: string;
  lat: string;
  long: string;
  image_url: string;
};

type PostPayload = {
  [Post.fetchingPosts]: undefined;
  [Post.fetchingPostsSuccess]: PostType[];
  [Post.fetchingPostsFail]: string;

  [Post.fetchingPostDetails]: undefined;
  [Post.fetchingPostDetailsSuccess]: PostType;
  [Post.fetchingPostDetailsFail]: string;
};

export type PostsActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export const fetchingPostsInfo = (): { type: Post.fetchingPosts } => ({
  type: Post.fetchingPosts,
});
export const successFetchingPostsInfo = (
  response: PostType[]
): { type: Post.fetchingPostsSuccess; payload: any } => ({
  payload: response,
  type: Post.fetchingPostsSuccess,
});
export const errorFetchingPostsInfo = (
  response: string
): { type: Post.fetchingPostsFail; payload: any } => ({
  payload: response,
  type: Post.fetchingPostsFail,
});

export const fetchingPostDetails = (): { type: Post.fetchingPostDetails } => ({
  type: Post.fetchingPostDetails,
});
export const successFetchingPostDetails = (
  response: PostType
): { type: Post.fetchingPostDetailsSuccess; payload: any } => ({
  payload: response,
  type: Post.fetchingPostDetailsSuccess,
});
export const errorFetchingPostDetails = (
  response: string
): { type: Post.fetchingPostDetailsFail; payload: any } => ({
  payload: response,
  type: Post.fetchingPostDetailsFail,
});
