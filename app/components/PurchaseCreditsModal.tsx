'use client';

import { useState, useEffect } from 'react';

interface PurchaseCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onPurchaseComplete: (creditsAdded: number) => void;
}

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  { id: 'small', credits: 5, price: 25 },
  { id: 'medium', credits: 10, price: 45, popular: true },
  { id: 'large', credits: 20, price: 80 },
  { id: 'xlarge', credits: 50, price: 175 },
];

export default function PurchaseCreditsModal({
  isOpen,
  onClose,
  currentBalance,
  onPurchaseComplete,
}: PurchaseCreditsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen) return null;

  const selectedPkg = creditPackages.find(pkg => pkg.id === selectedPackage);

  const handlePurchase = async () => {
    if (!selectedPkg) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful purchase
    onPurchaseComplete(selectedPkg.credits);
    setIsProcessing(false);
    
    // Show success message
    alert(`Success! ${selectedPkg.credits} credits added to your account.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#9333ea] to-[#7c3aed] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Purchase Credits</h2>
              <p className="text-sm mt-1 opacity-90">
                Current Balance: {currentBalance} credits
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="text-white hover:text-gray-300 text-3xl leading-none disabled:opacity-50 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#3b82f6] p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#3b82f6]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-semibold">
                  <strong>Demo Mode:</strong> This is a simulated payment. No real charges will be made.
                </p>
              </div>
            </div>
          </div>

          {/* Credit Packages */}
          <h3 className="text-lg font-bold mb-4 text-[#0a0a0a]">Select a Credit Package</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => !isProcessing && setSelectedPackage(pkg.id)}
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-[#ff6b35] bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-[#ff6b35] hover:shadow-md'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0a0a0a] mb-2">
                    {pkg.credits}
                  </div>
                  <div className="text-sm text-gray-600 mb-3 font-semibold">Credits</div>
                  <div className="text-2xl font-bold text-[#ff6b35] mb-2">
                    ${pkg.price}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    ${(pkg.price / pkg.credits).toFixed(2)} per credit
                  </div>
                </div>

                {selectedPackage === pkg.id && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white rounded-full p-1 shadow-md">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          {selectedPkg && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border border-gray-200">
              <h4 className="font-bold mb-3 text-[#0a0a0a]">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Credits to add:</span>
                  <span className="font-bold text-[#0a0a0a]">{selectedPkg.credits} credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Current balance:</span>
                  <span className="font-bold text-[#0a0a0a]">{currentBalance} credits</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-[#0a0a0a] font-bold">New balance:</span>
                  <span className="font-bold text-[#22c55e]">
                    {currentBalance + selectedPkg.credits} credits
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePurchase}
            disabled={isProcessing || !selectedPkg}
            className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-xl hover:scale-105 shadow-lg"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Purchase ${selectedPkg?.credits} Credits for $${selectedPkg?.price}`
            )}
          </button>

          {/* Fake Payment Info */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>🔒 Secure checkout powered by [Payment Provider]</p>
            <p className="mt-1">Demo mode - No actual payment will be processed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
