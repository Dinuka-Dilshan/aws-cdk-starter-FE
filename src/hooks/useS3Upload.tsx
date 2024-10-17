import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useCallback, useState } from "react";
import { PhotoStack } from "../../../space_finder/outputs.json";
import { awsRegion } from "../constants/aws";
import { useTemporaryAuth } from "../Providers/TemporaryAuthProvider";

const useS3Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getTemporaryCredentials } = useTemporaryAuth();

  const handleUpload = useCallback(
    async (file?: File) => {
      if (!file) return;
      setIsUploading(true);
      setError(undefined);
      try {
        const credentials = await getTemporaryCredentials();
        if (!credentials) {
          setError("Cannot get upload permission at this time");
          return;
        }
        const client = new S3Client({
          region: awsRegion,
          credentials: {
            ...credentials,
            //@ts-expect-error:aws sdk cannot work without converting to date
            expiration: new Date(credentials?.expiration),
          },
        });

        const command = new PutObjectCommand({
          Bucket: PhotoStack.photobucket,
          Key: file.name,
          Body: file,
        });

        await client.send(command);
        return `https://${command.input.Bucket}.s3.${awsRegion}.amazonaws.com/${command.input.Key}`;
      } catch (error) {
        setError(JSON.stringify(error));
      } finally {
        setIsUploading(false);
      }
    },
    [getTemporaryCredentials]
  );

  return { isUploading, error, handleUpload };
};

export default useS3Upload;
