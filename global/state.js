import { atom } from "recoil";

export const userDataAtom = atom({
  key: "userData",
  default: null,
});
export const locationState = atom({
  key: "locationState",
  default: {
    description: "",
    latitude: "",
    longitude: "",
  },
});
export const ingredientsState = atom({
  key: "ingredientsState",
  default: [],
});

export const instructionsState = atom({
  key: "instructionsState",
  default: "",
});

export const visitUserDataAtom = atom({
  key: "visitUserData",
  default: null,
});

export const userLikesState = atom({
  key: "userLikesState", // unique ID (with respect to other atoms/selectors)
  default: ["none2"], // default value (aka initial value)
});

export const userFollowsState = atom({
  key: "userFollowsState", // unique ID (with respect to other atoms/selectors)
  default: ["none2"], // default value (aka initial value)
});

export const userFeedState = atom({
  key: "userFeedState", // unique ID (with respect to other atoms/selectors)
  default: { top_post_ids: [], top_recipe_ids: [] }, // default value (aka initial value)
});

export const userExploreState = atom({
  key: "userExploreState", // unique ID (with respect to other atoms/selectors)
  default: { explore: []}, // default value (aka initial value)
});
