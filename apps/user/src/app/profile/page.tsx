import ProfileSidebar from '@/components/profile/profile-sidebar';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8 sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Min Konto
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            Administrer din kontoinformasjon, spå bestillinger, lagre adresser,
            og holde dine favoritter i et sted.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white sm:rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="border-b border-gray-100 lg:border-b-0 lg:border-r">
              <ProfileSidebar />
            </div>

            <div className="lg:col-span-4">
              <div className="p-4 sm:p-6 md:p-8">{/*  */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
