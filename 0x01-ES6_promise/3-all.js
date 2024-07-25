import { createUser, uploadPhoto } from './utils';

export default function handleProfileSignup() {
  const upload = uploadPhoto();
  const create = createUser();

  return Promise.all([upload, create]).then((values) => {
    console.log(`${values[0].body} ${values[1].firstName} ${values[1].lastName}`);
  })
    .catch(() => {
      console.log('Signup system offline');
    });
}
