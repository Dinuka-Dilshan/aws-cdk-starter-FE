import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { AuthStack } from "../../../space_finder/outputs.json";
import { awsRegion } from "../constants/aws";
import {
  getTemporaryCredentialsFromLocal,
  saveTemporaryCredentialsToLocal,
} from "../utils/authStorage";
import { useAuth } from "./AuthProvider";

type TemporaryAuthContext = {
  getTemporaryCredentials: () => Promise<TemporaryCredentials | undefined>;
  error?: string;
  isAuthenticating: boolean;
};

const TemporaryAuthContext = createContext<TemporaryAuthContext>({
  getTemporaryCredentials: () => Promise.resolve(undefined),
  isAuthenticating: false,
});

export const useTemporaryAuth = () => useContext(TemporaryAuthContext);



const TempAuthProvider = ({ children }: PropsWithChildren) => {
  const [temporaryCredentials, setTemporaryCredentials] = useState(() =>
    getTemporaryCredentialsFromLocal()
  );
  const [error, setError] = useState<string>();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { user } = useAuth();

  const getTemporaryCredentials = useCallback(async () => {
    if (temporaryCredentials) {
      return temporaryCredentials;
    } else {
      setIsAuthenticating(true);
      setError(undefined);
      try {
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.spaceUserPoolId}`;
        const cognitoIdentity = new CognitoIdentityClient({
          credentials: fromCognitoIdentityPool({
            clientConfig: {
              region: awsRegion,
            },
            identityPoolId: AuthStack.spacesIdentityPoolId,
            logins: {
              [cognitoIdentityPool]: user?.token || "",
            },
          }),
        });
        const credentials = await cognitoIdentity.config.credentials();
        setTemporaryCredentials(credentials);
        saveTemporaryCredentialsToLocal(credentials);
        return {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
          credentialScope: credentials.credentialScope,
          accountId: credentials.accountId,
        };
      } catch (error) {
        setError(JSON.stringify(error || "unknown error"));
      } finally {
        setIsAuthenticating(false);
      }
    }
  }, [temporaryCredentials, user?.token]);

  return (
    <TemporaryAuthContext.Provider
      value={{ getTemporaryCredentials, error, isAuthenticating }}
    >
      {children}
    </TemporaryAuthContext.Provider>
  );
};

export default TempAuthProvider;
