import { useRef, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '@store/slices/formSlice';
import './form.css';

function UncontrolledForm() {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
      image: imageBase64,
      country: formData.get('country') as string,
    };

    dispatch(setFormData({ formType: 'uncontrolled', data }));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm passsword:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
      </div>

      <div>
        <label>Gender:</label>
        <div>
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>
        </div>
      </div>

      <div>
        <input type="checkbox" id="acceptTerms" name="acceptTerms" />
        <label htmlFor="acceptTerms">I accept the terms of the agreement</label>
      </div>

      <div>
        <label htmlFor="image">Upload image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" name="country">
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

export default UncontrolledForm;
