const Footer = () => {
  return (
    <footer className="border-t-4 border-black bg-white pt-4 md:pt-5 text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b-4 border-black pb-3 mb-3 text-center md:text-left gap-6 md:gap-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Job <span className="bg-[#F83002] text-white px-2 border-2 border-black">Hunt</span>
            </h2>
            <p className="text-xs font-semibold uppercase mt-4 max-w-sm border-l-0 md:border-l-4 border-black pl-0 md:pl-2 mx-auto md:mx-0">
              No nonsense. Just jobs. <br /> Find your next big opportunity.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-3 mt-2 md:mt-0">
            {/* Social Link: Brutalist Button Style */}
            <a 
              href="https://facebook.com" 
              className="p-2 border-4 border-black bg-[#F83002] text-white hover:bg-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" 
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
            </a>
            <a 
              href="https://twitter.com" 
              className="p-2 border-4 border-black bg-[#F83002] text-white hover:bg-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" 
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
            </a>
            <a 
              href="https://linkedin.com" 
              className="p-2 border-4 border-black bg-[#F83002] text-white hover:bg-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" 
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row justify-between items-center font-bold uppercase text-xs md:text-sm gap-4 md:gap-0">
          <p className="bg-black text-white px-3 py-1 text-center w-full md:w-auto">
            © {new Date().getFullYear()} PIYUSH.
          </p>
          <ul className="flex flex-wrap justify-center gap-3 md:gap-6 w-full md:w-auto">
            <li><a href="#" className="hover:underline hover:bg-black hover:text-white px-1">Privacy</a></li>
            <li><a href="#" className="hover:underline hover:bg-black hover:text-white px-1">Terms</a></li>
            <li><a href="#" className="hover:underline hover:bg-black hover:text-white px-1">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;