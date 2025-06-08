import { Request, Response } from "express";
import File from "../models/file.schema";
import { generateSignedUrl, uploadToS3 } from "../services/aws.service";

export const uploadSingleFile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const file = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    await File.create({
      filename: file.name,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: file.Key,
      uploadedBy: userId,
    });

    res.status(200).json({ message: "Uploaded to S3" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const uploadMultipleFiles = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        await File.create({
          filename: uploadedFile.name,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: uploadedFile.Key,
          uploadedBy: userId,
        });
      })
    );

    res.status(200).json({ message: "Successfully uploaded all files" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const fileId = res.locals.validatedParams.id;

    const file = await File.findById(fileId).lean().exec();

    if (!file) {
      res.status(400).json({ message: "File does not exist!" });
      return;
    }

    const fileUrl = await generateSignedUrl(file.path);

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error });
  }
};
