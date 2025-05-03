import React, { useState } from 'react';
import useSignupStore from '../../store/signupStore';
import { useLanguage } from '../../context/LanguageContext';
import { FaCheck, FaInfoCircle, FaPhone, FaHome, FaGlobe, FaLanguage, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';

const PersonalDetails = ({ onComplete }) => {
  const { personalData, setPersonalData } = useSignupStore();
  const { t } = useLanguage();
  const [formData, setFormData] = useState(personalData || {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    city: '',
    address: '',
    phone: '',
    mobilePhone: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = t('errors.required');
    if (!formData.lastName) newErrors.lastName = t('errors.required');
    if (!formData.birthDate) newErrors.birthDate = t('errors.required');
    if (!formData.gender) newErrors.gender = t('errors.required');
    if (!formData.maritalStatus) newErrors.maritalStatus = t('errors.required');
    if (!formData.city) newErrors.city = t('errors.required');
    if (!formData.address) newErrors.address = t('errors.required');
    if (!formData.mobilePhone) newErrors.mobilePhone = t('errors.required');
    if (!formData.emergencyContact.name) newErrors['emergency.name'] = t('errors.required');
    if (!formData.emergencyContact.phone) newErrors['emergency.phone'] = t('errors.required');
    if (!formData.emergencyContact.relation) newErrors['emergency.relation'] = t('errors.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPersonalData(formData);
      onComplete();
    }
  };

  const FormField = ({ label, name, type = 'text', required = false, options, placeholder, className = '' }) => {
    const id = `form-field-${name}`;
    return (
      <div className={`mb-4 ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'select' ? (
          <select
            id={id}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            autoComplete={name === 'maritalStatus' ? 'marital-status' : name === 'hebrewLevel' ? 'language' : 'off'}
            className={`w-full px-4 py-2 border rounded-md shadow-sm text-base ${
              errors[name]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } focus:outline-none focus:ring-1`}
          >
            <option value="">{`${t('common.select')} ${label.toLowerCase()}`}</option>
            {options.map((option) => (
              <option key={option.value || option} value={option.value || option}>
                {option.label || option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            rows="3"
            autoComplete="off"
            className={`w-full px-4 py-2 border rounded-md shadow-sm text-base ${
              errors[name]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } focus:outline-none focus:ring-1`}
          />
        ) : (
          <input
            id={id}
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete={
              name === 'phone' ? 'tel' :
              name === 'address' ? 'street-address' :
              name === 'nativeLanguage' ? 'language' :
              name === 'arrivalDate' ? 'bday' :
              name === 'originCountry' ? 'country-name' :
              'off'
            }
            className={`w-full px-4 py-2 border rounded-md shadow-sm text-base ${
              errors[name]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } focus:outline-none focus:ring-1`}
          />
        )}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <FaInfoCircle className="flex-shrink-0" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const CheckboxField = ({ label, name, className = '' }) => {
    const id = `checkbox-${name}`;
    return (
      <div className={`flex items-center mb-3 ${className}`}>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={!!formData[name]}
          onChange={handleChange}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-2 text-sm text-gray-700">{label}</label>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{t('auth.personalDetails.title')}</h2>
        <p className="mt-1 text-sm text-gray-600">{t('auth.personalDetails.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.firstName.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('auth.personalDetails.firstName.placeholder')}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.lastName.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('auth.personalDetails.lastName.placeholder')}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Birth Date */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.birthDate.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.birthDate}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.gender.label')} <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('auth.personalDetails.gender.placeholder')}</option>
              <option value="male">{t('auth.personalDetails.gender.options.male')}</option>
              <option value="female">{t('auth.personalDetails.gender.options.female')}</option>
              <option value="other">{t('auth.personalDetails.gender.options.other')}</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.gender}
              </p>
            )}
          </div>

          {/* Marital Status */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.maritalStatus.label')} <span className="text-red-500">*</span>
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('auth.personalDetails.maritalStatus.placeholder')}</option>
              <option value="single">{t('auth.personalDetails.maritalStatus.options.single')}</option>
              <option value="married">{t('auth.personalDetails.maritalStatus.options.married')}</option>
              <option value="divorced">{t('auth.personalDetails.maritalStatus.options.divorced')}</option>
              <option value="widowed">{t('auth.personalDetails.maritalStatus.options.widowed')}</option>
            </select>
            {errors.maritalStatus && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.maritalStatus}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.city.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('auth.personalDetails.city.placeholder')}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.city}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.address.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('auth.personalDetails.address.placeholder')}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.phone.label')}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder={t('auth.personalDetails.phone.placeholder')}
            />
          </div>

          {/* Mobile Phone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.personalDetails.mobilePhone.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
              required
              className={`w-full border rounded-md p-2 ${errors.mobilePhone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('auth.personalDetails.mobilePhone.placeholder')}
            />
            {errors.mobilePhone && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FaInfoCircle className="flex-shrink-0" />
                {errors.mobilePhone}
              </p>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{t('auth.personalDetails.emergencyContact.title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Emergency Contact Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.personalDetails.emergencyContact.name.label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergency.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 ${errors['emergency.name'] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('auth.personalDetails.emergencyContact.name.placeholder')}
              />
              {errors['emergency.name'] && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaInfoCircle className="flex-shrink-0" />
                  {errors['emergency.name']}
                </p>
              )}
            </div>

            {/* Emergency Contact Phone */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.personalDetails.emergencyContact.phone.label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergency.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 ${errors['emergency.phone'] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('auth.personalDetails.emergencyContact.phone.placeholder')}
              />
              {errors['emergency.phone'] && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaInfoCircle className="flex-shrink-0" />
                  {errors['emergency.phone']}
                </p>
              )}
            </div>

            {/* Emergency Contact Relation */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.personalDetails.emergencyContact.relation.label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergency.relation"
                value={formData.emergencyContact.relation}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 ${errors['emergency.relation'] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('auth.personalDetails.emergencyContact.relation.placeholder')}
              />
              {errors['emergency.relation'] && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaInfoCircle className="flex-shrink-0" />
                  {errors['emergency.relation']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t('common.continue')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;