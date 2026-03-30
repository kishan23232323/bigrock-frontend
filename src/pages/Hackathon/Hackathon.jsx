import React,{useEffect,useState} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTrophy,
  FaCalendarTimes,
  FaCalendarCheck,
  FaMedal, 
  FaAward,
  FaRobot, FaGlobe, FaLeaf, FaCube, FaLightbulb,
  FaTelegramPlane
 } from "react-icons/fa";
import {
  FaUsers,
  FaFlagCheckered,
  FaRegClock,
  FaRocket,
} from "react-icons/fa6";

function DomainSection() {
  const domains = [
    {
      name: "Artificial Intelligence",
      icon: <FaRobot size={38} className="text-pink-400" />,
      gradient: "from-pink-500/20 to-purple-600/20",
      glow: "shadow-[0_0_20px_rgba(255,100,180,0.4)]",
      link:"https://drive.google.com/file/d/1En0hD1i363ls0UuQAGfrmMYzBcg6crA4/view?usp=drive_link"
    },
    {
      name: "Web Development",
      icon: <FaGlobe size={38} className="text-blue-300" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      glow: "shadow-[0_0_20px_rgba(100,180,255,0.4)]",
      link:"https://drive.google.com/file/d/1cd_A1erNw55ObOEqgwlRnWQ2l0VWOGSN/view?usp=drive_link"
    },
    {
      name: "Sustainability & Green Tech",
      icon: <FaLeaf size={38} className="text-green-300" />,
      gradient: "from-green-500/20 to-emerald-600/20",
      glow: "shadow-[0_0_20px_rgba(80,200,120,0.4)]",
      link:"https://drive.google.com/file/d/1_j2XS_KNPD1dyDABcofZ3ohS7mt48HFY/view?usp=drive_link"
    },
    {
      name: "Web3 & Decentralization",
      icon: <FaCube size={38} className="text-amber-300" />,
      gradient: "from-yellow-500/20 to-orange-600/20",
      glow: "shadow-[0_0_20px_rgba(255,180,80,0.4)]",
      link:"https://drive.google.com/file/d/1VGxeUIl3SliXw2JcLo6Vd-W2kaWdbuJv/view?usp=drive_link"
    },

  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-center">

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">

        {domains.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, y: -5 }}
            transition={{ duration: 0.4 }}
            className={`
              w-full max-w-xs p-8 rounded-2xl 
              bg-gradient-to-br ${d.gradient}
              backdrop-blur-xl border border-white/10 
              ${d.glow}
              flex flex-col items-center text-center 
            `}
          >
            {/* Icon */}
            <div className="p-4 bg-black/20 rounded-full mb-4">
              {d.icon}
            </div>

            {/* Domain Name */}
            <h3 className="text-2xl font-bold text-white mb-1">{d.name}</h3>
          </motion.div>
         
        ))}

      </div>
    </section>
  );
}

function PrizeSection() {
  const prizes = [
    {
      place: "Winner",
      emoji: "🥇",
      amount: "₹8,000 + 100,000 BRK Tokens",
      icon: <FaTrophy className="text-yellow-300" size={38} />,
      gradient: "from-yellow-400/40 to-yellow-600/30",
      border: "border-yellow-500/40",
      glow: "shadow-[0_0_35px_rgba(255,215,0,0.45)]",
      
    },
    {
      place: "Runner-up",
      emoji: "🥈",
      amount: "₹5,000 + 100,000 BRK Tokens",
      icon: <FaMedal className="text-gray-300" size={36} />,
      gradient: "from-gray-300/40 to-gray-600/20",
      border: "border-gray-400/30",
      glow: "shadow-[0_0_28px_rgba(220,220,220,0.35)]",
    },
    {
      place: "Second Runner-up",
      emoji: "🥉",
      amount: "₹4,000 + 100,000 BRK Tokens",
      icon: <FaAward className="text-amber-500" size={36} />,
      gradient: "from-amber-600/40 to-amber-800/30",
      border: "border-amber-600/40",
      glow: "shadow-[0_0_30px_rgba(255,140,40,0.35)]",
    },
    {
      place: "4th Place",
      emoji: "🔥",
      amount: "₹1,500 + 100,000 BRK Tokens",
      icon: <FaAward className="text-purple-300" size={34} />,
      gradient: "from-purple-500/30 to-purple-800/20",
      border: "border-purple-500/30",
      glow: "shadow-[0_0_25px_rgba(180,100,255,0.35)]",
    },
    {
      place: "5th Place",
      emoji: "⭐",
      amount: "₹1,500 + 100,000 BRK Tokens",
      icon: <FaAward className="text-blue-300" size={34} />,
      gradient: "from-blue-500/30 to-blue-800/20",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_25px_rgba(100,180,255,0.35)]",
    },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-center">
  
      <div className="grid md:grid-cols-3 gap-10 place-items-center">

        {prizes.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, y: -8 }}
            transition={{ duration: 0.4 }}
            className={`
              w-full max-w-xs p-6 rounded-2xl 
              bg-gradient-to-br ${p.gradient}
              backdrop-blur-xl border ${p.border}
              ${p.glow}
              flex flex-col items-center
            `}
          >
            {/* ICON */}
            <div className="p-4 bg-black/20 rounded-full mb-4">
              {p.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold mb-2">{p.emoji} {p.place}</h3>

            {/* AMOUNT */}
            <p className="text-gray-300 text-lg">{p.amount}</p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

function TimelineSection()  {
  const days = [
    {
      dayTitle: "PHASE 1 – REGISTRATIONS",
      dateLabel: "MARCH 5 – APRIL 10",
      events: [
        {
          title: "Registrations Open",
          subtitle: "Kickoff to participant onboarding",
          time: "March 5",
          icon: <FaCalendarCheck className="text-yellow-400" />,
          date: "2026-03-05T09:00:00",
        },
        {
          title: "Registrations Close",
          subtitle: "Last day to register",
          time: "April 10",
          icon: <FaCalendarTimes className="text-yellow-200" />,
          date: "2026-04-10T23:59:00",
        },
        {
          title: "Final Teams Announcement",
          subtitle: "Team lock-in & community onboarding",
          time: "April 11",
          icon: <FaUsers className="text-yellow-300" />,
          date: "2026-04-11T18:00:00",
        },
      ],
    },

    {
      dayTitle: "DAY 1 – HACKATHON BEGINS",
      dateLabel: "APRIL 12",
      events: [
        {
          title: "Inauguration Ceremony",
          subtitle: "Opening remarks & announcements",
          time: "09:00 AM",
          icon: <FaRegClock className="text-yellow-300" />,
          date: "2026-04-12T09:00:00",
        },
        {
          title: "Hackathon Officially Begins",
          subtitle: "Start building your project",
          time: "10:00 AM",
          icon: <FaRocket className="text-yellow-200" />,
          date: "2026-04-12T10:00:00",
        },
        {
          title: "First Review",
          subtitle: "Checkpoint evaluation window",
          time: "1:00 PM – 3:00 PM",
          icon: <FaRegClock className="text-yellow-300" />,
          date: "2026-04-12T13:00:00",
        },
      ],
    },

    {
      dayTitle: "DAY 2 – REVIEW & SUBMISSION",
      dateLabel: "APRIL 13",
      events: [
        {
          title: "Second Review",
          subtitle: "Morning progress evaluation",
          time: "08:00 AM – 10:00 AM",
          icon: <FaRegClock className="text-yellow-200" />,
          date: "2026-04-13T08:00:00",
        },
        {
          title: "Third Review",
          subtitle: "Final pre-submission feedback",
          time: "06:00 PM – 08:00 PM",
          icon: <FaRegClock className="text-yellow-300" />,
          date: "2026-04-13T18:00:00",
        },
        {
          title: "Final Submission Deadline",
          subtitle: "Submission portal closes",
          time: "09:00 PM",
          icon: <FaFlagCheckered className="text-yellow-400" />,
          date: "2026-04-13T21:00:00",
        },
      ],
    },
  ];

  const now = Date.now();

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-white">
      {days.map((day, dayIndex) => {
        const allEvents = day.events.map((ev) => ({
          ...ev,
          ts: new Date(ev.date).getTime(),
        }));

        const total = allEvents.length;
        const next = allEvents.findIndex((ev) => ev.ts > now);
        const progress = next === -1 ? total : next;
        const progressPercent = (progress / total) * 100;

        return (
          <div key={dayIndex} className="mb-24 relative">

            {/* HEADER */}
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-yellow-400 tracking-wide">
                {day.dayTitle}
              </h2>
              <p className="text-yellow-200 mt-2 tracking-wider">{day.dateLabel}</p>
            </div>

            <div className="relative">

              {/* BACKGROUND LINE */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-yellow-900/20"></div>

              {/* PROGRESS LINE */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] 
                           bg-gradient-to-b from-yellow-300 to-amber-500
                           shadow-[0_0_14px_rgba(255,215,0,0.9)]"
              />

              {/* EVENTS */}
              <div className="flex flex-col gap-20">
                {allEvents.map((ev, i) => {
                  const isCompleted = ev.ts < now;
                  const isLeft = i % 2 === 0;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-center gap-6 ${
                        isLeft ? "justify-start" : "justify-end"
                      } relative`}
                    >
                      {/* DOT */}
                      <div
                        className={`
                          absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full 
                          ${isCompleted
                            ? "bg-yellow-400 shadow-[0_0_18px_rgba(255,215,0,0.8)]"
                            : "bg-yellow-900/30 border border-yellow-700"
                          }
                        `}
                      />

                      {/* CARD */}
                      <div
                        className={`
                          w-[300px] bg-black/40 border border-yellow-800/40 
                          rounded-xl px-6 py-4 backdrop-blur-md 
                          shadow-[0_0_15px_rgba(255,200,0,0.15)]
                          ${isLeft ? "ml-10" : "mr-10"}
                        `}
                      >
                        <div className="flex items-center gap-3 text-yellow-300 font-semibold">
                          {ev.icon}
                          <span>{ev.time}</span>
                        </div>

                        <h3 className="mt-2 text-xl font-bold text-yellow-200">
                          {ev.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{ev.subtitle}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
export default function HackathonPage() {
  const SectionHeading = ({ text }) => {
    return (
      <div className="relative py-24 flex justify-center items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute text-[100px] md:text-[160px] font-extrabold text-white/10 tracking-tight select-none"
        >
          {text}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-5xl md:text-7xl font-extrabold text-white"
        >
          {text}
        </motion.h2>
      </div>
    );
  };

  return (
    <div className="bg-black text-white font-[Inter] w-full overflow-x-hidden">
  
      {/* HERO SECTION */}
    {/* HERO SECTION */}
<section className="pt-40 pb-32 relative overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>

  <div className="relative max-w-6xl mx-auto px-6">

    {/* Hackathon Name */}
  <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="
    text-center text-6xl md:text-8xl font-extrabold mb-8
    text-white
    bg-gradient-to-r from-purple-400 via-pink-300 to-purple-200
    bg-clip-text
    [background-blend-mode:overlay]
    drop-shadow-[0_0_25px_rgba(200,120,255,0.45)]
  "
>
  Rockverse Hackathon ‘26
</motion.h1>

    {/* Slogan: Build. Innovate. Compete. */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-6xl font-extrabold leading-tight text-center"
    >
      Build. Innovate.
      <span className="text-purple-500"> Compete.</span>
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto text-center"
    >
      Join the ultimate Hackathon experience—code, create, and collaborate
      with developers across the globe.
     {/* <div className="text-purple-500 "> Join Community to get latest updates and a chance to win airdrop worth ₹2 Lakh BRK Tokens</div>  
     */}
    </motion.p>

    {/* Buttons */}
    <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4 }}
  className="mt-12 flex justify-center gap-6 relative z-20"
>
  {/* REGISTER BUTTON */}
  <Link to="/hackathon/register">
  <button
   disabled
    className="
      px-10 py-3 rounded-xl font-semibold text-white
      bg-gradient-to-r from-purple-600 to-pink-600
      shadow-[0_0_25px_rgba(200,100,255,0.5)]
      hover:shadow-[0_0_35px_rgba(200,100,255,0.8)]
      hover:from-purple-700 hover:to-pink-700
      transition-all duration-300 ease-out
    "
  >
    Registration Closed
  </button>
  </Link>

</motion.div>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mt-12 flex justify-center"
> 
<h2 className="text-center text-yellow-400">Thanks for the overwhelming response! - We're excited to review your entries. Stay tuned for updates via our telegram channel.</h2>

</motion.div>


{/* Poster Placeholder */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mt-12 flex justify-center"
>
  <div
    className="
      w-full max-w-4xl
      aspect-[16/9]
      rounded-2xl
      border border-purple-500/30
      bg-gradient-to-br from-purple-900/30 to-black
      flex items-center justify-center
      text-gray-400
      text-lg
      shadow-[0_0_40px_rgba(180,120,255,0.15)]
      overflow-hidden
    "
  >
    {/* Replace src with your hackathon poster */}
    <img
      src="/Hackathon/poster.jpg"
      alt="Rockverse Hackathon Poster"
      className="w-full h-full object-cover"
    />
  </div>
</motion.div>

 {/* Join Community BUTTON */}
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4 }}
  className="mt-12 flex justify-center gap-6 relative z-20"
  > 
  <a href="https://t.me/+PGohKmN3pG9kMzQ1" target="_blank" rel="noopener noreferrer">
  <button
    className="
       px-10 py-3 rounded-xl font-semibold text-white
      bg-gradient-to-r from-purple-600 to-pink-600
      shadow-[0_0_25px_rgba(200,100,255,0.5)]
      hover:shadow-[0_0_35px_rgba(200,100,255,0.8)]
      hover:from-purple-700 hover:to-pink-700
      transition-all duration-300 ease-out
    
    "
  >
    Join Community
  </button>
    
  </a>
  </motion.div>


  </div>
</section>

      {/* ABOUT SECTION */}
      <SectionHeading text="About Us" />
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <p className="text-gray-300 text-lg leading-relaxed">
          Big Rock Exchange Hackathon is a builder-first initiative powered by Big Rock Exchange. We 
          are a community of developers, innovators, and aspiring founders coming together to build 
          real-world solutions using emerging technologies. Our mission is to foster a strong builder 
          culture, encourage innovation, and create opportunities for students and developers to turn 
          ideas into scalable solutions
        </p>
      </section>

      {/* PRIZES SECTION */}
      <SectionHeading text="Prizes" />
      <PrizeSection />

      {/* DOMAINS SECTION */}
      <SectionHeading text="Domains" />
      <DomainSection />

      {/* TIMELINE HEADING */}
      <SectionHeading text="Timeline" />

      {/* TIMELINE SECTION */}
        <TimelineSection />

{/* ORGANIZERS SECTION */}
<SectionHeading text="Organizers" />

<section className="max-w-6xl mx-auto px-6 pb-20">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

    {[
      { name: "Mikhil Sai N", photo : "/Organizers/mikhil.jpg" },
      { name: "Sai Prathyun", photo : "/Organizers/prathyun.jpg" },
      { name: "Piyush Sahu", photo : "/Organizers/piyush.jpg" },
      { name: "Tarun Tiwari", photo : "/Organizers/Tarun.jpg" },
    ].map((org, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        {/* PHOTO PLACEHOLDER */}
        <div className="w-32 h-32 rounded-xl bg-white/10 border border-white/10 
                        backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]
                        flex items-center justify-center text-gray-400 text-sm">
        <img
          src={org.photo}
          alt={org.name}
          className="w-32 h-32 object-cover rounded-xl
                     border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        />
        </div>

        {/* NAME */}
        <p className="mt-4 text-lg font-semibold">{org.name}</p>

      </motion.div>
    ))}

  </div>
</section>

      {/* SPONSORS SECTION */}
      {/* <SectionHeading text="Sponsors" />
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-10 bg-white/5 rounded-xl">Sapphire Sponsor</div>
          <div className="p-10 bg-white/5 rounded-xl">Emerald Sponsor</div>
        </div>
      </section> */}

      {/* FAQ SECTION */}
<SectionHeading text="FAQs" />

<section className="max-w-4xl mx-auto px-6 pb-20 space-y-4">

  {[
    {
      q: "What is the team size?",
      a: "Teams of 2–4 members are recommended.",
    },
    {
      q: "Is this online or offline?",
      a: "The hackathon is assumed to be fully online based on its 36-hour duration.",
    },
    {
      q: "Do I need to pay to participate?",
      a: `No. Participation in the Big Rock Exchange Hackathon is completely free. 
      There are no registration or platform fees. Simply sign up on the website 
      and complete your team registration to participate.`,
    },
    {
      q: "What if my team member doesn't sign up on the website?",
      a: `All team members must create an account on bigrock.exchange before the team 
      registration can be completed.`,
    },
    {
      q: "What are the judging criteria?",
      a: (
        <div className="space-y-2 mt-2">
          <p>The evaluation follows a 100-mark structure:</p>

          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li><strong>Mentor Reviews – 60 Marks</strong></li>
            <li>1st Review – 15 Marks (Idea & Planning)</li>
            <li>2nd Review – 20 Marks (Progress & Architecture)</li>
            <li>3rd Review – 25 Marks (Prototype & Execution)</li>

            <li><strong>Final Judge Review – 40 Marks</strong></li>
            <li>Innovation & Uniqueness</li>
            <li>Real-World Impact</li>
            <li>Technical Depth</li>
            <li>Presentation & Demo</li>
            <li>Q&A Handling</li>
          </ul>

          <p className="mt-2"><strong>Final Score = Total of all reviews.</strong></p>
        </div>
      ),
    },
  ].map((item, i) => (
    <details
      key={i}
      className="bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer"
    >
      <summary className="text-lg font-semibold">{item.q}</summary>
      <div className="text-gray-300 mt-2 text-sm leading-relaxed">
        {item.a}
      </div>
    </details>
  ))}

</section>

    </div>
  );
}