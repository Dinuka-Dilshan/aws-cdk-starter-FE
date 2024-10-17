type User = {
  email: string;
  token?: string;
};

type TemporaryCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  credentialScope?: string;
  accountId?: string;
};

type CreateSpaceApiResponse = {
  data: {
    error?: string;
    message: string;
  };
  error: "internal server error";
};
