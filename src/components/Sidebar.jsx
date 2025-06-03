import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Sidebar({ toggleSidebar }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
    if(Sidebar) toggleSidebar(); // Close sidebar on mobile after selection
  };

  return (
    <aside className="w-64 p-4 sm:p-6">
      <h2 className="mb-6 text-lg font-bold sm:text-xl">{t('title')}</h2>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold">{t('language')}</h3>
        <select
          value={i18n.language}
          onChange={changeLanguage}
          className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fa">فارسی</option>
          <option value="tr">Türkçe</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <a
          href="https://wa.me/+905527473071"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('whatsapp_dubai')}
        </a>
        <a href="tel:+905527473071">{t('call_dubai_office')}</a>
        {/* <a href="tel:+12025550123">{t('call_us_office')}</a> */}
      </div>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold">{t('our_dubai_office')}</h3>
        <p className="text-sm whitespace-pre-line">{t('office_address')}</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178149361809!2d55.27078231504247!3d25.20484948388589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496a1b9e5b%3A0xafead2e165e8f9f8!2sBusiness%20Bay%2C%20Dubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1696431234567!5m2!1sen!2sus"
          width="100%"
          height="150"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dubai Office Location"
        />
      </div>
    </aside>
  );
}

export default Sidebar;