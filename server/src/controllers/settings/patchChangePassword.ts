import bcrypt from 'bcryptjs';
import User from '../../models/User.ts';
import type { AuthRequest } from '../../middlewares/auth.ts';
import type { Response } from 'express';

export const patchChangePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const { password, newPassword } = req.body;

    const userData = await User.findById(userId, { password: 1 });

    if (!userData) {
      return res.status(404).send('User not found.');
    }

    if (!userData.password) {
      return res.status(400).send('Something went wrong. Password not found.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.status(400).send('Invalid Password. Please try again.');
    }

    // encrypt new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // update user document
    await User.updateOne({ _id: userId }, { password: encryptedPassword });

    return res.status(200).send('Password changed successfully.');
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again.');
  }
};
