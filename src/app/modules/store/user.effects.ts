import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { map, switchMap, tap } from "rxjs";
import { fetchUserProfileAPI, fetchUserProfileAPISuccess } from "./user.action";


@Injectable()
export class userEffects {
    constructor(private actions$: Actions, private userService: AuthService) { }

    userId: string | null = localStorage.getItem('userId')

    loadUserProfile$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(fetchUserProfileAPI),
            switchMap(() => {
                return this.userService.fetchUserProfile(this.userId)
                    .pipe(
                        map((data) => fetchUserProfileAPISuccess({ profile: data }))
                    )
            })
        )}
    )

} 