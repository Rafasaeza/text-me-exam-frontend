// components/Footer.js

const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <div className="bg-gray-300 dark:bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Creado por{' '}
                <a
                  href="https://www.linkedin.com/in/rafael-saez-arana/"  // Reemplaza con tu URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Rafael Sáez Arana
                </a>{' '}
                © {currentYear}
              </p>
            </div>
            
            <div className="mt-2 md:mt-0">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;