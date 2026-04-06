import User from '../../models/User.ts';
import Channel from '../../models/Channel.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

export const postRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.exists({ email });

    if (userExists) {
      return res.status(409).send('E-mail is already in use.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10); // with default password salt

    const newChannel = await Channel.create({});

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      channel: newChannel._id,
    });

    // Issue JWT Token
    const token = jwt.sign(
      // user details
      {
        userId: user._id,
        email: user.email,
      },
      // secret
      process.env.TOKEN_KEY as string,
      // additional config
      {
        expiresIn: '10h',
      }
    );

    // Send success response back to the user with registered user's data and JWT token
    return res.status(201).json({
      userDetails: {
        email: user.email,
        username,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error occured, Please, try again.');
  }
};
