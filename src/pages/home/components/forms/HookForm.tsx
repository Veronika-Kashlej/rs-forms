import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice';
import { RootState } from '@/store/store';
import { schema } from '@/schemas/validation';
import { Country, FormData } from '@/store/types/types';
import convertToBase64 from '@/store/utils/convertToBase64';
import {
  checkPasswordStrength,
  getStrengthColor,
  getStrengthText,
  PasswordStrengthResult,
} from '@/store/utils/passwordStrength';
interface HookFormProps {
  onClose: () => void;
}
const HookForm: React.FC<HookFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.form.countries);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthResult>({
      strength: 'very-weak' as const,
      score: 0,
      feedback: [],
    });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema as any),
    mode: 'onChange',
  });
  const passwordValue = watch('password', '');
  React.useEffect(() => {
    if (passwordValue) {
      const strength = checkPasswordStrength(passwordValue);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ strength: 'very-weak', score: 0, feedback: [] });
    }
  }, [passwordValue]);
  const onSubmit = async (data: FormData) => {
    let pictureBase64 = '';
    if (data.picture && data.picture.length > 0) {
      pictureBase64 = await convertToBase64(data.picture[0]);
    }

    const reduxData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      terms: data.terms || false,
      picture: pictureBase64,
      country: data.country,
      timestamp: Date.now(),
      formType: 'hook' as const,
    };

    dispatch(setFormData(reduxData));
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFileName(files?.[0]?.name || '');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="hook-name">Name</label>
        <input id="hook-name" {...register('name')} />
        {errors.name && <div className="error">{errors.name?.message}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="hook-age">Age</label>
        <input
          id="hook-age"
          type="number"
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && <div className="error">{errors.age?.message}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="hook-email">Email</label>
        <input id="hook-email" type="email" {...register('email')} />
        {errors.email && <div className="error">{errors.email?.message}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="hook-password">Password</label>
        <input id="hook-password" type="password" {...register('password')} />
        {passwordValue && (
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
        {errors.password && (
          <div className="error">{errors.password?.message}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="hook-confirmPassword">Confirm Password</label>
        <input
          id="hook-confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword?.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="hook-gender">Gender</label>
        <select id="hook-gender" {...register('gender')}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender?.message}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="hook-picture">Profile Picture (optional)</label>
        <input
          id="hook-picture"
          type="file"
          accept=".jpeg,.jpg,.png"
          {...register('picture')}
          onChange={handleFileChange}
        />
        {selectedFileName && <div>Selected: {selectedFileName}</div>}
        {errors.picture && (
          <div className="error">{errors.picture?.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="hook-country">Country</label>
        <input
          id="hook-country"
          list="countries-list"
          {...register('country')}
        />
        <datalist id="countries-list">
          {countries.map((country: Country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
        {errors.country && (
          <div className="error">{errors.country?.message}</div>
        )}
      </div>

      <div className="form-group checkbox-group">
        <input id="hook-terms" type="checkbox" {...register('terms')} />
        <label htmlFor="hook-terms">I accept the Terms and Conditions</label>
        {errors.terms && <div className="error">{errors.terms?.message}</div>}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
