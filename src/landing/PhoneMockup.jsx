import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Zap, Users, Dumbbell, ChevronRight } from 'lucide-react';
import CountUp from './CountUp';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.9 + i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function PhoneMockup() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef(null);

  const previewItems = [
    { icon: Users, label: t('phoneMockup.patients'), sub: t('phoneMockup.patientsSub') },
    { icon: Dumbbell, label: t('phoneMockup.today'), sub: t('phoneMockup.todaySub') },
    { icon: Zap, label: t('phoneMockup.progress'), sub: null, progress: true },
  ];

  const rotateX = useMotionValue(4);
  const rotateY = useMotionValue(-12);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.6 });

  function handlePointerMove(e) {
    if (reduced || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(-12 + px * 20);
    rotateX.set(4 - py * 16);
  }

  function handlePointerLeave() {
    rotateY.set(-12);
    rotateX.set(4);
  }

  return (
    <div className="relative flex justify-center lg:justify-end">
      <motion.div
        className="relative w-[85vw] max-w-[280px]"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          ref={wrapRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full [transform-style:preserve-3d]"
          style={{ perspective: 900 }}
        >
          <motion.div
            className="relative w-full"
            style={{ rotateX: reduced ? 4 : springX, rotateY: reduced ? -12 : springY }}
          >
            {/* Phone frame */}
            <div className="relative rounded-[2.5rem] bg-motivo-surfaceAlt p-2 shadow-2xl shadow-black/60 border-4 border-motivo-border">
              <div className="rounded-[2rem] overflow-hidden bg-motivo-onyx">
                {/* Notch */}
                <div className="h-6 bg-motivo-surfaceAlt rounded-b-2xl w-32 mx-auto" />
                {/* App preview - mimics login/dashboard feel */}
                <div className="bg-motivo-onyx min-h-[480px] p-4">
                  <motion.div
                    className="flex items-center gap-2 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <img src="/motivo-mark.png" alt="" className="w-9 h-9" />
                    <span className="font-bold text-white text-lg">MOTIVO</span>
                  </motion.div>
                  <div className="space-y-2">
                    {previewItems.map(({ icon: Icon, label, sub, progress }, i) => (
                      <motion.div
                        key={label}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-3 p-3 bg-motivo-surface rounded-xl border border-motivo-border"
                      >
                        <div className="w-10 h-10 rounded-lg bg-motivo-green/10 flex items-center justify-center text-motivo-green shrink-0">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">{label}</p>
                          {progress ? (
                            <div className="mt-1.5 flex items-center gap-2">
                              <div className="h-1.5 flex-1 rounded-full bg-motivo-border overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-motivo-green"
                                  initial={{ width: '0%' }}
                                  animate={{ width: '72%' }}
                                  transition={{ delay: 1.3, duration: 1, ease: 'easeOut' }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-motivo-green tabular-nums">
                                <CountUp to={72} suffix="%" duration={1} />
                              </span>
                            </div>
                          ) : (
                            <p className="text-xs text-motivo-textMuted">{sub}</p>
                          )}
                        </div>
                        <ChevronRight size={18} className="text-motivo-textMuted shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/kontakt"
                      className="block w-full py-2.5 rounded-xl bg-motivo-green text-motivo-onyx text-center text-sm font-semibold hover:brightness-110 transition-all shadow-lg shadow-motivo-green/20"
                    >
                      {t('nav.cta')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Glow behind phone */}
          <motion.div
            className="absolute -z-10 inset-0 bg-motivo-green/10 rounded-[2.5rem] blur-xl scale-105"
            animate={reduced ? undefined : { opacity: [0.3, 0.5, 0.3] }}
            transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
