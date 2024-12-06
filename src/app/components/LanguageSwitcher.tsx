// 'use client';

// import { useRouter } from 'next/router';

// const LanguageSwitcher = () => {
//   const router = useRouter();
//   const { locale, locales } = router;

//   const switchLanguage = (newLocale: string) => {
//     router.push(router.asPath, router.asPath, { locale: newLocale });
//   };

//   return (
//     <div>
//       {locales?.map((lng) => (
//         <button key={lng} onClick={() => switchLanguage(lng)} disabled={lng === locale}>
//           {lng}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default LanguageSwitcher;