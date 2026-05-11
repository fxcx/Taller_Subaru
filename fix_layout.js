const fs = require('fs');

const files = [
    'index.html',
    'autos.html',
    'contacto.html',
    'service.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Fix broken classes from regex replace
        content = content.replace(/md:flex-flex flex-wrap -mx-\[15px\]/g, 'md:flex-row');
        content = content.replace(/w-full lg:w-1\/2 px-\[15px\] w-full md:w-1\/2 px-\[15px\]/g, 'w-full md:w-1/2 lg:w-1/2 px-4');
        content = content.replace(/flex flex-wrap -mx-\[15px\] -mx-6/g, 'flex flex-wrap -mx-4 gap-y-8');
        content = content.replace(/-mx-\[15px\]/g, '-mx-4');
        content = content.replace(/px-\[15px\]/g, 'px-4');

        // Center navbar and make it modern responsive
        const oldNav = /<div class="container-fluid nav-bar bg-transparent">[\s\S]*?<!-- Navbar End -->/;
        const newNav = `<div class="container mx-auto px-4">
            <nav class="flex flex-wrap items-center justify-between py-6 mb-12 bg-white">
                <a href="index.html" class="flex items-center">
                    <img class="max-w-[200px] h-auto" src="assets/logo (footer).webp" alt="Proline Subaru Logo">
                </a>
                <div class="flex flex-wrap items-center mt-4 md:mt-0 space-x-2 md:space-x-6">
                    <a href="index.html" class="text-gray-700 hover:text-primary font-medium text-lg px-2 transition-colors">Inicio</a>
                    <a href="service.html" class="text-gray-700 hover:text-primary font-medium text-lg px-2 transition-colors">Servicios</a>
                    <a href="autos.html" class="text-gray-700 hover:text-primary font-medium text-lg px-2 transition-colors">Autos</a>
                    <a href="contacto.html" class="text-gray-700 hover:text-primary font-medium text-lg px-2 transition-colors">Contacto</a>
                </div>
            </nav>
        </div>
        <!-- Navbar End -->`;
        content = content.replace(oldNav, newNav);

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed layout in ${file}`);
    }
});
