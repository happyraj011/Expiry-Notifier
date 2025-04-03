import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/model/User';
import dbConnect from './dbConnect';

interface TokenData {
  id: string;
  username: string;
  email: string;
}

export async function getTokenData(): Promise<TokenData | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    await dbConnect();
    const tokenData = await getTokenData();
    
    if (!tokenData) {
      return null;
    }

    const user = await User.findById(tokenData.id).select('-password');
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const tokenData = await getTokenData();
  return !!tokenData;
}