// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument("/test.pdf");
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');


        var scale = 0.4;
        var viewport = page.getViewport({ scale: scale });
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('pdf');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;


        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
            console.log('Page rendered');
        });
    });
}, function(reason) {
    // PDF loading error
    console.error(reason);
});