// Initialize Konva stage
var stage = new Konva.Stage({
  container: 'container',
  width: 800,
  height: 600
});

var layer = new Konva.Layer();
stage.add(layer);

var images = []; // store images

// Handle file upload
document.getElementById('upload').addEventListener('change', function(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt){
        var img = new Image();
        img.src = evt.target.result;
        img.onload = function(){
            var konvaImg = new Konva.Image({
                x: 200,
                y: 200,
                image: img,
                draggable: true
            });
            layer.add(konvaImg);
            layer.draw();
            images.push(konvaImg);
        }
    }
    reader.readAsDataURL(file);
});

// Placeholder for AI scene generation (replace with your API)
document.getElementById('generateAI').addEventListener('click', function(){
    var prompt = document.getElementById('parodyPrompt').value;
    alert('AI would generate scene for: ' + prompt + '\n(This requires AI integration)');
});

// Remove background placeholder
document.getElementById('removeBg').addEventListener('click', function(){
    alert('Background removal would be applied here using AI API.');
});

// Save project as JSON
document.getElementById('saveRig').addEventListener('click', function(){
    var data = images.map(img => ({
        x: img.x(),
        y: img.y(),
        rotation: img.rotation(),
        width: img.width(),
        height: img.height(),
        src: img.image().src
    }));
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    var a = document.createElement('a');
    a.href = dataStr;
    a.download = 'project.json';
    a.click();
});

// Export canvas as GIF (simplified)
document.getElementById('exportVideo').addEventListener('click', function(){
    var gif = new GIF({
        workers: 2,
        quality: 10
    });
    gif.addFrame(stage.toCanvas(), {delay: 200});
    gif.on('finished', function(blob){
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'parody.gif';
        a.click();
    });
    gif.render();
});
