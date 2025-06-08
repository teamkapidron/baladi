'use client';

import { memo, useState } from 'react';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import { ImageIcon } from '@repo/ui/lib/icons';

function PromotionPosterCreator() {
  const [formData, setFormData] = useState({
    posterType: '',
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Poster data:', formData);
      setIsSubmitting(false);
      // Reset form or show success message in a real application
    }, 1500);
  };

  const getPosterBgColor = () => {
    switch (formData.posterType) {
      case 'new-arrival':
        return 'bg-blue-50 border-blue-200';
      case 'discounted':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPosterTypeLabel = () => {
    switch (formData.posterType) {
      case 'new-arrival':
        return 'NEW ARRIVAL';
      case 'discounted':
        return 'SPECIAL DISCOUNT';
      default:
        return 'SELECT TYPE';
    }
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800">Create Poster</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Poster Type
              </label>
              <select
                name="posterType"
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 p-3 focus:outline-none focus:ring-2"
                value={formData.posterType}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Select poster type</option>
                <option value="new-arrival">New Arrival</option>
                <option value="discounted">Discounted</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Poster Title
              </label>
              <Input
                name="title"
                className="w-full"
                placeholder="Enter poster title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                className="focus:ring-[var(--color-primary)]/50 min-h-24 w-full border border-gray-300 p-3 focus:outline-none focus:ring-2"
                placeholder="Enter poster description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            {/* Preview Section */}
            <div className="mt-8 border border-gray-200 p-4">
              <h3 className="mb-4 text-sm font-medium text-gray-700">
                Preview
              </h3>

              <div
                className={`border-2 border-dashed p-8 text-center ${getPosterBgColor()}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>

                  <div>
                    <div
                      className={`inline-block px-3 py-1 text-xs font-bold ${
                        formData.posterType === 'new-arrival'
                          ? 'bg-blue-600 text-white'
                          : formData.posterType === 'discounted'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-400 text-white'
                      }`}
                    >
                      {getPosterTypeLabel()}
                    </div>
                  </div>

                  <div className="text-xl font-bold text-gray-800">
                    {formData.title || 'Your Poster Title'}
                  </div>

                  <div className="text-sm text-gray-600">
                    {formData.description ||
                      'Your poster description will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="hover:bg-[var(--color-primary)]/90 bg-[var(--color-primary)] text-white"
                disabled={
                  isSubmitting || !formData.posterType || !formData.title
                }
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Creating...' : 'Create Poster'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(PromotionPosterCreator);
