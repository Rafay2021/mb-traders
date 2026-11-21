export default function NewsLetter() {
  return (
    <section className='container-shell mt-6'>
      <div className='relative overflow-hidden rounded-[28px] bg-[#24233a] px-7 py-12 text-white sm:px-14 sm:py-16'>
        <div className='absolute -right-10 -top-28 h-80 w-80 rounded-full border-[50px] border-violet-400/20' />
        <div className='relative max-w-xl'>
          <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-300'>
            A better kind of inbox
          </p>
          <h2 className='mt-3 text-3xl font-bold tracking-tight sm:text-4xl'>
            Good finds, good timing.
          </h2>
          <p className='mt-3 text-sm leading-6 text-slate-300'>
            Sign up for first looks, fresh arrivals and a little treat on your
            first order.
          </p>
          <form className='mt-6 flex max-w-md rounded-full bg-white p-1.5'>
            <input
              type='email'
              required
              placeholder='Email address'
              className='min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400'
            />
            <button className='rounded-full bg-violet-600 px-5 py-3 text-xs font-semibold text-white hover:bg-violet-500'>
              Sign me up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
