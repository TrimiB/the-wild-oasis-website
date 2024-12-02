'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { updateGuest } from './data-service';

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile');

  if (!/^[a-zA-Z0-9]{6,18}$/.test(formData.get('nationalID'))) {
    throw new Error('National ID number must be 6-18 characters long');
  }

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  const updateData = {
    // id: session.user.guestId,
    // fullName: session.user.name,
    // email: session.user.email,
    nationality,
    countryFlag,
    nationalID,
  };

  updateGuest(session.user.guestId, updateData);

  revalidatePath('/account/profile');
}

export async function loginAction() {
  await signIn('google', {
    redirectTo: '/account',
  });
}

export async function logoutAction() {
  await signOut({
    redirectTo: '/',
  });
}
