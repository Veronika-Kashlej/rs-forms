import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from '@store/slices/formSlice';
import FormData from '@store/types';
import './form.css';

function HookForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (data: FormData) => {
    dispatch(setFormData({ formType: 'hook', data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="hook-name">Name:</label>
        <input type="text" id="hook-name" {...register('name')} />
      </div>

      <div>
        <label htmlFor="hook-age">Age:</label>
        <input type="number" id="hook-age" {...register('age')} />
      </div>

      <div>
        <label htmlFor="hook-email">Email:</label>
        <input type="email" id="hook-email" {...register('email')} />
      </div>

      <div>
        <label htmlFor="hook-password">Password:</label>
        <input type="password" id="hook-password" {...register('password')} />
      </div>

      <div>
        <label htmlFor="hook-confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="hook-confirmPassword"
          {...register('confirmPassword')}
        />
      </div>

      <div>
        <label>Пол:</label>
        <div>
          <input
            type="radio"
            id="hook-male"
            value="male"
            {...register('gender')}
          />
          <label htmlFor="hook-male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="hook-female"
            value="female"
            {...register('gender')}
          />
          <label htmlFor="hook-female">Female</label>
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          id="hook-acceptTerms"
          {...register('acceptTerms')}
        />
        <label htmlFor="hook-acceptTerms">
          I accept the terms of the agreement
        </label>
      </div>

      <div>
        <label htmlFor="hook-image">Upload image:</label>
        <input type="file" id="hook-image" onChange={handleFileChange} />
      </div>

      <div>
        <label htmlFor="hook-country">Страна:</label>
        <select id="hook-country" {...register('country')}>
          <option value="">Select country</option>
          <option value="ru">Russia</option>
          <option value="us">USA</option>
          <option value="de">Germany</option>
          <option value="cn">China</option>
          <option value="by">Belarus</option>
          <option value="fr">France</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default HookForm;
