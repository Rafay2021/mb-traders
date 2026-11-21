import { RefreshCw, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react';
const features = [
  { icon: Truck, title: 'Free shipping', sub: 'On orders over $75' },
  {
    icon: ShieldCheck,
    title: 'Secure checkout',
    sub: 'Protected payments',
  },
  {
    icon: RefreshCw,
    title: 'Easy returns',
    sub: '30-day return window',
  },
  {
    icon: Sparkles,
    title: 'Curated quality',
    sub: 'Picked with purpose',
  },
];
export default function Features() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='container-shell grid grid-cols-2 gap-3 py-8 sm:grid-cols-4'>
      {features.map(({ icon: Icon, title, sub }) => (
        <motion.div
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            boxShadow: '1px 5px 20px rgba(0, 0, 0, .2)',
          }}
          key={title}
          className='flex items-center gap-3 rounded-2xl border border-primary/80 bg-white p-3.5 sm:p-4'>
          <div className='grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700'>
            <Icon size={17} />
          </div>
          <div>
            <p className='text-xs font-bold text-slate-800'>{title}</p>
            <p className='mt-1 text-[10px] text-slate-500'>{sub}</p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
