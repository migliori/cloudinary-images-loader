# Image loading with Cloudinary

Small JS code to load images from Cloudinary's CDN with a clean reversible markup in any situation

Demo: <https://www.cloudinary-images-loader.miglisoft.com>

**What this code does:**
This code allows to load images from Cloudinary's CDN with a clean reversible markup.
It uses the [Cloudinary JavaScript library](https://cloudinary.com/documentation/responsive_images#step_1_include_the_cloudinary_javascript_library) to make images responsive.

**It uses 3 configurable presets to load the images:**

- Responsive images
- Fixed width images
- Responsive images with maximum width

## Quick start

1. Create a free Cloudinary account
2. Setup your *Auto upload mapping* on Cloudinary:
    1. Go to *Settings* => *Uploads*
    2. add a new mapping with your *Folder* and *URL prefix*
3. Load Cloudinary Responsive JS + `cloudinary-image-loader.js` to your page just before `</body>`:

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.11.1/cloudinary-core-shrinkwrap.min.js"></script>
    <script src="cloudinary-image-loader.js"></script>
    ```

4. Change the cloudFolder and cloudName in `cloudinary-image-loader.js` according to yours

5. Use the appropriate HTML markup depending on your images as described below

## HTML Markup (`<img />` attributes)

attribute     | type         | detail    | example
------------- |:-------------|:----------|:-----
src           | url | any placeholder or blank src | `src="blank.png"`
data-src      | url | relative or root-relative image | `data-src="/image.png"`
data-fixed-width | boolean | width for non-responsive images | `data-fixed-width="true"`
data-max-width | number | image max. width in px | `data-max-width="768"`
data-ratio | number | image aspect ratio width/height | `data-max-width="768"`

## A few more details

- The function replaces the `data-src` URL (relative or root-relative) with cloudinary URL.

    Example: `"/image.jpg"` or `"image.jpg"` will become `"https://res.cloudinary.com/.../image.jpg"`

- use `data-fixed-width="true"` to set a fixed image width

- use `data-max-width` attribute to limit the img width (will generate `srcset` + `sizes`).

  Example: `data-max-width="750"`

- add `data-ratio` attribute to set automatic image `height`. Ratio is width/height.

  Example: `data-ratio="1.5"`

- `data-ratio` helps to avoid [Cumulative Layout Shift](https://web.dev/optimize-cls/).

- You can set all others common image attributes as desired: `width`, `height`, `alt`, `class`, ...

_____________________

## HTML Markup examples

### 1. Responsive images

**HTML code:**

 ```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
data-src="/assets/images/image.png"
alt="My image"
class="cld-responsive"
loading="lazy">
```

**Will generate:**

```html
<img src="https://res.cloudinary.com/your-cloud-name/image/upload/w_xxx,f_auto,dpr_1.0,c_scale/folder/assets/images/image.png"
data-src="https://res.cloudinary.com/your-cloud-name/image/upload/w_xxx,f_auto,dpr_1.0,c_scale/folder/assets/images/image.png"
alt="My image"
class="cld-responsive"
loading="lazy"
data-width="xxx"
width="xxx">
<!-- "xxx" will change according to the viewport width -->
```

### 2. Fixed width images

**HTML code:**

 ```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
data-src="/assets/images/image.png"
width="508"
data-fixed-width="true"
alt="My image"
class="cld-responsive"
loading="lazy">
```

**Will generate:**

```html
<img src="https://res.cloudinary.com/your-cloud-name/image/upload/w_508,f_auto,dpr_1.0,c_scale/folder/assets/images/image.png"
data-src="https://res.cloudinary.com/your-cloud-name/image/upload/w_508,f_auto,dpr_auto,c_scale/folder/assets/images/image.png"
width="508"
alt="My image"
class="cld-responsive"
loading="lazy">
```

### 3. Responsive images with maximum width

This mode calculates `srcset` and `sizes`

**HTML code:**

 ```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
data-src="/assets/images/image.png"
data-max-width="768"
alt="My image"
class="cld-responsive"
loading="lazy">
```

**Will generate:**

```html
<img src="https://res.cloudinary.com/your-cloud-name/image/upload/w_256,f_auto,dpr_auto,c_scale/folder/assets/images/image.png"
data-max-width="768"
alt="My image"
class="cld-responsive"
srcset="https://res.cloudinary.com/your-cloud-name/image/upload/w_256,f_auto,dpr_auto,c_scale/folder/assets/images/image.png 256w,
https://res.cloudinary.com/your-cloud-name/image/upload/w_512,
f_auto,dpr_auto,c_scale/folder/assets/images/image.png 512w,
https://res.cloudinary.com/your-cloud-name/image/upload/w_768,f_auto,dpr_auto,c_scale/folder/assets/images/image.png 768w"
sizes="(min-width: 768px) 768px, 100vw"
loading="lazy">
```
