'use client';

import { memo, useState } from 'react';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import { Send } from '@repo/ui/lib/icons';

function NewsletterCreator() {
  const [formData, setFormData] = useState({
    campaignType: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
      console.log('Newsletter data:', formData);
      setIsSubmitting(false);
      // Reset form or show success message in a real application
    }, 1500);
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800">Create Newsletter</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Campaign Type
              </label>
              <select
                name="campaignType"
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 p-3 focus:outline-none focus:ring-2"
                value={formData.campaignType}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Select campaign type</option>
                <option value="new-arrival">New Arrival</option>
                <option value="product-promotion">Product Promotion</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Email Subject
              </label>
              <Input
                name="subject"
                className="w-full"
                placeholder="Enter a compelling subject line"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Preview Section */}
            <div className="mt-8 border border-gray-200 p-4">
              <h3 className="mb-4 text-sm font-medium text-gray-700">
                Preview
              </h3>

              <div className="border border-gray-200 p-4">
                <div className="mb-2 text-sm text-gray-500">
                  Campaign Type: {formData.campaignType || 'Not selected'}
                </div>
                <div className="mb-4 font-medium text-gray-800">
                  {formData.subject || 'Your Subject'}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="hover:bg-[var(--color-primary)]/90 bg-[var(--color-primary)] text-white"
                disabled={
                  isSubmitting || !formData.subject || !formData.campaignType
                }
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Newsletter'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(NewsletterCreator);
