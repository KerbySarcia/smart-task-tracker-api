import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string) => {
  const key = `uploads/${uuidv4()}-${fileName}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  const file = await s3.upload(params).promise();

  return { ...file, name: key };
};

export const generateSignedUrl = async (key: string): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Expires: 60 * 5, // 5 minutes
  };

  return s3.getSignedUrlPromise("getObject", params);
};
