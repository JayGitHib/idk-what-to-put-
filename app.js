var stage = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 600
});
var layer = new Konva.Layer();
stage.add(layer);

var images = [];

// Generate AI cartoon scene
document.getElementById('generateAI').addEventListener('click', async () => {
    const prompt = document.getElementById('parodyPrompt').value;
    const aiImages = await generateCartoonAI(prompt);

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

// AI generation function (replace with real API)
async function generateCartoonAI(prompt){
    console.log("Generating cartoon parody for:", prompt);
    // Example: use DALL·E or Stable Diffusion API to generate cartoon-style images
    // Add "cartoon style", "SpongeBob parody", "2D animation" in prompt for best result
    // Return array of image URLs
    return [
        'https://via.placeholder.com/150/FF0000/FFFFFF?text=Character1',
        'https://via.placeholder.com/150/00FF00/FFFFFF?text=Character2',
        'https://via.placeholder.com/800x600/AAAAFF/FFFFFF?text=Background'
    ];
}

// Upload additional PNG/JPG
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

// Export canvas as GIF (replace with MP4 via FFmpeg for video)
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
