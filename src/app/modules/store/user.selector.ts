import { createFeatureSelector,createSelector } from "@ngrx/store";
import { Profile, User } from "./user";

export const profileSelectorState = createFeatureSelector<Profile>('profile');
export const usersSelectorState = createFeatureSelector<User[]>('users');

export const profileSelectorData = createSelector(
    profileSelectorState,
    (profile:Profile) => profile
)

export const usersSelectorData = createSelector(
    usersSelectorState,
    (allUser:User[]) => allUser
)