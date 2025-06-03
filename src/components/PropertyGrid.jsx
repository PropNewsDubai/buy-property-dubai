import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import properties from '/src/data/properties.js';

function PropertyGrid() {
  const { t, i18n } = useTranslation();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [bedroomsFilter, setBedroomsFilter] = useState('All Bedrooms');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [featuredFilter, setFeaturedFilter] = useState('All Properties');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProperties = properties.filter((property) => {
    const title = property[`title_${i18n.language}`] || property.title;
    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All Categories' || property.category === categoryFilter;

    const matchesPrice =
      priceFilter === 'All Prices' ||
      (priceFilter === 'Under 3M AED' && property.price < 3000000) ||
      (priceFilter === '3M - 6M AED' && property.price >= 3000000 && property.price <= 6000000) ||
      (priceFilter === '6M - 10M AED' && property.price > 6000000 && property.price <= 10000000) ||
      (priceFilter === 'Above 10M AED' && property.price > 10000000);

    const matchesBedrooms =
      bedroomsFilter === 'All Bedrooms' || property.bedrooms.toString() === bedroomsFilter;

    const matchesLocation =
      locationFilter === 'All Locations' || property.location === locationFilter;

    const matchesFeatured =
      featuredFilter === 'All Properties' || property.featured === true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesBedrooms &&
      matchesLocation &&
      matchesFeatured
    );
  });

  const openModal = (property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const categories = ['All Categories', ...new Set(properties.map(p => p.category))];
  const bedroomOptions = ['All Bedrooms', ...new Set(properties.map(p => p.bedrooms.toString()))].sort();
  const locations = ['All Locations', ...new Set(properties.map(p => p.location))];

  return (
    <main className="flex-1 p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">{t('title')}</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All Categories' ? t('all_categories') : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <option value="All Prices">{t('all_prices')}</option>
            <option value="Under 3M AED">{t('under_3m')}</option>
            <option value="3M - 6M AED">{t('3m_6m')}</option>
            <option value="6M - 10M AED">{t('6m_10m')}</option>
            <option value="Above 10M AED">{t('above_10m')}</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={bedroomsFilter}
            onChange={(e) => setBedroomsFilter(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            {bedroomOptions.map((bedrooms) => (
              <option key={bedrooms} value={bedrooms}>
                {bedrooms === 'All Bedrooms' ? t('all_bedrooms') : bedrooms}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location === 'All Locations' ? t('all_locations') : location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <option value="All Properties">{t('all_properties')}</option>
            <option value="Featured Only">{t('featured_only')}</option>
          </select>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <p>{t('no_properties_found')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => {
            const title = property[`title_${i18n.language}`] || property.title;
            const price = Number(property.price).toLocaleString('en-US');
            const whatsappMessage = i18n.getResource(i18n.language, 'translation', 'whatsapp_message')
              .replace('{title}', title)
              .replace('{price}', price);
            const translatedAmenities = property.amenities.map((amenity) => t(amenity)).join(', ');

            return (
              <div
                key={property.id}
                className="border rounded-lg shadow-sm cursor-pointer"
                onClick={() => openModal(property)}
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-semibold">
                    AED {property.price.toLocaleString()}
                  </h2>
                  <p className="text-sm">
                    {t('category').split('{value}')[0]}{property.category}
                  </p>
                  <p className="text-sm">
                    {t('location').split('{value}')[0]}{property.location}
                  </p>
                  <p className="text-sm">
                    {t('dimensions').split('{value}')[0]}{property.dimensions}
                  </p>
                  <p className="text-sm">
                    {t('bedrooms_label').split('{count}')[0]}{property.bedrooms}
                  </p>
                  <p className="text-sm">
                    {t('bathrooms').split('{count}')[0]}{property.bathrooms}
                  </p>
                  <p className="text-sm">
                    {t('parking_spaces').split('{count}')[0]}{property.parking}
                  </p>
                  <p className="mt-2 text-sm">
                    {property[`title_${i18n.language}`] || property.title}
                  </p>
                  <p className="text-sm">
                    {t('amenities').split('{value}')[0]}{translatedAmenities}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <a
                      href={`tel:+971123456789`}
                      className="inline-block px-4 py-2 text-sm rounded"
                    >
                      {t('call')}
                    </a>
                    <a
                      href={`https://wa.me/+971123456789?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-sm rounded"
                    >
                      {t('whatsapp')}
                    </a>
                  </div>

                  <script type="application/ld+json">
                    {JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Residence',
                      name: property[`title_${i18n.language}`] || property.title,
                      address: {
                        '@type': 'PostalAddress',
                        addressLocality: property.location,
                        addressCountry: 'AE',
                      },
                      floorSize: {
                        '@type': 'QuantitativeValue',
                        value: property.dimensions,
                        unitCode: 'FTK',
                      },
                      numberOfBedrooms: property.bedrooms,
                      numberOfBathroomsTotal: property.bathrooms,
                      numberOfAvailableParkingSpaces: property.parking,
                    })}
                  </script>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedProperty && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="relative p-4 sm:p-6">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
                <img
                  src={selectedProperty.images[currentImageIndex]}
                  alt={selectedProperty.title}
                  className="object-cover w-full h-64 rounded-t-lg"
                />
                <div className="flex gap-4 mt-4 overflow-x-auto py-2">
                  {selectedProperty.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`modal-thumbnail object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                        currentImageIndex === index
                          ? 'border-2 border-[var(--gold)] scale-105'
                          : 'border border-gray-300 hover:scale-105 hover:border-[var(--gold)]'
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                  AED {selectedProperty.price.toLocaleString()}
                </h2>
                <p className="text-sm">
                  {t('category').split('{value}')[0]}{selectedProperty.category}
                </p>
                <p className="text-sm">
                  {t('location').split('{value}')[0]}{selectedProperty.location}
                </p>
                <p className="text-sm">
                  {t('dimensions').split('{value}')[0]}{selectedProperty.dimensions}
                </p>
                <p className="text-sm">
                  {t('bedrooms_label').split('{count}')[0]}{selectedProperty.bedrooms}
                </p>
                <p className="text-sm">
                  {t('bathrooms').split('{count}')[0]}{selectedProperty.bathrooms}
                </p>
                <p className="text-sm">
                  {t('parking_spaces').split('{count}')[0]}{selectedProperty.parking}
                </p>
                <p className="mt-2 text-sm">
                  {selectedProperty[`title_${i18n.language}`] || selectedProperty.title}
                </p>
                <p className="text-sm">
                  {t('amenities').split('{value}')[0]}
                  {selectedProperty.amenities.map((amenity) => t(amenity)).join(', ')}
                </p>
                <div className="flex gap-2 mt-4">
                  <a
                    href={`tel:+971123456789`}
                    className="inline-block px-4 py-2 text-sm rounded"
                  >
                    {t('call')}
                  </a>
                  <a
                    href={`https://wa.me/+971123456789?text=${encodeURIComponent(
                      i18n.getResource(i18n.language, 'translation', 'whatsapp_message')
                        .replace('{title}', selectedProperty[`title_${i18n.language}`] || selectedProperty.title)
                        .replace('{price}', Number(selectedProperty.price).toLocaleString('en-US'))
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-sm rounded"
                  >
                    {t('whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default PropertyGrid;