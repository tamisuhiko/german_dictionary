import { initReactI18next } from "react-i18next";
import i18next from "i18next";

//Import all translation files
import translationEnglish from "./lang/en.json";
import translationVietnam from "./lang/vi.json";

// //Import translation2 file
// import translationEnglishSecondFile from "./Translation/English/translation2.json";
// import translationFrench from "./Translation/French/translation.json";
// import translationVietnam from "./Translation/Spanish/translation.json";

//---Using translation
const resources = {
  en: {
    translation: translationEnglish
  },
  vi: {
    translation: translationVietnam
  }
};

//---Using different namespaces
// const resources = {
//   en: {
//     home: translationEnglish,
//     main: translationEnglishSecondFile
//   },
//   es: {
//     home: translationSpanish
//   },
//   fr: {
//     home: translationFrench
//   }
// };

i18next.use(initReactI18next).init({
  resources,
  lng: "vi" //default language
});

export default i18next;
