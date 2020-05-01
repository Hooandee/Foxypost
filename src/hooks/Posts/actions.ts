import { ActionMap } from "../actionTypesGenerator";

export enum Post {
  fetchingPosts = `postsActions/fetchingPosts`,
  fetchingPostsSuccess = `postsActions/fetchingPostsSuccess`,
  fetchingPostsFail = `postsActions/fetchingFail`,

  fetchingPostDetails = `postsActions/fetchingPostDetails`,
  fetchingPostDetailsSuccess = `postsActions/fetchingPostDetailsSuccess`,
  fetchingPostDetailsFail = `postsActions/fetchingPostDetailsFail`,

  postingNewPost = `postsActions/postingNewPost`,
  postingNewPostSuccess = `postsActions/postingNewPostSuccess`,
  postingNewPostFail = `postsActions/postingNewPostFail`,

  deletingPost = `postsActions/deletingPost`,
  deletingPostSuccess = `postsActions/deletingPostSuccess`,
  deletingPostFail = `postsActions/deletingPostFail`,

  updatingPost = `postsActions/updatingPost`,
  updatingPostSuccess = `postsActions/updatingPostSuccess`,
  updatingPostFail = `postsActions/updatingPostFail`,
}

export type PostType = {
  id?: number;
  content: string;
  title: string;
  lat: string;
  long: string;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
};

type PostPayload = {
  [Post.fetchingPosts]: undefined;
  [Post.fetchingPostsSuccess]: PostType[];
  [Post.fetchingPostsFail]: string;

  [Post.fetchingPostDetails]: undefined;
  [Post.fetchingPostDetailsSuccess]: PostType;
  [Post.fetchingPostDetailsFail]: string;

  [Post.postingNewPost]: undefined;
  [Post.postingNewPostSuccess]: PostType;
  [Post.postingNewPostFail]: string;

  [Post.deletingPost]: undefined;
  [Post.deletingPostSuccess]: undefined;
  [Post.deletingPostFail]: string;

  [Post.updatingPost]: undefined;
  [Post.updatingPostSuccess]: undefined;
  [Post.updatingPostFail]: string;
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

export const postingNewPost = (): { type: Post.postingNewPost } => ({
  type: Post.postingNewPost,
});
export const postingNewPostSuccess = (
  response: PostType
): { type: Post.postingNewPostSuccess; payload: any } => ({
  payload: response,
  type: Post.postingNewPostSuccess,
});
export const postingNewPostFail = (
  response: string
): { type: Post.postingNewPostFail; payload: any } => ({
  payload: response,
  type: Post.postingNewPostFail,
});

export const deletingPost = (): { type: Post.deletingPost } => ({
  type: Post.deletingPost,
});
export const deletingPostSuccess = (): { type: Post.deletingPostSuccess } => ({
  type: Post.deletingPostSuccess,
});
export const deletingPostFail = (
  response: string
): { type: Post.deletingPostFail; payload: any } => ({
  payload: response,
  type: Post.deletingPostFail,
});

export const updatingPost = (): { type: Post.updatingPost } => ({
  type: Post.updatingPost,
});
export const updatingPostSuccess = (): { type: Post.updatingPostSuccess } => ({
  type: Post.updatingPostSuccess,
});
export const updatingPostFail = (
  response: string
): { type: Post.updatingPostFail; payload: any } => ({
  payload: response,
  type: Post.updatingPostFail,
});
