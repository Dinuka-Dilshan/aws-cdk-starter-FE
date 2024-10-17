import { fetchAuthSession, signIn, signOut } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { AuthStack } from "../../../space_finder/outputs.json";
import {
  getAuthDetails,
  removeAuthDetails,
  saveAuthDetails,
} from "../utils/authStorage";
import { useLoader } from "./LoaderProvider";

type AuthContext = {
  user: User | null;
  logIn: (user: { username: string; password: string }) => void;
  logOut: () => void;
  error?: string;
  isAuthenticating: boolean;
};

const AuthContext = createContext<AuthContext>({
  user: null,
  logIn: () => null,
  logOut: () => null,
  isAuthenticating: false,
});

export const useAuth = () => useContext(AuthContext);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: AuthStack.spaceUserPoolId,
      userPoolClientId: AuthStack.spaceUserPoolClientId,
      identityPoolId: AuthStack.spacesIdentityPoolId,
    },
  },
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(() => getAuthDetails());

  const [error, setError] = useState<string>();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setIsLoading } = useLoader();

  const logIn = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      if (user) return;

      setIsAuthenticating(true);
      setIsLoading(true);

      try {
        const result = await signIn({
          username,
          password,
          options: { authFlowType: "USER_PASSWORD_AUTH" },
        });

        if (!result.isSignedIn) {
          throw new Error("Failed");
        }

        const authSession = await fetchAuthSession();
        const token = authSession.tokens?.idToken?.toString();

        setUser({
          email: username,
          token,
        });
        saveAuthDetails({
          email: username,
          token,
        });
      } catch (error) {
        setError(JSON.stringify(error));
      } finally {
        setIsAuthenticating(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, user]
  );

  const logOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsAuthenticating(true);
      await signOut();
      setUser(null);
      removeAuthDetails();
    } catch (error) {
      setError("Failed");
      console.log(error);
    } finally {
      setIsAuthenticating(false);
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return (
    <AuthContext.Provider
      value={{ user, logIn, logOut, error, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
