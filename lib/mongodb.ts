import { connect, connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let mongoosePromise: Promise<typeof import('mongoose')>;

// Расширяем глобальный объект для хранения обещания клиента в режиме разработки
const globalWithMongoose = global as typeof globalThis & {
  _mongooseClientPromise: Promise<typeof import('mongoose')>
};

// Функция для подключения к базе данных
const connectToDatabase = async () => {
  try {
    // Проверка состояния подключения
    if (connection.readyState >= 1) {
      return connection;
    }

    // В режиме разработки используем глобальную переменную для сохранения обещания
    if (process.env.NODE_ENV === 'development') {
      if (!globalWithMongoose._mongooseClientPromise) {
        globalWithMongoose._mongooseClientPromise = connect(MONGODB_URI);
      }
      mongoosePromise = globalWithMongoose._mongooseClientPromise;
    } else {
      // В режиме продакшн создаем новое подключение при каждом вызове
      mongoosePromise = connect(MONGODB_URI);
    }

    await mongoosePromise;

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

export default connectToDatabase;
