import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  loading: boolean;
  authError: string;
}

const initialState: State = {
  user: null,
  loading: false,
  authError: null
};

export function authReducer(state: State = initialState,
                            action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
        authError: null
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
