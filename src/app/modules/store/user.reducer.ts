import { createReducer, on } from "@ngrx/store";
import { Profile, User } from "./user";
import { fetchUserProfileAPISuccess, fetchUsersAPISuccess } from "./user.action";

export const initialProfileState: Profile = {
  name: '',
  email: '',
  image: ''
};

export const initialUserState: User[] = []

export const profileReducer = createReducer(
  initialProfileState,
  on(fetchUserProfileAPISuccess, (_state, { profile }) => {
    return profile
  })
)

export const userReducer = createReducer(
  initialUserState,
  on(fetchUsersAPISuccess, (_state, { allUser }) => {
    return Object.values(allUser[0])
  })
)
