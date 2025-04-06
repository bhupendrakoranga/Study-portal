'use server';

import { cookies } from 'next/headers';

export async function createCookies(name: string, value: string) {
  cookies().set(name, value);
}

export async function deleteCookies(name: string) {
  cookies().delete(name);
}

export async function getCookies(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name);
}
