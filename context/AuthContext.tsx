import React, { createContext, useReducer } from "react";

interface AuthState {
  user: {
    name: string;
    email: string;
  };
}

interface AuthAction {
  type: "SET_USER";
  payload: {
    name: string;
    email: string;
  };
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
  },
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
