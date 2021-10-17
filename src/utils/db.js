import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

const db = { connect };

export default db;

// import mongoose from 'mongoose';

// const connection = {};

// async function connect() {
// 	if (connection.isConnected) {
// 		// console.log('already connected');
// 		return;
// 	}
// 	if (mongoose.connections.length > 0) {
// 		connection.isConnected = mongoose.connections[0].readyState;
// 		if (connection.isConnected === 1) {
// 			// console.log('use previous connection');
// 			return;
// 		}
// 		await mongoose.disconnect();
// 	}
// 	const db = await mongoose.connect(process.env.MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});
// 	// console.log('new connection');
// 	connection.isConnected = db.connections[0].readyState;
// }

// async function disconnect() {
// 	if (connection.isConnected) {
// 		if (process.env.NODE_ENV === 'production') {
// 			await mongoose.disconnect();
// 			connection.isConnected = false;
// 		} else {
// 			// console.log('not disconnected');
// 		}
// 	}
// }

// const db = { connect, disconnect };

// export default db;
