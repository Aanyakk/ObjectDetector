video="";
objects=[];
status="";

function preload()
{
video=createVideo("video.mp4");
video.hide();
}

function draw()
{
image(video,0,0,480,310);
if(status!=""){
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="status: objectsDetected";
    document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
    fill("#000000");
    percent = floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke("#ff0008");
    rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);

}
}
}

function setup()
{
 canvas=createCanvas(480,310);
 canvas.center();
}

function start()
{
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status : Detecting objects";
}

function stop()
{
    video.stop();
}

function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error,results)
{
if(error){
    console.log(error);
}

else{console.log(results);
objects=results;
}


}