import { PostType, PostsActions } from "./actions";
import { Post } from "./actions";

export type State = {
  allPosts: PostType[];
  postDetails: PostType;
  isLoading: boolean;
};

export const postReducer = (state: State, action: PostsActions) => {
  switch (action.type) {
    case Post.fetchingPosts:
      return { ...state, isLoading: true };
    case Post.fetchingPostsSuccess:
      return { ...state, allPosts: action.payload, isLoading: false };
    case Post.fetchingPostsFail:
      return { ...state, isLoading: false };

    case Post.fetchingPostDetails:
      return { ...state, isLoading: true };
    case Post.fetchingPostDetailsSuccess:
      return { ...state, postDetails: action.payload, isLoading: false };
    case Post.fetchingPostDetailsFail:
      return { ...state, isLoading: false };

    case Post.postingNewPost:
      return { ...state, isLoading: true };
    case Post.postingNewPostSuccess:
      return { ...state, postDetails: action.payload, isLoading: false };
    case Post.postingNewPostFail:
      return { ...state, isLoading: false };

    case Post.deletingPost:
      return { ...state, isLoading: true };
    case Post.deletingPostSuccess:
      return { ...state, isLoading: false };
    case Post.deletingPostFail:
      return { ...state, isLoading: false };

    case Post.updatingPost:
      return { ...state, isLoading: true };
    case Post.updatingPostSuccess:
      return { ...state, isLoading: false };
    case Post.updatingPostFail:
      return { ...state, isLoading: false };

    case Post.deselectPost:
      return {
        ...state,
        postDetails: {
          id: -1,
          title: "",
          content: "",
          image_url: "",
          lat: "",
          long: "",
          updated_at: "",
        },
      };
    default:
      return state;
  }
};
