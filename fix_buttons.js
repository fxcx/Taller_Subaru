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

        // Fix btn duplicated replacements
        // Because btn was translated, and btn-primary was translated, and they were next to each other
        content = content.replace(/inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors-primary/g, 'inline-block font-medium text-center align-middle cursor-pointer px-6 py-2 rounded text-white bg-primary hover:bg-[#1a7ded] transition-colors');
        content = content.replace(/inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors-dark/g, 'inline-block font-medium text-center align-middle cursor-pointer px-6 py-2 rounded text-white bg-[#212529] hover:bg-[#121416] transition-colors');
        content = content.replace(/inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors-close/g, 'absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer');
        content = content.replace(/inline-block font-normal text-center align-middle cursor-pointer select-none border border-transparent py-1.5 px-3 text-base rounded transition-colors/g, 'inline-block font-medium text-center px-4 py-2 rounded border');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed buttons in ${file}`);
    }
});
