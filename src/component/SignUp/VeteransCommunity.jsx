import React, { useState } from 'react';
import useSignupStore from '../../store/signupStore';
import { useLanguage } from '../../context/LanguageContext';

const VeteransCommunity = ({ onComplete }) => {
  const { veteransData, setVeteransData } = useSignupStore();
  const { t } = useLanguage();
  const [formData, setFormData] = useState(veteransData || {
    currentActivities: [],
    notParticipatingReason: '',
    isVolunteer: false,
    volunteerAreas: [],
    volunteerFrequency: '',
    volunteerHours: [],
    volunteerDays: [],
    additionalVolunteering: false,
    additionalVolunteerFields: [],
    additionalVolunteerFrequency: '',
    additionalVolunteerHours: [],
    additionalVolunteerDays: [],
    needsConsultation: [],
  });

  const currentActivityOptions = ['cooking', 'trips', 'choir', 'torahClasses', 'lectures', 'exercise'];
  const notParticipatingOptions = ['noChallenge', 'notRelevant', 'noInfo', 'notInteresting', 'noTime'];
  const volunteerAreaOptions = [
    'publicity', 'health', 'eater', 'teaching', 'highTech', 'tourism',
    'safety', 'funds', 'specialTreat', 'craftsmanship', 'aaliyah', 'culture'
  ];
  const frequencyOptions = ['onceMonth', 'onceTwoWeeks', 'onceWeek', 'twiceWeek'];
  const hoursOptions = ['morning', 'noon', 'evening'];
  const daysOptions = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const consultationOptions = [
    'company', 'gardening', 'health', 'nutrition', 'homeEconomics', 'houseOrder',
    'marketing', 'shopping', 'mobility', 'digital', 'legal', 'psychology',
    'houseRules', 'sport'
  ];

  const handleArraySelection = (field, value) => {
    const currentArray = formData[field];
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVeteransData(formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{t('auth.veteransCommunity.title')}</h3>
        <p className="mt-1 text-sm text-gray-600">{t('auth.veteransCommunity.subtitle')}</p>
      </div>

      {/* Current Activities */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.currentActivities.label')}</label>
        <div className="grid grid-cols-3 gap-3">
          {currentActivityOptions.map((activity) => (
            <label key={activity} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.currentActivities.includes(activity)}
                onChange={() => handleArraySelection('currentActivities', activity)}
                className="mr-2"
              />
              <span className="text-sm">{t(`auth.veteransCommunity.currentActivities.options.${activity}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Not Participating Reason */}
      {formData.currentActivities.length === 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.notParticipating.label')}</label>
          <select
            value={formData.notParticipatingReason}
            onChange={(e) => setFormData({ ...formData, notParticipatingReason: e.target.value })}
            className="w-full border rounded-md p-2"
          >
            <option value="">{t('auth.veteransCommunity.notParticipating.placeholder')}</option>
            {notParticipatingOptions.map((reason) => (
              <option key={reason} value={reason}>
                {t(`auth.veteransCommunity.notParticipating.options.${reason}`)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Volunteering Section */}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isVolunteer}
            onChange={(e) => setFormData({ ...formData, isVolunteer: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">{t('auth.veteransCommunity.volunteering.isVolunteer.label')}</label>
        </div>

        {formData.isVolunteer && (
          <div className="space-y-4 pl-6">
            {/* Volunteer Areas */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.volunteering.areas.label')}</label>
              <div className="grid grid-cols-3 gap-3">
                {volunteerAreaOptions.map((area) => (
                  <label key={area} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.volunteerAreas.includes(area)}
                      onChange={() => handleArraySelection('volunteerAreas', area)}
                      className="mr-2"
                    />
                    <span className="text-sm">{t(`auth.veteransCommunity.volunteering.areas.options.${area}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Volunteer Frequency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.volunteering.frequency.label')}</label>
              <select
                value={formData.volunteerFrequency}
                onChange={(e) => setFormData({ ...formData, volunteerFrequency: e.target.value })}
                className="w-full border rounded-md p-2"
              >
                <option value="">{t('auth.veteransCommunity.volunteering.frequency.placeholder')}</option>
                {frequencyOptions.map((freq) => (
                  <option key={freq} value={freq}>
                    {t(`auth.veteransCommunity.volunteering.frequency.options.${freq}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Volunteer Hours */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.volunteering.hours.label')}</label>
              <div className="flex gap-4">
                {hoursOptions.map((hour) => (
                  <label key={hour} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.volunteerHours.includes(hour)}
                      onChange={() => handleArraySelection('volunteerHours', hour)}
                      className="mr-2"
                    />
                    <span className="text-sm">{t(`auth.veteransCommunity.volunteering.hours.options.${hour}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Volunteer Days */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.volunteering.days.label')}</label>
              <div className="grid grid-cols-3 gap-3">
                {daysOptions.map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.volunteerDays.includes(day)}
                      onChange={() => handleArraySelection('volunteerDays', day)}
                      className="mr-2"
                    />
                    <span className="text-sm">{t(`auth.veteransCommunity.volunteering.days.options.${day}`)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Volunteering */}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.additionalVolunteering}
            onChange={(e) => setFormData({ ...formData, additionalVolunteering: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">{t('auth.veteransCommunity.additionalVolunteering.label')}</label>
        </div>

        {formData.additionalVolunteering && (
          <div className="space-y-4 pl-6">
            {/* Additional Volunteer Areas */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.additionalVolunteering.areas.label')}</label>
              <div className="grid grid-cols-3 gap-3">
                {volunteerAreaOptions.map((area) => (
                  <label key={area} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.additionalVolunteerFields.includes(area)}
                      onChange={() => handleArraySelection('additionalVolunteerFields', area)}
                      className="mr-2"
                    />
                    <span className="text-sm">{t(`auth.veteransCommunity.volunteering.areas.options.${area}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Volunteer Frequency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.additionalVolunteering.frequency.label')}</label>
              <select
                value={formData.additionalVolunteerFrequency}
                onChange={(e) => setFormData({ ...formData, additionalVolunteerFrequency: e.target.value })}
                className="w-full border rounded-md p-2"
              >
                <option value="">{t('auth.veteransCommunity.volunteering.frequency.placeholder')}</option>
                {frequencyOptions.map((freq) => (
                  <option key={freq} value={freq}>
                    {t(`auth.veteransCommunity.volunteering.frequency.options.${freq}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Consultation Needs */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">{t('auth.veteransCommunity.consultation.label')}</label>
        <div className="grid grid-cols-3 gap-3">
          {consultationOptions.map((option) => (
            <label key={option} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.needsConsultation.includes(option)}
                onChange={() => handleArraySelection('needsConsultation', option)}
                className="mr-2"
              />
              <span className="text-sm">{t(`auth.veteransCommunity.consultation.options.${option}`)}</span>
            </label>
          ))}
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
  );
};

export default VeteransCommunity; 