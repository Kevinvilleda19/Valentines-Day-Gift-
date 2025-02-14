import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

export default function ValentinesDayPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/unthinkable.mp3"));

  useEffect(() => {
    const heartsArray = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
    }));
    setFloatingHearts(heartsArray);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.loop = true;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const images = [
    "/IMG_7092.jpeg", "/IMG_7068.jpeg", "/IMG_7100.jpeg", "/IMG_6551.jpeg",
    "/IMG_1403.jpeg", "/IMG_3344.jpeg", "/IMG_4114.jpeg", "/8BD97E6E-7485-434F-8390-4C4CE7C69869.jpeg",
    "/IMG_2894.jpeg", "/4B5564A8-0604-4E83-AA33-91E44E379CB1.jpeg", "/98364A68-5936-4313-A34E-DCE0EA6D4DCF.jpeg",
    "/IMG_5331.jpeg", "/IMG_4111.jpeg", "/C76FC9E6-8287-4787-8E55-AE630E9CB89E.jpeg",
    "/IMG_6519.jpeg", "/IMG_6514.jpeg", "/IMG_1857.jpeg", "/IMG_4875.jpeg", "/IMG_5140.jpeg"
  ];

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">

      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-400 opacity-75"
          style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
          initial={{ opacity: 0, scale: 0, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: [0, 50, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart size={heart.size} />
        </motion.div>
      ))}

      {/* ❤️ Auto-Scrolling Photo Gallery (Above Love Letter) ❤️ */}
      <div className="bg-pink-50 py-6 w-full flex flex-col items-center overflow-hidden">
        <h2 className="text-xl md:text-3xl font-bold text-red-500 mb-4">💖 Our Love Memories 💖</h2>

        <div className="relative w-full max-w-4xl overflow-hidden">
          <motion.div
            className="flex space-x-2 md:space-x-4"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              ease: "linear",
              duration: 15,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...images, ...images].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-32 h-20 md:w-48 md:h-32 object-cover rounded-lg shadow-lg"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Love Letter Reveal */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {!showMessage ? (
          <motion.button
            onClick={() => setShowMessage(true)}
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition flex items-center gap-2 text-sm md:text-lg px-4 md:px-6"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={20} className="animate-pulse" /> Click to Reveal My Love Letter
          </motion.button>
        ) : (
          <motion.div
            className="relative bg-white shadow-lg rounded-lg p-4 md:p-6 max-w-md md:max-w-2xl text-gray-800 border-4 border-pink-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full transition shadow-md"
            >
              <X size={20} />
            </button>

            {/* Scrollable Love Letter */}
            <div className="max-h-[70vh] overflow-y-auto p-3 md:p-4">
              <p className="text-base md:text-lg leading-relaxed text-center text-red-600">
                <b>Mi Amor,</b>
                <br /><br />
                I can’t believe how lucky I am to have you in my life. Every single day with you is a blessing, and I wouldn’t trade it for anything.
                <br /><br />
                **You make my heart race, my soul shine, and my world feel complete.**
                Just hearing your voice is enough to turn my worst days into the best ones.
                <br /><br />
                I love **the way you laugh**, **the way you care for me**, and **the way you always know exactly what to say**.
                You are my safe place, my happiness, and my heart.
                <br /><br />
                **From our late-night talks to our little adventures, every moment with you is something I cherish.**
                <br /><br />
                And as SpongeBob would say… **"I'm ready, I'm ready... to love you forever!"** ❤️
                <br /><br />
                **Happy Valentine's Day, mi amor.**
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Music Button */}
      <button
        onClick={toggleMusic}
        className="mt-4 bg-pink-600 text-white p-2 md:p-3 rounded-md shadow-md flex items-center gap-2 hover:bg-pink-700 transition"
      >
        {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
}
