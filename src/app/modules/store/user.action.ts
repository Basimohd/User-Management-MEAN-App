import { createAction, props } from "@ngrx/store"
import { Profile, User } from "./user"

export const fetchUserProfileAPI = createAction(
    "[User API] Fetch User API"
)

export const fetchUserProfileAPISuccess = createAction(
    '[Profile API] Fetch User API Success',
    props<{profile:Profile}>()
)

export const fetchUsersAPI = createAction(
    '[Users API] Fetch Users API'
)

export const fetchUsersAPISuccess = createAction(
    '[Users API] Fetch Users Success API',
    props<{allUser:User[]}>()
)
