const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className={'content'}>
        <p>&copy; {new Date().getFullYear()} Tech Store. All rights reserved.</p>
        <div className={'socials'}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;