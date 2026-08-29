import { cookies } from "next/headers";

export type Lang = "en" | "hi" | "bn";

const dict: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "Learn anything. Prove it. For free.",
    heroSub:
      "AI-powered lessons on every subject — from oceanography to AWS. Pass a small entry quiz to unlock any course free, and earn downloadable certificates.",
    browseCourses: "Browse courses",
    courses: "Courses",
    login: "Log in",
    register: "Sign up",
    logout: "Log out",
    admin: "Admin",
    myCertificates: "My certificates",
    generalSubjects: "General subjects",
    certPrep: "Certification prep",
    unlocked: "Unlocked",
    quizRequired: "Entry quiz required",
    startQuiz: "Pay & start entry quiz",
    disclaimer:
      "This content is AI-generated. Verify independently before professional or medical use.",
    lessons: "Lessons",
    markComplete: "Mark lesson complete",
    completed: "Completed",
    reportError: "Report an error",
    requestCourse: "Request a new course",
    verifyCert: "Verify a certificate",
  },
  hi: {
    tagline: "कुछ भी सीखें। साबित करें। मुफ़्त में।",
    heroSub:
      "हर विषय पर AI-संचालित पाठ — समुद्र विज्ञान से AWS तक। छोटी प्रवेश क्विज़ पास करें और कोई भी कोर्स मुफ़्त में खोलें, डाउनलोड करने योग्य प्रमाणपत्र पाएं।",
    browseCourses: "कोर्स देखें",
    courses: "कोर्स",
    login: "लॉग इन",
    register: "साइन अप",
    logout: "लॉग आउट",
    admin: "एडमिन",
    myCertificates: "मेरे प्रमाणपत्र",
    generalSubjects: "सामान्य विषय",
    certPrep: "प्रमाणन तैयारी",
    unlocked: "खुला हुआ",
    quizRequired: "प्रवेश क्विज़ आवश्यक",
    startQuiz: "भुगतान करें और क्विज़ शुरू करें",
    disclaimer:
      "यह सामग्री AI द्वारा बनाई गई है। व्यावसायिक या चिकित्सीय उपयोग से पहले स्वतंत्र रूप से सत्यापित करें।",
    lessons: "पाठ",
    markComplete: "पाठ पूर्ण करें",
    completed: "पूर्ण",
    reportError: "त्रुटि की रिपोर्ट करें",
    requestCourse: "नया कोर्स अनुरोध करें",
    verifyCert: "प्रमाणपत्र सत्यापित करें",
  },
  bn: {
    tagline: "যেকোনো কিছু শিখুন। প্রমাণ করুন। বিনামূল্যে।",
    heroSub:
      "প্রতিটি বিষয়ে AI-চালিত পাঠ — সমুদ্রবিদ্যা থেকে AWS পর্যন্ত। ছোট প্রবেশ কুইজ পাস করে যেকোনো কোর্স বিনামূল্যে খুলুন, ডাউনলোডযোগ্য সার্টিফিকেট অর্জন করুন।",
    browseCourses: "কোর্স দেখুন",
    courses: "কোর্স",
    login: "লগ ইন",
    register: "সাইন আপ",
    logout: "লগ আউট",
    admin: "অ্যাডমিন",
    myCertificates: "আমার সার্টিফিকেট",
    generalSubjects: "সাধারণ বিষয়",
    certPrep: "সার্টিফিকেশন প্রস্তুতি",
    unlocked: "খোলা",
    quizRequired: "প্রবেশ কুইজ প্রয়োজন",
    startQuiz: "পেমেন্ট করুন ও কুইজ শুরু করুন",
    disclaimer:
      "এই বিষয়বস্তু AI দ্বারা তৈরি। পেশাদার বা চিকিৎসা ব্যবহারের আগে স্বাধীনভাবে যাচাই করুন।",
    lessons: "পাঠ",
    markComplete: "পাঠ সম্পূর্ণ করুন",
    completed: "সম্পূর্ণ",
    reportError: "ত্রুটি রিপোর্ট করুন",
    requestCourse: "নতুন কোর্সের অনুরোধ করুন",
    verifyCert: "সার্টিফিকেট যাচাই করুন",
  },
};

export type Dict = (typeof dict)["en"];

export async function getLang(): Promise<Lang> {
  const jar = await cookies();
  const l = jar.get("learnzy_lang")?.value;
  return l === "hi" || l === "bn" ? l : "en";
}

export async function t(): Promise<Dict> {
  return dict[await getLang()];
}
