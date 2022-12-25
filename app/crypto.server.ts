import * as bcrypt from 'bcryptjs';

export function createHashedPassword(password: string) {
	return bcrypt.hashSync(password);
}

export function comparePasswords(key: string, password: string) {
	return bcrypt.compareSync(password, key);
}