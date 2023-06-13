import { createAction, props } from "@ngrx/store"
import { Profile } from "./user"

export const fetchUserProfileAPI = createAction(
    "[User API] Fetch User API"
)
export const fetchUserProfileAPISuccess = createAction(
    '[Profile API] Fetch User API Success',
    props<{profile:Profile[]}>()
)
