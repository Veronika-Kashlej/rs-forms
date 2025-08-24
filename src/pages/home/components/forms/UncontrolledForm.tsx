import { setFormData } from '@/store/slices/formSlice';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import './form.css';
import { schema } from '@/schemas/validation';
import { FormErrors } from '@/store/types/types';
import convertToBase64 from '@/store/utils/convertToBase64';
import {
  checkPasswordStrength,
  getStrengthColor,
  getStrengthText,
  PasswordStrengthResult,
} from '@/store/utils/passwordStrength';
interface UncontrolledFormProps {
  onClose: () => void;
}
const UncontrolledForm: React.FC<UncontrolledFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthResult>({
      strength: 'very-weak' as const,
      score: 0,
      feedback: [],
    });
  const passwordRef = useRef<HTMLInputElement>(null);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ strength: 'very-weak', score: 0, feedback: [] });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const pictureFile = formData.get('picture') as File;

    const formDataObj = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      picture: pictureFile,
      country: formData.get('country') as string,
    };

    try {
      await schema.validate(formDataObj, { abortEarly: false });

      let pictureBase64 = '';
      if (formDataObj.picture && formDataObj.picture.size > 0) {
        pictureBase64 = await convertToBase64(formDataObj.picture);
      }

      const reduxData = {
        name: formDataObj.name,
        age: formDataObj.age,
        email: formDataObj.email,
        password: formDataObj.password,
        confirmPassword: formDataObj.confirmPassword,
        gender: formDataObj.gender,
        terms: formDataObj.terms,
        picture: pictureBase64,
        country: formDataObj.country,
        timestamp: Date.now(),
        formType: 'uncontrolled' as const,
      };

      dispatch(setFormData(reduxData));
      setErrors({});
      onClose();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          onChange={handlePasswordChange}
        />
        {passwordRef.current?.value && (
          <div className="password-strength">
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(passwordStrength.score / 8) * 100}%`,
                  backgroundColor: getStrengthColor(passwordStrength.strength),
                }}
              />
            </div>
            <div className="strength-text">
              Strength: {getStrengthText(passwordStrength.strength)}
            </div>
            {passwordStrength.feedback.length > 0 && (
              <div className="strength-feedback">
                {passwordStrength.feedback.map((msg, index) => (
                  <div key={index} className="feedback-item">
                    • {msg}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="picture">Profile Picture (optional)</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".jpeg,.jpg,.png"
        />
        {errors.picture && <div className="error">{errors.picture}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" list="countries-list" />
        <datalist id="countries-list">
          <option value="Russia" />
          <option value="USA" />
          <option value="Germany" />
          <option value="France" />
          <option value="China" />
          <option value="Belarus" />
        </datalist>
        {errors.country && <div className="error">{errors.country}</div>}
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        {errors.terms && <div className="error">{errors.terms}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
