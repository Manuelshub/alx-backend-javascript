import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    const uploadPromise = await uploadPhoto();
    const createPromise = await createUser();

    return {
      photo: uploadPromise,
      user: createPromise,
    };
  } catch (error) {
    return { photo: null, user: null };
  }
}
