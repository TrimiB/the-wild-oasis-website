'use server';

import { revalidatePath } from 'next/cache';
import { permanentRedirect, redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import {
  createBooking,
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

export async function createReservationAction(
  reservationData,
  bookedDates,
  formData
) {
  const session = await auth();
  if (!session)
    throw new Error('AUTH_ERROR: User must be logged in to update reservation');

  if (!reservationData.numNights)
    throw new Error(
      'Reservation must have a duration. Please select a range of dates.'
    );

  if (
    bookedDates.some(
      (date) =>
        date.startDate <= reservationData.startDate &&
        date.endDate >= reservationData.endDate
    )
  ) {
    throw new Error('One or more of the selected dates are already booked');
  }

  const newBookingData = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    hasBreakfast: false,
    isPaid: false,
    status: 'unconfirmed',
  };

  await createBooking(newBookingData);
  revalidatePath(`/cabins/${reservationData.cabinId}`);
  redirect('/cabins/thankyou');
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
  if (!session)
    throw new Error('AUTH_ERROR: User must be logged in to update reservation');

  const guestBookings = await getBookings(session.user.guestId);
  const booking = guestBookings.find((booking) => booking.id === bookingId);
  if (!booking) throw new Error('You are not allowed to delete this booking');

  await deleteBooking(bookingId);
  revalidatePath('/account/reservations');
}
