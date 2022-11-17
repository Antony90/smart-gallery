import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/userActions';
import { auth, provider } from '../../store/old_store';

const SignInButton = () => {
    const dispatch = useDispatch();

    const signUpGoogle = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            // const cred = result.credential;
            const user = result.user;
    
            dispatch(signIn(user))
        })
    }

    return (
    <Button title='Sign in with Google' onClick={signUpGoogle} />
  )
}

export default SignInButton;