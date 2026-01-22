'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  attending: string;
  plusOne: string;
  plusOneName: string;
  dietaryRestrictions: string[];
  otherDietary: string;
  favoritePartyActivity: string;
  favoriteGames: string;
  songRequest: string;
  funFact: string;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    plusOne: '',
    plusOneName: '',
    dietaryRestrictions: [],
    otherDietary: '',
    favoritePartyActivity: '',
    favoriteGames: '',
    songRequest: '',
    funFact: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDietaryChange = (option: string) => {
    const current = formData.dietaryRestrictions;
    if (current.includes(option)) {
      handleInputChange('dietaryRestrictions', current.filter(item => item !== option));
    } else {
      handleInputChange('dietaryRestrictions', [...current, option]);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center party-card">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Awesome! You&apos;re on the list!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thanks for RSVPing, {formData.name}! We can&apos;t wait to party with you! 🥳
          </p>
          <p className="text-gray-500">
            Check your email ({formData.email}) for party details and updates.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                name: '',
                email: '',
                attending: '',
                plusOne: '',
                plusOneName: '',
                dietaryRestrictions: [],
                otherDietary: '',
                favoritePartyActivity: '',
                favoriteGames: '',
                songRequest: '',
                funFact: '',
              });
            }}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full party-card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-semibold text-purple-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-5xl mb-4">🎊</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">You&apos;re Invited!</h2>
                <p className="text-gray-600">Let&apos;s get this party started! First, tell us about you...</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What&apos;s your name? ✨
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your awesome name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address 📧
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Attendance */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-5xl mb-4">🎈</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Can you make it?</h2>
                <p className="text-gray-600">We really hope you can join us!</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Will you be attending? 🎉
                </label>
                <div className="space-y-3">
                  {['Yes! Count me in! 🙌', 'Maybe... I\'ll try my best 🤞', 'Sorry, can\'t make it 😢'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.attending === option
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={option}
                        checked={formData.attending === option}
                        onChange={(e) => handleInputChange('attending', e.target.value)}
                        className="mr-3 w-5 h-5 text-purple-500"
                        required
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(formData.attending === 'Yes! Count me in! 🙌' || formData.attending === 'Maybe... I\'ll try my best 🤞') && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Bringing a plus one? 👥
                    </label>
                    <div className="space-y-3">
                      {['Yes', 'No'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.plusOne === option
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="plusOne"
                            value={option}
                            checked={formData.plusOne === option}
                            onChange={(e) => handleInputChange('plusOne', e.target.value)}
                            className="mr-3 w-5 h-5 text-purple-500"
                          />
                          <span className="text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.plusOne === 'Yes' && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What&apos;s their name?
                      </label>
                      <input
                        type="text"
                        value={formData.plusOneName}
                        onChange={(e) => handleInputChange('plusOneName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Plus one's name"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Dietary Preferences */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-5xl mb-4">🍕</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Food & Drinks</h2>
                <p className="text-gray-600">Help us plan the perfect menu!</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Any dietary restrictions or preferences? (Select all that apply)
                </label>
                <div className="space-y-3">
                  {[
                    'Vegetarian 🥗', 
                    'Vegan 🌱', 
                    'Gluten-Free 🌾', 
                    'Dairy-Free 🥛', 
                    'Nut Allergies 🥜',
                    'Shellfish Allergy 🦐',
                    'Pescatarian 🐟',
                    'Kosher ✡️',
                    'Halal ☪️',
                    'Low-Carb/Keto 🥑',
                    'Paleo 🥩',
                    'Lactose Intolerant 🚫🥛',
                    'Soy Allergy 🫘',
                    'Egg Allergy 🥚',
                    'None - I eat everything! 😋'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.dietaryRestrictions.includes(option)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.dietaryRestrictions.includes(option)}
                        onChange={() => handleDietaryChange(option)}
                        className="mr-3 w-5 h-5 text-purple-500 rounded"
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Anything else we should know? (Optional)
                </label>
                <textarea
                  value={formData.otherDietary}
                  onChange={(e) => handleInputChange('otherDietary', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Any other dietary needs..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Party Preferences */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-5xl mb-4">🎵</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Let&apos;s Get This Party Going!</h2>
                <p className="text-gray-600">Help us create the perfect vibe</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  What&apos;s your favorite party activity? 🎊
                </label>
                <div className="space-y-3">
                  {['Dancing 💃', 'Chatting with friends 💬', 'Party games 🎲', 'Karaoke 🎤', 'Just vibing 😎'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.favoritePartyActivity === option
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="favoritePartyActivity"
                        value={option}
                        checked={formData.favoritePartyActivity === option}
                        onChange={(e) => handleInputChange('favoritePartyActivity', e.target.value)}
                        className="mr-3 w-5 h-5 text-purple-500"
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What type of party games do you enjoy? 🎮
                </label>
                <select
                  value={formData.favoriteGames}
                  onChange={(e) => handleInputChange('favoriteGames', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white text-gray-700 cursor-pointer"
                  required
                >
                  <option value="">Select your favorite game type...</option>
                  <option value="Board Games 🎲">Board Games 🎲</option>
                  <option value="Card Games 🃏">Card Games 🃏</option>
                  <option value="Trivia/Quiz Games 🧠">Trivia/Quiz Games 🧠</option>
                  <option value="Charades/Acting Games 🎭">Charades/Acting Games 🎭</option>
                  <option value="Video Games 🎮">Video Games 🎮</option>
                  <option value="Beer Pong/Drinking Games 🍺">Beer Pong/Drinking Games 🍺</option>
                  <option value="Outdoor/Lawn Games 🏐">Outdoor/Lawn Games 🏐</option>
                  <option value="Escape Room/Mystery Games 🔍">Escape Room/Mystery Games 🔍</option>
                  <option value="Karaoke 🎤">Karaoke 🎤</option>
                  <option value="Dance Games 💃">Dance Games 💃</option>
                  <option value="Party Ice Breakers ❄️">Party Ice Breakers ❄️</option>
                  <option value="Not into games 🙅">Not into games 🙅</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Song request for the playlist? 🎶 (Optional)
                </label>
                <input
                  type="text"
                  value={formData.songRequest}
                  onChange={(e) => handleInputChange('songRequest', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your favorite jam..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Fun Fact */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-5xl mb-4">✨</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">One Last Thing!</h2>
                <p className="text-gray-600">Let&apos;s break the ice...</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Share a fun fact about yourself! 🌟 (Optional)
                </label>
                <textarea
                  value={formData.funFact}
                  onChange={(e) => handleInputChange('funFact', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Something interesting, funny, or unique about you..."
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-2">
                  This will be shared with other guests as an icebreaker!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                ← Back
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Submit RSVP 🎉
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
