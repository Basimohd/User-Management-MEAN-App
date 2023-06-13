import { createReducer,on } from "@ngrx/store";
import { Profile } from "./user";
import { fetchUserProfileAPISuccess } from "./user.action";

export const intitialState: ReadonlyArray<Profile> = [];

export const userReducer = createReducer(
    intitialState,
    on(fetchUserProfileAPISuccess,(_state, {profile})=>{
        return profile
    })
)