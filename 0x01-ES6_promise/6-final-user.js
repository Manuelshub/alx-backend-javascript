import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const signupPromise = signUpUser(firstName, lastName);
  const uploadPromise = uploadPhoto(fileName);

  return Promise.allSettled([signupPromise, uploadPromise])
    .then((results) => {
      const processedResults = results.map((result) => {
        if (result.status === 'fulfilled') {
          return { status: 'fulfilled', value: result.value };
        }
        return { status: 'rejected', value: result.reason };
      });
      return processedResults;
    });
}
