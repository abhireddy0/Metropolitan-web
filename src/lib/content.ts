// Page copy, taken word for word from the previous emetrocare.com (captured from the live site on 2026-10-28).
// Edit this file to update copy across the site.

export type Pair = [title: string, body: string];

export type Service = {
  slug: string;
  /** Card / menu name (old services page). */
  name: string;
  /** Page heading and lead (old homepage slider). */
  heroTitle: string;
  heroSub: string;
  /** Short label used for the hero chips (old homepage quick links). */
  shortTitle: string;
  /** Card text (old /services page). */
  card: string;
  /** SEO title and description (old page meta). */
  title: string;
  description: string;
  /** "Your Health, Our Expertise" paragraphs (old service page). */
  intro: string[];
  /** Heading and items of the "Our … Services" list (old service page). */
  listTitle: string;
  items: string[];
  image: string;
  alt: string;
};

export type County = { name: string; population: string; cities: string[]; response: string };
export type Certificate = { image: string; width: number; height: number; title: string; text: string; badge: string };
export type Faq = { q: string; a: string; category: "insurance" | "general" | "services" };

export const site = {
  name: "Metropolitan Home Health Care",
  legalName: "Metropolitan Home Health Care, Inc.",
  tagline: "Beyond Wellness, Beyond Care.",
  url: "https://emetrocare.com",
  phone: "(847) 568-1033",
  phoneDashed: "847-568-1033",
  fax: "847-568-1034",
  email: "metro@emetrocare.com",
  address: {
    street: "340 E Dundee Rd",
    locality: "Wheeling",
    region: "IL",
    postalCode: "60090-3176",
    country: "US",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=340+E+Dundee+Rd+Wheeling+IL+60090",
  analytics: { ga4: "G-SE3LNF55S7", clarity: "tnxmu093oc" },
  // Same EmailJS account and template as the previous site, so leads land in the same inbox.
  emailjs: { service: "service_oa6u4ji", template: "template_3lrp36m", publicKey: "zRk00rPlC_4DDmOOG" },
  description:
    "Licensed home health agency providing compassionate, professional healthcare services in the comfort of your home throughout the Chicago metropolitan area.",
  badges: ["Medicare Certified", "Licensed Professionals", "15+ Years of Excellence"],
  footerNotes: ["Licensed by Illinois Department of Public Health", "HomeCare Elite Agency 2023", "Serving Chicago Metro"],
};

export const tel = (n: string) => `tel:+1${n.replace(/\D/g, "")}`;

export const hero = {
  title: "Your Health, Our Expertise",
  sub: "We deliver expert healthcare with compassion, dedicated to your recovery and lifelong well-being.",
  cta: "Get Care Now",
  personalized: {
    title: "Need Personalized Care?",
    text: "Our healthcare professionals will work with you to create a customized care plan that meets your specific needs and goals.",
    cta: "Get Your Care Plan",
  },
};

export const stats = {
  home: [
    ["3000+", "Patients Served"],
    ["15+", "Years of Service"],
    ["100+", "Licensed Professionals"],
    ["98%", "Patient Satisfaction"],
  ] as Pair[],
  about: [
    ["10", "Counties Served"],
    ["13", "Specialized Services"],
    ["500+", "Happy Clients"],
  ] as Pair[],
  insurance: [
    ["14+", "Insurance Partners"],
    ["98%", "Coverage Success"],
    ["99%", "Verification Accuracy"],
    ["150K+", "Claims Processed"],
  ] as Pair[],
  careers: [
    ["50+", "Healthcare Professionals"],
    ["95%", "Employee Satisfaction"],
    ["10+", "Years Experience"],
    ["14+", "Insurance Partners"],
  ] as Pair[],
};

export const compliance = {
  title: "Certifications & Compliance",
  items: ["Medicare Certified", "State Licensed", "HIPAA Compliant", "Background Checked"],
};

export const servicesIntro = {
  eyebrow: "Healthcare Services",
  title: "How We Can Help You",
  sub: "Comprehensive healthcare services designed to meet your unique needs with compassion and expertise",
};

export const services: Service[] = [
  {
    slug: "skilled-nursing",
    name: "Skilled Nursing",
    heroTitle: "Skilled Nursing Services",
    heroSub: "Expert clinical care from licensed nurses delivered right in the comfort of your home.",
    shortTitle: "Nursing",
    card: "Professional nursing care with medication management, wound care, and disease monitoring in your home.",
    title: "Skilled Home Nursing Care Services in Chicago | Metropolitan",
    description: "Expert skilled nursing care services in Chicago, including medication management, wound care, catheter care, and IV therapy by licensed RNs.",
    intro: [
      "Our Skilled Nursing provides personalized care and rehabilitation tailored to each patient’s needs. With trained nurses and caregivers, we deliver professional treatment and compassionate attention for comfort, safety, and recovery.",
      "From managing chronic conditions to post-surgical recovery, we offer complete support at every stage. Our care combines medical expertise with compassion, ensuring every patient receives top-quality treatment and respect.",
      "We maintain a safe, supportive environment that encourages healing and long-term wellness. With expert care, tailored therapy plans, and constant encouragement, we help patients regain independence and improve quality of life.",
    ],
    listTitle: "Our Skilled Nursing Services",
    items: ["Comprehensive Nursing Assessments", "Cardiovascular Care", "Diabetic Care", "Medication Management", "Wound Care", "Catheter Care", "Ostomy Care", "Phlebotomy Services", "Restorative Nursing"],
    image: "services/skilled-nursing",
    alt: "Nurse checking an older woman’s blood pressure at home",
  },
  {
    slug: "health-aide",
    name: "Home Health Aides",
    heroTitle: "Home Health Aide Support",
    heroSub: "Compassionate daily assistance for your everyday needs: safe, respectful, and reliable.",
    shortTitle: "Health Aide",
    card: "Personal care assistance and companionship to help maintain independence at home.",
    title: "Home Health Aide Services in Chicago | Metropolitan",
    description: "Professional home health aide services in the Chicago metro, offering personal care, companionship, daily living assistance, and patient support at home.",
    intro: [
      "Our Health Aide services provide compassionate, hands-on support to help patients with daily living activities in the comfort of their own homes. We focus on maintaining dignity, independence, and comfort for each individual.",
      "Trained and experienced aides assist with personal care needs, light household tasks, and mobility support, ensuring that patients receive attentive and respectful assistance tailored to their preferences and health requirements.",
      "Whether recovering from illness, managing a chronic condition, or needing ongoing support, our Health Aides work alongside families and healthcare providers to create a safe, nurturing, and supportive environment.",
    ],
    listTitle: "Our Home Health Aides Services",
    items: ["Bathing", "Dressing", "Personal Care", "Transfer Assistance", "Ambulation Support", "Light Meal Preparation", "Support for Nutritional Needs", "Laundry", "Light Housekeeping"],
    image: "services/health-aide",
    alt: "Home health aide supporting an older woman using a walker",
  },
  {
    slug: "social-worker",
    name: "Medical Social Services",
    heroTitle: "Social Worker Support",
    heroSub: "Emotional guidance, care coordination, and access to community resources.",
    shortTitle: "Social Work",
    card: "Navigate healthcare systems and access community resources with professional guidance.",
    title: "Medical Social Worker Services in Chicago | Metropolitan",
    description: "Professional medical social worker services in the Chicago metro, including counseling, resource coordination, discharge planning, and patient advocacy.",
    intro: [
      "We work to enhance quality of life for individuals and families by providing vital support in mental health, housing, financial aid, and child welfare. Our goal is to address challenges head-on and ensure everyone has access to the essential services they need to live with dignity and security.",
      "Our dedicated team offers counseling, advocacy, and connections to valuable community resources, helping people navigate difficult circumstances. We focus on empowering individuals to overcome obstacles, build resilience, and take meaningful steps toward creating stronger and more stable futures.",
      "Through compassionate care, a commitment to equality, and active community involvement, we strive to foster a more supportive and inclusive society. By promoting awareness, encouraging collaboration, and standing up for those in need, we help create an environment where everyone has the opportunity to thrive.",
    ],
    listTitle: "Our Medical Social Services",
    items: ["Assessment of Social and Emotional Factors", "Community Resource Planning", "Short-Term Therapy", "Short-Term Counseling for Long-Range Planning", "Crisis Intervention", "Grief Counseling"],
    image: "services/social-worker",
    alt: "Clinician in a white coat talking with an older man on a sofa",
  },
  {
    slug: "physical-therapy",
    name: "Physical Therapy",
    heroTitle: "Physical Therapy at Home",
    heroSub: "Restore mobility, strength, and independence through personalized rehabilitation.",
    shortTitle: "Physical Therapy",
    card: "Restore mobility, strength, and function with personalized rehabilitation programs in your home.",
    title: "In-Home Physical Therapy Services in Chicago | Metropolitan",
    description: "Professional in-home physical therapy services in Chicago, including pain management, post-surgery care, orthopedic rehabilitation, and mobility improvement.",
    intro: [
      "Physical Therapy restores mobility, strength, and function with personalized exercises and care. Our therapists help reduce pain, improve performance, and promote lasting wellness.",
      "Physical Therapy improves movement and strength through targeted treatments. Our therapists create personalized plans to ease pain, boost mobility, and support long-term independence.",
      "Physical Therapy relieves pain and restores function with tailored exercises. Our therapists enhance mobility, build strength, and prevent future injuries for lasting well-being.",
    ],
    listTitle: "Our Physical Therapy Services",
    items: ["Evaluation", "Therapeutic Exercise", "Gait Training", "Ultrasound", "Transfer Training", "Home Exercise Program", "Prosthetic Training"],
    image: "services/physical-therapy",
    alt: "Physical therapist guiding a patient through arm exercises with light weights at home",
  },
  {
    slug: "speech-therapy",
    name: "Speech Therapy",
    heroTitle: "Speech Therapy Services",
    heroSub: "Improve communication and swallowing with caring, expert speech-language therapists.",
    shortTitle: "Speech Therapy",
    card: "Improve communication and swallowing abilities with specialized therapy techniques.",
    title: "Speech Therapy Services at Home in Chicago | Metropolitan",
    description: "Professional speech therapy services at home in the Chicago metro area, including voice disorders, swallowing therapy, language development, and communication skills improvement.",
    intro: [
      "Speech Therapy helps individuals overcome communication and swallowing challenges with personalized treatment plans. Our skilled therapists work to improve speech clarity, language development, and cognitive-communication skills. We empower patients to regain confidence and enhance their quality of life.",
      "Speech Therapy helps individuals improve communication skills, including speaking, listening, and swallowing. Through personalized techniques and exercises, our therapists support patients in overcoming speech disorders and achieving greater independence. We focus on enhancing confidence and communication in everyday life.",
      "Speech Therapy helps individuals improve communication skills, addressing challenges such as speech, language, and swallowing disorders. Through personalized treatment plans, our therapists work to enhance clarity, fluency, and confidence in communication. We are committed to fostering independence and improving quality of life for each patient.",
    ],
    listTitle: "Our Speech Therapy Services",
    items: ["Evaluation", "Voice Disorder", "Treatment", "Speech Articulation Disorder", "Dysphagia Treatment", "Language Disorder Treatment", "Aural Rehabilitation"],
    image: "services/speech-therapy",
    alt: "Speech therapist in conversation with an older woman at home",
  },
  {
    slug: "occupational-therapy",
    name: "Occupational Therapy",
    heroTitle: "Occupational Therapy",
    heroSub: "Reclaim daily routines by enhancing skills for work, self-care, and leisure.",
    shortTitle: "Occupational Therapy",
    card: "Regain independence in daily activities with adaptive techniques and equipment training.",
    title: "Home Occupational Therapy Services in Chicago | Metropolitan",
    description: "Home occupational therapy services in the Chicago metro area, including daily living skills, adaptive equipment training, and independence restoration.",
    intro: [
      "Occupational Therapy supports individuals in regaining independence by enhancing their ability to perform daily tasks through customized exercises and interventions.",
      "Therapists address physical, mental, and emotional challenges with tailored plans that improve motor skills, cognitive function, and overall well-being.",
      "Whether recovering from injury, managing a disability, or adapting to age-related changes, we provide practical solutions that boost confidence and quality of life.",
    ],
    listTitle: "Our Occupational Therapy Services",
    items: ["Evaluation", "ADL Training", "Muscle Re-Education", "Perceptual Motor Training", "Fine Motor Coordination", "Neuro-development Treatment", "Sensory Treatment", "Orthotics / Splinting", "Adaptive Equipment"],
    image: "services/occupational-therapy",
    alt: "Occupational therapist helping two older adults with a hands-on activity",
  },
  {
    slug: "specialized-care",
    name: "Specialized Care",
    heroTitle: "Specialized Care",
    heroSub: "Specialized attention to manage symptoms while supporting families and loved ones.",
    shortTitle: "Specialized Care",
    card: "Comprehensive and personalized care designed to meet unique medical and therapeutic needs.",
    title: "Specialized Care Services at Home in Chicago | Metropolitan",
    description: "Specialized healthcare services at home in the Chicago metro, including podiatry, wound care, IV infusion, memory care, chronic disease management, and cardiac care.",
    intro: [
      "Metropolitan Home Health Care offers a full range of services, from skilled nursing for serious diagnoses to personal care, companionship, and short-term Medicare-certified visits after illness, surgery, or hospitalization.",
      "We provide specialized care for adults and seniors, including podiatry, wound management, IV therapy, and memory care, with treatment plans tailored to each condition.",
      "Our certified team works closely with patients and families to create personalized care plans that promote healing, comfort, and a better quality of life.",
    ],
    listTitle: "Our Specialized Care Services",
    items: ["Podiatry", "Wound Care", "IV Infusion", "Memory Care", "Chronic Disease Management", "Cardiac Care"],
    image: "services/specialized-care",
    alt: "Clinician speaking with a patient while taking her blood pressure",
  },
  {
    slug: "palliative-care",
    name: "Palliative Care",
    heroTitle: "Palliative Care",
    heroSub: "Compassion-driven comfort, symptom management, and support at every stage of illness.",
    shortTitle: "Palliative Care",
    card: "Compassionate support for individuals facing serious illness, focusing on comfort, quality of life, and dignity.",
    title: "Home Palliative Care Services in Chicago | Metropolitan",
    description: "Compassionate home palliative care services in Chicago, offering pain management, comfort care, and quality of life improvement for those with serious illnesses.",
    intro: [
      "Palliative Care focuses on improving the quality of life for patients facing serious or life-limiting illnesses. It provides relief from symptoms, pain, and emotional distress while offering compassionate support for both patients and their families.",
      "Our care team works closely with doctors, nurses, and counselors to create personalized plans that address physical comfort, emotional well-being, and spiritual needs. We ensure that patients receive holistic, respectful, and dignified care.",
      "Through symptom management, emotional counseling, and family guidance, Palliative Care helps patients live more comfortably, make informed decisions about their treatment, and maintain dignity throughout their journey.",
    ],
    listTitle: "Our Palliative Care Services",
    items: ["Comprehensive Pain & Symptom Management", "Emotional & Psychological Counseling", "Family & Caregiver Support Services", "Advance Care & Treatment Planning", "Medical Care Coordination", "Nutritional Guidance & Meal Support", "Spiritual Counseling & Support", "End-of-Life Care & Comfort Planning"],
    image: "services/palliative-care",
    alt: "Older couple walking arm in arm along a tree-lined road",
  },
  {
    slug: "infusion-therapy",
    name: "Infusion Therapy",
    heroTitle: "Infusion Therapy",
    heroSub: "Safe, professional infusion and IV therapies administered in your home.",
    shortTitle: "Infusion Therapy",
    card: "Safe and effective IV treatments delivered in the comfort of your home, reducing hospital visits.",
    title: "Home Infusion Therapy Services in Chicago | Metropolitan",
    description: "Professional home infusion therapy services in Chicago, including IV antibiotics, hydration therapy, chemotherapy, and specialized medication administration.",
    intro: [
      "Infusion Therapy delivers medications, nutrients, or fluids directly into your bloodstream through an IV line for faster and more effective results. It is ideal for patients who cannot take medications orally or need a controlled, steady delivery of treatment.",
      "Our trained nurses and healthcare professionals ensure safe administration in a comfortable and hygienic setting. We monitor your vital signs and adjust treatment as needed to ensure the best outcomes.",
      "From hydration support to advanced medication delivery, our Infusion Therapy services are designed to promote recovery, manage chronic conditions, and improve overall wellness in a compassionate and professional environment.",
    ],
    listTitle: "Our Infusion Therapy Services",
    items: ["IV Hydration Therapy", "Antibiotic Infusion Therapy", "Chemotherapy Infusion", "Pain Management Infusion", "Nutritional & Vitamin Infusion", "Biologic & Immunotherapy Infusion", "Electrolyte Replacement Infusion", "Specialized Medication Infusion"],
    image: "services/infusion-therapy",
    alt: "Close-up of an IV infusion line",
  },
  {
    slug: "homemaker",
    name: "Homemaker",
    heroTitle: "Homemaker",
    heroSub: "Assisting with daily living, ensuring comfort and well-being for your loved ones.",
    shortTitle: "Homemaker",
    card: "Assisting with daily living, ensuring comfort and well-being for your loved ones.",
    title: "Home Maker Services in Chicago | Metropolitan",
    description: "Professional home maker services in the Chicago metro, including meal preparation, light housekeeping, and companionship for your loved ones.",
    intro: [
      "Our service is designed to support individuals in maintaining health, dignity, independence, and safety in the comfort of their own homes. We offer personalized care plans tailored to each client's specific needs, providing compassionate and professional assistance with daily living activities, health monitoring, and companionship.",
      "We assist with personal care, including bathing, grooming, dressing, and mobility, provide medication reminders and basic health monitoring, and help with meal preparation, light housekeeping, errands, and transportation. Our caregivers also offer companionship and, when needed, specialized support such as wound care or medical equipment assistance.",
      "Our care is personalized, with plans crafted after thorough assessments to ensure safety, hygiene, and confidentiality. Our trained staff promotes independence and improves quality of life with flexible service options (hourly, daily, overnight, or live-in). We maintain safe, clean environments, ensure fall prevention, and keep families informed with accurate care records and updates.",
    ],
    listTitle: "Our Home Health Care / Homemaker Services",
    items: ["Personal Care & Daily Living Assistance", "Medication & Health Monitoring", "Meal Planning & Nutrition", "Household Support / Homemaking Tasks", "Appointment & Transportation Assistance", "Emotional / Social Support & Companionship", "Special Care Services", "Safety & Environment Management", "Communication & Reporting"],
    image: "services/homemaker",
    alt: "Three older adults chatting over coffee in a bright living room",
  },
];

export const careOptions = services.map((s) => s.name);

export const firstVisit = {
  eyebrow: "Our Process",
  title: "What to Expect on Your First Visit",
  sub: "Once you and your doctor decide that home health services are right for you, here's what you can expect from our professional team.",
  steps: [
    ["Comprehensive Assessment", "Our staff will visit your home to conduct a thorough assessment of your needs and medical condition, working closely with you and your doctor."],
    ["Customized Care Plan", "We'll develop a personalized plan that includes all necessary services, treatments, medical equipment, and specific recovery goals."],
    ["Education & Training", "We'll teach you and your caregivers essential skills including wound care, therapy exercises, and disease management strategies."],
    ["Ongoing Support", "Your care plan is regularly reviewed and adjusted as needed, with continued support until you achieve your health goals."],
  ] as Pair[],
  details: [
    ["Initial Assessment:", "Our qualified staff will visit your home to conduct a comprehensive assessment of your needs and medical condition. Working closely with you and your doctor, we'll develop a customized plan of care that includes all necessary services and treatments, required medical equipment, and specific goals for your recovery."],
    ["Ongoing Care:", "Our qualified staff will make scheduled visits to your home to implement your care plan. This plan is regularly reviewed by our team and your doctor to ensure you're receiving the most effective care. If your health condition changes, we'll coordinate with you and your doctor to adjust your care plan accordingly."],
    ["Patient Education:", "Throughout our visits, we'll teach you and your caregivers essential skills, including wound care techniques, therapy exercises, disease management strategies, how to recognize potential problems and side effects, and when and whom to contact if issues arise."],
    ["Completion of Care:", "Your home health services will conclude when you've achieved your established health goals, your doctor determines it's appropriate to discontinue services, or you're no longer eligible for home health benefits. Upon discharge, your doctor may recommend continued treatment at an outpatient facility, regular follow-up appointments, or our Private Duty Services."],
  ] as Pair[],
  medicare: {
    title: "Medicare Questions?",
    text: "For questions about your Medicare home health benefits, call 1-800-MEDICARE (1-800-633-4227). TTY users can call 1-877-486-2048. If you get your Medicare benefits through a Medicare Advantage or Medicare HMO plan, call your plan directly.",
  },
};

export const mission = {
  title: "Our Mission",
  text: "To deliver quality homecare services in a compassionate and cost effective manner. Guided by our mission, we want to be one of the leading home health care service providers in the state of Illinois. We take every opportunity to provide quality homecare services as a way to share our commitment and passion to every client we serve. Together with our mission, our care providers are driven to treat every patient as part of our growing family. We make it a habit to not only treat our patients and clients as customers but also, we take care of them as part of our own family.",
};

export const coreValues = {
  title: "Our Core Values",
  sub: "At Metropolitan Home Health Care, our values guide everything we do. They shape how we care for our patients, support our families, and work together as a team.",
  items: [
    ["Compassion", "It's how we care. Beyond the technology and resources we can offer, caring comes down to finding that human connection and reaching out with our true hearts to our patients and families."],
    ["Team Integrity", "The ability to work together is strengthened when you are able to make decisions as a team and move forward as one. The strength of the team is built upon the power of everyone working with a single-minded determination to achieve the greater good."],
    ["Inclusion", "We recognize the contributions of all members of our high-performing, diverse workforce. Inclusion expresses our commitment to providing a work environment where everyone is comfortable bringing all of themselves to Metropolitan Home Health Care."],
    ["Trust", "When you're talking about a home healthcare leader, few values say as much as trust. We must earn the trust of our patients and families every single day, and we must trust each other to deliver our best."],
    ["Innovation", "We believe that we live in a unique time for innovation in all aspects of our home healthcare business. In clinical care, we can bring more to our families with technology. In our business, we can bring greater efficiency and lower costs."],
    ["Compliance", "We do everything we do in a compliant way. We do the right thing, always, and there's no room for bending the rules. It's the environment we live in, the air we breathe. We are a compliant company, and you can trust us."],
  ] as Pair[],
};

export const insurancePartners = {
  eyebrow: "Insurance Partners",
  title: "Trusted by Leading Insurance Providers",
  sub: "We work with major insurance providers to ensure seamless coverage and hassle-free healthcare services",
  accepted: ["Traditional Medicare", "Almost all BCBS plans", "Commercial Aetna", "Commercial UHC plans", "Commercial Cigna"],
};

export const gallery = {
  title: "Real Moments. Real Care.",
  sub: "A glimpse into how we deliver professional, compassionate home healthcare across the Chicago metropolitan area.",
  items: [
    ["services/health-aide", "Mobility assistance and support"],
    ["services/skilled-nursing", "Health monitoring services"],
    ["pages/about-care", "Compassionate bedside care"],
    ["services/social-worker", "Collaborative care planning"],
    ["pages/hero-nurse-visit", "Emotional support and comfort"],
    ["services/physical-therapy", "Professional therapeutic care"],
  ] as [slot: string, caption: string][],
};

export const stories = {
  eyebrow: "Patient Stories",
  title: "Stories from Our Care Community",
  sub: "Real experiences from patients and families who trust us with their healthcare needs.",
};

export const closingCta = {
  title: "Ready to Experience Compassionate Care?",
  sub: "Your journey to better health starts with a simple call.",
  cta: "Contact Us Today",
};

export const contactBlock = {
  title: "Contact Us",
  sub: "Ready to start your care journey? We're here to help.",
  coverageTitle: "Service Coverage Area",
  coverage: "We serve the greater Chicago metropolitan area including Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, and DeKalb counties.",
};

export const about = {
  title: "About Metropolitan Home Health Care",
  tagline: "Committed and passionate about every patient we serve",
  text: "Metropolitan Home Health Care is a licensed home health agency by the Illinois Department of Public Health, serving the Chicago metropolitan area with comprehensive healthcare services. We are dedicated to providing reliable, compassionate, and personalized care in the comfort of your own home.",
  award: ["HomeCare Elite Agency 2023", "Recognized for excellence in home healthcare delivery"] as Pair,
  values: [
    ["Compassion", "We approach every patient with empathy, understanding, and genuine care."],
    ["Excellence", "We maintain the highest standards in healthcare delivery and professional service."],
    ["Integrity", "We conduct our practice with honesty, transparency, and ethical principles."],
    ["Respect", "We honor the dignity and individuality of every patient and family we serve."],
  ] as Pair[],
  development: {
    title: "Employee Development",
    text: "Metropolitan Home Health Care provides our employees with comprehensive support and development opportunities:",
    items: ["Comprehensive orientation programs", "Continuous education through in-house services, case conferences, and seminars", "Evaluation of clinical competencies"],
  },
  costEffective: {
    title: "Cost Effective Healthcare",
    text: "Our cost effective programs and services significantly reduce your health care expenses by preventing emergency room visits, long-term hospitalization and extended care facilities. We focus on providing quality care at home to maintain better health outcomes while reducing overall healthcare costs.",
  },
};

export const faqIntro = {
  title: "Frequently Asked Questions",
  sub: "Get answers to common questions about our home healthcare services",
  stillTitle: "Still Have Questions?",
  stillText: "Our healthcare professionals are here to answer your questions and guide you whenever you need.",
  categories: [
    ["all", "All Questions"],
    ["general", "General Care"],
    ["services", "Our Services"],
    ["insurance", "Insurance & Coverage"],
  ] as [string, string][],
};

export const faqs: Faq[] = [
  { category: "insurance", q: "Do I receive a bill if I have Medicare?", a: "Metropolitan Home Health Care bills Medicare directly. You do not receive a bill. Metropolitan Home Health Care assumes the assignment and therefore you do not get a bill. You will receive an Explanation of Benefits once the billing has taken place." },
  { category: "insurance", q: "Do we have to pay for it?", a: "Before you are admitted to Metropolitan Home Health Care, our Intake staff reviews your insurance benefits and authorizes your care. You do not have to pay for the visits if you have Medicare or Medicaid and Metropolitan Home Health Care has accepted the assignment. If you have Medicaid and you have a \"spend down\" / deductible then you must pay that portion. If your Medicaid benefits have been dropped you will be responsible. If you have private insurance, you pay whatever you have agreed to with your plan." },
  { category: "insurance", q: "Are there limitations set for the therapists?", a: "It depends on your type of insurance. Check with your private insurer. Or, if you have Medicare there are requirements depending upon your medical diagnosis." },
  { category: "insurance", q: "Will I get a bill from you if I have private insurance?", a: "If you have private insurance and your insurance company does not pay Metropolitan Home Health Care within 30 days you will get a bill. It is best to check with your insurance company when this happens." },
  { category: "insurance", q: "Does Medicare bill secondary insurers?", a: "Yes, Medicare bills the secondary insurance directly." },
  { category: "insurance", q: "How is Metropolitan Home Health Care, Inc. paid?", a: "Your insurance company, Medicare and Medicaid pay Metropolitan Home Health Care." },
  { category: "insurance", q: "Can I use private funds to pay?", a: "Yes, please call the billing department for our charges." },
  { category: "general", q: "What is home health care?", a: "Home health care is medical care provided in the comfort of your own home by licensed healthcare professionals. Our services include skilled nursing, physical therapy, occupational therapy, speech therapy, home health aides, and medical social services. This allows patients to recover and receive care in familiar surroundings while maintaining their independence." },
  { category: "general", q: "Who qualifies for home health care services?", a: "Patients typically qualify for home health care if they: are homebound (unable to leave home without considerable effort), need skilled medical care, have a physician's order for home health services, and require intermittent (not 24-hour) care. Common conditions include recovery from surgery, chronic illnesses, injuries, or conditions requiring ongoing medical management." },
  { category: "general", q: "What areas do you serve?", a: "We proudly serve 10 counties across the Chicago metropolitan area and Northern Illinois: Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, and DeKalb. Our coverage includes major cities like Chicago, Naperville, Evanston, Joliet, Aurora, Elgin, and many more communities throughout the region." },
  { category: "general", q: "How do I start home health care services?", a: "Starting services is simple: 1) Contact us at 847-568-1033 for an initial consultation, 2) Your physician provides orders for home health services, 3) We verify your insurance coverage, 4) Our clinical team conducts an in-home assessment, 5) We develop a personalized care plan and begin services. Most patients can start receiving care within 24-48 hours." },
  { category: "services", q: "What does skilled nursing include?", a: "Our skilled nursing services include medication management and administration, wound care and dressing changes, IV therapy and injections, disease monitoring and assessment, patient and family education, and care plan coordination. All our nurses are licensed, registered professionals with extensive home health experience." },
  { category: "services", q: "What conditions benefit from home physical therapy?", a: "Home physical therapy helps with recovery from surgery, stroke rehabilitation, balance and fall prevention, pain management, mobility improvement, and chronic condition management. Our therapists provide strength exercises, gait training, balance training, and adaptive equipment recommendations." },
  { category: "services", q: "What do home health aides provide?", a: "Our certified home health aides assist with personal hygiene and bathing, mobility and transfer assistance, meal preparation and feeding support, light housekeeping related to patient care, companionship and emotional support, and transportation to medical appointments when appropriate." },
  { category: "general", q: "How often will healthcare professionals visit?", a: "Visit frequency depends on your individual care plan and medical needs. Typically, skilled nursing visits range from 1-3 times per week, therapy sessions are 2-3 times per week, and home health aide services can be daily or several times per week. We adjust the schedule based on your progress and changing needs." },
  { category: "general", q: "What safety measures do you follow?", a: "We maintain strict safety protocols including background checks for all staff, ongoing safety training, infection control procedures, emergency response plans, regular supervision and quality assurance, and compliance with all state and federal healthcare regulations." },
];

export const serviceAreas = {
  title: "Service Areas",
  sub: "Serving the Greater Chicago Metropolitan Area",
  text: "Metropolitan Home Health Care proudly serves 10 counties across the Chicago metropolitan area: Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, and DeKalb. Our comprehensive home healthcare services reach communities throughout Northern Illinois, delivering professional medical care where you need it most.",
  mapTitle: "Service Coverage Map",
  touchTitle: "Get in touch",
  touchText: "Call us anytime for assistance and support",
};

export const counties: County[] = [
  { name: "Cook County", population: "5.2M", cities: ["Chicago", "Evanston", "Oak Park", "Cicero", "Berwyn"], response: "< 24 hours" },
  { name: "Lake County", population: "714K", cities: ["Waukegan", "Highland Park", "Mundelein", "Vernon Hills"], response: "< 24 hours" },
  { name: "DuPage County", population: "932K", cities: ["Naperville", "Wheaton", "Downers Grove", "Elmhurst"], response: "< 24 hours" },
  { name: "Will County", population: "696K", cities: ["Joliet", "Bolingbrook", "Romeoville", "Plainfield"], response: "< 48 hours" },
  { name: "McHenry County", population: "310K", cities: ["Crystal Lake", "Algonquin", "Cary", "Woodstock"], response: "< 48 hours" },
  { name: "Kane County", population: "516K", cities: ["Aurora", "Elgin", "Carpentersville", "St. Charles"], response: "< 48 hours" },
  { name: "LaSalle County", population: "109K", cities: ["Ottawa", "Peru", "LaSalle", "Streator"], response: "< 48 hours" },
  { name: "Grundy County", population: "52K", cities: ["Morris", "Minooka", "Coal City"], response: "< 48 hours" },
  { name: "Kankakee County", population: "107K", cities: ["Kankakee", "Bradley", "Bourbonnais"], response: "< 48 hours" },
  { name: "DeKalb County", population: "104K", cities: ["DeKalb", "Sycamore", "Sandwich"], response: "< 48 hours" },
];

export const certificates = {
  title: "Certificates & Accreditations",
  sub: "In delivering home health care services, we focus on quality. With our uncompromised drive for excellence, we’ve managed to receive the following recognitions:",
  items: [
    { image: "award-2019.jpg", width: 794, height: 616, title: "Metropolitan Home Health Care Certificate", text: "Official certification for home health care services", badge: "Current" },
    { image: "award-2006.jpg", width: 766, height: 569, title: "Health Care Certification 2006", text: "Healthcare service certification from 2006", badge: "2006" },
    { image: "award-2007.jpg", width: 767, height: 569, title: "Health Care Certification 2007", text: "Healthcare service certification from 2007", badge: "2007" },
    { image: "award-2008.jpg", width: 766, height: 569, title: "Health Care Certification 2008", text: "Healthcare service certification from 2008", badge: "2008" },
    { image: "award-2009.jpg", width: 762, height: 567, title: "Health Care Certification 2009", text: "Healthcare service certification from 2009", badge: "2009" },
  ] as Certificate[],
  accredited: {
    title: "Licensed & Accredited",
    text: "Our certifications represent our ongoing commitment to maintaining the highest standards of healthcare delivery and professional excellence.",
    items: [
      ["Licensed", "Illinois Department of Public Health"],
      ["Certified", "Professional Healthcare Standards"],
    ] as Pair[],
  },
};

export const careers = {
  title: "Join Our Healthcare Team",
  sub: "Build a rewarding career in home healthcare where you make a real difference in patients' lives every day",
  why: {
    title: "Why Choose Metropolitan Healthcare",
    sub: "Join a team that values your professional growth, work-life balance, and commitment to excellent patient care",
    items: [
      ["Compassionate Care", "We put patients first, treating each individual with dignity, respect, and genuine care."],
      ["Team Excellence", "We foster collaboration, support each other, and celebrate our collective achievements."],
      ["Quality Standards", "We maintain the highest standards in healthcare delivery and professional excellence."],
      ["Innovation", "We embrace new technologies and methods to improve patient outcomes and experiences."],
    ] as Pair[],
  },
  benefits: {
    title: "Comprehensive Benefits Package",
    sub: "We believe in taking care of our team members so they can take care of our patients",
    items: [
      ["Health & Wellness", "Comprehensive medical, dental, and vision coverage plus wellness programs"],
      ["Professional Development", "Continuing education support, certifications, and career advancement opportunities"],
      ["Competitive Compensation", "Competitive salaries, performance bonuses, and retirement planning"],
      ["Work-Life Balance", "Flexible scheduling, paid time off, and family support programs"],
    ] as Pair[],
  },
  // The disciplines behind our services; a standing list of who we hire, not live job openings.
  roles: {
    title: "Roles we hire for",
    sub: "We're always glad to hear from licensed, compassionate clinicians and caregivers.",
    items: ["Registered Nurses", "Physical Therapists", "Occupational Therapists", "Speech-Language Pathologists", "Medical Social Workers", "Home Health Aides"],
    note: "Don't see your role? Send us your resume anyway.",
  },
  faqs: [
    { q: "How do I apply?", a: "Email your resume to metro@emetrocare.com with a short note about your role and experience, or call us at (847) 568-1033. Our team reviews every application." },
    { q: "What licenses or certifications do I need?", a: "Clinical roles require a current Illinois license or certification for your discipline, such as an RN license or a home health aide certification. We'll confirm the exact requirements for the role you apply for." },
    { q: "Do you offer flexible schedules?", a: "Yes. We offer flexible scheduling and paid time off, so you can balance patient visits with life at home." },
    { q: "Is there support for continuing education?", a: "Yes. We support continuing education and certifications, with clear opportunities to advance your career." },
    { q: "What benefits do you offer?", a: "Medical, dental and vision coverage, wellness programs, competitive pay with performance bonuses, retirement planning, paid time off and family support programs." },
  ] as { q: string; a: string }[],
};

export const contactPage = {
  eyebrow: "Contact Us",
  title: "Get In Touch",
  sub: "Ready to start your healthcare journey? We're here to help every step of the way.",
  form: { title: "Request Care Information", sub: "Tell us about your needs and we'll create a personalized care plan." },
  support: { title: "Direct Support Line", text: "We’re here when you need us" },
  faxBox: { title: "Fax", text: "Send us your documents" },
  other: {
    title: "Other Ways to Connect",
    items: [
      ["Email Us", "metro@emetrocare.com"],
      ["Service Area", "Chicago Metro - 10 Counties"],
      ["Response Time", "Within 24 hours"],
    ] as Pair[],
  },
  counties: { title: "Counties We Serve", items: ["Cook", "Lake", "DuPage", "Will", "McHenry", "Kane", "LaSalle", "Grundy", "Kankakee", "DeKalb"], link: "View Detailed Coverage Map" },
  partner: {
    title: "Trusted Healthcare Partner",
    sub: "15+ years of excellence in home healthcare",
    items: [
      ["Medicare Certified", "Licensed healthcare professionals"],
      ["Always Accessible", "Flexible and reliable support"],
      ["Local Expertise", "Deep Chicago area knowledge"],
    ] as Pair[],
  },
};

export const nav: [href: string, label: string][] = [
  ["/service-areas", "Service Areas"],
  ["/about", "About"],
  ["/careers", "Careers"],
  ["/blog", "Blog"],
];
