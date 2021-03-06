import {Router} from 'express';
import {GoogleStrategy, FacebookStrategy} from '../../Services/Auth';
import {generateResponse} from '../utils'


const facebook = new FacebookStrategy();
const google = new GoogleStrategy();



const authRoutes = ({config}) => {
  const router = Router();

  // v1/auth/facebook/return ::::::::::::::::::::::::::::::::: Facebook callback


  router.get('/facebook/return',
    facebook.returnAuthenticate(), (req, res) => generateResponse(req,res));

  // v1/auth/facebook ::::::::::::::::::::::::::::::::::::::::::: Facebook Login

  router.get('/facebook', facebook.authenticate());

  // v1/auth/google/return ::::::::::::::::::::::::::::::::::::: Google CallBack

  router.get('/google/return', google.returnAuthenticate(),
    (req,res) => generateResponse(req,res) );

  // v1/auth/google ::::::::::::::::::::::::::::::::::::::::::::::: Google Login

  router.get('/google', google.authenticate());



  return router;

}

export default authRoutes;