/*================================================
- Change the cloudFolder according to
your Auto upload mapping in Cloudinary

- Change cloudName with your Cloudinary name

- Customize the presets as desired if you want to

@version: 0.2
@author: https://github.com/migliori/
=================================================*/

const cloudFolder = '',
    cloudName = 'demo';

let responsivePreset = `w_auto,f_auto,dpr_auto,c_scale/${cloudFolder}`,
    fixedWidthPreset = `w_{width},f_auto,dpr_auto,c_scale/${cloudFolder}`,
    maxWidthPreset = `w_{width},f_auto,dpr_auto,c_scale/${cloudFolder}{src} {width}w`;

let images = document.querySelectorAll('.cld-responsive'),
    loc = window.location.pathname,
    currentFolder = loc.substring(0, loc.lastIndexOf('/')),
    cloudUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`,
    defaultBreakpoints = [256, 512, 768, 1024, 1280];

const myObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        let img = entry.target;
        img.setAttribute('style', 'height:' + img.offsetWidth / img.getAttribute('data-ratio') + 'px');
    }
});

images.forEach(function (img, i) {
    let src = img.getAttribute('data-src'),
        fixedWidthAttr = img.getAttribute('data-fixed-width'),
        maxWidthAttr = img.getAttribute('data-max-width'),
        widthAttr = img.getAttribute('width');

    if (!src.startsWith('/')) {
        src = currentFolder + '/' + src;
    }

    img.setAttribute('data-src', cloudUrl + responsivePreset + src);

    if (fixedWidthAttr === 'true') {
        img.setAttribute('data-src', cloudUrl + fixedWidthPreset.replace('{width}', widthAttr) + src);
    } else if (maxWidthAttr !== null) {
        let maxWidth = parseInt(maxWidthAttr, 10),
            srcset = '';
        defaultBreakpoints.forEach(function (bp, j) {
            if (bp < maxWidth) {
                if (j === 0) {
                    img.setAttribute('data-src', cloudUrl + fixedWidthPreset.replace('{width}', bp) + src);
                }
                srcset += cloudUrl + maxWidthPreset.replace(/{width}/g, bp).replace('{src}', src) + ',';
            }
        });
        srcset += cloudUrl + maxWidthPreset.replace(/{width}/g, maxWidth).replace('{src}', src);
        Object.assign(img, {
            srcset: srcset,
            sizes: '(min-width: ' + maxWidth + 'px) ' + maxWidth + 'px, 100vw',
            style: 'max-width: 100%'
        });
    }

    if (img.getAttribute('data-ratio') !== null && widthAttr > 0) {
        img.setAttribute('style', 'height:' + parseInt(widthAttr) / img.getAttribute('data-ratio') + 'px');
        myObserver.observe(img);
    }
});

const cl = cloudinary.Cloudinary.new({ cloud_name: cloudName });
cl.config({ breakpoints: defaultBreakpoints, responsive_use_breakpoints: 'resize' });
cl.responsive();
