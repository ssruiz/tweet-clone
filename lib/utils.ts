import { join } from 'path';
import { stat, mkdir, writeFile, unlink } from 'fs/promises';
import * as dateFn from 'date-fns';
import mime from 'mime';

import { NextRequest, NextResponse } from 'next/server';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

export const uploadImage = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get('file') as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: 'File blob is required.' },
      { status: 400 }
    );
  }

  console.log('file', file);
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        'Error while trying to create directory when uploading a file\n',
        e
      );
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      );
    }
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.replace(
    /\.[^/.]+$/,
    ''
  )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);

  const { secure_url } = await cloudinary.uploader.upload(
    `${uploadDir}/${filename}`
  );
  await unlink(`${uploadDir}/${filename}`);

  return secure_url;
};
