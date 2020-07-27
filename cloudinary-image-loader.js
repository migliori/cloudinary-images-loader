/*================================================
- Change the cloudFolder according to
your Auto upload mapping in Cloudinary

- Change cloudName with your Cloudinary name

- Customize the presets as desired if you want to

@version: 0.1
@author: https://github.com/migliori/
=================================================*/

const cloudFolder = '',
    cloudName = 'demo';

let responsivePreset = `w_auto,f_auto,dpr_auto,c_scale${cloudFolder}`,
    fixedWidthPreset = `w_{width},f_auto,dpr_auto,c_scale${cloudFolder}`,
    maxWidthPreset = `w_{width},f_auto,dpr_auto,c_scale${cloudFolder}{src} {width}w`;

let images = document.querySelectorAll('.cld-responsive'),
    loc = window.location.pathname,
    currentFolder = loc.substring(0, loc.lastIndexOf('/')),
    cloudUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`,
    defaultBreakpoints = [256, 512, 768, 1024, 1280];

images.forEach(function (img, i) {
    let src = img.getAttribute('data-src');
    if (!src.startsWith('/')) {
        src = currentFolder + '/' + src;
    }
    img.setAttribute('data-src', cloudUrl + responsivePreset + src);
    if (img.getAttribute('width') !== null) {
        img.setAttribute('data-src', cloudUrl + fixedWidthPreset.replace('{width}', img.getAttribute('width')) + src);
    } else if (img.getAttribute('data-max-width') !== null) {
        img.removeAttribute('data-src');
        let maxWidth = parseInt(img.getAttribute('data-max-width'), 10),
            srcset = '';
        defaultBreakpoints.forEach(function (bp, i) {
            if (bp < maxWidth) {
                if (i === 0) {
                    img.setAttribute('src', cloudUrl + fixedWidthPreset.replace('{width}', bp) + src);
                }
                srcset += cloudUrl + maxWidthPreset.replace(/{width}/g, bp).replace('{src}', src) + ',';
            }
        });
        srcset += cloudUrl + maxWidthPreset.replace(/{width}/g, maxWidth).replace('{src}', src);
        img.setAttribute('srcset', srcset);

        let defaultWidth = '100vw';
        if (img.getAttribute('data-default-w') !== null) {
            defaultWidth = img.getAttribute('data-default-w');
        }
        img.setAttribute('sizes', '(min-width: ' + maxWidth + 'px) ' + maxWidth + 'px, ' + defaultWidth);
        img.setAttribute('style', 'max-width: 100%');
    }
});
const cl = cloudinary.Cloudinary.new({ cloud_name: cloudName });
cl.config({ breakpoints: defaultBreakpoints, responsive_use_breakpoints: 'resize' });
cl.responsive();
