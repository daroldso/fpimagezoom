jQuery Full Page Image Zoom
===============================
## How to Use
Include FP Image Zoom CSS file to your HTML file
```
<link rel="stylesheet" href="fpimagezoom/fpimagezoom.css">
```

Include jQuery and FP Image Zoom js files to your HTML file
```
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="fpimagezoom/fpimagezoom.js"></script>
```

Place your image inside a DIV and give it a ID. The "data-src" attribute should store the file path to the original image.
```
<div id="fpimagezoom" class="fpimagezoom-container">
    <img src="images/001-thumb.jpg" data-src="images/001-original.jpg" alt="">
    <img src="images/002-thumb.jpg" data-src="images/002-original.jpg" alt="">
    <img src="images/003-thumb.jpg" data-src="images/003-original.jpg" alt="">
    <img src="images/004-thumb.jpg" data-src="images/004-original.jpg" alt="">
</div>
```

Call the FP Image Zoom function
```
$('#fpimagezoom').fpImageZoom();
```