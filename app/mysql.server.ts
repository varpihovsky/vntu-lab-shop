import * as mysql from 'mysql';
import { MysqlError } from 'mysql';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'varpihovsky',
	password: 'password',
	database: 'LR3',
});

export async function query(query: string): Promise<{ error: MysqlError | null, results: any, fields?: mysql.FieldInfo[] }> {
	return new Promise(resolve => {
		pool.query(query, (error, results, fields) => {
			resolve({ error, results, fields });
		});
	});
}