import React from 'react';
import { useDispatch } from 'react-redux';
import { LanguageContext } from '../../App';
import { Modal } from '../Modal.styles';
import { setModal } from '../../redux/slices/uiKnobsSlice';
import { FormPicker, AuthForm } from './LoginModal.styles';

export function LoginModal() {
  const language = React.useContext(LanguageContext);
  const dispatch = useDispatch();
  const [currentForm, setCurrentForm] = React.useState('sign-in');

  return (
    <Modal.Backdrop>
      <Modal.Container>
        {/* @dryup Make the Close button a component to be reused, instead of rebuilt */}
        <Modal.CloseButton
          aria-label={language['closeModal']}
          onClick={() => {
            dispatch(setModal({}));
          }}
        >
          <Modal.CloseIcon />
        </Modal.CloseButton>

        {/* Should I extract this piece? */}
        <FormPicker.Container>
          <FormPicker.Button
            onClick={() => {
              setCurrentForm('sign-in');
            }}
            className={currentForm === 'sign-in' && 'selected'}
          >
            {language['signIn']}
          </FormPicker.Button>
          <FormPicker.Button
            onClick={() => {
              setCurrentForm('sign-up');
            }}
            className={currentForm === 'sign-up' && 'selected'}
          >
            {language['signUp']}
          </FormPicker.Button>
        </FormPicker.Container>

        {currentForm === 'sign-in' ? <LoginForm /> : <SignUpForm />}
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function LoginForm() {
  const language = React.useContext(LanguageContext);
  const [formData, setFormData] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://jte-backend.glitch.me')
      .then((response) => response.text())
      .then(console.log);
  };

  return (
    <AuthForm.Form onSubmit={(e) => handleSubmit(e)}>
      <AuthForm.Label>
        Email:
        <AuthForm.Input
          type="text"
          name="email"
          value={formData.email || ''}
          onInput={(e) =>
            setFormData(
              Object.assign({ ...formData }, { email: e.target.value })
            )
          }
        />
      </AuthForm.Label>
      <AuthForm.Label>
        {language['password'] + ':'}
        <AuthForm.Input
          type="password"
          name="password"
          value={formData.password || ''}
          onInput={(e) =>
            setFormData(
              Object.assign({ ...formData }, { password: e.target.value })
            )
          }
        />
      </AuthForm.Label>
      <AuthForm.Button type="submit">{language['confirm']}</AuthForm.Button>
    </AuthForm.Form>
  );
}

function SignUpForm() {
  const language = React.useContext(LanguageContext);
  const [formData, setFormData] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <AuthForm.Form onSubmit={handleSubmit}>
      <AuthForm.Label>
        {language['name'] + ':'}
        <AuthForm.Input
          type="text"
          name="name"
          value={formData.name || ''}
          onInput={(e) =>
            setFormData(
              Object.assign({ ...formData }, { name: e.target.value })
            )
          }
        />
      </AuthForm.Label>
      <AuthForm.Label>
        Email:
        <AuthForm.Input
          type="text"
          name="email"
          value={formData.email || ''}
          onInput={(e) =>
            setFormData(
              Object.assign({ ...formData }, { email: e.target.value })
            )
          }
        />
      </AuthForm.Label>
      <AuthForm.Label>
        {language['password'] + ':'}
        <AuthForm.Input
          type="password"
          name="password"
          value={formData.password || ''}
          onInput={(e) =>
            setFormData(
              Object.assign({ ...formData }, { password: e.target.value })
            )
          }
        />
      </AuthForm.Label>
      <AuthForm.Button type="submit">{language['confirm']}</AuthForm.Button>
    </AuthForm.Form>
  );
}