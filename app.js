var stage = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 600
});

var layer = new Konva.Layer();
stage.add(layer);

var images = [];

// AI Scene Generation
document.getElementById('generateAI').addEventListener('click', async () => {
    const prompt = document.getElementById('parodyPrompt').value;
    // Example: call AI API to generate images based on prompt
    // Replace this with real AI API (DALL·E, Stable Diffusion)
    const aiImages = await fakeAIImageGenerator(prompt);
    
    aiImages.forEach(src => {
        var img = new Image();
        img.src = src;
        img.onload = function(){
            var konvaImg = new Konva.Image({
                x: Math.random() * 400,
                y: Math.random() * 300,
                image: img,
                draggable: true
            });
            layer.add(konvaImg);
            layer.draw();
            images.push(konvaImg);
        }
    });
});

// Fake AI generator for testing (replace with real API)
async function fakeAIImageGenerator(prompt){
    console.log('Generating AI scene for:', prompt);
    // Return placeholder image URLs
    return [
        'https://via.placeholder.com/150/FF0000/FFFFFF?text=Character1',
        'https://via.placeholder.com/150/00FF00/FFFFFF?text=Character2',
        'https://via.placeholder.com/800x600/AAAAFF/FFFFFF?text=Background'
    ];
}

// Upload PNG/JPG
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

// Save Project as JSON
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

// Export Canvas as GIF
document.getElementById('exportVideo').addEventListener('click', function(){
    var gif = new GIF({ workers: 2, quality: 10 });
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
