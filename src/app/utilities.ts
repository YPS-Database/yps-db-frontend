import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function improveFilterName(input: string): string {
  switch (input) {
    case "entry_type":
      return "Entry type";
    case "region":
      return "Region";
    case "year":
      return "Year";
    case "youth_led":
      return "Youth-led / Authored";
    default:
      return input;
  }
}

interface nameSet {
  englishName: string;
  endonym: string;
}

const names = new Map<string, nameSet>([
  ["af", { englishName: "Afrikaans", endonym: "Afrikaans" }],
  ["am", { englishName: "Amharic", endonym: "አማርኛ" }],
  ["ar", { englishName: "Arabic", endonym: "العربية" }],
  ["arn", { englishName: "Mapudungun", endonym: "Mapudungun" }],
  ["ary", { englishName: "Moroccan Arabic", endonym: "الدارجة المغربية " }],
  ["as", { englishName: "Assamese", endonym: "অসমীয়া" }],
  ["az", { englishName: "Azerbaijani", endonym: "Azərbaycan" }],
  ["ba", { englishName: "Bashkir", endonym: "Башҡорт" }],
  ["be", { englishName: "Belarusian", endonym: "беларуская" }],
  ["bg", { englishName: "Bulgarian", endonym: "български" }],
  ["bn", { englishName: "Bengali", endonym: "বাংলা" }],
  ["bo", { englishName: "Tibetan", endonym: "བོད་ཡིག" }],
  ["br", { englishName: "Breton", endonym: "brezhoneg" }],
  ["bs", { englishName: "Bosnian", endonym: "bosanski/босански" }],
  ["ca", { englishName: "Catalan", endonym: "català" }],
  ["ckb", { englishName: "Central Kurdish", endonym: "کوردیی ناوەندی" }],
  ["co", { englishName: "Corsican", endonym: "Corsu" }],
  ["cs", { englishName: "Czech", endonym: "čeština" }],
  ["cy", { englishName: "Welsh", endonym: "Cymraeg" }],
  ["da", { englishName: "Danish", endonym: "dansk" }],
  ["de", { englishName: "German", endonym: "Deutsch" }],
  ["dsb", { englishName: "Lower Sorbian", endonym: "dolnoserbšćina" }],
  ["dv", { englishName: "Divehi", endonym: "ދިވެހިބަސް" }],
  ["el", { englishName: "Greek", endonym: "Ελληνικά" }],
  ["en", { englishName: "English", endonym: "English" }],
  ["es", { englishName: "Spanish", endonym: "español" }],
  ["et", { englishName: "Estonian", endonym: "eesti" }],
  ["eu", { englishName: "Basque", endonym: "euskara" }],
  ["fa", { englishName: "Persian", endonym: "فارسى" }],
  ["fi", { englishName: "Finnish", endonym: "suomi" }],
  ["fil", { englishName: "Filipino", endonym: "Filipino" }],
  ["fo", { englishName: "Faroese", endonym: "føroyskt" }],
  ["fr", { englishName: "French", endonym: "français" }],
  ["fy", { englishName: "Frisian", endonym: "Frysk" }],
  ["ga", { englishName: "Irish", endonym: "Gaeilge" }],
  ["gd", { englishName: "Scottish Gaelic", endonym: "Gàidhlig" }],
  ["gil", { englishName: "Gilbertese", endonym: "Taetae ni Kiribati" }],
  ["gl", { englishName: "Galician", endonym: "galego" }],
  ["gsw", { englishName: "Swiss German", endonym: "Schweizerdeutsch" }],
  ["gu", { englishName: "Gujarati", endonym: "ગુજરાતી" }],
  ["ha", { englishName: "Hausa", endonym: "Hausa" }],
  ["he", { englishName: "Hebrew", endonym: "עברית" }],
  ["hi", { englishName: "Hindi", endonym: "हिंदी" }],
  ["hr", { englishName: "Croatian", endonym: "hrvatski" }],
  [
    "hrv",
    { englishName: "Serbo-Croatian", endonym: "srpskohrvatski/српскохрватски" },
  ],
  ["hsb", { englishName: "Upper Sorbian", endonym: "hornjoserbšćina" }],
  ["hu", { englishName: "Hungarian", endonym: "magyar" }],
  ["hy", { englishName: "Armenian", endonym: "Հայերեն" }],
  ["id", { englishName: "Indonesian", endonym: "Bahasa Indonesia" }],
  ["ig", { englishName: "Igbo", endonym: "Igbo" }],
  ["ii", { englishName: "Yi", endonym: "ꆈꌠꁱꂷ" }],
  ["is", { englishName: "Icelandic", endonym: "íslenska" }],
  ["it", { englishName: "Italian", endonym: "italiano" }],
  ["iu", { englishName: "Inuktitut", endonym: "Inuktitut /ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕ)" }],
  ["ja", { englishName: "Japanese", endonym: "日本語" }],
  ["ka", { englishName: "Georgian", endonym: "ქართული" }],
  ["kk", { englishName: "Kazakh", endonym: "Қазақша" }],
  ["kl", { englishName: "Greenlandic", endonym: "kalaallisut" }],
  ["km", { englishName: "Khmer", endonym: "ខ្មែរ" }],
  ["kn", { englishName: "Kannada", endonym: "ಕನ್ನಡ" }],
  ["ko", { englishName: "Korean", endonym: "한국어" }],
  ["kok", { englishName: "Konkani", endonym: "कोंकणी" }],
  ["ku", { englishName: "Kurdish", endonym: "Kurdî/کوردی" }],
  ["ky", { englishName: "Kyrgyz", endonym: "Кыргыз" }],
  ["lb", { englishName: "Luxembourgish", endonym: "Lëtzebuergesch" }],
  ["lo", { englishName: "Lao", endonym: "ລາວ" }],
  ["lt", { englishName: "Lithuanian", endonym: "lietuvių" }],
  ["lv", { englishName: "Latvian", endonym: "latviešu" }],
  ["mi", { englishName: "Maori", endonym: "Reo Māori" }],
  ["mk", { englishName: "Macedonian", endonym: "македонски јазик" }],
  ["ml", { englishName: "Malayalam", endonym: "മലയാളം" }],
  ["mn", { englishName: "Mongolian", endonym: "Монгол хэл/ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ" }],
  ["moh", { englishName: "Mohawk", endonym: "Kanien'kéha" }],
  ["mr", { englishName: "Marathi", endonym: "मराठी" }],
  ["ms", { englishName: "Malay", endonym: "Bahasa Malaysia" }],
  ["mt", { englishName: "Maltese", endonym: "Malti" }],
  ["my", { englishName: "Burmese", endonym: "မြန်မာဘာသာ" }],
  ["nb", { englishName: "Norwegian (Bokmål)", endonym: "norsk (bokmål)" }],
  ["ne", { englishName: "Nepali", endonym: "नेपाली (नेपाल)" }],
  ["nl", { englishName: "Dutch", endonym: "Nederlands" }],
  ["nn", { englishName: "Norwegian (Nynorsk)", endonym: "norsk (nynorsk)" }],
  ["no", { englishName: "Norwegian", endonym: "norsk" }],
  ["oc", { englishName: "Occitan", endonym: "occitan" }],
  ["or", { englishName: "Odia", endonym: "ଓଡ଼ିଆ" }],
  ["pap", { englishName: "Papiamento", endonym: "Papiamentu" }],
  ["pa", { englishName: "Punjabi", endonym: "ਪੰਜਾਬੀ / پنجابی" }],
  ["pl", { englishName: "Polish", endonym: "polski" }],
  ["prs", { englishName: "Dari", endonym: "درى" }],
  ["ps", { englishName: "Pashto", endonym: "پښتو" }],
  ["pt", { englishName: "Portuguese", endonym: "português" }],
  ["quc", { englishName: "K'iche", endonym: "K'iche" }],
  ["qu", { englishName: "Quechua", endonym: "runasimi" }],
  ["rm", { englishName: "Romansh", endonym: "Rumantsch" }],
  ["ro", { englishName: "Romanian", endonym: "română" }],
  ["ru", { englishName: "Russian", endonym: "русский" }],
  ["rw", { englishName: "Kinyarwanda", endonym: "Kinyarwanda" }],
  ["sa", { englishName: "Sanskrit", endonym: "संस्कृत" }],
  ["sah", { englishName: "Yakut", endonym: "саха" }],
  ["se", { englishName: "Sami (Northern)", endonym: "davvisámegiella" }],
  ["si", { englishName: "Sinhala", endonym: "සිංහල" }],
  ["sk", { englishName: "Slovak", endonym: "slovenčina" }],
  ["sl", { englishName: "Slovenian", endonym: "slovenski" }],
  ["sma", { englishName: "Sami (Southern)", endonym: "åarjelsaemiengiele" }],
  ["smj", { englishName: "Sami (Lule)", endonym: "julevusámegiella" }],
  ["smn", { englishName: "Sami (Inari)", endonym: "sämikielâ" }],
  ["sms", { englishName: "Sami (Skolt)", endonym: "sääʹmǩiõll" }],
  ["sq", { englishName: "Albanian", endonym: "shqip" }],
  ["sr", { englishName: "Serbian", endonym: "srpski/српски" }],
  ["st", { englishName: "Sesotho", endonym: "Sesotho sa Leboa" }],
  ["sv", { englishName: "Swedish", endonym: "svenska" }],
  ["sw", { englishName: "Kiswahili", endonym: "Kiswahili" }],
  ["syc", { englishName: "Syriac", endonym: "ܣܘܪܝܝܐ" }],
  ["ta", { englishName: "Tamil", endonym: "தமிழ்" }],
  ["te", { englishName: "Telugu", endonym: "తెలుగు" }],
  ["tg", { englishName: "Tajik", endonym: "Тоҷикӣ" }],
  ["th", { englishName: "Thai", endonym: "ไทย" }],
  ["tk", { englishName: "Turkmen", endonym: "türkmençe" }],
  ["tn", { englishName: "Tswana", endonym: "Setswana" }],
  ["tr", { englishName: "Turkish", endonym: "Türkçe" }],
  ["tt", { englishName: "Tatar", endonym: "Татарча" }],
  ["tzm", { englishName: "Tamazight", endonym: "Tamazight" }],
  ["ug", { englishName: "Uyghur", endonym: "ئۇيغۇرچە" }],
  ["uk", { englishName: "Ukrainian", endonym: "українська" }],
  ["ur", { englishName: "Urdu", endonym: "اُردو" }],
  ["uz", { englishName: "Uzbek", endonym: "Uzbek/Ўзбек" }],
  ["vi", { englishName: "Vietnamese", endonym: "Tiếng Việt" }],
  ["wo", { englishName: "Wolof", endonym: "Wolof" }],
  ["xh", { englishName: "Xhosa", endonym: "isiXhosa" }],
  ["yo", { englishName: "Yoruba", endonym: "Yoruba" }],
  ["zh", { englishName: "Chinese", endonym: "中文" }],
  ["zu", { englishName: "Zulu", endonym: "isiZulu" }],
]);

export function languageCodeToName(input: string): string {
  const entry = names.get(input);
  if (entry) {
    return entry.englishName;
  }
  return input;
}

interface YPSAPIError {
  error: string;
}

export function parseError(
  input: FetchBaseQueryError | SerializedError | undefined,
): string | undefined {
  const fberror = input
    ? ((input as FetchBaseQueryError).data as YPSAPIError).error ||
      String(input)
    : undefined;
  return fberror;
}
