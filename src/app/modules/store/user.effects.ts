import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { map, switchMap, tap } from "rxjs";
import { fetchUserProfileAPI, fetchUserProfileAPISuccess, fetchUsersAPI, fetchUsersAPISuccess } from "./user.action";


@Injectable()
export class userEffects {
    constructor(private actions$: Actions, private userService: AuthService) { }

    loadUserProfile$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(fetchUserProfileAPI),
            switchMap(() => {
                let userId: string | null = localStorage.getItem('userId')
                return this.userService.fetchUserProfile(userId)
                    .pipe(
                        map((data) => fetchUserProfileAPISuccess({ profile: data }))
                    )
            })
        )}
    )
    loadAllUsers$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(fetchUsersAPI),
            switchMap(() => {
                
                return this.userService.fetchAllUsers()
                    .pipe(tap((d)=>{console.log(d)}),
                        map((data) => fetchUsersAPISuccess({ allUser: Object.values(data) }))
                    )
            })
        )}
    )

} 