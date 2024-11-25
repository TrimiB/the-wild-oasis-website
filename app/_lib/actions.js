'use server';

import { signIn, signOut } from './auth';

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
