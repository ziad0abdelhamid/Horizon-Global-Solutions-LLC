import { useTranslations } from 'next-intl';

// Example component showing how to use translations
export default function TranslationExample() {
  const t = useTranslations();
  const tServices = useTranslations('services');
  const tContact = useTranslations('contact');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('hero.title')}</h1>
      
      {/* Navigation example */}
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li><a href="#" className="text-blue-600">{t('navigation.home')}</a></li>
          <li><a href="#" className="text-blue-600">{t('navigation.services')}</a></li>
          <li><a href="#" className="text-blue-600">{t('navigation.projects')}</a></li>
          <li><a href="#" className="text-blue-600">{t('navigation.about')}</a></li>
          <li><a href="#" className="text-blue-600">{t('navigation.contact')}</a></li>
        </ul>
      </nav>

      {/* Hero section example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('hero.subtitle')}</h2>
        <p className="text-gray-600">{t('hero.description')}</p>
      </section>

      {/* Services section example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{tServices('title')}</h2>
        <p className="mb-4">{tServices('subtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-medium">{tServices('webDevelopment.title')}</h3>
            <p className="text-sm text-gray-600">{tServices('webDevelopment.description')}</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">{tServices('dataAnalytics.title')}</h3>
            <p className="text-sm text-gray-600">{tServices('dataAnalytics.description')}</p>
          </div>
        </div>
      </section>

      {/* Contact form example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">{tContact('title')}</h2>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder={tContact('namePlaceholder')}
            className="w-full p-2 border rounded"
          />
          <input 
            type="email" 
            placeholder={tContact('emailPlaceholder')}
            className="w-full p-2 border rounded"
          />
          <textarea 
            placeholder={tContact('messagePlaceholder')}
            className="w-full p-2 border rounded h-32"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {tContact('send')}
          </button>
        </form>
      </section>
    </div>
  );
}