'use server';

import { revalidatePath } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from './data-service';

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

export async function updateReservationAction(formData) {
  console.log(formData);
  const numGuests = formData.get('numGuests');
  const observations = formData.get('observations').slice(0, 1000);
  const reservationId = formData.get('reservationId');

  const session = await auth();
  if (!session)
    throw new Error('AUTH_ERROR: User must be logged in to update reservation');

  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBooking = guestBookings.find(
    (booking) => booking.id === +reservationId
  );
  if (!guestBooking)
    throw new Error(
      "This reservation does not belong to you. Your can't update it."
    );

  const updatedBooking = {
    numGuests,
    observations,
  };

  await updateBooking(reservationId, updatedBooking);
  revalidatePath('/account/reservations');
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  permanentRedirect('/account/reservations');
}

export async function DeleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile');

  const guestBookings = await getBookings(session.user.guestId);
  const booking = guestBookings.find((booking) => booking.id === bookingId);
  if (!booking) throw new Error('You are not allowed to delete this booking');

  await deleteBooking(bookingId);
  revalidatePath('/account/reservations');
}
