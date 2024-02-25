# Option Redux Tool-Kit

Chargement de la Librairie :

```
yarn add @reduxjs/toolkit 
```

## Initialisation & configuration du Store

*1- main.js*

```jsx
import { Provider } from "react-redux";
import { store } from "./assets/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        {*CHILDREN*}
    </Provider>
  </React.StrictMode>
);
```

*2- ./assets/redux/store.js*

```jsx
import { configureStore  } from "@reduxjs/toolkit";
import rootReducer from "./reducers";


export const store  = 
 configureStore({ 
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    });
```

*3- ./assets/reducers/index.js*

Ce fichier permet de combiner les reduceurs.

```jsx
import { combineReducers } from "redux";
import authSlice  from "./authSlice"; // exemple


export default combineReducers({    
    auth: authSlice, 
});
```

## Mise en place de Createslice

[Url vers la documentation](https://redux-toolkit.js.org/api/createslice)

Fonction qui accepte un état initial, un objet de fonctions de réduction et un « nom de tranche », et génère automatiquement des créateurs d'action et des types d'action qui correspondent aux réducteurs et à l'état.

1- ./assets/redux/reducer/mon.Slice.js

```jsx
import { createSlice } from '@reduxjs/toolkit

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    reset: (state) => {
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, reset } = authSlice.actions;
export default authSlice.reducer;
```

### Createslice ascyn

Construction asynchrone

```jsx
import { createSlice } from "@reduxjs/toolkit";
import connect from "../../../pages/LoginPage/loginRequest";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
 
  extraReducers: (builder) => {
    builder
      .addCase(connect.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(connect.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
   
  },
});

export default authSlice.reducer;
```

## Lecture du store

```jsx
import { useSelector } from "react-redux";

const  { foo }  = useSelector((state) => state.exemple);
```

## Dispatch au store

```jsx
import { useDispatch } from "react-redux";

const dispatch = useDispatch() ; 
dispatch(exemple()); 
```

Function exemple

### Dispatch async

```jsx
/**
 * Creates an async thunk for the login action.
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.username - The user's username or email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to the login response data.
 * @throws {Error} - If there is an error with the request or the response status is not 200, 400, or 500.
 */
const connect = createAsyncThunk(
  "auth/singIn",
  async ({ username, password, isChecked }) => {
    const response = await fetch(`${url}/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const user = await profile(data.body.token);
      manageCookie(data.body.token, isChecked);
      return {
        token: data.body.token,
        profil: user,
        status: response.status,
      };
    } else if (response.status === 400) {
      throw new Error("Invalid Fields");
    } else if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
  }
);

export default connect;
```
