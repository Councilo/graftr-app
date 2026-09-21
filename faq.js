// Vendaru help centre FAQ. Shared by /help.html and the app's Help drawer.
// Plain text only: whoever renders it must escape it (use textContent).
// Paragraphs are separated by a blank line (\n\n). Version 2026-09-19 (DRAFT wording).
window.VENDARU_FAQ = [
  // ---------- ordering ----------
  {
    id: "how-it-works",
    cat: "ordering",
    q: "How does Vendaru work?",
    a: "Vendaru is a marketplace that connects people who need a parcel moved with independent couriers.\n\nYou enter a pickup address, a drop-off address and a pickup time (or 'now'), and you see the price before you post. Couriers registered with Vendaru can see the open job and one of them accepts it. The courier collects the parcel and takes a photo, then delivers it and takes another photo. You can chat with the courier and follow the job while it is active.\n\nA job moves from Open to Accepted to Collected to Delivered, or it can be Cancelled. You can have up to 10 jobs waiting for a courier at one time.",
    link: { label: "About Vendaru", href: "/about.html" }
  },
  {
    id: "price",
    cat: "ordering",
    q: "How is the price worked out?",
    a: "The price is £3.50 plus £1.37 for every mile of road distance between the pickup and the drop-off, with a minimum of £5.00.\n\nThe distance is the real road distance from a routing service, not a straight line. The price is shown before you post and it does not change once the job is posted.\n\nA quote is valid for 15 minutes. If it runs out before you post, ask for a new quote."
  },
  {
    id: "schedule",
    cat: "ordering",
    q: "Can I choose when the parcel is collected?",
    a: "Yes. You choose a pickup start time, or choose 'now' if you want it collected as soon as a courier can.\n\nIf you ask for 'now' and then cancel, you may have to pay for what has already been provided. Your legal rights are not affected. See the Refund & Cancellation Policy.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "coverage",
    cat: "ordering",
    q: "Where does Vendaru deliver?",
    a: "Vendaru is for parcels between UK addresses. If you are not sure that an address is covered, for example in Northern Ireland or on an island, ask us through Help before you post."
  },
  {
    id: "parcel-limits",
    cat: "ordering",
    q: "What size and weight of parcel can I send?",
    a: "The parcel must be something one person can carry and fit in a normal car. Our guidance is up to 30 kg and a declared value of up to £500, unless agreed in advance. If you are not sure, ask us through Help before you post.",
    link: { label: "Prohibited items", href: "/prohibited-items.html" }
  },
  {
    id: "prohibited",
    cat: "ordering",
    q: "What can't I send?",
    a: "You can't send weapons or replica firearms, explosives, fireworks, flammable or other hazardous goods, damaged batteries, illegal drugs, alcohol, tobacco, vapes or other age-restricted goods, cash, jewellery, bank cards, cheques or identity documents, live animals or human remains, stolen or counterfeit goods, indecent material, anything illegal to send, or anything over the size, weight or value limits.\n\nPerishable goods that need temperature control are not accepted unless agreed in advance. Couriers may refuse any parcel they reasonably suspect breaks the rules. They do not open parcels, so you are responsible for what you send.",
    link: { label: "Prohibited items", href: "/prohibited-items.html" }
  },
  {
    id: "cancel-open",
    cat: "ordering",
    q: "How do I cancel before a courier has accepted?",
    a: "Open Help in the app, go to the Orders tab and cancel it there. If no courier has accepted yet, the cancellation is automatic and you get a full refund, or nothing is charged if you have not paid.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "cancel-accepted",
    cat: "ordering",
    q: "Why is the Cancel button locked?",
    a: "Once a courier has accepted your job, the Cancel button is locked, because cancelling at that point incurs a fee (the courier has committed their time to your order).\n\nIf you still need to cancel, open Help, go to the Orders tab, and use \"Contact support to cancel\" on that order. We will cancel it for you and tell you the fee. Anything that is not kept as the fee is refunded to you.\n\nIf the courier lets you down or does not turn up, you will not be charged a cancellation fee: use \"Get help\" on that order in Help → Orders instead. Your legal rights are not affected.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "cancel-collected",
    cat: "ordering",
    q: "Can I cancel once the parcel has been collected?",
    a: "Not in the app. Once the parcel has been collected, use 'Report a problem' or ask for a refund on the order, and an administrator will look at it case by case.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "courier-no-show",
    cat: "ordering",
    q: "What if the courier cancels or doesn't turn up?",
    a: "If the courier cancels or hands the job back before collecting the parcel, it goes back on the marketplace automatically for another courier to accept, and you are not charged extra. If nobody ends up delivering it, or the parcel is lost, you get a full refund.\n\nIf a courier didn't turn up, you can also report it from the order (choose 'courier no-show') or tell us through Help."
  },

  // ---------- payments ----------
  {
    id: "how-pay",
    cat: "payments",
    q: "How do I pay?",
    a: "There is no card processing yet. Payment is tracked in the app and settled by hand, by bank transfer or invoice. The instructions are shown in the app for each order.\n\nWhen your payment arrives, an administrator records it and the order's payment status changes from Unpaid to Paid.",
    link: { label: "Terms of Service", href: "/terms.html" }
  },
  {
    id: "payment-status",
    cat: "payments",
    q: "What do the payment statuses mean?",
    a: "Unpaid: we have not recorded a payment yet.\n\nPaid: we have recorded your payment.\n\nPartially refunded: part of your payment has been returned.\n\nRefunded: all of your payment has been returned.\n\nVoid: nothing was paid and nothing is owed any more, for example an unpaid order that was cancelled."
  },
  {
    id: "refund-when",
    cat: "payments",
    q: "When am I entitled to a refund?",
    a: "In summary: you get a full refund if you cancel before a courier accepts, if the parcel is lost or not delivered, or if nobody ends up delivering a job after a courier cancels. If you were charged the wrong price, we refund the difference. If the parcel is damaged, an administrator decides the amount, and it can be a partial refund. Other cases are looked at individually.\n\nThese rules are in addition to your legal rights and never reduce them.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "refund-how",
    cat: "payments",
    q: "How do I ask for a refund?",
    a: "Sign in, open the order and choose 'Get help' (or 'Report a problem' once the parcel has been collected), then use the refund request option. Pick a reason (damaged, not delivered, courier no-show, wrong price or other) and describe what happened.\n\nYou can follow the request in the app: Pending, Approved, Partially approved, Denied or Auto-approved. An administrator can approve in full or in part, or deny with a written reason."
  },
  {
    id: "refund-timing",
    cat: "payments",
    q: "How long does a refund take?",
    a: "Refunds are settled by hand, like payments. We can't give you a fixed timescale yet. You can see the status of your request in the app, and you can ask us about it through Help."
  },
  {
    id: "damaged-lost",
    cat: "payments",
    q: "What if my parcel is damaged or lost?",
    a: "Report it from the order as soon as you can. If a parcel is lost or not delivered, you get a full refund. If it is damaged, an administrator decides the refund amount, looking at evidence such as the proof photos and the chat, and a partial refund is possible.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },
  {
    id: "legal-rights",
    cat: "payments",
    q: "Do I still have my legal rights?",
    a: "Yes. Vendaru's cancellation and refund rules are in addition to your legal rights and never reduce them.\n\nUnder the Consumer Rights Act 2015 a service must be provided with reasonable care and skill, and if it is not you can ask for it to be repeated or for a price reduction. Under the Consumer Contracts Regulations 2013 you normally have 14 days to cancel a service bought online, but you lose that right once the service is fully performed, and if you asked for the service to start immediately you must pay for what has been provided before you cancel.",
    link: { label: "Refund & Cancellation Policy", href: "/refund-policy.html" }
  },

  // ---------- tracking ----------
  {
    id: "track-parcel",
    cat: "tracking",
    q: "How do I follow my delivery?",
    a: "Open your order in the app. You can see its status (Open, Accepted, Collected, Delivered or Cancelled) and, once the courier has set off (they press Start order first, so you won't see them while they are still at home), their position on the map and the road route they are taking to the pickup. You can also chat with the courier while the job is active."
  },
  {
    id: "recipient-link",
    cat: "tracking",
    q: "What is the recipient tracking link?",
    a: "You can copy a link for an order and give it to the person receiving the parcel. They don't need an account.\n\nAnyone with the link sees the status, the drop-off area, a map pin for the drop-off rounded to about 100 metres and, only once the parcel has been collected, the courier's first name, their rounded live position and how far they are from the drop-off. They never see the pickup address, prices, photos, chat, other names or contact details.\n\nThe link stops working 24 hours after the order is delivered or cancelled. Only share it with people you trust.",
    link: { label: "Location Tracking Policy", href: "/location-policy.html" }
  },
  {
    id: "dot-not-moving",
    cat: "tracking",
    q: "Why isn't the courier's dot moving?",
    a: "The courier's position is shared only while their Vendaru app is open and their device is awake, about every 10 seconds. If the phone locks or they close the browser, the dot stops. It also stops if they have turned location off or refused permission on their device.\n\nThe tracking page shows a 'Signal lost' message with the time of the last update if nothing has arrived for a while. Positions can also be a little off or delayed. If you are worried about a parcel, message the courier in the chat or contact us through Help.",
    link: { label: "Location Tracking Policy", href: "/location-policy.html" }
  },
  {
    id: "courier-sees",
    cat: "tracking",
    q: "What do couriers see before they accept a job?",
    a: "Only the area of the job (for example 'Bolton BL1'), locations rounded to roughly 1 km and a coarse route. They see the full addresses and exact locations only after they accept.",
    link: { label: "Location Tracking Policy", href: "/location-policy.html" }
  },

  // ---------- couriers ----------
  {
    id: "courier-handback",
    cat: "couriers",
    q: "Can I hand a job back as a courier?",
    a: "Yes, before you have collected the parcel. The job goes back on the marketplace for another courier and the customer is not charged extra. Please do it as early as you can. Once you have collected the parcel you can't hand it back in the app; use 'Report a problem' or contact us through Help.",
    link: { label: "Courier Terms", href: "/courier-terms.html" }
  },
  {
    id: "courier-location",
    cat: "couriers",
    q: "Why does Vendaru use my location as a courier?",
    a: "So the customer can follow their delivery. You agree to this when you sign up as a courier. Accepting a job shares nothing. When you set off for the pickup you press Start order; from then on, while the app is open on your device, it shares your position about every 10 seconds until the job is delivered, cancelled or handed back.\n\nOnly your latest position for the job is kept, not a trail, and it is cleared when the job ends. You can turn location off in your device settings, but then the customer sees no live dot. Keep the app open while you are on a job.",
    link: { label: "Location Tracking Policy", href: "/location-policy.html" }
  },
  {
    id: "courier-photos",
    cat: "couriers",
    q: "Why do I have to take photos?",
    a: "Couriers take one photo at pickup and one at delivery so that both sides can see the parcel was collected and delivered. Photos must be genuine and show the real parcel and handover. Try to keep faces and anything unrelated out of the picture.",
    link: { label: "Courier Terms", href: "/courier-terms.html" }
  },
  {
    id: "courier-status",
    cat: "couriers",
    q: "Am I employed by Vendaru if I'm a courier?",
    a: "No. Couriers are independent and self-employed. You choose which jobs to accept, and you are responsible for your own tax and for having the right to work in the UK, the right licence and appropriate insurance for the vehicle you use.",
    link: { label: "Courier Terms", href: "/courier-terms.html" }
  },
  {
    id: "courier-pay",
    cat: "couriers",
    q: "How and when are couriers paid?",
    a: "Payments to couriers are currently handled manually. Ask us through Help for the current arrangements for your account."
  },

  // ---------- safety ----------
  {
    id: "emergency",
    cat: "safety",
    q: "What if someone is in danger?",
    a: "Call 999. Vendaru can't respond to emergencies."
  },
  {
    id: "report",
    cat: "safety",
    q: "How do I report a courier or a customer?",
    a: "If it is about a specific order, open it and use 'Get help' or 'Report a problem'. You can also use the Help form and choose 'Safety'. Tell us what happened and which order it was. If anyone is in danger, call 999 first."
  },
  {
    id: "complaint",
    cat: "safety",
    q: "How do I make a complaint?",
    a: "Tell us through Help, in the app or at vendaru.com/help.html, and explain what went wrong and what you would like us to do. We aim to acknowledge complaints promptly and to give you a full reply.\n\nFor complaints about how we handle your personal data you can also contact the Information Commissioner's Office (ico.org.uk).",
    link: { label: "Contact us", href: "/contact.html" }
  },
  {
    id: "suspended",
    cat: "safety",
    q: "Why has my account been suspended?",
    a: "We may suspend an account for safety reasons, to prevent fraud or abuse, or if the Terms have been broken. The reason is shown to you in the app. If you think it is a mistake, use the Help form (you can use it while signed out) and we will review it. You can still download your data or delete your account while suspended.",
    link: { label: "Terms of Service", href: "/terms.html" }
  },

  // ---------- account ----------
  {
    id: "password",
    cat: "account",
    q: "How do I change my password?",
    a: "Sign in, open Account, then Security, to change your password. Keep it private and don't reuse it elsewhere."
  },
  {
    id: "cant-sign-in",
    cat: "account",
    q: "I can't sign in.",
    a: "After 8 failed sign-in attempts in 15 minutes an account is locked out for a short while to protect it, so wait a little and try again with the correct details. If you are still stuck, or you think someone else has been using your account, use the Help form (you can use it while signed out)."
  },
  {
    id: "delete-account",
    cat: "account",
    q: "How do I delete my account?",
    a: "Sign in, open Account, then Your data, to delete your account. You need to finish or cancel any delivery in progress first.\n\nDeleting your account anonymises it: your name and email are replaced, your password is removed and you can no longer sign in, and your name is replaced in chat messages and support tickets. Job, payment and refund records are kept for accounting and to deal with disputes.",
    link: { label: "Privacy Policy", href: "/privacy.html" }
  },
  {
    id: "confirm-email",
    cat: "account",
    q: "Why do I need to confirm my email address?",
    a: "When you sign up we email a link to the address you gave. Clicking it proves the address is yours, so we can reach you about your orders and let you reset your password if you forget it. Until it is confirmed you can look around, but you can't post or accept an order.\n\nDidn't get it? Check your junk or spam folder (if it's there, mark it as not junk so our order updates reach your inbox), then tap Send it again in the banner at the top of the app, or on your Account page. The newest link is the one that works.",
  },
  {
    id: "forgot-password",
    cat: "account",
    q: "I forgot my password",
    a: "On the sign-in screen tap Forgot your password?, enter the email you signed up with and we'll send you a link. It works once and expires after an hour. Choosing a new password signs you out on your other devices.\n\nIf nothing arrives, check your junk or spam folder and that you typed the right address. For safety we reply in the same way whether or not an address has an account.",
  },
  {
    id: "email-updates",
    cat: "account",
    q: "What emails will Vendaru send me?",
    a: "We email you to confirm your address, to reset a password when you ask, and about your orders: when an order is listed (with how to pay), when a courier accepts it, sets off, collects it and delivers it. We don't send marketing emails. Order emails only name the town and postcode area, never a full address, and they are only sent to addresses that have been confirmed.",
    link: { label: "Privacy Policy", href: "/privacy.html" }
  },
  {
    id: "download-data",
    cat: "account",
    q: "How do I download my data?",
    a: "Sign in, open Account, then Your data, to download your data as a JSON file. For other requests, such as correcting or restricting your data, use the Help form and choose 'Account'. We reply within one month.",
    link: { label: "Privacy Policy", href: "/privacy.html" }
  },
  {
    id: "nobody-accepts",
    cat: "ordering",
    q: "What if no courier accepts my job?",
    a: "Your job stays on the marketplace for couriers to accept. If nobody has taken it by 30 minutes after its pickup window ends (24 hours after the start time unless you chose otherwise), it is cancelled automatically and you get a full refund, or are not charged if you had not paid.\n\nYou can also cancel it yourself at any time before a courier accepts and be refunded automatically.",
    link: { label: "Refund policy", href: "/refund-policy.html" }
  },
  {
    id: "call-courier",
    cat: "tracking",
    q: "Can I call my courier (or my customer)?",
    a: "Yes. Once a courier has accepted a job, open the order on the Active deliveries page and use the phone button to call the other person inside Vendaru. It is a voice call over the internet, so nobody's phone number is shared, and the audio is not recorded.\n\nBoth of you need Vendaru open on your phone for it to ring: the app checks for calls every few seconds while a delivery is under way, but it can't wake a locked phone. It uses mobile data or Wi-Fi, and your browser will ask to use the microphone the first time. If the call won't connect (this can happen on some mobile networks), send a message instead.",
    link: { label: "Privacy Policy", href: "/privacy.html" }
  },
  {
    id: "pin-confirmation",
    cat: "ordering",
    q: "What is PIN confirmation?",
    a: "When you place an order you can turn on PIN confirmation. Vendaru then makes a 4-digit PIN, shown on your order once it is placed. Give it to whoever is receiving the parcel; the courier has to type it in to complete the delivery, so the parcel can only be marked delivered when the right person has it.\n\nThe PIN is only shown to you. The courier is told a PIN is needed, but never sees the number, and the public tracking link never shows it.",
  },
  {
    id: "handover-instructions",
    cat: "ordering",
    q: "Can I add instructions, and choose how the parcel is handed over?",
    a: "Yes. On the review screen, tap the pickup or drop-off to say who the courier should ask for, choose Meet at kerb, Meet at door or Leave at door, and add instructions such as a gate code. You can also say whether you are sending or receiving the parcel.\n\nOnly the courier who accepts your job sees these details. Other couriers browsing the marketplace only see the area and the parcel size.",
    link: { label: "Privacy Policy", href: "/privacy.html" }
  },
  {
    id: "parcel-sizes",
    cat: "ordering",
    q: "What sizes of parcel can I send?",
    a: "You choose a size when you review your order: small (fits in a bag, up to 40 × 30 × 20 cm and under 5 kg), medium (fits in a car boot, up to 80 × 60 × 40 cm and under 15 kg) or large (needs an estate or a big boot, up to 120 × 80 × 60 cm and under 30 kg). Couriers see the size before they accept, so pick the one that fits.\n\nYour parcel should also be worth £500 or less, securely sealed, and not on the prohibited items list.",
    link: { label: "Prohibited items", href: "/prohibited-items.html" }
  },
  {
    id: "contact",
    cat: "account",
    q: "How do I contact Vendaru?",
    a: "Use the Help form, at vendaru.com/help.html or in the app. You can use it without signing in. If you are signed in to the app, you can see your tickets and our replies in Help. Our contact page lists other ways to reach us.",
    link: { label: "Contact us", href: "/contact.html" }
  }
];
