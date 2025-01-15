import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.email) {
      newErrors.email = 'Обязательное поле';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Обязательное поле';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Обязательное поле';
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Пароли должны совпадать';
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log(formData);
    }
  };

  useEffect(() => {
    validate();
  }, [formData]);

  useEffect(() => {
    if (isValid) {
      document.getElementById('registerButton').focus();
    }
  }, [isValid]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>

        <button id="registerButton" type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
