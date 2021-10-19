// import { genSalt, hash, compare } from 'bcryptjs';

// export async function HashPassword(password) {
// 	const salt = await genSalt(12);
// 	const hashedPassword = await hash(password, salt);
// 	return hashedPassword;
// }

import { hashSync, compare } from 'bcryptjs';

export function HashPassword(password) {
	const hashedPassword = hashSync(password, 12);
	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
